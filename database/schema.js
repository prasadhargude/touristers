// MongoDB Collections Schema for Smart Tourist Safety Monitoring System
// Database: tourist_safety
// Connection URL: mongodb://localhost:27017/tourist_safety

const schemas = {
  // Users Collection - for authentication and user management
  users: {
    _id: "ObjectId",
    email: "String (unique, required)",
    password: "String (hashed, required)",
    name: "String (required)",
    role: "String (enum: ['admin', 'operator', 'viewer'], default: 'operator')",
    phone: "String",
    department: "String",
    isActive: "Boolean (default: true)",
    lastLogin: "Date",
    createdAt: "Date (default: Date.now)",
    updatedAt: "Date (default: Date.now)",
  },

  // Tourists Collection - for tourist tracking and management
  tourists: {
    _id: "ObjectId",
    touristId: "String (unique, auto-generated)",
    name: "String (required)",
    nationality: "String (required)",
    passportNumber: "String",
    phone: "String",
    email: "String",
    emergencyContact: {
      name: "String",
      phone: "String",
      relationship: "String",
    },
    currentLocation: {
      latitude: "Number",
      longitude: "Number",
      address: "String",
      city: "String",
      state: "String",
    },
    checkInTime: "Date",
    expectedCheckOut: "Date",
    status: "String (enum: ['active', 'checked_out', 'emergency', 'missing'], default: 'active')",
    visitingPlaces: ["String"],
    accommodation: {
      name: "String",
      address: "String",
      phone: "String",
    },
    riskLevel: "String (enum: ['low', 'medium', 'high'], default: 'low')",
    notes: "String",
    createdAt: "Date (default: Date.now)",
    updatedAt: "Date (default: Date.now)",
  },

  // Incidents Collection - for incident reporting and management
  incidents: {
    _id: "ObjectId",
    incidentId: "String (unique, auto-generated)",
    title: "String (required)",
    description: "String (required)",
    type: "String (enum: ['medical', 'theft', 'accident', 'natural_disaster', 'harassment', 'lost', 'other'], required)",
    severity: "String (enum: ['low', 'medium', 'high', 'critical'], required)",
    status: "String (enum: ['reported', 'investigating', 'resolved', 'closed'], default: 'reported')",
    location: {
      latitude: "Number (required)",
      longitude: "Number (required)",
      address: "String (required)",
      city: "String",
      state: "String",
    },
    reportedBy: {
      name: "String",
      phone: "String",
      email: "String",
      type: "String (enum: ['tourist', 'local', 'authority', 'anonymous'])",
    },
    involvedTourists: ["ObjectId (ref: tourists)"],
    assignedOfficer: "ObjectId (ref: users)",
    responseTime: "Number (minutes)",
    resolvedAt: "Date",
    evidence: [
      {
        type: "String (enum: ['photo', 'video', 'document'])",
        url: "String",
        description: "String",
      },
    ],
    actions: [
      {
        action: "String",
        takenBy: "ObjectId (ref: users)",
        timestamp: "Date",
        notes: "String",
      },
    ],
    createdAt: "Date (default: Date.now)",
    updatedAt: "Date (default: Date.now)",
  },

  // Zones Collection - for geo-fencing and area management
  zones: {
    _id: "ObjectId",
    zoneId: "String (unique, auto-generated)",
    name: "String (required)",
    type: "String (enum: ['tourist_spot', 'restricted', 'emergency', 'safe_zone', 'high_risk'], required)",
    description: "String",
    coordinates: [
      {
        latitude: "Number",
        longitude: "Number",
      },
    ],
    center: {
      latitude: "Number",
      longitude: "Number",
    },
    radius: "Number (meters)",
    city: "String",
    state: "String",
    capacity: "Number",
    currentOccupancy: "Number (default: 0)",
    riskLevel: "String (enum: ['low', 'medium', 'high'], default: 'low')",
    facilities: ["String"],
    emergencyContacts: [
      {
        name: "String",
        phone: "String",
        type: "String (enum: ['police', 'medical', 'fire', 'tourist_helpline'])",
      },
    ],
    operatingHours: {
      open: "String",
      close: "String",
      is24x7: "Boolean (default: false)",
    },
    alerts: [
      {
        type: "String",
        message: "String",
        severity: "String",
        isActive: "Boolean",
        createdAt: "Date",
      },
    ],
    isActive: "Boolean (default: true)",
    createdAt: "Date (default: Date.now)",
    updatedAt: "Date (default: Date.now)",
  },

  // Notifications Collection - for system notifications and alerts
  notifications: {
    _id: "ObjectId",
    title: "String (required)",
    message: "String (required)",
    type: "String (enum: ['alert', 'warning', 'info', 'emergency'], required)",
    priority: "String (enum: ['low', 'medium', 'high', 'urgent'], default: 'medium')",
    recipients: [
      {
        userId: "ObjectId (ref: users)",
        readAt: "Date",
        isRead: "Boolean (default: false)",
      },
    ],
    relatedTo: {
      type: "String (enum: ['incident', 'tourist', 'zone', 'system'])",
      id: "ObjectId",
    },
    channels: ["String (enum: ['app', 'email', 'sms', 'push'])"],
    scheduledFor: "Date",
    sentAt: "Date",
    isActive: "Boolean (default: true)",
    createdAt: "Date (default: Date.now)",
  },

  // Analytics Collection - for storing analytics data
  analytics: {
    _id: "ObjectId",
    date: "Date (required)",
    type: "String (enum: ['daily', 'weekly', 'monthly'], required)",
    data: {
      totalTourists: "Number",
      activeTourists: "Number",
      totalIncidents: "Number",
      resolvedIncidents: "Number",
      averageResponseTime: "Number",
      zoneOccupancy: [
        {
          zoneId: "ObjectId (ref: zones)",
          occupancy: "Number",
          capacity: "Number",
        },
      ],
      incidentsByType: [
        {
          type: "String",
          count: "Number",
        },
      ],
      touristsByNationality: [
        {
          nationality: "String",
          count: "Number",
        },
      ],
    },
    createdAt: "Date (default: Date.now)",
  },

  // Settings Collection - for system configuration
  settings: {
    _id: "ObjectId",
    key: "String (unique, required)",
    value: "Mixed",
    description: "String",
    category: "String (enum: ['system', 'notification', 'security', 'integration'])",
    isEditable: "Boolean (default: true)",
    updatedBy: "ObjectId (ref: users)",
    updatedAt: "Date (default: Date.now)",
  },
}

// Indexes for better performance
const indexes = {
  users: [{ email: 1 }, { role: 1 }, { isActive: 1 }],
  tourists: [{ touristId: 1 }, { status: 1 }, { nationality: 1 }, { "currentLocation.city": 1 }, { createdAt: -1 }],
  incidents: [
    { incidentId: 1 },
    { status: 1 },
    { type: 1 },
    { severity: 1 },
    { "location.city": 1 },
    { createdAt: -1 },
  ],
  zones: [{ zoneId: 1 }, { type: 1 }, { city: 1 }, { isActive: 1 }],
  notifications: [{ type: 1 }, { priority: 1 }, { "recipients.userId": 1 }, { createdAt: -1 }],
  analytics: [{ date: -1 }, { type: 1 }],
  settings: [{ key: 1 }, { category: 1 }],
}

export { schemas, indexes }
