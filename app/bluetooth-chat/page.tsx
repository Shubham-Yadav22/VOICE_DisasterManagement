"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bluetooth, Send, User, Smartphone } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Web Bluetooth API type definitions
declare global {
  interface Navigator {
    bluetooth: {
      requestDevice(options: {
        acceptAllDevices?: boolean;
        optionalServices?: string[];
      }): Promise<BluetoothDevice>;
    };
  }

  interface BluetoothDevice {
    name: string;
    gatt: BluetoothRemoteGATTServer;
  }

  interface BluetoothRemoteGATTServer {
    connect(): Promise<BluetoothRemoteGATTServer>;
    disconnect(): void;
    getPrimaryService(service: string): Promise<BluetoothRemoteGATTService>;
  }

  interface BluetoothRemoteGATTService {
    getCharacteristic(characteristic: string): Promise<BluetoothRemoteGATTCharacteristic>;
  }

  interface BluetoothRemoteGATTCharacteristic {
    writeValue(data: BufferSource): Promise<void>;
    startNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
    addEventListener(type: string, listener: (event: any) => void): void;
    removeEventListener(type: string, listener: (event: any) => void): void;
  }
}

interface Message {
  sender: "Me" | "Device"
  text: string
}

export default function BluetoothChat() {
  const [device, setDevice] = useState<BluetoothDevice | null>(null)
  const [characteristic, setCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  async function connectToDevice() {
    try {
      setIsConnecting(true)

      if (!navigator.bluetooth) {
        toast({
          title: "Bluetooth नहीं मिला",
          description: "कृपया सुनिश्चित करें कि आपका डिवाइस ब्लूटूथ सपोर्ट करता है",
          variant: "destructive",
        })
        return
      }

      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['00001101-0000-1000-8000-00805f9b34fb']
      })

      const server = await device.gatt.connect()
      const service = await server.getPrimaryService('00001101-0000-1000-8000-00805f9b34fb')
      const characteristic = await service.getCharacteristic('00002a00-0000-1000-8000-00805f9b34fb')

      await characteristic.startNotifications()
      characteristic.addEventListener('characteristicvaluechanged', handleIncomingMessage)

      setDevice(device)
      setCharacteristic(characteristic)
      console.log("Connected to:", device.name)
    } catch (error: any) {
      if (error?.name === "NotFoundError") {
        // User canceled device selection
        console.info("No device selected.")
        return
      }

      console.error("Bluetooth connection failed:", error)
      toast({
        title: "कनेक्शन विफल",
        description: "ब्लूटूथ कनेक्शन स्थापित नहीं हो सका",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  function handleIncomingMessage(event: { target: { value: DataView } }) {
    const value = event.target.value
    const decoder = new TextDecoder()
    const message = decoder.decode(value)
    setMessages(prev => [...prev, { sender: "Device", text: message }])
  }

  async function sendMessage() {
    if (!characteristic || !input.trim()) return

    try {
      const data = new TextEncoder().encode(input)
      await characteristic.writeValue(data)
      setMessages(prev => [...prev, { sender: "Me", text: input }])
      setInput("")
    } catch (error: any) {
      console.error("Failed to send message:", error)
      toast({
        title: "मैसेज भेजने में त्रुटि",
        description: "आपका संदेश नहीं भेजा जा सका",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    return () => {
      if (characteristic) {
        characteristic.removeEventListener('characteristicvaluechanged', handleIncomingMessage)
      }
      if (device) {
        device.gatt.disconnect()
      }
    }
  }, [device, characteristic])

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Bluetooth Emergency Chat</h1>
            {device ? (
              <div className="flex items-center gap-2 text-green-500">
                <Bluetooth className="h-5 w-5" />
                <span>Connected to {device.name}</span>
              </div>
            ) : (
              <Button 
                onClick={connectToDevice} 
                disabled={isConnecting}
                className="flex items-center gap-2"
              >
                <Bluetooth className="h-4 w-4" />
                {isConnecting ? "Connecting..." : "Connect Device"}
              </Button>
            )}
          </div>

          <ScrollArea className="h-[400px] mb-4 rounded-md border p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 mb-4 ${
                  msg.sender === "Me" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.sender === "Me" ? "bg-blue-500" : "bg-green-500"
                } text-white`}>
                  {msg.sender === "Me" ? <User className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
                </div>
                <div className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === "Me" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-100"
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              disabled={!device}
            />
            <Button 
              onClick={sendMessage} 
              disabled={!device || !input.trim()}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
