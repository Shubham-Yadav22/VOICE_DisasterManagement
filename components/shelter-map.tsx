"use client"

import { useState, useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import type { Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Filter, Navigation, Phone, RefreshCw, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "sonner"

type Shelter = {
  id: number;
  name: string;
  address: string;
  type: string;
  accessible: boolean;
  coordinates: [number, number];
  capacity: number;
  maxCapacity: number;
}

// Custom icon for shelters
const shelterIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
})

// Custom icon for current location
const currentLocationIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
})

// Mock data for shelters
const MOCK_SHELTERS: Shelter[] = [
  {
    id: 1,
    name: "AIIMS Emergency Center",
    address: "AIIMS Hospital, Ansari Nagar, New Delhi",
    type: "medical",
    accessible: true,
    coordinates: [28.5670, 77.2090],
    capacity: 75,
    maxCapacity: 100
  },
  {
    id: 2,
    name: "Safdarjung Hospital",
    address: "Safdarjung Hospital, Ansari Nagar, New Delhi",
    type: "medical",
    accessible: true,
    coordinates: [28.5678, 77.2089],
    capacity: 60,
    maxCapacity: 100
  },
  {
    id: 3,
    name: "NDRF Relief Camp",
    address: "NDRF HQ, Sector 29, Noida",
    type: "disaster",
    accessible: true,
    coordinates: [28.5729, 77.3245],
    capacity: 45,
    maxCapacity: 100
  },
  {
    id: 4,
    name: "Red Cross Shelter",
    address: "Red Cross Bhawan, Sector 12, Noida",
    type: "general",
    accessible: true,
    coordinates: [28.5842, 77.3278],
    capacity: 80,
    maxCapacity: 100
  },
  {
    id: 5,
    name: "Pet Relief Center",
    address: "Sanjay Gandhi Animal Care Centre, Delhi",
    type: "pet-friendly",
    accessible: true,
    coordinates: [28.5892, 77.2197],
    capacity: 30,
    maxCapacity: 100
  },
  {
    id: 6,
    name: "Community Emergency Center",
    address: "Community Center, Sector 62, Noida",
    type: "general",
    accessible: true,
    coordinates: [28.6273, 77.3620],
    capacity: 90,
    maxCapacity: 100
  },
  {
    id: 7,
    name: "Harunagla Shelter Home",
    address: "Harunagla, Bareilly, Uttar Pradesh",
    type: "general",
    accessible: true,
    coordinates: [28.3674, 79.4164],
    capacity: 50,
    maxCapacity: 100
  },
  {
    id: 8,
    name: "Chhoti Bihar Shelter Home",
    address: "Chhoti Bihar, Bareilly, Uttar Pradesh",
    type: "general",
    accessible: true,
    coordinates: [28.3587, 79.4167],
    capacity: 40,
    maxCapacity: 100
  },
  {
    id: 9,
    name: "Bareilly Women's Shelter Home",
    address: "Bareilly, Uttar Pradesh",
    type: "general",
    accessible: true,
    coordinates: [28.3547, 79.4192],
    capacity: 35,
    maxCapacity: 100
  },
  {
    id: 10,
    name: "Bareilly Old Age Shelter",
    address: "Bareilly, Uttar Pradesh",
    type: "general",
    accessible: true,
    coordinates: [28.3622, 79.4189],
    capacity: 25,
    maxCapacity: 100
  },
  {
    id: 11,
    name: "Sakhi Ghar",
    address: "Sector 4, Bareilly, Uttar Pradesh",
    type: "general",
    accessible: true,
    coordinates: [28.3654, 79.4136],
    capacity: 30,
    maxCapacity: 100
  },
  {
    id: 12,
    name: "National Commission for Women Shelter",
    address: "Plot No.21, FC33, Jasola Institutional Area, New Delhi, Delhi 110025",
    type: "general",
    accessible: true,
    coordinates: [28.5535, 77.2900],
    capacity: 45,
    maxCapacity: 100
  },
  {
    id: 13,
    name: "Young Women Christian Association (YWCA) Shelter",
    address: "1 Ashoka Road, Connaught Place, New Delhi, Delhi 110001",
    type: "general",
    accessible: true,
    coordinates: [28.6304, 77.2167],
    capacity: 40,
    maxCapacity: 100
  },
  {
    id: 14,
    name: "SPYM Shelter Home For Kids",
    address: "SPYM Centre, 111/9, Opposite Sector B-4, Vasant Kunj, New Delhi-110070",
    type: "general",
    accessible: true,
    coordinates: [28.5446, 77.1000],
    capacity: 30,
    maxCapacity: 100
  },
  {
    id: 15,
    name: "L Block Pratap Nagar Shelter-AAA",
    address: "26, Partap Nagar, Gulabi Bagh, New Delhi, Delhi 110007",
    type: "general",
    accessible: true,
    coordinates: [28.6692, 77.1584],
    capacity: 55,
    maxCapacity: 100
  },
  {
    id: 16,
    name: "PRERNA Night Shelter at AIIMS",
    address: "All India Institute of Medical Sciences, Ansari Nagar, New Delhi",
    type: "medical",
    accessible: true,
    coordinates: [28.5850, 77.2225],
    capacity: 70,
    maxCapacity: 100
  },
  {
    id: 17,
    name: "Observation Home for Boys – I",
    address: "Prayas Behind Ambedkar Stadium, Delhi Gate, New Delhi",
    type: "general",
    accessible: true,
    coordinates: [28.6448, 77.2249],
    capacity: 25,
    maxCapacity: 100
  },
  {
    id: 18,
    name: "Adharshila Observation Home for Boys – II",
    address: "Sewa Kutir Complex, Kingsway Camp, Delhi",
    type: "general",
    accessible: true,
    coordinates: [28.6800, 77.1980],
    capacity: 30,
    maxCapacity: 100
  },
  {
    id: 19,
    name: "Arushi Girls' Home",
    address: "Near Tis Hazari Metro Station, New Delhi",
    type: "general",
    accessible: true,
    coordinates: [28.6547, 77.2295],
    capacity: 35,
    maxCapacity: 100
  },
  {
    id: 20,
    name: "Udaan – Rose Home for Girls",
    address: "Near Tis Hazari Metro Station, New Delhi",
    type: "general",
    accessible: true,
    coordinates: [28.6547, 77.2295],
    capacity: 30,
    maxCapacity: 100
  },
  {
    id: 21,
    name: "Apna Ghar",
    address: "Kanpur, Uttar Pradesh",
    type: "general",
    accessible: true,
    coordinates: [26.4499, 80.3319],
    capacity: 50,
    maxCapacity: 100
  },
  {
    id: 22,
    name: "SSS Open Shelter Home",
    address: "682, Damodar Nagar, Kanpur Nagar, Uttar Pradesh",
    type: "general",
    accessible: true,
    coordinates: [26.4499, 80.3319],
    capacity: 45,
    maxCapacity: 100
  },
  {
    id: 23,
    name: "Kanpur Hindu Orphanage",
    address: "80/89, Latoosh Road, Kanpur Nagar, Uttar Pradesh",
    type: "general",
    accessible: true,
    coordinates: [26.4499, 80.3319],
    capacity: 40,
    maxCapacity: 100
  },
  {
    id: 24,
    name: "Kanpur Smart Shelter Home",
    address: "Near Ghantaghar, Kanpur, Uttar Pradesh",
    type: "general",
    accessible: true,
    coordinates: [26.4499, 80.3319],
    capacity: 60,
    maxCapacity: 100
  },
  {
    id: 25,
    name: "Kanpur Hindu Orphanage",
    address: "80/89, Latoosh Road, Kanpur Nagar, Uttar Pradesh",
    type: "general",
    accessible: true,
    coordinates: [26.4499, 80.3319],
    capacity: 35,
    maxCapacity: 100
  },
  {
    id: 26,
    name: "Sumitra Social Welfare Institute",
    address: "Rath, Kanpur Dehat, Uttar Pradesh",
    type: "general",
    accessible: true,
    coordinates: [26.4499, 80.3319],
    capacity: 30,
    maxCapacity: 100
  },
  {
    id: 27,
    name: "Youth Welfare Foundation",
    address: "Kanpur, Uttar Pradesh",
    type: "general",
    accessible: true,
    coordinates: [26.4499, 80.3319],
    capacity: 50,
    maxCapacity: 100
  },
  {
    id: 28,
    name: "Apna Ghar",
    address: "Kanpur, Uttar Pradesh",
    type: "general",
    accessible: true,
    coordinates: [26.4499, 80.3319],
    capacity: 45,
    maxCapacity: 100
  },
  {
    id: 29,
    name: "SPARC",
    address: "808 Boman Lodge, Khodadad Circle, Dadar, Mumbai, Maharashtra 400014",
    type: "general",
    accessible: true,
    coordinates: [19.0176, 72.8562],
    capacity: 55,
    maxCapacity: 100
  },
  {
    id: 30,
    name: "Abhilasha Foundation NGO",
    address: "Laxmi Chhaya Bungalow, Plot No. 27-27, RSC 11, Gorai 2, Borivali West, Mumbai, Maharashtra 400091",
    type: "general",
    accessible: true,
    coordinates: [19.2896, 72.8488],
    capacity: 40,
    maxCapacity: 100
  },
  {
    id: 31,
    name: "Shantighar Shelter Home",
    address: "11th Road, MIDC, Near R.C Maruti High School, Andheri East, Mumbai-400093",
    type: "general",
    accessible: true,
    coordinates: [19.1178, 72.8504],
    capacity: 35,
    maxCapacity: 100
  },
  {
    id: 32,
    name: "Shelter Don Bosco",
    address: "Rd Number 16, Opposite St. Joseph High School, Wadala, Mumbai, Maharashtra 400031",
    type: "general",
    accessible: true,
    coordinates: [18.9988, 72.8347],
    capacity: 30,
    maxCapacity: 100
  },
  {
    id: 33,
    name: "Sharanam",
    address: "Dharavi, Mumbai, Maharashtra",
    type: "general",
    accessible: true,
    coordinates: [19.0176, 72.8562],
    capacity: 25,
    maxCapacity: 100
  }
]

