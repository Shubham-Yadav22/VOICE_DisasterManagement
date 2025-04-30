"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
const EmergencyServices = dynamic(() => import("@/components/emergency-services").then(mod => mod.EmergencyServices), { ssr: false });


const ShelterMap = dynamic(() => import("@/components/shelter-map").then(mod => mod.ShelterMap), { ssr: false });
const FirstAidChatbot = dynamic(() => import("@/components/first-aid-chatbot").then(mod => mod.FirstAidChatbot), { ssr: false });
const DonationSection = dynamic(() => import("@/components/donation-section").then(mod => mod.DonationSection), { ssr: false });





// import { FirstAidChatbot } from "@/components/first-aid-chatbot"
// import { ShelterMap } from "@/components/shelter-map"
import { OfflineSurvival } from "@/components/offline-survival"
// import { DonationSection } from "@/components/donation-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Phone, MapPin, Shield, Heart, BookOpen, Siren, HandHelping, Bluetooth, Stethoscope, Activity } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'



// Dynamically import components that use browser APIs
const BluetoothChat = dynamic(
  () => import('./bluetooth-chat/page'),
  { ssr: false }
)

const MedicalInfo = dynamic(
  () => import('@/components/medical-info').then(mod => mod.MedicalInfo),
  { ssr: false }
)

