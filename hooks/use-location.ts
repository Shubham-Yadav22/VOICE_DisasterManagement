"use client"

import { useState } from 'react'

export function useLocation() {
  const [location, setLocation] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const updateLocation = () => {
    setIsLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude}, ${position.coords.longitude}`)
          setIsLoading(false)
        },
        () => {
          setLocation("Location unavailable")
          setIsLoading(false)
        }
      )
    } else {
      setLocation("Geolocation not supported")
      setIsLoading(false)
    }
  }

  return { location, updateLocation, isLoading }
} 