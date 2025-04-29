"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IndianRupee, Heart, Home, Utensils } from "lucide-react"

export default function DonationUsedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Donation Usage Report</h1>
          <p className="text-xl text-muted-foreground">
            How your donations are making a difference
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Amount Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="h-6 w-6 text-primary" />
                Total Amount Received
              </CardTitle>
              <CardDescription>Total donations collected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">₹2,50,000</div>
              <p className="text-sm text-muted-foreground mt-2">
                Last updated: March 2024
              </p>
            </CardContent>
          </Card>

          {/* Medical Supplies Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                Medical Supplies
              </CardTitle>
              <CardDescription>Healthcare resources provided</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">₹75,000</div>
              <p className="text-sm text-muted-foreground mt-2">
                First aid kits, medicines, and medical equipment
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• 500 First Aid Kits</li>
                <li>• Emergency Medicines</li>
                <li>• Medical Equipment</li>
              </ul>
            </CardContent>
          </Card>

          {/* Relief and Refugee Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-6 w-6 text-primary" />
                Relief and Refugee
              </CardTitle>
              <CardDescription>Shelter and basic needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">₹1,00,000</div>
              <p className="text-sm text-muted-foreground mt-2">
                Temporary shelters and essential supplies
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Temporary Shelters</li>
                <li>• Clothing and Blankets</li>
                <li>• Basic Necessities</li>
              </ul>
            </CardContent>
          </Card>

          {/* Food Distribution Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-6 w-6 text-primary" />
                Food Distribution
              </CardTitle>
              <CardDescription>Food and water supplies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">₹75,000</div>
              <p className="text-sm text-muted-foreground mt-2">
                Emergency food and water distribution
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Emergency Food Kits</li>
                <li>• Drinking Water</li>
                <li>• Dry Rations</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Impact Report</CardTitle>
              <CardDescription>How your donations have helped</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">People Helped</h4>
                  <p className="text-2xl font-bold text-primary">1,500+</p>
                  <p className="text-sm text-muted-foreground">
                    Individuals and families supported through our relief efforts
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Areas Covered</h4>
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-sm text-muted-foreground">
                    Different regions where relief operations were conducted
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Future Plans</h4>
                <p className="text-sm text-muted-foreground">
                  We are planning to expand our relief operations to more areas and provide additional support for disaster preparedness training and community awareness programs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 