"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocation } from "../hooks/use-location"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function Navigation() {
  const router = useRouter()
  const { location, updateLocation, isLoading } = useLocation()
  const { setTheme, theme } = useTheme()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/")}
                className="text-xl font-bold hover:bg-transparent"
              >
                Disaster Management
              </Button>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Location"
                  value={location || "Detecting location..."}
                  readOnly
                  className="w-[200px]"
                />
                <Button
                  variant="outline"
                  onClick={updateLocation}
                  disabled={isLoading}
                >
                  {isLoading ? "Detecting..." : "Update Location"}
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/emergency-chat")}
              >
                Emergency Chat
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/survival-guide")}
              >
                Survival Guide
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/admin")}
              >
                Admin Panel
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="w-9 h-9"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16" /> {/* Spacer to prevent content from being hidden under the fixed nav */}
    </>
  )
}

