import React, { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Activity, FileText, AlertTriangle, BookOpen, ExternalLink } from "lucide-react";
import DemoBreadcrumb from "./DemoBreadcrumb";
import MetricsTab from "./application/MetricsTab";
import LogsTab from "./application/LogsTab";
import IncidentsTab from "./application/IncidentsTab";
import DocsTab from "./application/DocsTab";
import { Application } from "./ApplicationCard";

interface ApplicationDetailViewProps {
  onBackToMarketing?: () => void;
}

// Mock application data with incident status
const mockApplications: Record<string, Application & { 
  hasOngoingIncident: boolean;
  ongoingIncidentId?: string;
  metrics?: any;
}> = {
  "1": {
    id: "1",
    name: "My E-commerce Store",
    description: "Online retail platform with payment processing",
    status: "healthy",
    lastUpdated: "1 hour ago",
    connectorsCount: 3,
    environment: "production",
    hasOngoingIncident: false
  },
  "2": {
    id: "2", 
    name: "Analytics Dashboard",
    description: "Customer behavior and sales analytics",
    status: "warning",
    lastUpdated: "15 minutes ago", 
    connectorsCount: 2,
    environment: "production",
    hasOngoingIncident: false
  },
  "3": {
    id: "3",
    name: "Payment Service",
    description: "Critical payment processing microservice",
    status: "error",
    lastUpdated: "5 minutes ago",
    connectorsCount: 6,
    environment: "production",
    hasOngoingIncident: true,
    ongoingIncidentId: "INC-2024-001"
  },
  "4": {
    id: "4",
    name: "Dev Environment",
    description: "Development and testing environment",
    status: "healthy",
    lastUpdated: "3 hours ago",
    connectorsCount: 4,
    environment: "development",
    hasOngoingIncident: false
  }
};

export default function ApplicationDetailView({ onBackToMarketing }: ApplicationDetailViewProps) {
  const [, params] = useRoute("/demo/user/application/:appId");
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("metrics");

  const appId = params?.appId;
  const application = appId ? mockApplications[appId] : null;

  // Parse tab from URL query params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['metrics', 'logs', 'incidents', 'docs'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location]);

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const newUrl = `/demo/user/application/${appId}?tab=${tab}`;
    setLocation(newUrl);
  };

  const handleBackToDashboard = () => {
    setLocation("/demo/user");
  };

  if (!application) {
    return (
      <div className="min-h-screen bg-background">
        <DemoBreadcrumb 
          items={[
            { label: "User Dashboard", href: "/demo/user" },
            { label: "Application Not Found", current: true }
          ]}
          onBackToMarketing={onBackToMarketing}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Application Not Found</h1>
            <p className="text-muted-foreground mb-6">The requested application could not be found.</p>
            <Button onClick={handleBackToDashboard}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getEnvironmentColor = (environment: string) => {
    switch (environment) {
      case 'production': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'staging': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'development': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DemoBreadcrumb 
        items={[
          { label: "User Dashboard", href: "/demo/user" },
          { label: "Applications", href: "/demo/user" },
          { label: application.name, current: true }
        ]}
        onBackToMarketing={onBackToMarketing}
      />

      {/* Application Header */}
      <div className="bg-card border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToDashboard}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{application.name}</h1>
                  <Badge className={getStatusColor(application.status)}>
                    {application.status}
                  </Badge>
                  <Badge className={getEnvironmentColor(application.environment)}>
                    {application.environment}
                  </Badge>
                  {application.hasOngoingIncident && (
                    <Badge variant="destructive" className="animate-pulse">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Ongoing Incident
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{application.description}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Last updated: {application.lastUpdated} • {application.connectorsCount} connectors
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View in Monitoring
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mt-6">
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Logs
            </TabsTrigger>
            <TabsTrigger 
              value="incidents" 
              className={`flex items-center gap-2 ${
                application.hasOngoingIncident ? 'text-red-600 dark:text-red-400' : ''
              }`}
            >
              <AlertTriangle className={`w-4 h-4 ${
                application.hasOngoingIncident ? 'animate-pulse' : ''
              }`} />
              Incidents
              {application.hasOngoingIncident && (
                <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">
                  1
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Docs
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <div className="mt-6 pb-8">
            <TabsContent value="metrics" className="space-y-6">
              <MetricsTab application={application} />
            </TabsContent>

            <TabsContent value="logs" className="space-y-6">
              <LogsTab application={application} />
            </TabsContent>

            <TabsContent value="incidents" className="space-y-6">
              <IncidentsTab application={application} />
            </TabsContent>

            <TabsContent value="docs" className="space-y-6">
              <DocsTab application={application} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}