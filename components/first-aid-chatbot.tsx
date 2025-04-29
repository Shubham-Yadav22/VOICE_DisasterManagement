"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
}

// First aid knowledge base
const firstAidResponses: { [key: string]: string } = {
  "bleeding": `For bleeding wounds:
1. Apply direct pressure to the wound using a clean cloth or gauze
2. Elevate the injured area above the heart if possible
3. Maintain pressure until bleeding stops
4. If bleeding is severe, call emergency services immediately
5. Do not remove soaked dressings - add more on top
6. Keep the person warm and calm

Remember: Time is critical in bleeding emergencies. Seek professional help if bleeding is severe or doesn't stop.`,

  "burns": `For burns:
1. Remove the person from the source of the burn
2. Cool the burn with cool (not cold) water for 10-20 minutes
3. Remove any jewelry or tight items from the burned area
4. Cover with a sterile, non-stick dressing
5. Do not break blisters or apply creams
6. For severe burns:
   - Call emergency services
   - Keep the person warm
   - Monitor breathing
   - Do not remove stuck clothing

Note: For chemical burns, rinse with water for at least 20 minutes.`,

  "choking": `For a choking person:
1. If the person can speak or cough:
   - Encourage them to keep coughing
   - Stay with them and monitor

2. If the person cannot speak or breathe:
   - Stand behind them
   - Wrap your arms around their waist
   - Make a fist with one hand
   - Place fist thumb-side against middle of abdomen
   - Grasp fist with other hand
   - Give quick, upward thrusts
   - Repeat until object is expelled

3. If person becomes unconscious:
   - Call emergency services
   - Begin CPR if trained
   - Check mouth for visible obstruction

Remember: Time is critical. Call emergency services if the person cannot breathe.`,

  "heart attack": `Signs of a heart attack:
1. Chest pain or discomfort
2. Shortness of breath
3. Pain in arms, back, neck, or jaw
4. Nausea or lightheadedness
5. Cold sweat

Immediate actions:
1. Call emergency services immediately
2. Have the person sit or lie down
3. Loosen tight clothing
4. If prescribed, help them take their medication
5. Monitor their breathing
6. Be prepared to perform CPR if they become unconscious

Remember: Every minute counts in a heart attack. Don't delay calling emergency services.`,

  "stroke": `Signs of a stroke (FAST):
F - Face drooping
A - Arm weakness
S - Speech difficulty
T - Time to call emergency services

Immediate actions:
1. Call emergency services immediately
2. Note the time when symptoms began
3. Keep the person calm and comfortable
4. Do not give them food or drink
5. Monitor their breathing
6. If they become unconscious, place them in recovery position

Remember: Time is critical. Treatment is most effective within 3 hours of symptom onset.`,

  "fracture": `For suspected fractures:
1. Do not move the injured area
2. Support the injury in the position found
3. Apply ice or cold pack wrapped in cloth
4. Elevate the injured area if possible
5. Call emergency services for:
   - Open fractures
   - Severe pain
   - Deformity
   - Numbness or tingling
   - Inability to move the area

Do not:
- Try to straighten the injury
- Move the person unless necessary
- Apply heat
- Give food or drink

Remember: Immobilization is key to preventing further damage.`,

  "heat stroke": `For heat stroke:
1. Move the person to a cool place
2. Remove excess clothing
3. Cool the person with:
   - Cool water spray
   - Wet cloths
   - Fan
4. Apply ice packs to:
   - Armpits
   - Groin
   - Neck
   - Back
5. Call emergency services
6. Monitor breathing
7. Give cool water if conscious

Prevention tips:
- Stay hydrated
- Avoid direct sun
- Take breaks in cool areas
- Wear light clothing

Remember: Heat stroke is life-threatening. Seek immediate medical help.`,

  "poisoning": `For poisoning:
1. Call emergency services immediately
2. If the person is unconscious:
   - Check breathing
   - Place in recovery position
   - Do not induce vomiting
3. If conscious:
   - Identify the poison if possible
   - Do not give food or drink
   - Do not induce vomiting
4. Keep the container of poison if available

Important:
- Time is critical
- Do not wait for symptoms
- Keep the person calm
- Monitor breathing

Remember: Call poison control or emergency services immediately.`
}

export function FirstAidChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isThinking, setIsThinking] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setIsThinking(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      const assistantMessage: Message = {
        role: "assistant",
        content: data.content
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I'm having trouble processing your request. Please try again or call emergency services if this is an urgent situation."
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsThinking(false)
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-background rounded-lg border">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">First Aid Assistant</h2>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted rounded-bl-none"
                )}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.role === "user" ? "You" : "Assistant"}
                </span>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
          ))}
          {isThinking && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-2">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about first aid..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}

