"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Search, Ambulance, Flame, Shield, Hospital, AlertTriangle, Siren, Heart, Brain, HandHelping, PhoneCall, MessageSquare, Copy, Check, Clock, MapPin, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const services = [
  {
    name: "Police",
    icon: Shield,
    number: "100",
    description: "For crime, theft, or security emergencies",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    alternateNumbers: ["112"]
  },
  {
    name: "Ambulance",
    icon: Ambulance,
    number: "108",
    description: "For medical emergencies and accidents",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    alternateNumbers: ["102"]
  },
  {
    name: "Fire Department",
    icon: Flame,
    number: "101",
    description: "For fire emergencies and rescue operations",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    alternateNumbers: ["112"]
  },
  {
    name: "Hospital",
    icon: Hospital,
    number: "102",
    description: "For medical advice and hospital information",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    alternateNumbers: ["108"]
  },
  {
    name: "Emergency",
    icon: Siren,
    number: "112",
    description: "General emergency number for all services",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    alternateNumbers: ["100", "101", "102", "108"]
  },
  {
    name: "Women Helpline",
    icon: Shield,
    number: "1091",
    description: "For women's safety and harassment cases",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
    alternateNumbers: ["100"]
  },
  {
    name: "Disaster Management",
    icon: AlertTriangle,
    number: "1070",
    description: "For natural disasters and calamities",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    alternateNumbers: ["112"]
  },
  {
    name: "Mental Health Helpline",
    icon: Brain,
    number: "1800-599-0019",
    description: "24/7 mental health support and counseling",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20"
  },
  {
    name: "Child Helpline",
    icon: Heart,
    number: "1098",
    description: "For child protection and welfare",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20"
  },
  {
    name: "Senior Citizen Helpline",
    icon: HandHelping,
    number: "14567",
    description: "Support and assistance for senior citizens",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20"
  }
]

export function EmergencyServices() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null)

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCall = (number: string, serviceName: string) => {
    if (window.confirm(`Are you sure you want to call ${serviceName} at ${number}?`)) {
    window.location.href = `tel:${number}`
    }
  }

  const handleCopyNumber = (number: string) => {
    navigator.clipboard.writeText(number)
    setCopiedNumber(number)
    toast.success("Number copied to clipboard!")
    setTimeout(() => setCopiedNumber(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search emergency services..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
          <div className="flex items-center gap-2 text-primary">
            <Clock className="h-5 w-5" />
            <p className="text-sm font-medium">
              Available 24/7
            </p>
          </div>
        </div>
        <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
          <div className="flex items-center gap-2 text-primary">
            <MapPin className="h-5 w-5" />
            <p className="text-sm font-medium">
              Nationwide Coverage
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="grid gap-4">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={cn(
                  "transition-all duration-200 hover:shadow-lg group",
                  service.borderColor,
                  selectedService === service.name && "ring-2 ring-primary"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-xl transition-transform duration-200 group-hover:scale-110",
                      service.bgColor
                    )}>
                      <service.icon className={cn("h-6 w-6", service.color)} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono">
                            {service.number}
                          </Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="default"
                                size="sm"
                                className="bg-primary hover:bg-primary/90"
                              >
                                <PhoneCall className="h-4 w-4 mr-2" />
                                Call
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <service.icon className={cn("h-5 w-5", service.color)} />
                                  Call {service.name}
                                </DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to call {service.name} at {service.number}?
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-end gap-2 mt-4">
                                <Button
                                  variant="outline"
                                  onClick={() => handleCopyNumber(service.number)}
                                >
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy Number
                                </Button>
                                <Button
                                  className="bg-primary hover:bg-primary/90"
                                  onClick={() => handleCall(service.number, service.name)}
                                >
                                  <PhoneCall className="h-4 w-4 mr-2" />
                                  Confirm Call
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      {service.alternateNumbers && service.alternateNumbers.length > 0 && (
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Alternate numbers:</span>
                          {service.alternateNumbers.map((num) => (
                            <Dialog key={num}>
                              <DialogTrigger asChild>
                                <Badge
                                  variant="secondary"
                                  className="cursor-pointer hover:bg-secondary/80"
                                >
                                  {num}
                                </Badge>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    <service.icon className={cn("h-5 w-5", service.color)} />
                                    Call {service.name} (Alternate)
                                  </DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to call {service.name} at {num}?
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-end gap-2 mt-4">
                                  <Button
                                    variant="outline"
                                    onClick={() => handleCopyNumber(num)}
                                  >
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy Number
                                  </Button>
                                  <Button
                                    className="bg-primary hover:bg-primary/90"
                                    onClick={() => handleCall(num, service.name)}
                                  >
                                    <PhoneCall className="h-4 w-4 mr-2" />
                                    Confirm Call
            </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
          </CardContent>
        </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <p className="text-sm font-medium">
              For life-threatening emergencies, call emergency services immediately
            </p>
          </div>
        </div>
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 text-primary">
            <Users className="h-5 w-5" />
            <p className="text-sm font-medium">
              Trained professionals available to assist you
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

