"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, XCircle, Flame, Droplets, Wind, Cloud, Zap, Landmark, Snowflake, Shield } from "lucide-react"

type DisasterGuide = {
  name: string
  icon: any
  description: string
  doList: string[]
  dontList: string[]
  emergencyKit: string[]
}

const disasterGuides: DisasterGuide[] = [
  {
    name: "Fire",
    icon: Flame,
    description: "Guidelines for surviving fire emergencies",
    doList: [
      "Stay low to the ground to avoid smoke",
      "Use stairs, not elevators",
      "Check doors for heat before opening",
      "Call emergency services immediately",
      "Use fire extinguisher if trained",
      "Have an escape plan ready"
    ],
    dontList: [
      "Don't use water on electrical fires",
      "Don't hide in closets or bathrooms",
      "Don't go back inside once evacuated",
      "Don't use elevators during fire",
      "Don't open hot doors"
    ],
    emergencyKit: [
      "Fire extinguisher",
      "Smoke detectors",
      "Emergency ladder",
      "First aid kit",
      "Flashlight",
      "Emergency contact numbers"
    ]
  },
  {
    name: "Flood",
    icon: Droplets,
    description: "Guidelines for surviving flood situations",
    doList: [
      "Move to higher ground immediately",
      "Turn off electricity and gas",
      "Pack emergency supplies",
      "Listen to weather alerts",
      "Have a family communication plan",
      "Keep important documents in waterproof containers"
    ],
    dontList: [
      "Don't walk through moving water",
      "Don't drive through flooded areas",
      "Don't touch electrical equipment in water",
      "Don't return home until authorities say it's safe",
      "Don't drink flood water"
    ],
    emergencyKit: [
      "Water bottles",
      "Non-perishable food",
      "First aid kit",
      "Flashlight",
      "Battery-powered radio",
      "Life jackets",
      "Emergency blankets"
    ]
  },
  {
    name: "Earthquake",
    icon: Landmark,
    description: "Guidelines for surviving earthquakes",
    doList: [
      "Drop, cover, and hold on",
      "Stay indoors until shaking stops",
      "Stay away from windows",
      "Have an emergency plan",
      "Keep emergency supplies ready",
      "Know evacuation routes"
    ],
    dontList: [
      "Don't run outside during shaking",
      "Don't use elevators",
      "Don't stand near tall furniture",
      "Don't use matches or lighters",
      "Don't enter damaged buildings"
    ],
    emergencyKit: [
      "First aid kit",
      "Water and food",
      "Flashlight",
      "Battery-powered radio",
      "Emergency blankets",
      "Whistle",
      "Dust masks"
    ]
  },
  {
    name: "Storm",
    icon: Wind,
    description: "Guidelines for surviving severe storms",
    doList: [
      "Stay indoors",
      "Keep emergency supplies ready",
      "Listen to weather alerts",
      "Secure outdoor objects",
      "Have a family communication plan",
      "Keep important documents safe"
    ],
    dontList: [
      "Don't go outside during severe weather",
      "Don't use electrical equipment",
      "Don't stand near windows",
      "Don't use corded phones",
      "Don't touch downed power lines"
    ],
    emergencyKit: [
      "Battery-powered radio",
      "Flashlights",
      "First aid kit",
      "Water and food",
      "Emergency blankets",
      "Battery-powered fan",
      "Weather radio"
    ]
  },
  {
    name: "Power Outage",
    icon: Zap,
    description: "Guidelines for surviving power outages",
    doList: [
      "Keep emergency supplies ready",
      "Use battery-powered lights",
      "Keep refrigerator closed",
      "Have backup power sources",
      "Keep emergency contacts handy",
      "Use surge protectors"
    ],
    dontList: [
      "Don't use candles near flammable materials",
      "Don't open refrigerator frequently",
      "Don't use gas stoves for heating",
      "Don't touch downed power lines",
      "Don't use generators indoors"
    ],
    emergencyKit: [
      "Flashlights",
      "Battery-powered radio",
      "First aid kit",
      "Water and food",
      "Emergency blankets",
      "Portable charger",
      "Battery-powered fan"
    ]
  }
]

export function OfflineSurvival() {
  const [selectedDisaster, setSelectedDisaster] = useState(disasterGuides[0])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {disasterGuides.map((disaster) => (
          <Card
            key={disaster.name}
            className={`cursor-pointer transition-all ${
              selectedDisaster.name === disaster.name
                ? "border-primary shadow-lg"
                : "hover:border-primary/50"
            }`}
            onClick={() => setSelectedDisaster(disaster)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center gap-2">
                <disaster.icon className="h-8 w-8 text-primary" />
                <h3 className="font-semibold text-center">{disaster.name}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <selectedDisaster.icon className="h-6 w-6 text-primary" />
            {selectedDisaster.name} Survival Guide
          </CardTitle>
          <CardDescription>{selectedDisaster.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Do's
              </h4>
              <ul className="space-y-2">
                {selectedDisaster.doList.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                Don'ts
              </h4>
              <ul className="space-y-2">
                {selectedDisaster.dontList.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Emergency Kit Essentials
            </h4>
            <ul className="grid gap-2 md:grid-cols-2">
              {selectedDisaster.emergencyKit.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 