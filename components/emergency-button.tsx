"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export function EmergencyButton() {
  const handleEmergency = () => {
    // Log emergency signal
    console.log("Emergency signal sent!")
    
    // Here you would typically:
    // 1. Send emergency signal to backend
    // 2. Notify emergency services
    // 3. Alert nearby responders
  }

  return (
    <Button
      variant="destructive"
      size="lg"
      className="w-full h-16 text-lg font-bold"
      onClick={handleEmergency}
    >
      <AlertTriangle className="mr-2 h-6 w-6" />
      Emergency Button
    </Button>
  )
}

