"use client"

import { useState } from "react"
import {
  Map,
  Users,
  AlertTriangle,
  Shield,
  Menu,
  X,
  Bell,
  LogOut,
  Search,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function LiveMapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Dummy data for map markers
  const tourists = [
    { id: 1, name: "John Smith", lat: 40.7128, lng: -74.006, status: "safe", lastSeen: "2 min ago" },
    { id: 2, name: "Maria Garcia", lat: 40.7589, lng: -73.9851, status: "safe", lastSeen: "5 min ago" },
    { id: 3, name: "David Chen", lat: 40.7505, lng: -73.9934, status: "missing", lastSeen: "2 hours ago" },
  ]

  const incidents = [
    { id: 1, type: "Medical Emergency", lat: 40.7614, lng: -73.9776, severity: "high", time: "10 min ago" },
    { id: 2, type: "Theft Report", lat: 40.7282, lng: -73.9942, severity: "medium", time: "1 hour ago" },
    { id: 3, type: "Lost Tourist", lat: 40.7831, lng: -73.9712, severity: "low", time: "3 hours ago" },
  ]

  const zones = [
    {
      id: 1,
      name: "Tourist Zone A",
      type: "safe",
      bounds: [
        [40.75, -74.0],
        [40.76, -73.99],
      ],
    },
    {
      id: 2,
      name: "Emergency Zone",
      type: "restricted",
      bounds: [
        [40.76, -73.98],
        [40.77, -73.97],
      ],
    },
    {
      id: 3,
      name: "High Traffic Area",
      type: "monitored",
      bounds: [
        [40.74, -73.995],
        [40.75, -73.985],
      ],
    },
  ]

  const menuItems = [
    { id: "dashboard", icon: Shield, label: "Dashboard", href: "/dashboard" },
    { id: "map", icon: Map, label: "Live Map", href: "/map", active: true },
    { id: "incidents", icon: AlertTriangle, label: "Incidents", href: "/incidents" },
    { id: "tourists", icon: Users, label: "Tourists", href: "/tourists" },
  ]

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
              <h1 className="text-lg font-bold text-slate-900">Live Map</h1>
              <p className="text-xs text-slate-500">Real-time Monitoring</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b border-slate-200">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search tourists, incidents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["all", "tourists", "incidents", "zones"].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className={selectedFilter === filter ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Map Legend */}
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">Map Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Safe Tourists</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Missing/Emergency</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Active Incidents</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Safe Zones</span>
            </div>
          </div>
        </div>

        {/* Active Items List */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="font-semibold text-slate-900 mb-3">Active Items</h3>

          {/* Tourists */}
          {(selectedFilter === "all" || selectedFilter === "tourists") && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-slate-700 mb-2">Tourists ({tourists.length})</h4>
              <div className="space-y-2">
                {tourists.map((tourist) => (
                  <div key={tourist.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-slate-900">{tourist.name}</span>
                      <Badge variant={tourist.status === "safe" ? "default" : "destructive"}>{tourist.status}</Badge>
                    </div>
                    <p className="text-xs text-slate-500">Last seen: {tourist.lastSeen}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Incidents */}
          {(selectedFilter === "all" || selectedFilter === "incidents") && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-slate-700 mb-2">Incidents ({incidents.length})</h4>
              <div className="space-y-2">
                {incidents.map((incident) => (
                  <div key={incident.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-slate-900">{incident.type}</span>
                      <Badge
                        variant={
                          incident.severity === "high"
                            ? "destructive"
                            : incident.severity === "medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {incident.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">{incident.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Zones */}
          {(selectedFilter === "all" || selectedFilter === "zones") && (
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-2">Zones ({zones.length})</h4>
              <div className="space-y-2">
                {zones.map((zone) => (
                  <div key={zone.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-900">{zone.name}</span>
                      <Badge variant="outline">{zone.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
                <h2 className="text-lg font-semibold text-slate-900">Live Map View</h2>
                <p className="text-sm text-slate-500">Real-time tourist and incident tracking</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Layers className="w-4 h-4 mr-2" />
                Layers
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Map container */}
        <main className="flex-1 relative">
          {/* Map placeholder - In real implementation, this would be Google Maps */}
          <div className="w-full h-full bg-slate-200 relative overflow-hidden">
            {/* Map background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>
            </div>

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <Button size="icon" variant="outline" className="bg-white shadow-md">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" className="bg-white shadow-md">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" className="bg-white shadow-md">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {/* Map markers simulation */}
            <div className="absolute inset-0">
              {/* Tourist markers */}
              {tourists.map((tourist, index) => (
                <div
                  key={tourist.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${30 + index * 15}%`,
                    top: `${40 + index * 10}%`,
                  }}
                >
                  <div
                    className={`w-4 h-4 rounded-full ${tourist.status === "safe" ? "bg-green-500" : "bg-red-500"} border-2 border-white shadow-lg`}
                  ></div>
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap">
                    {tourist.name}
                  </div>
                </div>
              ))}

              {/* Incident markers */}
              {incidents.map((incident, index) => (
                <div
                  key={incident.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${60 + index * 10}%`,
                    top: `${30 + index * 15}%`,
                  }}
                >
                  <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <AlertTriangle className="w-3 h-3 text-white" />
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap">
                    {incident.type}
                  </div>
                </div>
              ))}

              {/* Zone overlays */}
              {zones.map((zone, index) => (
                <div
                  key={zone.id}
                  className="absolute border-2 border-dashed opacity-50"
                  style={{
                    left: `${20 + index * 20}%`,
                    top: `${20 + index * 20}%`,
                    width: "15%",
                    height: "15%",
                    borderColor: zone.type === "safe" ? "#3b82f6" : zone.type === "restricted" ? "#ef4444" : "#f59e0b",
                    backgroundColor:
                      zone.type === "safe" ? "#3b82f620" : zone.type === "restricted" ? "#ef444420" : "#f59e0b20",
                  }}
                >
                  <div className="absolute -top-6 left-0 text-xs font-medium text-slate-700">{zone.name}</div>
                </div>
              ))}
            </div>

            {/* Map integration notice */}
            <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md max-w-sm">
              <div className="flex items-start space-x-2">
                <Map className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-slate-900">Google Maps Integration</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    This is a placeholder. In production, integrate with Google Maps API for real mapping functionality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