export default function Home() {
  const { toast } = useToast()
  const [isCalling, setIsCalling] = useState(false)
  const [isBrowser, setIsBrowser] = useState(false)
  

  // Set isBrowser to true once component mounts (client-side only)
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleEmergencyCall = async () => {
    // Only run this function in the browser
    if (!isBrowser) return
    if (typeof window === 'undefined') return

    setIsCalling(true)
    try {
      // Get user's location if available
      let location = ''
      if (typeof window !== 'undefined' && 'geolocation' in navigator) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          })
          location = `${position.coords.latitude}, ${position.coords.longitude}`
        } catch (error) {
          console.log('Location not available:', error)
        }
      }

      // Prepare the request body
      const requestBody = {
        phoneNumber: '+919170732347', 
        emergencyType: 'General Emergency',
        location: location
      }

      console.log('Sending request with body:', requestBody)

      const response = await fetch('/api/emergency-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Emergency Call Initiated",
          description: "Connecting to emergency services (112)...",
        })
      } else {
        let errorMessage = result.message
        if (result.error === 'INVALID_PHONE') {
          errorMessage = "Invalid phone number format. Please check the emergency number configuration."
        } else if (result.error === 'MISSING_EMERGENCY_TYPE') {
          errorMessage = "Emergency type is required."
        } else if (result.error === 'TWILIO_NOT_INITIALIZED') {
          errorMessage = "Emergency call service is not properly configured. Please contact support."
        } else if (result.details) {
          errorMessage = result.details
        }
        
        toast({
          title: "Error", 
          description: errorMessage,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      const e = error as Error
      toast({
        title: "Error",
        description: e.message || "Failed to initiate emergency call. Please try again or contact support.",
        variant: "destructive",
      })
    } finally {
      setIsCalling(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation Bar */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="V.O.I.C.E Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">V.O.I.C.E</h2>
              <p className="text-xs text-muted-foreground">Voice of Information in Critical Situation and Emergency</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="lg"
                  className="flex items-center gap-2 font-semibold animate-pulse"
                  onClick={handleEmergencyCall}
                  disabled={isCalling || !isBrowser}
                >
                  <Siren className="h-5 w-5" />
                  {isCalling ? "Connecting..." : "Emergency Call"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl text-destructive">Emergency Call</AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    You are about to call emergency services (112). This should only be used for life-threatening situations. Are you sure you want to proceed?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-base">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-base"
                    onClick={handleEmergencyCall}
                    disabled={isCalling}
                  >
                    {isCalling ? "Connecting..." : "Call Emergency (112)"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" />
        <div className="container relative py-16 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                V.O.I.C.E
              </h1>
              <p className="text-lg text-muted-foreground">
                Voice of Information in Critical Situation and Emergency
              </p>
            </div>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              Quick access to emergency services, first aid guidance, and nearby shelters
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-16">
        <Tabs defaultValue="emergency" className="w-full">
          <TabsList className="w-full grid grid-cols-7 h-14">
            <TabsTrigger value="emergency" className="flex flex-col items-center justify-center gap-1">
              <Phone className="h-5 w-5" />
              <span className="text-xs">Emergency</span>
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="flex flex-col items-center justify-center gap-1">
              <Heart className="h-5 w-5" />
              <span className="text-xs">First Aid</span>
            </TabsTrigger>
            <TabsTrigger value="shelter" className="flex flex-col items-center justify-center gap-1">
              <MapPin className="h-5 w-5" />
              <span className="text-xs">Shelter</span>
            </TabsTrigger>
            <TabsTrigger value="survival" className="flex flex-col items-center justify-center gap-1">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">Survival</span>
            </TabsTrigger>
            <TabsTrigger value="bluetooth" className="flex flex-col items-center justify-center gap-1">
              <Bluetooth className="h-5 w-5" />
              <span className="text-xs">Bluetooth</span>
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex flex-col items-center justify-center gap-1">
              <Stethoscope className="h-5 w-5" />
              <span className="text-xs">Medical</span>
            </TabsTrigger>
            <TabsTrigger value="donate" className="flex flex-col items-center justify-center gap-1">
              <HandHelping className="h-5 w-5" />
              <span className="text-xs">Donate</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emergency" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Shield className="h-6 w-6 text-primary" />
                    Emergency Services
                  </CardTitle>
                  <CardDescription className="text-base">
                    Quick access to all emergency contact numbers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmergencyServices />
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                    Emergency Tips
                  </CardTitle>
                  <CardDescription className="text-base">
                    Important information for emergency situations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Before an Emergency</h4>
                    <ul className="list-disc list-inside text-base text-muted-foreground space-y-2">
                      <li>Save emergency numbers in your phone</li>
                      <li>Keep a first aid kit ready</li>
                      <li>Know your location and nearby hospitals</li>
                      <li>Have emergency contacts saved</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">During an Emergency</h4>
                    <ul className="list-disc list-inside text-base text-muted-foreground space-y-2">
                      <li>Stay calm and assess the situation</li>
                      <li>Call emergency services immediately</li>
                      <li>Follow instructions from emergency responders</li>
                      <li>Provide clear information about the situation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chatbot" className="space-y-8">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Heart className="h-6 w-6 text-primary" />
                  First Aid Guide
                </CardTitle>
                <CardDescription className="text-base">
                  Essential first aid information and procedures
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isBrowser && <FirstAidChatbot />}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shelter" className="space-y-8">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <MapPin className="h-6 w-6 text-primary" />
                  Emergency Shelters
                </CardTitle>
                <CardDescription className="text-base">
                  Find nearby emergency shelters and safe locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isBrowser && <ShelterMap />}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="survival" className="space-y-8">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Offline Survival Guide
                </CardTitle>
                <CardDescription className="text-base">
                  Comprehensive guides for various disaster scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isBrowser && <OfflineSurvival />}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bluetooth" className="space-y-8">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Bluetooth className="h-6 w-6 text-primary" />
                  Offline Communication
                </CardTitle>
                <CardDescription className="text-base">
                  Connect and communicate with nearby devices using Bluetooth
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isBrowser && <BluetoothChat />}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medical" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Stethoscope className="h-6 w-6 text-primary" />
                    Patient Records
                  </CardTitle>
                  <CardDescription className="text-base">
                    Manage patient information and medical history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isBrowser && <MedicalInfo />}
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Activity className="h-6 w-6 text-primary" />
                    Health Metrics
                  </CardTitle>
                  <CardDescription className="text-base">
                    Track vital signs and health indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Vital Signs</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Heart Rate</span>
                            <span className="font-medium">-- bpm</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Blood Pressure</span>
                            <span className="font-medium">--/-- mmHg</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Temperature</span>
                            <span className="font-medium">--°C</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Oxygen Level</span>
                            <span className="font-medium">--%</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Medical Alerts</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-yellow-500">
                            <AlertTriangle className="h-4 w-4" />
                            <span>High Blood Pressure</span>
                          </div>
                          <div className="flex items-center gap-2 text-red-500">
                            <AlertTriangle className="h-4 w-4" />
                            <span>Low Oxygen Level</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Recent Updates</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Last Heart Rate Update</span>
                          <span className="text-muted-foreground">2 minutes ago</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Last Blood Pressure Update</span>
                          <span className="text-muted-foreground">5 minutes ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="donate" className="space-y-8">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <HandHelping className="h-6 w-6 text-primary" />
                  Support Our Mission
                </CardTitle>
                <CardDescription className="text-base">
                  Your contribution helps us provide better emergency response services
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isBrowser && <DonationSection />}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-16">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-base text-muted-foreground">
              © 2024 Emergency Response System. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Button variant="ghost" size="lg">
                Privacy Policy
              </Button>
              <Button variant="ghost" size="lg">
                Terms of Service
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}