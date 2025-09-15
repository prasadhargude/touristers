"use client"

import { useState } from "react"
import {
  Users,
  Plus,
  Search,
  Eye,
  Edit,
  MapPin,
  Phone,
  Calendar,
  Shield,
  Menu,
  X,
  Bell,
  LogOut,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TouristsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showNewTouristDialog, setShowNewTouristDialog] = useState(false)

  // Dummy tourists data
  const [tourists, setTourists] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1-555-0123",
      nationality: "USA",
      passportNumber: "US123456789",
      checkInDate: "2024-01-10",
      checkOutDate: "2024-01-20",
      hotel: "Grand Resort Hotel",
      roomNumber: "205",
      emergencyContact: "Jane Smith (+1-555-0456)",
      status: "safe",
      lastLocation: "Beach Area A",
      lastSeen: "2024-01-15T10:30:00Z",
      coordinates: "40.7128, -74.0060",
      groupSize: 2,
      specialNeeds: "None",
      insuranceProvider: "Travel Safe Insurance",
      notes: "Honeymoon trip, celebrating anniversary",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      phone: "+34-666-123456",
      nationality: "Spain",
      passportNumber: "ES987654321",
      checkInDate: "2024-01-12",
      checkOutDate: "2024-01-25",
      hotel: "City Center Inn",
      roomNumber: "412",
      emergencyContact: "Carlos Garcia (+34-666-789012)",
      status: "safe",
      lastLocation: "Central Market",
      lastSeen: "2024-01-15T09:15:00Z",
      coordinates: "40.7282, -73.9942",
      groupSize: 4,
      specialNeeds: "Vegetarian meals",
      insuranceProvider: "Europa Travel",
      notes: "Family vacation with children",
    },
    {
      id: 3,
      name: "David Chen",
      email: "david.chen@email.com",
      phone: "+86-138-0013-8000",
      nationality: "China",
      passportNumber: "CN456789123",
      checkInDate: "2024-01-08",
      checkOutDate: "2024-01-18",
      hotel: "Business Plaza Hotel",
      roomNumber: "1205",
      emergencyContact: "Li Chen (+86-138-0013-8001)",
      status: "missing",
      lastLocation: "Museum District",
      lastSeen: "2024-01-15T06:00:00Z",
      coordinates: "40.7831, -73.9712",
      groupSize: 1,
      specialNeeds: "Mobility assistance",
      insuranceProvider: "Asia Pacific Insurance",
      notes: "Business trip, reported missing this morning",
    },
    {
      id: 4,
      name: "Emma Johnson",
      email: "emma.johnson@email.com",
      phone: "+44-7700-900123",
      nationality: "UK",
      passportNumber: "GB789123456",
      checkInDate: "2024-01-14",
      checkOutDate: "2024-01-21",
      hotel: "Seaside Resort",
      roomNumber: "308",
      emergencyContact: "Robert Johnson (+44-7700-900456)",
      status: "safe",
      lastLocation: "Hotel Lobby",
      lastSeen: "2024-01-15T11:00:00Z",
      coordinates: "40.7505, -73.9934",
      groupSize: 3,
      specialNeeds: "Child safety seat",
      insuranceProvider: "UK Travel Guard",
      notes: "Family with young children",
    },
  ])

  const [newTourist, setNewTourist] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    passportNumber: "",
    checkInDate: "",
    checkOutDate: "",
    hotel: "",
    roomNumber: "",
    emergencyContact: "",
    groupSize: 1,
    specialNeeds: "",
    insuranceProvider: "",
  })

  const filteredTourists = tourists.filter((tourist) => {
    const matchesSearch =
      tourist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tourist.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tourist.hotel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tourist.nationality.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || tourist.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateTourist = () => {
    const tourist = {
      id: tourists.length + 1,
      ...newTourist,
      status: "safe",
      lastLocation: "Check-in",
      lastSeen: new Date().toISOString(),
      coordinates: "40.7128, -74.0060",
      notes: "Recently checked in",
    }
    setTourists([tourist, ...tourists])
    setNewTourist({
      name: "",
      email: "",
      phone: "",
      nationality: "",
      passportNumber: "",
      checkInDate: "",
      checkOutDate: "",
      hotel: "",
      roomNumber: "",
      emergencyContact: "",
      groupSize: 1,
      specialNeeds: "",
      insuranceProvider: "",
    })
    setShowNewTouristDialog(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "safe":
        return "bg-green-100 text-green-700"
      case "missing":
        return "bg-red-100 text-red-700"
      case "emergency":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "safe":
        return <CheckCircle className="w-4 h-4" />
      case "missing":
        return <AlertTriangle className="w-4 h-4" />
      case "emergency":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-lg font-bold text-slate-900">Tourists</h1>
              <p className="text-xs text-slate-500">Management System</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-slate-200">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search tourists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-700">Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="safe">Safe</SelectItem>
                <SelectItem value="missing">Missing</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Statistics */}
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">Statistics</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-green-700">
                {tourists.filter((t) => t.status === "safe").length}
              </div>
              <div className="text-xs text-green-600">Safe</div>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-red-700">
                {tourists.filter((t) => t.status === "missing").length}
              </div>
              <div className="text-xs text-red-600">Missing</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-orange-700">
                {tourists.filter((t) => t.status === "emergency").length}
              </div>
              <div className="text-xs text-orange-600">Emergency</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-blue-700">{tourists.length}</div>
              <div className="text-xs text-blue-600">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Tourist Management</h2>
                <p className="text-sm text-slate-500">Track and manage tourist information</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog open={showNewTouristDialog} onOpenChange={setShowNewTouristDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Tourist
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Tourist</DialogTitle>
                    <DialogDescription>Register a new tourist in the system</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        placeholder="Tourist name"
                        value={newTourist.name}
                        onChange={(e) => setNewTourist({ ...newTourist, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        value={newTourist.email}
                        onChange={(e) => setNewTourist({ ...newTourist, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        placeholder="+1-555-0123"
                        value={newTourist.phone}
                        onChange={(e) => setNewTourist({ ...newTourist, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Input
                        placeholder="Country"
                        value={newTourist.nationality}
                        onChange={(e) => setNewTourist({ ...newTourist, nationality: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passportNumber">Passport Number</Label>
                      <Input
                        placeholder="Passport ID"
                        value={newTourist.passportNumber}
                        onChange={(e) => setNewTourist({ ...newTourist, passportNumber: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="groupSize">Group Size</Label>
                      <Input
                        type="number"
                        min="1"
                        value={newTourist.groupSize}
                        onChange={(e) => setNewTourist({ ...newTourist, groupSize: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="checkInDate">Check-in Date</Label>
                      <Input
                        type="date"
                        value={newTourist.checkInDate}
                        onChange={(e) => setNewTourist({ ...newTourist, checkInDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="checkOutDate">Check-out Date</Label>
                      <Input
                        type="date"
                        value={newTourist.checkOutDate}
                        onChange={(e) => setNewTourist({ ...newTourist, checkOutDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hotel">Hotel</Label>
                      <Input
                        placeholder="Hotel name"
                        value={newTourist.hotel}
                        onChange={(e) => setNewTourist({ ...newTourist, hotel: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="roomNumber">Room Number</Label>
                      <Input
                        placeholder="Room #"
                        value={newTourist.roomNumber}
                        onChange={(e) => setNewTourist({ ...newTourist, roomNumber: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        placeholder="Name and phone number"
                        value={newTourist.emergencyContact}
                        onChange={(e) => setNewTourist({ ...newTourist, emergencyContact: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialNeeds">Special Needs</Label>
                      <Input
                        placeholder="Any special requirements"
                        value={newTourist.specialNeeds}
                        onChange={(e) => setNewTourist({ ...newTourist, specialNeeds: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                      <Input
                        placeholder="Insurance company"
                        value={newTourist.insuranceProvider}
                        onChange={(e) => setNewTourist({ ...newTourist, insuranceProvider: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-6">
                    <Button variant="outline" onClick={() => setShowNewTouristDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateTourist} className="bg-blue-600 hover:bg-blue-700">
                      Add Tourist
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Tourists list */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {filteredTourists.map((tourist) => (
              <Card key={tourist.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{tourist.name}</h3>
                        <Badge variant="outline" className={getStatusColor(tourist.status)}>
                          {getStatusIcon(tourist.status)}
                          <span className="ml-1">{tourist.status.toUpperCase()}</span>
                        </Badge>
                        <Badge variant="outline">{tourist.nationality}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">{tourist.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">
                            {tourist.hotel} - Room {tourist.roomNumber}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">
                            {tourist.checkInDate} to {tourist.checkOutDate}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-slate-700">Last Location: </span>
                          <span className="text-slate-600">{tourist.lastLocation}</span>
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Group Size: </span>
                          <span className="text-slate-600">{tourist.groupSize} people</span>
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Last Seen: </span>
                          <span className="text-slate-600">{new Date(tourist.lastSeen).toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Emergency Contact: </span>
                          <span className="text-slate-600">{tourist.emergencyContact}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Tourist Details</DialogTitle>
                            <DialogDescription>Complete information for {tourist.name}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Name</Label>
                                <p className="text-slate-600">{tourist.name}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Status</Label>
                                <Badge className={getStatusColor(tourist.status)}>{tourist.status.toUpperCase()}</Badge>
                              </div>
                              <div>
                                <Label className="font-medium">Email</Label>
                                <p className="text-slate-600">{tourist.email}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Phone</Label>
                                <p className="text-slate-600">{tourist.phone}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Nationality</Label>
                                <p className="text-slate-600">{tourist.nationality}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Passport</Label>
                                <p className="text-slate-600">{tourist.passportNumber}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Check-in</Label>
                                <p className="text-slate-600">{tourist.checkInDate}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Check-out</Label>
                                <p className="text-slate-600">{tourist.checkOutDate}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Hotel</Label>
                                <p className="text-slate-600">{tourist.hotel}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Room</Label>
                                <p className="text-slate-600">{tourist.roomNumber}</p>
                              </div>
                            </div>
                            <div>
                              <Label className="font-medium">Emergency Contact</Label>
                              <p className="text-slate-600">{tourist.emergencyContact}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Group Size</Label>
                                <p className="text-slate-600">{tourist.groupSize} people</p>
                              </div>
                              <div>
                                <Label className="font-medium">Insurance</Label>
                                <p className="text-slate-600">{tourist.insuranceProvider}</p>
                              </div>
                            </div>
                            <div>
                              <Label className="font-medium">Special Needs</Label>
                              <p className="text-slate-600">{tourist.specialNeeds || "None"}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Last Location</Label>
                                <p className="text-slate-600">{tourist.lastLocation}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Last Seen</Label>
                                <p className="text-slate-600">{new Date(tourist.lastSeen).toLocaleString()}</p>
                              </div>
                            </div>
                            <div>
                              <Label className="font-medium">Coordinates</Label>
                              <p className="text-slate-600">{tourist.coordinates}</p>
                            </div>
                            {tourist.notes && (
                              <div>
                                <Label className="font-medium">Notes</Label>
                                <p className="text-slate-600">{tourist.notes}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {tourist.notes && (
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <Label className="font-medium text-sm">Notes:</Label>
                      <p className="text-sm text-slate-600 mt-1">{tourist.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTourists.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No tourists found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
