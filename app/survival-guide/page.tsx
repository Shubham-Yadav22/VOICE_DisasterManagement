'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Droplet, Flame, Home, Wind, Snowflake, Zap } from "lucide-react"
import Link from "next/link"

const survivalGuides = [
  {
    title: "Natural Disasters",
    description: "Learn how to prepare and respond to earthquakes, hurricanes, and floods",
    icon: Wind,
    color: "text-blue-500",
    articles: [
      {
        title: "Earthquake Preparedness",
        description: "Essential steps to prepare for and survive an earthquake",
        link: "/survival-guide/earthquake"
      },
      {
        title: "Flood Safety",
        description: "How to stay safe during floods and water emergencies",
        link: "/survival-guide/flood"
      },
      {
        title: "Hurricane Survival",
        description: "Preparing for and surviving hurricane conditions",
        link: "/survival-guide/hurricane"
      }
    ]
  },
  {
    title: "Fire Emergencies",
    description: "Guidelines for fire prevention and response",
    icon: Flame,
    color: "text-red-500",
    articles: [
      {
        title: "Home Fire Safety",
        description: "Prevent and respond to home fires effectively",
        link: "/survival-guide/home-fire"
      },
      {
        title: "Wildfire Preparedness",
        description: "How to prepare for and survive wildfires",
        link: "/survival-guide/wildfire"
      },
      {
        title: "Fire Escape Planning",
        description: "Create and practice an effective fire escape plan",
        link: "/survival-guide/fire-escape"
      }
    ]
  },
  {
    title: "Medical Emergencies",
    description: "Basic first aid and emergency medical response",
    icon: AlertTriangle,
    color: "text-yellow-500",
    articles: [
      {
        title: "Basic First Aid",
        description: "Essential first aid techniques for common emergencies",
        link: "/survival-guide/first-aid"
      },
      {
        title: "CPR Guide",
        description: "Learn proper CPR techniques for adults and children",
        link: "/survival-guide/cpr"
      },
      {
        title: "Emergency Wound Care",
        description: "How to treat wounds and prevent infection",
        link: "/survival-guide/wound-care"
      }
    ]
  },
  {
    title: "Extreme Weather",
    description: "Surviving extreme weather conditions",
    icon: Snowflake,
    color: "text-cyan-500",
    articles: [
      {
        title: "Heat Wave Safety",
        description: "Stay safe during extreme heat conditions",
        link: "/survival-guide/heat-wave"
      },
      {
        title: "Winter Storm Survival",
        description: "Preparing for and surviving winter storms",
        link: "/survival-guide/winter-storm"
      },
      {
        title: "Tornado Safety",
        description: "How to prepare for and survive tornadoes",
        link: "/survival-guide/tornado"
      }
    ]
  },
  {
    title: "Power Outages",
    description: "Preparing for and managing power outages",
    icon: Zap,
    color: "text-purple-500",
    articles: [
      {
        title: "Power Outage Kit",
        description: "Essential items for surviving power outages",
        link: "/survival-guide/power-outage-kit"
      },
      {
        title: "Food Safety",
        description: "Keeping food safe during power outages",
        link: "/survival-guide/food-safety"
      },
      {
        title: "Emergency Lighting",
        description: "Safe lighting options during power outages",
        link: "/survival-guide/emergency-lighting"
      }
    ]
  },
  {
    title: "Water Emergencies",
    description: "Water safety and emergency response",
    icon: Droplet,
    color: "text-blue-400",
    articles: [
      {
        title: "Water Conservation",
        description: "Tips for conserving water during emergencies",
        link: "/survival-guide/water-conservation"
      },
      {
        title: "Water Purification",
        description: "Methods for purifying water in emergencies",
        link: "/survival-guide/water-purification"
      },
      {
        title: "Flood Safety",
        description: "Staying safe during water-related emergencies",
        link: "/survival-guide/flood-safety"
      }
    ]
  }
]

export default function SurvivalGuidePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Offline Survival Guide</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive guides for handling various emergency situations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {survivalGuides.map((guide) => (
          <Card key={guide.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <guide.icon className={`h-6 w-6 ${guide.color}`} />
                <CardTitle>{guide.title}</CardTitle>
              </div>
              <CardDescription>{guide.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {guide.articles.map((article) => (
                  <Link key={article.title} href={article.link}>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <div>
                        <div className="font-medium">{article.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {article.description}
                        </div>
                      </div>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 