// Component to handle map bounds and view changes
const ChangeView = ({ shelters, selectedShelter, userLocation }: { 
  shelters: Shelter[], 
  selectedShelter: Shelter | null,
  userLocation: [number, number] | null 
}) => {
  const map = useMap()
  
  useEffect(() => {
    if (selectedShelter) {
      map.setView(selectedShelter.coordinates, 15)
    } else if (userLocation) {
      map.setView(userLocation, 12)
    } else if (shelters.length > 0) {
      const bounds = L.latLngBounds(shelters.map(shelter => shelter.coordinates))
      const padding = 0.1
      const ne = bounds.getNorthEast()
      const sw = bounds.getSouthWest()
      
      bounds.extend([ne.lat + padding, ne.lng + padding])
      bounds.extend([sw.lat - padding, sw.lng - padding])
      
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 15
      })
    }
  }, [map, shelters, selectedShelter, userLocation])
  
  return null
}

// Component to handle map updates
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center)
  }, [center, map])
  return null
}

export function ShelterMap() {
  const [shelters, setShelters] = useState<Shelter[]>(MOCK_SHELTERS)
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [isCalling, setIsCalling] = useState(false)
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false)
  const [filters, setFilters] = useState({
    medical: true,
    disaster: true,
    general: true,
    'pet-friendly': true
  })
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const updateUserLocation = () => {
    setIsUpdatingLocation(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [
            position.coords.latitude,
            position.coords.longitude
          ]
          setUserLocation(newLocation)
          setIsUpdatingLocation(false)
          toast.success("Location updated successfully")
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsUpdatingLocation(false)
          toast.error("Error getting location. Please try again.")
        }
      )
    } else {
      setIsUpdatingLocation(false)
      toast.error("Geolocation not supported")
    }
  }

  const handleEmergencyCall = (shelter: Shelter) => {
    setIsCalling(true)
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    if (isMobile) {
      let emergencyNumber = "112"
      switch (shelter.type) {
        case "medical":
          emergencyNumber = "108"
          break
        case "disaster":
          emergencyNumber = "1070"
          break
        default:
          emergencyNumber = "112"
      }
      
      window.location.href = `tel:${emergencyNumber}`
    } else {
      toast.error("Mobile call only")
    }
    
    setTimeout(() => {
      setIsCalling(false)
    }, 2000)
  }

  const handleViewOnMap = (shelter: Shelter) => {
    setSelectedShelter(shelter)
  }

  const handleGetDirections = async (shelter: Shelter) => {
    if (!userLocation) {
      alert("Please update your location first to get directions")
      return
    }

    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${userLocation[1]},${userLocation[0]};${shelter.coordinates[1]},${shelter.coordinates[0]}?overview=full&geometries=geojson`
      )
      const data = await response.json()

      if (data.code === "Ok") {
        const coordinates = data.routes[0].geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]])
        setSelectedShelter(shelter)
      } else {
        alert("Could not calculate route")
      }
    } catch (error) {
      console.error("Error getting directions:", error)
      alert("Error getting directions. Please try again.")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={updateUserLocation}
                disabled={isUpdatingLocation}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isUpdatingLocation ? 'animate-spin' : ''}`} />
                {isUpdatingLocation ? "Updating location" : "Update Location"}
              </Button>
              {userLocation && (
                <div className="text-sm text-muted-foreground">
                  Current location: {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(filters).map(([type, checked]) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={checked}
                    onCheckedChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        [type]: checked as boolean
                      }))
                    }}
                  />
                  <Label htmlFor={type} className="capitalize">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nearby Shelters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {shelters
                .filter(shelter => filters[shelter.type as keyof typeof filters])
                .map(shelter => (
                  <div key={shelter.id} className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">{shelter.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Capacity: {shelter.capacity}/{shelter.maxCapacity}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewOnMap(shelter)}
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGetDirections(shelter)}
                      >
                        <Navigation className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={isCalling}
                          >
                            <Phone className={`h-4 w-4 ${isCalling ? 'animate-pulse' : ''}`} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Call</AlertDialogTitle>
                            <AlertDialogDescription>
                              Call {shelter.name}?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleEmergencyCall(shelter)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Call Emergency
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-3/4 h-[600px] rounded-lg overflow-hidden">
          <MapContainer
            center={[28.481643416595634, 79.44214546179568]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ChangeView shelters={shelters} selectedShelter={selectedShelter} userLocation={userLocation} />
            {userLocation && (
              <Marker
                position={userLocation}
                icon={currentLocationIcon}
              >
                <Popup>
                  <div>
                    <h3 className="font-semibold">Your Location</h3>
                  </div>
                </Popup>
              </Marker>
            )}
            {shelters
              .filter(shelter => filters[shelter.type as keyof typeof filters])
              .map(shelter => (
                <Marker
                  key={shelter.id}
                  position={shelter.coordinates}
                  icon={shelterIcon}
                  eventHandlers={{
                    click: () => setSelectedShelter(shelter)
                  }}
                >
                  <Popup>
                    <div className="space-y-2">
                      <h3 className="font-bold">{shelter.name}</h3>
                      <p className="text-sm">{shelter.address}</p>
                      <div className="text-sm">
                        Capacity: {shelter.capacity}/{shelter.maxCapacity}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGetDirections(shelter)}
                          className="w-full"
                        >
                          <Navigation className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={isCalling}
                              className="w-full"
                            >
                              <Phone className={`h-4 w-4 mr-2 ${isCalling ? 'animate-pulse' : ''}`} />
                              {isCalling ? "Calling..." : "Call Emergency"}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirm Call</AlertDialogTitle>
                              <AlertDialogDescription>
                                Call {shelter.name}?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleEmergencyCall(shelter)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Call Emergency
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
