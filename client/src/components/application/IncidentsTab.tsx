import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Clock, 
  Users, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  ExternalLink,
  LayoutGrid,
  List,
  Target,
  TrendingDown,
  Database,
  GitBranch,
  Zap
} from "lucide-react";
import { Application } from "../ApplicationCard";
import PreliminaryRCA from "./PreliminaryRCA";
import PublishedRCA from "./PublishedRCA";

interface IncidentsTabProps {
  application: Application;
}

interface Incident {
  id: string;
  title: string;
  status: 'ongoing' | 'resolved';
  severity: 'critical' | 'high' | 'medium' | 'low';
  startTime: Date;
  resolvedTime?: Date;
  affectedServices: string[];
  affectedUsers: number;
  revenueImpact: string;
  hasRCA: boolean;
  rcaType: 'preliminary' | 'published';
  description: string;
  rootCause?: string;
  resolution?: string;
  mttr?: number;
  confidence?: number;
}

// Mock incident data
const getIncidentsForApp = (appId: string): Incident[] => {
  const baseIncidents: Incident[] = [
    // Past incidents for all apps
    {
      id: "INC-2024-002",
      title: "Database Connection Pool Exhaustion",
      status: "resolved",
      severity: "critical",
      startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      resolvedTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // 4 hours later
      affectedServices: ["database", "api-gateway"],
      affectedUsers: 1250,
      revenueImpact: "$8.2k",
      hasRCA: true,
      rcaType: "published",
      description: "Database connection pool reached maximum capacity during peak traffic",
      rootCause: "Insufficient connection pool configuration for peak load",
      resolution: "Increased pool size and implemented connection monitoring",
      mttr: 240 // 4 hours in minutes
    },
    {
      id: "INC-2024-003",
      title: "API Gateway Timeout Issues",
      status: "resolved", 
      severity: "high",
      startTime: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      resolvedTime: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 2 hours later
      affectedServices: ["api-gateway", "load-balancer"],
      affectedUsers: 890,
      revenueImpact: "$3.1k",
      hasRCA: true,
      rcaType: "published",
      description: "API gateway experiencing timeout issues under load",
      rootCause: "Inadequate timeout configuration and circuit breaker settings",
      resolution: "Updated timeout settings and implemented circuit breaker pattern",
      mttr: 120
    },
    {
      id: "INC-2024-004",
      title: "Memory Leak in Background Jobs",
      status: "resolved",
      severity: "medium",
      startTime: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
      resolvedTime: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000), // 6 hours later
      affectedServices: ["background-jobs", "worker-queue"],
      affectedUsers: 0,
      revenueImpact: "$0",
      hasRCA: true,
      rcaType: "published",
      description: "Memory usage gradually increasing in background job processors",
      rootCause: "Memory leak in job processing library",
      resolution: "Updated library version and implemented memory monitoring",
      mttr: 360
    }
  ];

  // Add app-specific incidents
  if (appId === "3") { // Payment Service - has ongoing incident
    return [
      {
        id: "INC-2024-001",
        title: "High Error Rate in Payment Processing",
        status: "ongoing",
        severity: "critical",
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        affectedServices: ["payment-service", "database", "auth-service"],
        affectedUsers: 2847,
        revenueImpact: "$18.4k",
        hasRCA: true,
        rcaType: "preliminary",
        description: "Payment processing experiencing high error rates and timeouts",
        confidence: 87
      },
      ...baseIncidents
    ];
  } else if (appId === "2") { // Analytics Dashboard - add one more past incident
    return [
      {
        id: "INC-2024-005",
        title: "Dashboard Loading Performance Issues",
        status: "resolved",
        severity: "medium",
        startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        resolvedTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000), // 1 hour later
        affectedServices: ["analytics-api", "dashboard-ui"],
        affectedUsers: 450,
        revenueImpact: "$1.2k",
        hasRCA: true,
        rcaType: "published",
        description: "Dashboard queries taking longer than expected to load",
        rootCause: "Missing database indexes on analytics tables",
        resolution: "Added appropriate indexes and query optimization",
        mttr: 60
      },
      ...baseIncidents
    ];
  }

  return baseIncidents;
};

