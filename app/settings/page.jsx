"use client"

import { useState } from "react"
import {
  Settings,
  Save,
  Shield,
  Menu,
  X,
  Bell,
  LogOut,
  User,
  Lock,
  Globe,
  Smartphone,
  Mail,
  Database,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("profile")

  // Settings state
  const [profileSettings, setProfileSettings] = useState({
    name: "Authority Admin",
    email: "admin@touristsafety.gov",
    phone: "+1-555-0100",
    department: "Emergency Response",
    role: "System Administrator",
    timezone: "America/New_York",
    language: "English",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: true,
    incidentAlerts: true,
    systemUpdates: false,
    weeklyReports: true,
    emergencyOnly: false,
  })

  const [systemSettings, setSystemSettings] = useState({
    autoRefresh: true,
    refreshInterval: "30",
    mapProvider: "google",
    defaultZoom: "12",
    emergencyTimeout: "300",
    maxIncidentAge: "24",
    backupFrequency: "daily",
    logRetention: "90",
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: "60",
    passwordExpiry: "90",
    loginAttempts: "5",
    ipWhitelist: "",
    auditLogging: true,
  })

  const settingsSections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "system", label: "System", icon: Settings },
    { id: "security", label: "Security", icon: Lock },
    { id: "integrations", label: "Integrations", icon: Database },
  ]

  const handleSaveSettings = () => {
    console.log("[v0] Saving settings...")
    // In a real app, this would save to backend
    alert("Settings saved successfully!")
  }

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profileSettings.name}
              onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={profileSettings.email}
              onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={profileSettings.phone}
              onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={profileSettings.department}
              onChange={(e) => setProfileSettings({ ...profileSettings, department: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={profileSettings.role}
              onValueChange={(value) => setProfileSettings({ ...profileSettings, role: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="System Administrator">System Administrator</SelectItem>
                <SelectItem value="Emergency Coordinator">Emergency Coordinator</SelectItem>
                <SelectItem value="Zone Manager">Zone Manager</SelectItem>
                <SelectItem value="Operator">Operator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={profileSettings.timezone}
              onValueChange={(value) => setProfileSettings({ ...profileSettings, timezone: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time</SelectItem>
                <SelectItem value="America/Chicago">Central Time</SelectItem>
                <SelectItem value="America/Denver">Mountain Time</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                <SelectItem value="UTC">UTC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Alerts</Label>
              <p className="text-sm text-slate-500">Receive incident notifications via email</p>
            </div>
            <Switch
              checked={notificationSettings.emailAlerts}
              onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailAlerts: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Alerts</Label>
              <p className="text-sm text-slate-500">Receive critical alerts via SMS</p>
            </div>
            <Switch
              checked={notificationSettings.smsAlerts}
              onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, smsAlerts: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-slate-500">Browser push notifications</p>
            </div>
            <Switch
              checked={notificationSettings.pushNotifications}
              onCheckedChange={(checked) =>
                setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Incident Alerts</Label>
              <p className="text-sm text-slate-500">All incident-related notifications</p>
            </div>
            <Switch
              checked={notificationSettings.incidentAlerts}
              onCheckedChange={(checked) =>
                setNotificationSettings({ ...notificationSettings, incidentAlerts: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>System Updates</Label>
              <p className="text-sm text-slate-500">System maintenance and updates</p>
            </div>
            <Switch
              checked={notificationSettings.systemUpdates}
              onCheckedChange={(checked) =>
                setNotificationSettings({ ...notificationSettings, systemUpdates: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Reports</Label>
              <p className="text-sm text-slate-500">Automated weekly summary reports</p>
            </div>
            <Switch
              checked={notificationSettings.weeklyReports}
              onCheckedChange={(checked) =>
                setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Emergency Only Mode</Label>
              <p className="text-sm text-slate-500">Only receive high-priority emergency alerts</p>
            </div>
            <Switch
              checked={notificationSettings.emergencyOnly}
              onCheckedChange={(checked) =>
                setNotificationSettings({ ...notificationSettings, emergencyOnly: checked })
              }
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">System Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="refreshInterval">Auto Refresh Interval (seconds)</Label>
            <Input
              id="refreshInterval"
              type="number"
              value={systemSettings.refreshInterval}
              onChange={(e) => setSystemSettings({ ...systemSettings, refreshInterval: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapProvider">Map Provider</Label>
            <Select
              value={systemSettings.mapProvider}
              onValueChange={(value) => setSystemSettings({ ...systemSettings, mapProvider: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google">Google Maps</SelectItem>
                <SelectItem value="openstreet">OpenStreetMap</SelectItem>
                <SelectItem value="mapbox">Mapbox</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="defaultZoom">Default Map Zoom Level</Label>
            <Input
              id="defaultZoom"
              type="number"
              min="1"
              max="20"
              value={systemSettings.defaultZoom}
              onChange={(e) => setSystemSettings({ ...systemSettings, defaultZoom: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyTimeout">Emergency Response Timeout (seconds)</Label>
            <Input
              id="emergencyTimeout"
              type="number"
              value={systemSettings.emergencyTimeout}
              onChange={(e) => setSystemSettings({ ...systemSettings, emergencyTimeout: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxIncidentAge">Max Incident Display Age (hours)</Label>
            <Input
              id="maxIncidentAge"
              type="number"
              value={systemSettings.maxIncidentAge}
              onChange={(e) => setSystemSettings({ ...systemSettings, maxIncidentAge: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logRetention">Log Retention Period (days)</Label>
            <Input
              id="logRetention"
              type="number"
              value={systemSettings.logRetention}
              onChange={(e) => setSystemSettings({ ...systemSettings, logRetention: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto Refresh</Label>
              <p className="text-sm text-slate-500">Automatically refresh dashboard data</p>
            </div>
            <Switch
              checked={systemSettings.autoRefresh}
              onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, autoRefresh: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Security Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              value={securitySettings.sessionTimeout}
              onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
            <Input
              id="passwordExpiry"
              type="number"
              value={securitySettings.passwordExpiry}
              onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loginAttempts">Max Login Attempts</Label>
            <Input
              id="loginAttempts"
              type="number"
              value={securitySettings.loginAttempts}
              onChange={(e) => setSecuritySettings({ ...securitySettings, loginAttempts: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ipWhitelist">IP Whitelist</Label>
            <Textarea
              id="ipWhitelist"
              placeholder="Enter IP addresses, one per line"
              value={securitySettings.ipWhitelist}
              onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-slate-500">Require 2FA for all logins</p>
            </div>
            <Switch
              checked={securitySettings.twoFactorAuth}
              onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Audit Logging</Label>
              <p className="text-sm text-slate-500">Log all user actions for security auditing</p>
            </div>
            <Switch
              checked={securitySettings.auditLogging}
              onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, auditLogging: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">External Integrations</h3>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="w-8 h-8 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Google Maps API</h4>
                    <p className="text-sm text-slate-500">Map services and geocoding</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-8 h-8 text-orange-600" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Email Service</h4>
                    <p className="text-sm text-slate-500">SMTP email notifications</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-8 h-8 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-slate-900">SMS Gateway</h4>
                    <p className="text-sm text-slate-500">SMS alert notifications</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-red-100 text-red-700">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Disconnected
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="w-8 h-8 text-purple-600" />
                  <div>
                    <h4 className="font-semibold text-slate-900">External Database</h4>
                    <p className="text-sm text-slate-500">Tourist registry integration</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderSettingsContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSettings()
      case "notifications":
        return renderNotificationSettings()
      case "system":
        return renderSystemSettings()
      case "security":
        return renderSecuritySettings()
      case "integrations":
        return renderIntegrationsSettings()
      default:
        return renderProfileSettings()
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
              <h1 className="text-lg font-bold text-slate-900">Settings</h1>
              <p className="text-xs text-slate-500">System Configuration</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Settings Navigation */}
        <nav className="mt-6 px-3">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center px-3 py-2 mt-1 text-sm font-medium rounded-md transition-colors ${
                activeSection === section.id
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <section.icon className="w-5 h-5 mr-3" />
              {section.label}
            </button>
          ))}
        </nav>
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
                <h2 className="text-lg font-semibold text-slate-900">System Settings</h2>
                <p className="text-sm text-slate-500">Configure system preferences and security</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
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

        {/* Settings content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Card>
            <CardContent className="p-6">{renderSettingsContent()}</CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
