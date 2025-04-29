'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Toaster } from "sonner"
import Image from 'next/image'

export default function AdminPage() {
  const [alertMessage, setAlertMessage] = useState('')
  const [visitorCount, setVisitorCount] = useState(0)

  const handleSendAlert = async () => {
    try {
      const response = await fetch('/api/admin/alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: alertMessage }),
      })

      if (!response.ok) {
        throw new Error('Failed to send alert')
      }

      // Show success toast
      toast.success('Alert sent successfully!', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#4CAF50',
          color: 'white',
        },
      })

      // Show the alert message as a popup
      toast.error(alertMessage, {
        duration: 10000,
        position: 'top-center',
        style: {
          background: '#f44336',
          color: 'white',
          fontSize: '1.2rem',
          padding: '1rem',
        },
      })

      setAlertMessage('')
    } catch (error) {
      toast.error('Failed to send alert', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#f44336',
          color: 'white',
        },
      })
      console.error('Error sending alert:', error)
    }
  }

  const fetchVisitorCount = async () => {
    try {
      const response = await fetch('/api/admin/visitors')
      if (!response.ok) {
        throw new Error('Failed to fetch visitor count')
      }
      const data = await response.json()
      setVisitorCount(data.count)
    } catch (error) {
      toast.error('Failed to fetch visitor count', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#f44336',
          color: 'white',
        },
      })
      console.error('Error fetching visitor count:', error)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Toaster richColors />
      <div className="flex items-center gap-4 mb-8">
        <Image
          src="/logo.png"
          alt="VOICE Logo"
          width={50}
          height={50}
          className="rounded-lg"
        />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Alert Section */}
        <Card>
          <CardHeader>
            <CardTitle>Send Emergency Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="alert-message">Alert Message</Label>
                <Input
                  id="alert-message"
                  placeholder="Enter your emergency alert message..."
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                />
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Send Alert</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Alert</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to send this emergency alert? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSendAlert}>
                      Send Alert
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>

        {/* Visitor Tracking Section */}
        <Card>
          <CardHeader>
            <CardTitle>Visitor Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold">
                Total Visitors: {visitorCount}
              </div>
              <Button onClick={fetchVisitorCount}>
                Refresh Count
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 