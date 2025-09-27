import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  AlertTriangle, 
  Clock, 
  TrendingDown, 
  Database, 
  GitBranch, 
  BarChart3, 
  Zap, 
  Target,
  Calendar,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  Activity,
  Code,
  RefreshCw,
  X,
  ChevronRight,
  ChevronLeft
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
  confidence?: number;
}

interface PreliminaryRCAProps {
  incident: Incident;
  onClose: () => void;
}

export default function PreliminaryRCA({ incident, onClose }: PreliminaryRCAProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [confidence, setConfidence] = useState(incident.confidence || 87);
  
  // Simulate confidence updates
  useEffect(() => {
    const interval = setInterval(() => {
      setConfidence(prev => {
        const change = (Math.random() - 0.5) * 4; // ±2% change
        const newValue = Math.max(70, Math.min(95, prev + change));
        return Math.round(newValue);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (startTime: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - startTime.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const timelineEvents = [
    {
      time: "14:23:15",
      event: "Database connection pool exhausted",
      severity: "critical",
      component: "PostgreSQL",
      status: "confirmed"
    },
    {
      time: "14:23:20",
      event: "Payment service timeout spike detected",
      severity: "high",
      component: "Payment API",
      status: "confirmed"
    },
    {
      time: "14:23:25",
      event: "Circuit breaker triggered",
      severity: "medium",
      component: "Gateway",
      status: "confirmed"
    },
    {
      time: "14:23:30",
      event: "Error rate exceeded 20% threshold",
      severity: "critical",
      component: "Monitoring",
      status: "confirmed"
    },
    {
      time: "14:24:45",
      event: "Auto-scaling triggered for payment pods",
      severity: "medium",
      component: "Kubernetes",
      status: "in-progress"
    }
  ];

  const rootCauseCategories = [
    {
      category: "Infrastructure",
      type: "Primary",
      confidence: 95,
      description: "Database connection pool misconfiguration causing resource exhaustion during peak load",
      icon: Database,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/20"
    },
    {
      category: "Code",
      type: "Contributing",
      confidence: 72,
      description: "Inefficient connection handling in payment processing service",
      icon: GitBranch,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20"
    },
    {
      category: "Process",
      type: "Contributing",
      confidence: 58,
      description: "Lack of proactive monitoring for connection pool utilization",
      icon: BarChart3,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20"
    }
  ];

  const recoverySteps = [
    {
      priority: "P0 - Critical",
      title: "Increase Database Connection Pool",
      effort: "2 mins",
      impact: "High",
      status: "ready",
      code: `# Increase max connections in database.yml
max_connections: 50  # increased from 20
pool_timeout: 10
checkout_timeout: 5`,
      rollback: "Revert connection pool settings if CPU usage exceeds 85%"
    },
    {
      priority: "P1 - High",
      title: "Deploy Circuit Breaker Fix",
      effort: "5 mins",
      impact: "Medium",
      status: "in-progress",
      code: `// Update circuit breaker configuration
const circuitBreaker = {
  threshold: 0.5,
  timeout: 3000,
  resetTimeout: 30000
}`,
      rollback: "Automatic rollback via blue-green deployment if error rate increases"
    },
    {
      priority: "P2 - Medium",
      title: "Optimize Connection Management",
      effort: "15 mins",
      impact: "High",
      status: "pending",
      code: `// Implement connection pooling best practices
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})`,
      rollback: "Test in staging environment first"
    }
  ];

  const steps = [
    { id: 1, title: "Incident Overview", description: "Current impact and timeline" },
    { id: 2, title: "Root Cause Analysis", description: "Identified causes and confidence" },
    { id: 3, title: "Recovery Actions", description: "Prioritized steps to resolve" },
    { id: 4, title: "Impact Assessment", description: "Business and technical impact" }
  ];

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "pending";
  };

  const StepIndicator = ({ step, status }: { step: any; status: string }) => {
    const getStatusColor = () => {
      switch (status) {
        case "completed": return "bg-green-500 text-white";
        case "current": return "bg-blue-500 text-white";
        default: return "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400";
      }
    };

    return (
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${getStatusColor()}`}>
          {status === "completed" ? <CheckCircle className="w-4 h-4" /> : step.id}
        </div>
        <div>
          <div className="font-medium">{step.title}</div>
          <div className="text-sm text-muted-foreground">{step.description}</div>
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
              <AlertTriangle className="w-6 h-6 text-red-600" />
              Preliminary RCA Analysis - {incident.title}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Stats */}
          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="grid grid-cols-4 gap-6 flex-1">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{formatDuration(incident.startTime)}</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{incident.affectedUsers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Users Affected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{incident.revenueImpact}</div>
                <div className="text-sm text-muted-foreground">Revenue Impact</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{confidence}%</div>
                <div className="text-sm text-muted-foreground">RCA Confidence</div>
              </div>
            </div>
            <Badge variant="destructive" className="animate-pulse ml-4">
              ONGOING
            </Badge>
          </div>

          {/* Step Navigation */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`text-left p-3 rounded-lg transition-colors ${
                      currentStep === step.id ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-muted'
                    }`}
                  >
                    <StepIndicator step={step} status={getStepStatus(step.id)} />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Event Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {timelineEvents.map((event, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border-l-4 border-red-500">
                          <div className="text-sm font-mono text-muted-foreground min-w-[60px]">{event.time}</div>
                          <div className="flex-1">
                            <div className="font-medium">{event.event}</div>
                            <div className="text-sm text-muted-foreground">{event.component}</div>
                          </div>
                          <Badge variant={event.severity === 'critical' ? 'destructive' : event.severity === 'high' ? 'secondary' : 'outline'}>
                            {event.severity}
                          </Badge>
                          <Badge variant={event.status === 'confirmed' ? 'default' : 'secondary'}>
                            {event.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Root Cause Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {rootCauseCategories.map((cause, index) => {
                        const Icon = cause.icon;
                        return (
                          <div key={index} className={`p-4 rounded-lg ${cause.bgColor}`}>
                            <div className="flex items-center gap-3 mb-3">
                              <Icon className={`w-5 h-5 ${cause.color}`} />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{cause.category}</span>
                                  <Badge variant={cause.type === 'Primary' ? 'destructive' : 'secondary'}>
                                    {cause.type}
                                  </Badge>
                                  <Badge variant="outline">{cause.confidence}% Confidence</Badge>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground ml-8">{cause.description}</p>
                            <div className="mt-3 ml-8">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-muted-foreground">Confidence Level</span>
                              </div>
                              <Progress value={cause.confidence} className="h-2" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Prioritized Recovery Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recoverySteps.map((step, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Badge variant={step.priority.includes('P0') ? 'destructive' : step.priority.includes('P1') ? 'secondary' : 'outline'}>
                                {step.priority}
                              </Badge>
                              <h4 className="font-medium">{step.title}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{step.effort}</Badge>
                              <Badge variant="outline">{step.impact} Impact</Badge>
                              <Button 
                                variant={step.status === 'ready' ? 'destructive' : step.status === 'in-progress' ? 'default' : 'secondary'} 
                                size="sm"
                                disabled={step.status === 'in-progress'}
                              >
                                {step.status === 'ready' && 'Execute Now'}
                                {step.status === 'in-progress' && (
                                  <>
                                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                                    In Progress
                                  </>
                                )}
                                {step.status === 'pending' && 'Review & Apply'}
                              </Button>
                            </div>
                          </div>
                          <div className="bg-muted rounded-md p-3">
                            <pre className="text-sm overflow-x-auto">{step.code}</pre>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <strong>Rollback Plan:</strong> {step.rollback}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-orange-600" />
                        Customer Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Total Users Affected</span>
                          <span className="font-bold text-orange-600">{incident.affectedUsers.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Failed Transactions</span>
                          <span className="font-bold text-red-600">2,847</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Customer Complaints</span>
                          <span className="font-bold text-red-600">156</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Support Tickets</span>
                          <span className="font-bold text-yellow-600">89</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-red-600" />
                        Business Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Revenue Loss</span>
                          <span className="font-bold text-red-600">{incident.revenueImpact}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Projected Hourly Loss</span>
                          <span className="font-bold text-red-600">$9.2k</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>SLA Credits</span>
                          <span className="font-bold text-orange-600">$3.4k</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Recovery Cost</span>
                          <span className="font-bold text-blue-600">$1.2k</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button 
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              disabled={currentStep === 4}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}