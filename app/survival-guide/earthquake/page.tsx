'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EarthquakeGuidePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/survival-guide">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Survival Guide
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-4">Earthquake Preparedness Guide</h1>
        <p className="text-lg text-muted-foreground">
          Learn how to prepare for, respond to, and recover from earthquakes
        </p>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Before an Earthquake</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold">Create an Emergency Kit</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Water (1 gallon per person per day for at least 3 days)</li>
              <li>Non-perishable food (3-day supply)</li>
              <li>First aid kit</li>
              <li>Flashlight and extra batteries</li>
              <li>Battery-powered radio</li>
              <li>Whistle to signal for help</li>
              <li>Dust mask to filter contaminated air</li>
              <li>Plastic sheeting and duct tape</li>
              <li>Wrench or pliers to turn off utilities</li>
              <li>Local maps</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6">Make a Family Plan</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Choose a meeting place outside your home</li>
              <li>Designate an out-of-area contact person</li>
              <li>Practice "Drop, Cover, and Hold On"</li>
              <li>Learn how to turn off gas, water, and electricity</li>
              <li>Secure heavy furniture and appliances</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>During an Earthquake</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold">If You're Indoors</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>DROP to your hands and knees</li>
              <li>COVER your head and neck with your arms</li>
              <li>HOLD ON to any sturdy furniture until the shaking stops</li>
              <li>Stay away from windows, mirrors, and heavy furniture</li>
              <li>If in bed, stay there and protect your head with a pillow</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6">If You're Outdoors</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Move to a clear area away from buildings, trees, and power lines</li>
              <li>Drop to the ground and stay there until the shaking stops</li>
              <li>If in a vehicle, pull over to a clear location and stay inside</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>After an Earthquake</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold">Immediate Actions</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Check yourself and others for injuries</li>
              <li>Be prepared for aftershocks</li>
              <li>Check for gas leaks and turn off gas if necessary</li>
              <li>Check for electrical system damage</li>
              <li>Check for sewage and water line damage</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6">Safety Tips</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Stay away from damaged buildings</li>
              <li>Be careful around broken glass and debris</li>
              <li>Wear sturdy shoes and protective clothing</li>
              <li>Use battery-powered lanterns instead of candles</li>
              <li>Listen to the radio for emergency information</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Keep these numbers handy:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Emergency Services: 911</li>
              <li>Gas Company Emergency Line: [Local Number]</li>
              <li>Electric Company Emergency Line: [Local Number]</li>
              <li>Water Department Emergency Line: [Local Number]</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 