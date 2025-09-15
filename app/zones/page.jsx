"use client"

import { useState } from "react"
import { MapPin, Plus, Search, Eye, Edit, Shield, Menu, X, Bell, LogOut, Clock, Users } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ZonesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showNewZoneDialog, setShowNewZoneDialog] = useState(false)

  // Dummy zones data
  const [zones, setZones] = useState([
    {
      id: 1,
      name: "Tourist Zone A",
      type: "safe",
      description: "Main tourist area with high security presence",
      coordinates: "40.7500, -74.0000 to 40.7600, -73.9900",
      area: "2.5 km²",
      capacity: 500,
      currentOccupancy: 342,
      status: "active",
      riskLevel: "low",
      facilities: ["Information Center", "Medical Station", "Security Post"],
      restrictions: "None",
      emergencyProcedures: "Standard evacuation to Assembly Point A",
      contactPerson: "Zone Manager Alpha",
      contactPhone: "+1-555-0100",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      notes: "Popular beach area with lifeguard stations",
    },
    {
      id: 2,
      name: "Emergency Zone",
      type: "restricted",
      description: "Restricted area due to ongoing construction work",
      coordinates: "40.7600, -73.9800 to 40.7700, -73.9700",
      area: "1.2 km²",
      capacity: 0,
      currentOccupancy: 0,
      status: "restricted",
      riskLevel: "high",
      facilities: ["Emergency Services", "Construction Site"],
      restrictions: "No public access - authorized personnel only",
      emergencyProcedures: "Immediate evacuation to Zone A",
      contactPerson: "Safety Coordinator Beta",
      contactPhone: "+1-555-0200",
      createdAt: "2024-01-10T00:00:00Z",
      updatedAt: "2024-01-15T08:00:00Z",
      notes: "Construction expected to complete by end of month",
    },
    {
      id: 3,
      name: "High Traffic Area",
      type: "monitored",
      description: "Central market and shopping district with heavy foot traffic",
      coordinates: "40.7400, -73.9950 to 40.7500, -73.9850",
      area: "3.1 km²",
      capacity: 800,
      currentOccupancy: 654,
      status: "active",
      riskLevel: "medium",
      facilities: ["Police Station", "Medical Center", "Tourist Information"],
      restrictions: "Group size limited to 20 people",
      emergencyProcedures: "Disperse to multiple exit points",
      contactPerson: "District Manager Gamma",
      contactPhone: "+1-555-0300",
      createdAt: "2024-01-05T00:00:00Z",
      updatedAt: "2024-01-15T12:00:00Z",
      notes: "Peak hours: 10 AM - 6 PM daily",
    },
    {
      id: 4,
      name: "Nature Reserve",
      type: "protected",
      description: "Protected natural area with guided tours only",
      coordinates: "40.7200, -74.0200 to 40.7350, -74.0050",
      area: "5.8 km²",
      capacity: 150,
      currentOccupancy: 89,
      status: "active",
      riskLevel: "low",
      facilities: ["Visitor Center", "Ranger Station", "First Aid Post"],
      restrictions: "Guided tours only, no solo exploration",
      emergencyProcedures: "Contact ranger station immediately",
      contactPerson: "Chief Ranger Delta",
      contactPhone: "+1-555-0400",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T07:00:00Z",
      notes: "Wildlife protection area - maintain safe distance from animals",
    },
  ])

  const [newZone, setNewZone] = useState({
    name: "",
    type: "safe",
    description: "",
    coordinates: "",
    area: "",
    capacity: 0,
    facilities: "",
    restrictions: "",
    emergencyProcedures: "",
    contactPerson: "",
    contactPhone: "",
  })

  const filteredZones = zones.filter((zone) => {
    const matchesSearch =
      zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || zone.type === typeFilter
    return matchesSearch && matchesType
  })

  const handleCreateZone = () => {
    const zone = {
      id: zones.length + 1,
      ...newZone,
      currentOccupancy: 0,
      status: "active",
      riskLevel: "low",
      facilities: newZone.facilities.split(",").map((f) => f.trim()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: "Newly created zone",
    }
    setZones([zone, ...zones])
    setNewZone({
      name: "",
      type: "safe",
      description: "",
      coordinates: "",
      area: "",
      capacity: 0,
      facilities: "",
      restrictions: "",
      emergencyProcedures: "",
      contactPerson: "",
      contactPhone: "",
    })
    setShowNewZoneDialog(false)
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "safe":
        return "bg-green-100 text-green-700"
      case "restricted":
        return "bg-red-100 text-red-700"
      case "monitored":
        return "bg-orange-100 text-orange-700"
      case "protected":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-700"
      case "medium":
        return "bg-orange-100 text-orange-700"
      case "high":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getOccupancyPercentage = (current, capacity) => {
    if (capacity === 0) return 0
    return Math.round((current / capacity) * 100)
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
              <h1 className="text-lg font-bold text-slate-900">Zones</h1>
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
              placeholder="Search zones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-700">Zone Type</Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="safe">Safe</SelectItem>
                <SelectItem value="restricted">Restricted</SelectItem>
                <SelectItem value="monitored">Monitored</SelectItem>
                <SelectItem value="protected">Protected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Statistics */}
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">Statistics</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-green-700">{zones.filter((z) => z.type === "safe").length}</div>
              <div className="text-xs text-green-600">Safe Zones</div>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-red-700">
                {zones.filter((z) => z.type === "restricted").length}
              </div>
              <div className="text-xs text-red-600">Restricted</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-orange-700">
                {zones.filter((z) => z.type === "monitored").length}
              </div>
              <div className="text-xs text-orange-600">Monitored</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-blue-700">{zones.length}</div>
              <div className="text-xs text-blue-600">Total Zones</div>
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
                <h2 className="text-lg font-semibold text-slate-900">Zone Management</h2>
                <p className="text-sm text-slate-500">Manage tourist zones and geo-fencing</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog open={showNewZoneDialog} onOpenChange={setShowNewZoneDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    New Zone
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Zone</DialogTitle>
                    <DialogDescription>Define a new tourist zone with geo-fencing</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Zone Name</Label>
                      <Input
                        placeholder="Zone name"
                        value={newZone.name}
                        onChange={(e) => setNewZone({ ...newZone, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Zone Type</Label>
                      <Select value={newZone.type} onValueChange={(value) => setNewZone({ ...newZone, type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="safe">Safe</SelectItem>
                          <SelectItem value="restricted">Restricted</SelectItem>
                          <SelectItem value="monitored">Monitored</SelectItem>
                          <SelectItem value="protected">Protected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        placeholder="Zone description..."
                        value={newZone.description}
                        onChange={(e) => setNewZone({ ...newZone, description: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="coordinates">Coordinates</Label>
                      <Input
                        placeholder="lat1, lng1 to lat2, lng2"
                        value={newZone.coordinates}
                        onChange={(e) => setNewZone({ ...newZone, coordinates: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Area</Label>
                      <Input
                        placeholder="e.g., 2.5 km²"
                        value={newZone.area}
                        onChange={(e) => setNewZone({ ...newZone, area: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        type="number"
                        placeholder="Maximum occupancy"
                        value={newZone.capacity}
                        onChange={(e) => setNewZone({ ...newZone, capacity: Number.parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="facilities">Facilities</Label>
                      <Input
                        placeholder="Comma-separated list of facilities"
                        value={newZone.facilities}
                        onChange={(e) => setNewZone({ ...newZone, facilities: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="restrictions">Restrictions</Label>
                      <Textarea
                        placeholder="Access restrictions and rules..."
                        value={newZone.restrictions}
                        onChange={(e) => setNewZone({ ...newZone, restrictions: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="emergencyProcedures">Emergency Procedures</Label>
                      <Textarea
                        placeholder="Emergency evacuation procedures..."
                        value={newZone.emergencyProcedures}
                        onChange={(e) => setNewZone({ ...newZone, emergencyProcedures: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person</Label>
                      <Input
                        placeholder="Zone manager name"
                        value={newZone.contactPerson}
                        onChange={(e) => setNewZone({ ...newZone, contactPerson: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input
                        placeholder="+1-555-0123"
                        value={newZone.contactPhone}
                        onChange={(e) => setNewZone({ ...newZone, contactPhone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-6">
                    <Button variant="outline" onClick={() => setShowNewZoneDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateZone} className="bg-blue-600 hover:bg-blue-700">
                      Create Zone
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

        {/* Zones list */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {filteredZones.map((zone) => (
              <Card key={zone.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{zone.name}</h3>
                        <Badge className={getTypeColor(zone.type)}>{zone.type.toUpperCase()}</Badge>
                        <Badge variant="outline" className={getRiskColor(zone.riskLevel)}>
                          {zone.riskLevel.toUpperCase()} RISK
                        </Badge>
                      </div>
                      <p className="text-slate-600 mb-3">{zone.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">{zone.area}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">
                            {zone.currentOccupancy}/{zone.capacity} (
                            {getOccupancyPercentage(zone.currentOccupancy, zone.capacity)}%)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">{new Date(zone.updatedAt).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-slate-700">Contact: </span>
                          <span className="text-slate-600">{zone.contactPerson}</span>
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">Phone: </span>
                          <span className="text-slate-600">{zone.contactPhone}</span>
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
                            <DialogTitle>Zone Details</DialogTitle>
                            <DialogDescription>Complete information for {zone.name}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Name</Label>
                                <p className="text-slate-600">{zone.name}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Type</Label>
                                <Badge className={getTypeColor(zone.type)}>{zone.type.toUpperCase()}</Badge>
                              </div>
                              <div>
                                <Label className="font-medium">Status</Label>
                                <p className="text-slate-600">{zone.status}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Risk Level</Label>
                                <Badge className={getRiskColor(zone.riskLevel)}>{zone.riskLevel.toUpperCase()}</Badge>
                              </div>
                            </div>
                            <div>
                              <Label className="font-medium">Description</Label>
                              <p className="text-slate-600">{zone.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Area</Label>
                                <p className="text-slate-600">{zone.area}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Capacity</Label>
                                <p className="text-slate-600">
                                  {zone.currentOccupancy}/{zone.capacity} (
                                  {getOccupancyPercentage(zone.currentOccupancy, zone.capacity)}%)
                                </p>
                              </div>
                            </div>
                            <div>
                              <Label className="font-medium">Coordinates</Label>
                              <p className="text-slate-600">{zone.coordinates}</p>
                            </div>
                            <div>
                              <Label className="font-medium">Facilities</Label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {zone.facilities.map((facility, index) => (
                                  <Badge key={index} variant="outline">
                                    {facility}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <Label className="font-medium">Restrictions</Label>
                              <p className="text-slate-600">{zone.restrictions}</p>
                            </div>
                            <div>
                              <Label className="font-medium">Emergency Procedures</Label>
                              <p className="text-slate-600">{zone.emergencyProcedures}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Contact Person</Label>
                                <p className="text-slate-600">{zone.contactPerson}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Contact Phone</Label>
                                <p className="text-slate-600">{zone.contactPhone}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <Label className="font-medium">Created</Label>
                                <p className="text-slate-600">{new Date(zone.createdAt).toLocaleString()}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Last Updated</Label>
                                <p className="text-slate-600">{new Date(zone.updatedAt).toLocaleString()}</p>
                              </div>
                            </div>
                            {zone.notes && (
                              <div>
                                <Label className="font-medium">Notes</Label>
                                <p className="text-slate-600">{zone.notes}</p>
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

                  {/* Occupancy bar */}
                  {zone.capacity > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Occupancy</span>
                        <span className="text-slate-600">
                          {zone.currentOccupancy}/{zone.capacity}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            getOccupancyPercentage(zone.currentOccupancy, zone.capacity) > 80
                              ? "bg-red-500"
                              : getOccupancyPercentage(zone.currentOccupancy, zone.capacity) > 60
                                ? "bg-orange-500"
                                : "bg-green-500"
                          }`}
                          style={{
                            width: `${getOccupancyPercentage(zone.currentOccupancy, zone.capacity)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {zone.notes && (
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <Label className="font-medium text-sm">Notes:</Label>
                      <p className="text-sm text-slate-600 mt-1">{zone.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredZones.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No zones found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
