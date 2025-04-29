import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { useToast } from "./ui/use-toast"
import { Plus, Trash2, Heart, Activity, Stethoscope, FileText } from "lucide-react"

interface Patient {
  id: string
  name: string
  bloodGroup: string
  age: number
  diseases: string[]
  healthMetrics: {
    heartRate: number
    bloodPressure: string
    temperature: number
    oxygenLevel: number
  }
  medications: string[]
  allergies: string[]
  emergencyContact: {
    name: string
    phone: string
    relation: string
  }
}

export function MedicalInfo() {
  const { toast } = useToast()
  const [patients, setPatients] = useState<Patient[]>([])
  const [isAddingPatient, setIsAddingPatient] = useState(false)
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    name: '',
    bloodGroup: '',
    age: 0,
    diseases: [],
    healthMetrics: {
      heartRate: 0,
      bloodPressure: '',
      temperature: 0,
      oxygenLevel: 0
    },
    medications: [],
    allergies: [],
    emergencyContact: {
      name: '',
      phone: '',
      relation: ''
    }
  })

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.bloodGroup || !newPatient.age) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const patient: Patient = {
      ...newPatient as Patient,
      id: Date.now().toString(),
    }

    setPatients(prev => [...prev, patient])
    setIsAddingPatient(false)
    setNewPatient({
      name: '',
      bloodGroup: '',
      age: 0,
      diseases: [],
      healthMetrics: {
        heartRate: 0,
        bloodPressure: '',
        temperature: 0,
        oxygenLevel: 0
      },
      medications: [],
      allergies: [],
      emergencyContact: {
        name: '',
        phone: '',
        relation: ''
      }
    })

    toast({
      title: "Patient Added",
      description: "Patient information has been saved",
    })
  }

  const handleDeletePatient = (id: string) => {
    setPatients(prev => prev.filter(p => p.id !== id))
    toast({
      title: "Patient Removed",
      description: "Patient information has been deleted",
    })
  }

  const handleUpdateHealthMetrics = (patientId: string, metrics: Partial<Patient['healthMetrics']>) => {
    setPatients(prev =>
      prev.map(p =>
        p.id === patientId
          ? {
              ...p,
              healthMetrics: { ...p.healthMetrics, ...metrics }
            }
          : p
      )
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Patient Records</h2>
        <Button onClick={() => setIsAddingPatient(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {isAddingPatient && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Patient</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={newPatient.name}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Patient name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Blood Group</label>
                <Input
                  value={newPatient.bloodGroup}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, bloodGroup: e.target.value }))}
                  placeholder="Blood group"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <Input
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                  placeholder="Age"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Diseases (comma-separated)</label>
                <Input
                  value={newPatient.diseases?.join(', ')}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, diseases: e.target.value.split(',').map(d => d.trim()) }))}
                  placeholder="Diseases"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Emergency Contact</label>
              <div className="grid grid-cols-3 gap-4">
                <Input
                  value={newPatient.emergencyContact?.name}
                  onChange={(e) => setNewPatient(prev => ({
                    ...prev,
                    emergencyContact: { ...prev.emergencyContact!, name: e.target.value }
                  }))}
                  placeholder="Contact name"
                />
                <Input
                  value={newPatient.emergencyContact?.phone}
                  onChange={(e) => setNewPatient(prev => ({
                    ...prev,
                    emergencyContact: { ...prev.emergencyContact!, phone: e.target.value }
                  }))}
                  placeholder="Phone number"
                />
                <Input
                  value={newPatient.emergencyContact?.relation}
                  onChange={(e) => setNewPatient(prev => ({
                    ...prev,
                    emergencyContact: { ...prev.emergencyContact!, relation: e.target.value }
                  }))}
                  placeholder="Relation"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingPatient(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPatient}>
                Add Patient
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {patients.map((patient) => (
          <Card key={patient.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" />
                    {patient.name}
                  </CardTitle>
                  <CardDescription>
                    Blood Group: {patient.bloodGroup} | Age: {patient.age}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeletePatient(patient.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Health Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        <span>Heart Rate: {patient.healthMetrics.heartRate} bpm</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        <span>Blood Pressure: {patient.healthMetrics.bloodPressure}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        <span>Temperature: {patient.healthMetrics.temperature}°C</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        <span>Oxygen Level: {patient.healthMetrics.oxygenLevel}%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Medical Information</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Diseases:</span>
                        <p className="text-sm text-muted-foreground">
                          {patient.diseases.join(', ')}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Medications:</span>
                        <p className="text-sm text-muted-foreground">
                          {patient.medications.join(', ')}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Allergies:</span>
                        <p className="text-sm text-muted-foreground">
                          {patient.allergies.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Emergency Contact</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Name</span>
                      <p>{patient.emergencyContact.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Phone</span>
                      <p>{patient.emergencyContact.phone}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Relation</span>
                      <p>{patient.emergencyContact.relation}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newHeartRate = Math.floor(Math.random() * (100 - 60) + 60)
                      handleUpdateHealthMetrics(patient.id, { heartRate: newHeartRate })
                    }}
                  >
                    Update Heart Rate
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newOxygenLevel = Math.floor(Math.random() * (100 - 95) + 95)
                      handleUpdateHealthMetrics(patient.id, { oxygenLevel: newOxygenLevel })
                    }}
                  >
                    Update Oxygen Level
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 