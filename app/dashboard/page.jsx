"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Map,
  AlertTriangle,
  Users,
  MapPin,
  Bell,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Shield,
  Clock,
  TrendingUp,
  Activity,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { id: "map", icon: Map, label: "Live Map", href: "/map" },
    { id: "incidents", icon: AlertTriangle, label: "Incidents", href: "/incidents" },
    { id: "tourists", icon: Users, label: "Tourists", href: "/tourists" },
    { id: "zones", icon: MapPin, label: "Zones", href: "/zones" },
    { id: "notifications", icon: Bell, label: "Notifications", href: "/notifications" },
    { id: "analytics", icon: BarChart3, label: "Analytics", href: "/analytics" },
    { id: "settings", icon: Settings, label: "Settings", href: "/settings" },
  ]

  const stats = [
    {
      title: "Total Tourists",
      value: "1,247",
      change: "+12%",
      changeType: "increase",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Active Incidents",
      value: "23",
      change: "-8%",
      changeType: "decrease",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Resolved Incidents",
      value: "156",
      change: "+15%",
      changeType: "increase",
      icon: Activity,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Avg Response Time",
      value: "8.5 min",
      change: "-2 min",
      changeType: "decrease",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ]

  const recentIncidents = [
    {
      id: "INC-001",
      type: "Medical Emergency",
      tourist: "Tourist #1023",
      location: "Beach Area A",
      time: "10 min ago",
      status: "Active",
      priority: "High",
    },
    {
      id: "INC-002",
      type: "Lost Tourist",
      tourist: "Tourist #0847",
      location: "City Center",
      time: "25 min ago",
      status: "Resolved",
      priority: "Medium",
    },
    {
      id: "INC-003",
      type: "Theft Report",
      tourist: "Tourist #1156",
      location: "Market District",
      time: "1 hour ago",
      status: "Investigating",
      priority: "Medium",
    },
    {
      id: "INC-004",
      type: "SOS Alert",
      tourist: "Tourist #0923",
      location: "Mountain Trail",
      time: "2 hours ago",
      status: "Pending",
      priority: "High",
    },
  ]

  // Chart data
  const incidentTrendData = [
    { day: "Mon", incidents: 12 },
    { day: "Tue", incidents: 8 },
    { day: "Wed", incidents: 15 },
    { day: "Thu", incidents: 6 },
    { day: "Fri", incidents: 18 },
    { day: "Sat", incidents: 23 },
    { day: "Sun", incidents: 19 },
  ]

  const incidentTypeData = [
    { name: "Medical", value: 35, color: "#DC2626" },
    { name: "Lost Tourist", value: 28, color: "#F59E0B" },
    { name: "Crime", value: 22, color: "#7C3AED" },
    { name: "Other", value: 15, color: "#6B7280" },
  ]

  const handleNavigation = (href) => {
    window.location.href = href
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-lg font-bold text-slate-900">Tourist Safety</h1>
              <p className="text-xs text-slate-500">Monitoring System</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.href)}
              className={`w-full flex items-center px-3 py-2 mt-1 text-sm font-medium rounded-md transition-colors ${
                item.id === "dashboard"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-slate-100 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-slate-700">System Online</span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <div>Uptime: 99.9%</div>
              <div>Last Update: 2 min ago</div>
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
                <h2 className="text-lg font-semibold text-slate-900">Dashboard Overview</h2>
                <p className="text-sm text-slate-500">Control Room Operator</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => (window.location.href = "/")}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className={`w-4 h-4 mr-1 ${stat.color}`} />
                        <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
                        <span className="text-xs text-slate-500 ml-1">vs last week</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Incident Trend Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Incident Trends (Last 7 Days)</CardTitle>
                <CardDescription>Daily incident count and patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={incidentTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="incidents" stroke="#2563EB" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Incident Types Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Incident Types</CardTitle>
                <CardDescription>Distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={incidentTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {incidentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Incidents */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest incidents and alerts</CardDescription>
                </div>
                <Button size="sm" onClick={() => handleNavigation("/incidents")}>
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentIncidents.map((incident) => (
                    <div
                      key={incident.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-slate-900">{incident.type}</p>
                          <Badge
                            variant={incident.priority === "High" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {incident.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">{incident.tourist}</p>
                        <p className="text-sm text-slate-500">
                          {incident.location} • {incident.time}
                        </p>
                      </div>
                      <Badge
                        variant={
                          incident.status === "Active"
                            ? "destructive"
                            : incident.status === "Resolved"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {incident.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    className="h-20 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleNavigation("/map")}
                  >
                    <Map className="w-6 h-6 mb-2" />
                    <span className="text-sm">View Map</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center bg-transparent"
                    onClick={() => handleNavigation("/incidents")}
                  >
                    <Plus className="w-6 h-6 mb-2" />
                    <span className="text-sm">New Incident</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center bg-transparent"
                    onClick={() => handleNavigation("/tourists")}
                  >
                    <Users className="w-6 h-6 mb-2" />
                    <span className="text-sm">Find Tourist</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center bg-transparent"
                    onClick={() => handleNavigation("/analytics")}
                  >
                    <BarChart3 className="w-6 h-6 mb-2" />
                    <span className="text-sm">View Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
