"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { HandHelping } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const resourceItems = [
  { id: "food", label: "Food Items" },
  { id: "water", label: "Water Bottles" },
  { id: "clothes", label: "Clothes" },
  { id: "blankets", label: "Blankets" },
  { id: "medicines", label: "Medicines" },
  { id: "firstaid", label: "First Aid Kits" },
  { id: "toiletries", label: "Toiletries" },
  { id: "batteries", label: "Batteries" },
  { id: "flashlights", label: "Flashlights" },
  { id: "other", label: "Other Items" },
]

export default function DonateResourcesPage() {
  const { toast } = useToast()
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [otherItem, setOtherItem] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      resources: selectedItems.map(id => 
        resourceItems.find(item => item.id === id)?.label || id
      ),
      otherItems: selectedItems.includes('other') ? otherItem : undefined,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your donation has been recorded successfully.",
        })
        // Reset form
        e.currentTarget.reset()
        setSelectedItems([])
        setOtherItem("")
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit donation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Donate Resources</h1>
          <p className="text-xl text-muted-foreground">
            Your resources can help those in need during emergencies
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HandHelping className="h-6 w-6 text-primary" />
              Resource Donation Form
            </CardTitle>
            <CardDescription>
              Please fill out the form below to donate resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Enter your complete address"
                  required
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Resources to Donate</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resourceItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedItems([...selectedItems, item.id])
                          } else {
                            setSelectedItems(selectedItems.filter((id) => id !== item.id))
                          }
                        }}
                      />
                      <Label htmlFor={item.id}>{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {selectedItems.includes("other") && (
                <div className="space-y-2">
                  <Label htmlFor="otherItems">Other Items</Label>
                  <Textarea
                    id="otherItems"
                    placeholder="Please specify other items you want to donate"
                    value={otherItem}
                    onChange={(e) => setOtherItem(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="message">Additional Message (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Any additional information you'd like to share"
                  className="min-h-[100px]"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Donation"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 