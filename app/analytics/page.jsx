"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Calendar, Download, Shield, Menu, X, Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [timeRange, setTimeRange] = useState("7days")
  const [reportType, setReportType] = useState("overview")

  // Dummy analytics data
  const touristTrends = [
    { date: "Jan 1", tourists: 1200, incidents: 15, resolved: 12 },
    { date: "Jan 2", tourists: 1350, incidents: 18, resolved: 16 },
    { date: "Jan 3", tourists: 1100, incidents: 12, resolved: 11 },
    { date: "Jan 4", tourists: 1450, incidents: 22, resolved: 19 },
    { date: "Jan 5", tourists: 1600, incidents: 25, resolved: 23 },
    { date: "Jan 6", tourists: 1380, incidents: 20, resolved: 18 },
    { date: "Jan 7", tourists: 1520, incidents: 28, resolved: 24 },
  ]

  const incidentTypes = [
    { name: "Medical Emergency", value: 35, color: "#ef4444" },
    { name: "Theft Report", value: 28, color: "#f97316" },
    { name: "Lost Tourist", value: 20, color: "#eab308" },
    { name: "Traffic Accident", value: 12, color: "#3b82f6" },
    { name: "Other", value: 5, color: "#6b7280" },
  ]

  const zoneActivity = [
    { zone: "Tourist Zone A", visitors: 450, incidents: 8, capacity: 85 },
    { zone: "Central Market", visitors: 380, incidents: 12, capacity: 92 },
    { zone: "Beach Area", visitors: 320, incidents: 5, capacity: 64 },
    { zone: "Museum District", visitors: 280, incidents: 3, capacity: 56 },
    { zone: "Nature Reserve", visitors: 150, incidents: 1, capacity: 30 },
  ]

  const responseMetrics = [
    { metric: "Average Response Time", value: "8.5 min", change: "-12%", trend: "down", color: "text-green-600" },
    { metric: "Resolution Rate", value: "94.2%", change: "+3.1%", trend: "up", color: "text-green-600" },
    { metric: "Tourist Satisfaction", value: "4.7/5", change: "+0.2", trend: "up", color: "text-green-600" },
    { metric: "System Uptime", value: "99.8%", change: "0%", trend: "stable", color: "text-blue-600" },
  ]

  const recentReports = [
    {
      id: 1,
      title: "Weekly Safety Report",
      type: "Safety Analysis",
      date: "2024-01-15",
      status: "completed",
      insights: "Tourist incidents decreased by 15% compared to last week",
    },
    {
      id: 2,
      title: "Zone Capacity Analysis",
      type: "Capacity Report",
      date: "2024-01-14",
      status: "completed",
      insights: "Peak hours identified: 10 AM - 2 PM in Central Market",
    },
    {
      id: 3,
      title: "Emergency Response Metrics",
      type: "Performance Report",
      date: "2024-01-13",
      status: "completed",
      insights: "Response time improved by 12% with new protocols",
    },
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
              <h1 className="text-lg font-bold text-slate-900">Analytics</h1>
              <p className="text-xs text-slate-500">Reports & Insights</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-slate-200">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24hours">Last 24 Hours</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="incidents">Incidents Analysis</SelectItem>
                  <SelectItem value="tourists">Tourist Patterns</SelectItem>
                  <SelectItem value="zones">Zone Performance</SelectItem>
                  <SelectItem value="response">Response Metrics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Total Tourists</span>
              <span className="font-semibold text-slate-900">9,850</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Active Incidents</span>
              <span className="font-semibold text-red-600">23</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Resolved Today</span>
              <span className="font-semibold text-green-600">156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Avg Response</span>
              <span className="font-semibold text-blue-600">8.5 min</span>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="p-4">
          <h3 className="font-semibold text-slate-900 mb-3">Recent Reports</h3>
          <div className="space-y-2">
            {recentReports.map((report) => (
              <div key={report.id} className="p-2 bg-slate-50 rounded-lg">
                <div className="font-medium text-sm text-slate-900">{report.title}</div>
                <div className="text-xs text-slate-500">
                  {report.type} • {report.date}
                </div>
              </div>
            ))}
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
                <h2 className="text-lg font-semibold text-slate-900">Analytics Dashboard</h2>
                <p className="text-sm text-slate-500">Data insights and performance metrics</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
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

        {/* Analytics content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {responseMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{metric.metric}</p>
                      <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                    </div>
                    <div className={`flex items-center text-sm font-medium ${metric.color}`}>
                      {metric.trend === "up" && <TrendingUp className="w-4 h-4 mr-1" />}
                      {metric.trend === "down" && <TrendingDown className="w-4 h-4 mr-1" />}
                      {metric.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Tourist Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Tourist & Incident Trends</CardTitle>
                <CardDescription>Daily tourist count and incident reports</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={touristTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tourists" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Incident Types Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Incident Types Distribution</CardTitle>
                <CardDescription>Breakdown of incident categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={incidentTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {incidentTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Zone Activity Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Zone Activity Analysis</CardTitle>
              <CardDescription>Visitor count, incidents, and capacity utilization by zone</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={zoneActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="visitors" fill="#3b82f6" />
                  <Bar dataKey="incidents" fill="#ef4444" />
                  <Bar dataKey="capacity" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Automated analysis and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-slate-900">{report.title}</h4>
                        <Badge variant="outline">{report.type}</Badge>
                        <Badge variant="outline" className="bg-green-100 text-green-700">
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{report.insights}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{report.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
