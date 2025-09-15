"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Plus,
  Search,
  Eye,
  Edit,
  Clock,
  MapPin,
  User,
  Shield,
  Menu,
  X,
  Bell,
  LogOut,
  CheckCircle,
  XCircle,
  AlertCircle,
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function IncidentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [showNewIncidentDialog, setShowNewIncidentDialog] = useState(false)

  // Dummy incidents data
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      type: "Medical Emergency",
      description: "Tourist collapsed at beach area, ambulance dispatched",
      location: "Beach Area A - Sector 3",
      coordinates: "40.7128, -74.0060",
      severity: "high",
      status: "active",
      reportedBy: "Lifeguard Station 3",
      reporterContact: "+1-555-0123",
      touristName: "John Smith",
      touristContact: "+1-555-0456",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:35:00Z",
      assignedTo: "Emergency Team Alpha",
      notes: "Patient conscious, possible heat exhaustion. Ambulance ETA 5 minutes.",
    },
    {
      id: 2,
      type: "Theft Report",
      description: "Tourist reports stolen wallet and passport at market area",
      location: "Central Market - Stall 45",
      coordinates: "40.7282, -73.9942",
      severity: "medium",
      status: "investigating",
      reportedBy: "Tourist",
      reporterContact: "+1-555-0789",
      touristName: "Maria Garcia",
      touristContact: "+1-555-0789",
      createdAt: "2024-01-15T09:15:00Z",
      updatedAt: "2024-01-15T09:45:00Z",
      assignedTo: "Security Team Beta",
      notes: "CCTV footage being reviewed. Tourist provided detailed description of suspect.",
    },
    {
      id: 3,
      type: "Lost Tourist",
      description: "Child separated from family group during tour",
      location: "Museum District - Main Plaza",
      coordinates: "40.7831, -73.9712",
      severity: "high",
      status: "resolved",
      reportedBy: "Tour Guide",
      reporterContact: "+1-555-0321",
      touristName: "Emma Johnson (Age 8)",
      touristContact: "+1-555-0654",
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-01-15T08:30:00Z",
      assignedTo: "Search Team Gamma",
      notes: "Child found safe at information center. Reunited with family.",
    },
    {
      id: 4,
      type: "Traffic Accident",
      description: "Minor vehicle collision involving tourist rental car",
      location: "Highway 101 - Mile Marker 23",
      coordinates: "40.7505, -73.9934",
      severity: "low",
      status: "resolved",
      reportedBy: "Traffic Police",
      reporterContact: "+1-555-0987",
      touristName: "David Chen",
      touristContact: "+1-555-0147",
      createdAt: "2024-01-14T16:20:00Z",
      updatedAt: "2024-01-14T17:00:00Z",
      assignedTo: "Traffic Unit Delta",
      notes: "No injuries reported. Insurance information exchanged. Report filed.",
    },
  ])

  const [newIncident, setNewIncident] = useState({
    type: "",
    description: "",
    location: "",
    severity: "medium",
    touristName: "",
    touristContact: "",
    reportedBy: "",
    reporterContact: "",
  })

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.touristName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter
    const matchesSeverity = severityFilter === "all" || incident.severity === severityFilter
    return matchesSearch && matchesStatus && matchesSeverity
  })

  const handleCreateIncident = () => {
    const incident = {
      id: incidents.length + 1,
      ...newIncident,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedTo: "Unassigned",
      notes: "New incident created - awaiting assignment",
    }
    setIncidents([incident, ...incidents])
    setNewIncident({
      type: "",
      description: "",
      location: "",
      severity: "medium",
      touristName: "",
      touristContact: "",
      reportedBy: "",
      reporterContact: "",
    })
    setShowNewIncidentDialog(false)
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "low":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-700"
      case "investigating":
        return "bg-orange-100 text-orange-700"
      case "resolved":
        return "bg-green-100 text-green-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <XCircle className="w-4 h-4" />
      case "investigating":
        return <AlertCircle className="w-4 h-4" />
      case "resolved":
        return <CheckCircle className="w-4 h-4" />
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
              <h1 className="text-lg font-bold text-slate-900">Incidents</h1>
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
              placeholder="Search incidents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-slate-700">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-slate-700">Severity</Label>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">Statistics</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-red-700">
                {incidents.filter((i) => i.status === "active").length}
              </div>
              <div className="text-xs text-red-600">Active</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-orange-700">
                {incidents.filter((i) => i.status === "investigating").length}
              </div>
              <div className="text-xs text-orange-600">Investigating</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-green-700">
                {incidents.filter((i) => i.status === "resolved").length}
              </div>
              <div className="text-xs text-green-600">Resolved</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-blue-700">{incidents.length}</div>
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
                <h2 className="text-lg font-semibold text-slate-900">Incident Management</h2>
                <p className="text-sm text-slate-500">Track and manage tourist safety incidents</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog open={showNewIncidentDialog} onOpenChange={setShowNewIncidentDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    New Incident
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Incident</DialogTitle>
                    <DialogDescription>Report a new tourist safety incident</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Incident Type</Label>
                      <Select
                        value={newIncident.type}
                        onValueChange={(value) => setNewIncident({ ...newIncident, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Medical Emergency">Medical Emergency</SelectItem>
                          <SelectItem value="Theft Report">Theft Report</SelectItem>
                          <SelectItem value="Lost Tourist">Lost Tourist</SelectItem>
                          <SelectItem value="Traffic Accident">Traffic Accident</SelectItem>
                          <SelectItem value="Natural Disaster">Natural Disaster</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="severity">Severity</Label>
                      <Select
                        value={newIncident.severity}
                        onValueChange={(value) => setNewIncident({ ...newIncident, severity: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        placeholder="Describe the incident..."
                        value={newIncident.description}
                        onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        placeholder="Incident location"
                        value={newIncident.location}
                        onChange={(e) => setNewIncident({ ...newIncident, location: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="touristName">Tourist Name</Label>
                      <Input
                        placeholder="Tourist involved"
                        value={newIncident.touristName}
                        onChange={(e) => setNewIncident({ ...newIncident, touristName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="touristContact">Tourist Contact</Label>
                      <Input
                        placeholder="Phone number"
                        value={newIncident.touristContact}
                        onChange={(e) => setNewIncident({ ...newIncident, touristContact: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reportedBy">Reported By</Label>
                      <Input
                        placeholder="Reporter name"
                        value={newIncident.reportedBy}
                        onChange={(e) => setNewIncident({ ...newIncident, reportedBy: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reporterContact">Reporter Contact</Label>
                      <Input
                        placeholder="Reporter phone"
                        value={newIncident.reporterContact}
                        onChange={(e) => setNewIncident({ ...newIncident, reporterContact: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-6">
                    <Button variant="outline" onClick={() => setShowNewIncidentDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateIncident} className="bg-blue-600 hover:bg-blue-700">
                      Create Incident
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

        {/* Incidents list */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {filteredIncidents.map((incident) => (
              <Card key={incident.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{incident.type}</h3>
                        <Badge className={getSeverityColor(incident.severity)}>{incident.severity.toUpperCase()}</Badge>
                        <Badge variant="outline" className={getStatusColor(incident.status)}>
                          {getStatusIcon(incident.status)}
                          <span className="ml-1">{incident.status.toUpperCase()}</span>
                        </Badge>
                      </div>
                      <p className="text-slate-600 mb-3">{incident.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">{incident.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">{incident.touristName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">{new Date(incident.createdAt).toLocaleString()}</span>
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
                            <DialogTitle>Incident Details</DialogTitle>
                            <DialogDescription>Complete information for incident #{incident.id}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Type</Label>
                                <p className="text-slate-600">{incident.type}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Status</Label>
                                <Badge className={getStatusColor(incident.status)}>
                                  {incident.status.toUpperCase()}
                                </Badge>
                              </div>
                              <div>
                                <Label className="font-medium">Severity</Label>
                                <Badge className={getSeverityColor(incident.severity)}>
                                  {incident.severity.toUpperCase()}
                                </Badge>
                              </div>
                              <div>
                                <Label className="font-medium">Assigned To</Label>
                                <p className="text-slate-600">{incident.assignedTo}</p>
                              </div>
                            </div>
                            <div>
                              <Label className="font-medium">Description</Label>
                              <p className="text-slate-600">{incident.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Location</Label>
                                <p className="text-slate-600">{incident.location}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Coordinates</Label>
                                <p className="text-slate-600">{incident.coordinates}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Tourist</Label>
                                <p className="text-slate-600">{incident.touristName}</p>
                                <p className="text-sm text-slate-500">{incident.touristContact}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Reported By</Label>
                                <p className="text-slate-600">{incident.reportedBy}</p>
                                <p className="text-sm text-slate-500">{incident.reporterContact}</p>
                              </div>
                            </div>
                            <div>
                              <Label className="font-medium">Notes</Label>
                              <p className="text-slate-600">{incident.notes}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <Label className="font-medium">Created</Label>
                                <p className="text-slate-600">{new Date(incident.createdAt).toLocaleString()}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Last Updated</Label>
                                <p className="text-slate-600">{new Date(incident.updatedAt).toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {incident.notes && (
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <Label className="font-medium text-sm">Latest Notes:</Label>
                      <p className="text-sm text-slate-600 mt-1">{incident.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredIncidents.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No incidents found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