export default function IncidentsTab({ application }: IncidentsTabProps) {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showRCA, setShowRCA] = useState(false);

  const incidents = getIncidentsForApp(application.id);
  const ongoingIncidents = incidents.filter(i => i.status === 'ongoing');
  const pastIncidents = incidents.filter(i => i.status === 'resolved');

  const handleIncidentClick = (incident: Incident) => {
    setSelectedIncident(incident);
    setShowRCA(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const formatDuration = (startTime: Date, endTime?: Date) => {
    const end = endTime || new Date();
    const diffMs = end.getTime() - startTime.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const IncidentCard = ({ incident }: { incident: Incident }) => (
    <Card 
      className={`hover-lift transition-all duration-200 cursor-pointer ${
        incident.status === 'ongoing' 
          ? 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20' 
          : 'hover:border-primary/50'
      }`}
      onClick={() => handleIncidentClick(incident)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className={getSeverityColor(incident.severity)}>
                {incident.severity.toUpperCase()}
              </Badge>
              {incident.status === 'ongoing' && (
                <Badge variant="destructive" className="animate-pulse">
                  ONGOING
                </Badge>
              )}
              {incident.hasRCA && (
                <Badge variant="outline">
                  {incident.rcaType === 'preliminary' ? 'Preliminary RCA' : 'Published RCA'}
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg">{incident.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{incident.description}</p>
          </div>
          {incident.status === 'ongoing' && incident.confidence && (
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600">{incident.confidence}%</div>
              <div className="text-xs text-muted-foreground">RCA Confidence</div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">
                {incident.status === 'ongoing' 
                  ? formatDuration(incident.startTime)
                  : `${incident.mttr}m`
                }
              </div>
              <div className="text-xs text-muted-foreground">
                {incident.status === 'ongoing' ? 'Duration' : 'MTTR'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">{incident.affectedUsers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Users</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">{incident.revenueImpact}</div>
              <div className="text-xs text-muted-foreground">Impact</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">
                {incident.startTime.toLocaleDateString()}
              </div>
              <div className="text-xs text-muted-foreground">
                {incident.startTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {incident.affectedServices.map((service) => (
              <Badge key={service} variant="outline" className="text-xs">
                {service}
              </Badge>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="gap-2">
            View Details
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const IncidentListItem = ({ incident }: { incident: Incident }) => (
    <div 
      className={`flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
        incident.status === 'ongoing' 
          ? 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20' 
          : 'hover:border-primary/50'
      }`}
      onClick={() => handleIncidentClick(incident)}
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2">
          <Badge className={getSeverityColor(incident.severity)}>
            {incident.severity.toUpperCase()}
          </Badge>
          {incident.status === 'ongoing' && (
            <Badge variant="destructive" className="animate-pulse">
              ONGOING
            </Badge>
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{incident.title}</h4>
          <p className="text-sm text-muted-foreground">{incident.description}</p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="text-center">
            <div className="font-medium">{incident.affectedUsers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Users</div>
          </div>
          <div className="text-center">
            <div className="font-medium">{incident.revenueImpact}</div>
            <div className="text-xs text-muted-foreground">Impact</div>
          </div>
          <div className="text-center">
            <div className="font-medium">
              {incident.status === 'ongoing' 
                ? formatDuration(incident.startTime)
                : `${incident.mttr}m`
              }
            </div>
            <div className="text-xs text-muted-foreground">
              {incident.status === 'ongoing' ? 'Duration' : 'MTTR'}
            </div>
          </div>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        <ExternalLink className="w-4 h-4" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Incidents</h3>
          <p className="text-sm text-muted-foreground">
            Incident management and RCA analysis for {application.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
              variant={viewMode === 'card' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('card')}
              className="h-8 px-3"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Ongoing Incidents - Always on Top */}
      {ongoingIncidents.length > 0 && (
        <div>
          <h4 className="text-md font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 animate-pulse" />
            Ongoing Incidents ({ongoingIncidents.length})
          </h4>
          <div className={viewMode === 'card' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-2'}>
            {ongoingIncidents.map((incident) => 
              viewMode === 'card' ? (
                <IncidentCard key={incident.id} incident={incident} />
              ) : (
                <IncidentListItem key={incident.id} incident={incident} />
              )
            )}
          </div>
        </div>
      )}

      {/* Past Incidents */}
      {pastIncidents.length > 0 && (
        <div>
          <h4 className="text-md font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Past Incidents ({pastIncidents.length})
          </h4>
          <div className={viewMode === 'card' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-2'}>
            {pastIncidents.map((incident) => 
              viewMode === 'card' ? (
                <IncidentCard key={incident.id} incident={incident} />
              ) : (
                <IncidentListItem key={incident.id} incident={incident} />
              )
            )}
          </div>
        </div>
      )}

      {/* No Incidents */}
      {incidents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">No Incidents</h4>
            <p className="text-muted-foreground">
              This application has no recorded incidents. Great job maintaining system stability!
            </p>
          </CardContent>
        </Card>
      )}

      {/* RCA Modal/Popup */}
      {showRCA && selectedIncident && (
        selectedIncident.rcaType === 'preliminary' ? (
          <PreliminaryRCA 
            incident={selectedIncident}
            onClose={() => setShowRCA(false)}
          />
        ) : (
          <PublishedRCA 
            incident={selectedIncident}
            onClose={() => setShowRCA(false)}
          />
        )
      )}
    </div>
  );
}