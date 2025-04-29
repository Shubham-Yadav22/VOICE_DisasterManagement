"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, HandHelping, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DonationSection() {
  const [showQRCode, setShowQRCode] = useState(false)

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Support Our Cause</CardTitle>
          <CardDescription className="text-center">
            Your donation helps us provide better emergency response services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => window.open('/donation-used', '_blank')}
            >
              <Heart className="h-6 w-6" />
              <span>Donation Used</span>
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className="h-24 flex flex-col gap-2 bg-primary hover:bg-primary/90"
                >
                  <HandHelping className="h-6 w-6" />
                  <span>Donate Now</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Donate to V.O.I.C.E</DialogTitle>
                  <DialogDescription>
                    Scan the QR code to make your donation
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="relative w-64 h-64 bg-white p-4 rounded-lg">
                    {/* QR Code will be added here when you provide it */}
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      QR Code will be displayed here
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="font-medium">Bank Details:</p>
                    <p className="text-sm text-muted-foreground">
                      Account Name: [Your Account Name]<br />
                      Account Number: [Your Account Number]<br />
                      Bank Name: [Your Bank Name]<br />
                      IFSC Code: [Your IFSC Code]
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Link href="/donate-resources">
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2 w-full"
              >
                <Package className="h-6 w-6" />
                <span>Donate Resources</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 