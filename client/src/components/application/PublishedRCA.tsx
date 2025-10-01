import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  Users, 
  DollarSign, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Shield, 
  Code, 
  Database, 
  Settings, 
  GitBranch,
  ChevronRight,
  ChevronDown,
  Download,
  X,
  BarChart3,
  Calendar,
  ExternalLink
} from "lucide-react";

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
}

interface PublishedRCAProps {
  incident: Incident;
  onClose: () => void;
}

export default function PublishedRCA({ incident, onClose }: PublishedRCAProps) {
  const [expandedWhy, setExpandedWhy] = useState<number | null>(1);
  const [selectedFishboneCategory, setSelectedFishboneCategory] = useState<string | null>(null);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // 5-Why Analysis Data
  const fiveWhyAnalysis = [
    {
      question: "Why did the payment processing system fail?",
      answer: "Database connection pool was exhausted, preventing new connections.",
      evidence: ["Connection pool metrics showed 100% utilization", "Database logs showed connection refused errors"],
      actions: ["Increased connection pool size from 20 to 50"]
    },
    {
      question: "Why was the database connection pool exhausted?",
      answer: "High traffic volume exceeded the configured connection limit during peak hours.",
      evidence: ["Traffic increased 300% during flash sale event", "Connection pool size was set for normal load"],
      actions: ["Implemented dynamic connection pool scaling", "Added connection pool monitoring"]
    },
    {
      question: "Why wasn't the connection pool sized for peak traffic?",
      answer: "Load testing was performed with normal traffic patterns, not peak scenarios.",
      evidence: ["Load test reports showed only 2x normal traffic", "Peak traffic patterns were not documented"],
      actions: ["Updated load testing to include peak scenarios", "Documented traffic patterns"]
    },
    {
      question: "Why weren't peak traffic patterns considered in load testing?",
      answer: "Marketing campaigns and flash sales were not communicated to the engineering team.",
      evidence: ["No process for marketing-engineering coordination", "Flash sale was planned 2 weeks prior"],
      actions: ["Established marketing-engineering communication process", "Created campaign impact assessment"]
    },
    {
      question: "Why wasn't there a process for coordinating high-impact marketing events?",
      answer: "Cross-team communication processes were not formally established for capacity planning.",
      evidence: ["No documented process for capacity planning", "Teams worked in silos"],
      actions: ["Created formal capacity planning process", "Established cross-team communication protocols"]
    }
  ];

  // Fishbone Diagram Data
  const fishboneCategories = {
    "People": {
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      causes: [
        "Lack of communication between marketing and engineering teams",
        "Insufficient knowledge of peak traffic patterns",
        "No dedicated capacity planning role"
      ]
    },
    "Process": {
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      causes: [
        "No formal capacity planning process",
        "Load testing didn't include peak scenarios",
        "Missing cross-team communication protocols"
      ]
    },
    "Technology": {
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      causes: [
        "Fixed connection pool size configuration",
        "No auto-scaling for database connections",
        "Insufficient monitoring of connection pool utilization"
      ]
    },
    "Environment": {
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      causes: [
        "Production environment not sized for peak load",
        "Database server resource constraints",
        "Network bandwidth limitations during peak traffic"
      ]
    }
  };

  const timeline = [
    { time: "14:23:15", event: "First connection pool exhaustion detected", type: "detection" },
    { time: "14:25:30", event: "Incident declared - P1 severity", type: "response" },
    { time: "14:28:45", event: "Engineering team mobilized", type: "response" },
    { time: "14:35:20", event: "Root cause identified - connection pool limit", type: "analysis" },
    { time: "14:42:10", event: "Emergency fix deployed - increased pool size", type: "resolution" },
    { time: "15:15:30", event: "Service fully restored", type: "resolution" },
    { time: "15:30:00", event: "Incident closed", type: "closure" }
  ];

  const preventionMeasures = [
    {
      category: "Monitoring",
      icon: BarChart3,
      measures: [
        "Added connection pool utilization alerts at 70% and 85%",
        "Implemented real-time database performance monitoring",
        "Created dashboard for connection pool metrics"
      ]
    },
    {
      category: "Process",
      icon: Settings,
      measures: [
        "Established marketing-engineering communication process",
        "Created capacity planning checklist for campaigns",
        "Implemented pre-event load testing requirements"
      ]
    },
    {
      category: "Technology",
      icon: Code,
      measures: [
        "Implemented dynamic connection pool scaling",
        "Added circuit breaker pattern for database connections",
        "Deployed auto-scaling for application servers"
      ]
    },
    {
      category: "Training",
      icon: Lightbulb,
      measures: [
        "Conducted incident response training",
        "Created runbooks for connection pool issues",
        "Established on-call escalation procedures"
      ]
    }
  ];

  const FishboneDiagram = () => {
    return (
      <div className="relative bg-muted/30 rounded-lg p-8 min-h-[400px]">
        {/* Main spine */}
        <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-gray-400 transform -translate-y-1/2"></div>
        
        {/* Problem box */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="bg-red-100 dark:bg-red-900/20 border-2 border-red-300 rounded-lg p-4 max-w-xs">
            <div className="font-bold text-red-700 dark:text-red-300 text-center">
              Database Connection Pool Exhaustion
            </div>
          </div>
        </div>

        {/* Categories */}
        {Object.entries(fishboneCategories).map(([category, data], index) => {
          const isTop = index % 2 === 0;
          const leftPosition = 20 + (index * 20);
          
          return (
            <div key={category} className={`absolute`} style={{ left: `${leftPosition}%`, top: isTop ? '20%' : '70%' }}>
              {/* Branch line */}
              <div className={`absolute w-0.5 h-16 bg-gray-400 ${isTop ? 'top-0' : 'bottom-0'} left-1/2 transform -translate-x-1/2`}></div>
              <div className={`absolute w-16 h-0.5 bg-gray-400 ${isTop ? 'top-16' : 'bottom-16'} left-1/2 transform -translate-x-1/2 ${isTop ? 'rotate-45' : '-rotate-45'}`}></div>
              
              {/* Category box */}
              <div 
                className={`${data.bgColor} border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                  selectedFishboneCategory === category ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedFishboneCategory(selectedFishboneCategory === category ? null : category)}
              >
                <div className={`font-semibold ${data.color} text-center text-sm`}>
                  {category}
                </div>
              </div>
              
              {/* Causes (show when selected) */}
              {selectedFishboneCategory === category && (
                <div className={`absolute ${isTop ? 'top-full mt-2' : 'bottom-full mb-2'} left-1/2 transform -translate-x-1/2 w-64`}>
                  <div className="bg-white dark:bg-gray-800 border rounded-lg p-3 shadow-lg">
                    <div className="space-y-2">
                      {data.causes.map((cause, causeIndex) => (
                        <div key={causeIndex} className="text-xs text-muted-foreground">
                          • {cause}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        {/* Instructions */}
        <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
          Click on categories to view contributing causes
        </div>
      </div>
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Published RCA Report - {incident.title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {formatDuration(incident.mttr || 240)}
                </div>
                <div className="text-sm text-muted-foreground">Resolution Time</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {incident.affectedUsers.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Users Affected</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {incident.revenueImpact}
                </div>
                <div className="text-sm text-muted-foreground">Revenue Impact</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {incident.affectedServices.length}
                </div>
                <div className="text-sm text-muted-foreground">Services Affected</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="five-why">5-Why Analysis</TabsTrigger>
              <TabsTrigger value="fishbone">Fishbone Diagram</TabsTrigger>
              <TabsTrigger value="prevention">Prevention</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      Incident Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{incident.description}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Root Cause</h4>
                      <p className="text-sm text-muted-foreground">{incident.rootCause}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Resolution</h4>
                      <p className="text-sm text-muted-foreground">{incident.resolution}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      Impact Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Incident Start:</span>
                      <span className="font-medium">
                        {incident.startTime.toLocaleDateString()} {incident.startTime.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Incident End:</span>
                      <span className="font-medium">
                        {incident.resolvedTime?.toLocaleDateString()} {incident.resolvedTime?.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Severity:</span>
                      <Badge className={
                        incident.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        incident.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {incident.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Affected Services:</span>
                      <div className="flex flex-wrap gap-1">
                        {incident.affectedServices.map(service => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Incident Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeline.map((event, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 border-l-4 border-blue-500 bg-muted/50 rounded-r-lg">
                        <div className="text-sm font-mono text-muted-foreground min-w-[60px]">
                          {event.time}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{event.event}</div>
                        </div>
                        <Badge variant={
                          event.type === 'detection' ? 'destructive' :
                          event.type === 'response' ? 'secondary' :
                          event.type === 'analysis' ? 'default' :
                          event.type === 'resolution' ? 'default' :
                          'outline'
                        }>
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="five-why" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    5-Why Root Cause Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fiveWhyAnalysis.map((why, index) => (
                      <div key={index} className="border rounded-lg">
                        <button
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50"
                          onClick={() => setExpandedWhy(expandedWhy === index ? null : index)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-full flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <div className="font-medium">{why.question}</div>
                          </div>
                          {expandedWhy === index ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                        {expandedWhy === index && (
                          <div className="p-4 border-t bg-muted/30">
                            <div className="space-y-4">
                              <div>
                                <h5 className="font-medium mb-2">Answer:</h5>
                                <p className="text-sm text-muted-foreground">{why.answer}</p>
                              </div>
                              <div>
                                <h5 className="font-medium mb-2">Evidence:</h5>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {why.evidence.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="text-blue-600 mt-1">•</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="font-medium mb-2">Actions Taken:</h5>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {why.actions.map((action, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                      {action}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fishbone" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="w-5 h-5" />
                    Fishbone Diagram - Contributing Factors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FishboneDiagram />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prevention" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {preventionMeasures.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Icon className="w-5 h-5" />
                          {category.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {category.measures.map((measure, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {measure}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}