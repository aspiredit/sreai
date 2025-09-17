import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ApplicationCard, { Application } from "./ApplicationCard";
import ChatInterface from "./ChatInterface";
import ThemeToggle from "./ThemeToggle";
import { Search, Filter, Bell, User, LogOut, RefreshCw, ArrowLeft, Download, FileText, AlertTriangle, CheckCircle, XCircle, Clock, ExternalLink, TrendingUp, TrendingDown, Target, Calendar, Users, DollarSign, Zap, GitBranch, Database, Server, Shield, Eye, BarChart3, Activity, Gauge } from "lucide-react";

interface UserDashboardProps {
  onLogout?: () => void;
}

export default function UserDashboard({ onLogout }: UserDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [environmentFilter, setEnvironmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [chatMinimized, setChatMinimized] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // todo: remove mock functionality
  const mockUserApps: Application[] = [
    {
      id: "1",
      name: "My E-commerce Store",
      description: "Online retail platform with payment processing",
      status: "healthy",
      lastUpdated: "1 hour ago",
      connectorsCount: 3,
      environment: "production"
    },
    {
      id: "2", 
      name: "Analytics Dashboard",
      description: "Customer behavior and sales analytics",
      status: "warning",
      lastUpdated: "15 minutes ago", 
      connectorsCount: 2,
      environment: "production"
    },
    {
      id: "3",
      name: "Payment Service",
      description: "Critical payment processing microservice",
      status: "error",
      lastUpdated: "5 minutes ago",
      connectorsCount: 6,
      environment: "production"
    },
    {
      id: "4",
      name: "Dev Environment",
      description: "Development and testing environment",
      status: "healthy",
      lastUpdated: "3 hours ago",
      connectorsCount: 4,
      environment: "development"
    }
  ];

  const filteredApps = mockUserApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEnvironment = environmentFilter === "all" || app.environment === environmentFilter;
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesEnvironment && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-card-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <img 
                  src="/sreai_1758074442530.png" 
                  alt="sreai logo" 
                  className="w-8 h-8 rounded"
                />
                <h1 className="text-xl font-semibold text-foreground">sreai</h1>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search your applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                  data-testid="input-search"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => console.log('Refresh data')}
                data-testid="button-refresh"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <ThemeToggle />
              <Button variant="ghost" size="icon" data-testid="button-profile">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onLogout} data-testid="button-logout">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedApp ? (
          <div className="space-y-6">
            {/* Header with back button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedApp(null)}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Applications
                </Button>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">{selectedApp.name}</h2>
                  <p className="text-muted-foreground">{selectedApp.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={
                  selectedApp.status === 'healthy' ? 'default' :
                  selectedApp.status === 'warning' ? 'secondary' : 'destructive'
                }>
                  {selectedApp.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{selectedApp.environment}</span>
              </div>
            </div>

            {/* Critical Error Overview - Only for Error Applications */}
            {selectedApp.status === 'error' && (
              <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                    <AlertTriangle className="w-5 h-5" />
                    Critical Error Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">24.7%</div>
                        <div className="text-sm text-muted-foreground">Error Rate</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                        <Gauge className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">87%</div>
                        <div className="text-sm text-muted-foreground">RCA Confidence</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                        <Users className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">2,847</div>
                        <div className="text-sm text-muted-foreground">Affected Users</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                        <DollarSign className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">$18.4k</div>
                        <div className="text-sm text-muted-foreground">Revenue Impact</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Standard Status Overview - For Non-Error Applications */}
            {selectedApp.status !== 'error' && (
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="text-2xl font-bold">5</div>
                        <div className="text-sm text-muted-foreground">Connected</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <div>
                        <div className="text-2xl font-bold">2</div>
                        <div className="text-sm text-muted-foreground">Warnings</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <div>
                        <div className="text-2xl font-bold">1</div>
                        <div className="text-sm text-muted-foreground">Failed</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="text-2xl font-bold">15m</div>
                        <div className="text-sm text-muted-foreground">Last Check</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Comprehensive Error Analysis - For Error Applications */}
            {selectedApp.status === 'error' && (
              <>
                {/* Real-time RCA Analysis */}
                <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                        <Target className="w-5 h-5" />
                        Live Root Cause Analysis - Payment Gateway Failure
                      </div>
                      <Badge variant="destructive" className="animate-pulse">
                        87% Confidence
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Timeline of Events */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Event Timeline
                      </h4>
                      <div className="space-y-3">
                        {[
                          { time: "14:23:15", event: "Database connection pool exhausted", severity: "critical", component: "PostgreSQL" },
                          { time: "14:23:20", event: "Payment service timeout spike detected", severity: "high", component: "Payment API" },
                          { time: "14:23:25", event: "Circuit breaker triggered", severity: "medium", component: "Gateway" },
                          { time: "14:23:30", event: "Error rate exceeded 20% threshold", severity: "critical", component: "Monitoring" }
                        ].map((event, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                            <div className="text-sm font-mono text-muted-foreground">{event.time}</div>
                            <div className="flex-1">
                              <div className="font-medium">{event.event}</div>
                              <div className="text-sm text-muted-foreground">{event.component}</div>
                            </div>
                            <Badge variant={event.severity === 'critical' ? 'destructive' : event.severity === 'high' ? 'secondary' : 'outline'}>
                              {event.severity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Root Cause Categories */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Root Cause Analysis
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Database className="w-4 h-4 text-red-600" />
                            <span className="font-medium">Infrastructure (Primary)</span>
                            <Badge variant="destructive">95% Confidence</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Database connection pool misconfiguration causing resource exhaustion during peak load</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <GitBranch className="w-4 h-4 text-orange-600" />
                            <span className="font-medium">Code (Contributing)</span>
                            <Badge variant="secondary">72% Confidence</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Inefficient connection handling in payment processing service</p>
                        </div>
                      </div>
                    </div>

                    {/* Impact Analysis */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4" />
                        Business Impact Analysis
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">2,847</div>
                          <div className="text-sm text-muted-foreground">Failed Transactions</div>
                        </div>
                        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">$18.4k</div>
                          <div className="text-sm text-muted-foreground">Revenue Loss</div>
                        </div>
                        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">12m</div>
                          <div className="text-sm text-muted-foreground">Avg Resolution</div>
                        </div>
                        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">87%</div>
                          <div className="text-sm text-muted-foreground">Customer Retention</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Prioritized Fix Steps */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Prioritized Recovery Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        priority: "P0 - Critical",
                        title: "Increase Database Connection Pool",
                        effort: "2 mins",
                        impact: "High",
                        action: "immediate",
                        code: "# Increase max connections in database.yml\nmax_connections: 50  # increased from 20\npool_timeout: 10\ncheckout_timeout: 5",
                        rollback: "Revert connection pool settings if CPU usage exceeds 85%"
                      },
                      {
                        priority: "P1 - High",
                        title: "Deploy Circuit Breaker Fix",
                        effort: "5 mins",
                        impact: "Medium",
                        action: "deploy",
                        code: "// Update circuit breaker configuration\nconst circuitBreaker = {\n  threshold: 0.5,\n  timeout: 3000,\n  resetTimeout: 30000\n}",
                        rollback: "Automatic rollback via blue-green deployment if error rate increases"
                      },
                      {
                        priority: "P2 - Medium",
                        title: "Optimize Connection Management",
                        effort: "15 mins",
                        impact: "High",
                        action: "code-review",
                        code: "// Implement connection pooling best practices\nconst pool = new Pool({\n  max: 20,\n  idleTimeoutMillis: 30000,\n  connectionTimeoutMillis: 2000\n})",
                        rollback: "Test in staging environment first"
                      }
                    ].map((step, index) => (
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
                            <Button variant={step.action === 'immediate' ? 'destructive' : 'default'} size="sm">
                              {step.action === 'immediate' ? 'Execute Now' : step.action === 'deploy' ? 'Deploy' : 'Review & Apply'}
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
                  </CardContent>
                </Card>

                {/* Similar Incidents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Similar Incidents & Learnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        date: "2024-01-08",
                        title: "Database Connection Pool Exhaustion",
                        resolution: "Increased pool size + connection monitoring",
                        mttr: "8 minutes",
                        prevention: "Added proactive alerting at 70% pool usage"
                      },
                      {
                        date: "2023-12-15",
                        title: "Payment Gateway Timeout Cascade",
                        resolution: "Circuit breaker implementation",
                        mttr: "15 minutes",
                        prevention: "Implemented exponential backoff strategy"
                      }
                    ].map((incident, index) => (
                      <div key={index} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{incident.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{incident.date}</Badge>
                            <Badge variant="outline">MTTR: {incident.mttr}</Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Resolution:</strong> {incident.resolution}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Prevention Added:</strong> {incident.prevention}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}

            {/* Standard RCA Reports - For Non-Error Applications */}
            {selectedApp.status !== 'error' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Root Cause Analysis Reports
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Performance Optimization Analysis",
                      date: "2024-01-15",
                      severity: "Medium",
                      status: "Resolved",
                      description: "Analysis of response time improvements and caching optimizations"
                    },
                    {
                      title: "Capacity Planning Report",
                      date: "2024-01-12",
                      severity: "Low",
                      status: "Completed",
                      description: "Proactive analysis of resource utilization trends and scaling recommendations"
                    },
                    {
                      title: "Security Vulnerability Assessment",
                      date: "2024-01-10",
                      severity: "Medium",
                      status: "In Progress",
                      description: "Regular security analysis and dependency vulnerability scanning"
                    }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{report.title}</h4>
                          <Badge variant={
                            report.severity === 'High' ? 'destructive' :
                            report.severity === 'Medium' ? 'secondary' : 'outline'
                          }>
                            {report.severity}
                          </Badge>
                          <Badge variant="outline">{report.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                        <span className="text-xs text-muted-foreground">{report.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="w-4 h-4" />
                          Download PDF
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Connector Status Details */}
            <Card>
              <CardHeader>
                <CardTitle>Connector Status & Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "AWS CloudWatch Logs", type: "Logs", status: "healthy", lastSync: "2 min ago", issues: 0 },
                    { name: "Datadog Metrics", type: "Metrics", status: "warning", lastSync: "5 min ago", issues: 2 },
                    { name: "GitHub Repository", type: "Code", status: "healthy", lastSync: "1 min ago", issues: 0 },
                    { name: "PostgreSQL Monitor", type: "Database", status: "healthy", lastSync: "30 sec ago", issues: 0 },
                    { name: "Jenkins CI/CD", type: "CI/CD", status: "error", lastSync: "15 min ago", issues: 1 },
                    { name: "Sentry Error Tracking", type: "Errors", status: "warning", lastSync: "3 min ago", issues: 1 },
                    { name: "Jaeger Tracing", type: "Traces", status: "healthy", lastSync: "1 min ago", issues: 0 },
                    { name: "Kubernetes Cluster", type: "Infrastructure", status: "healthy", lastSync: "45 sec ago", issues: 0 }
                  ].map((connector, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          connector.status === 'healthy' ? 'bg-green-500' :
                          connector.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <div className="font-medium">{connector.name}</div>
                          <div className="text-sm text-muted-foreground">{connector.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">Last sync: {connector.lastSync}</span>
                        {connector.issues > 0 && (
                          <Badge variant="destructive">{connector.issues} issue{connector.issues > 1 ? 's' : ''}</Badge>
                        )}
                        <Button variant="outline" size="sm" className="gap-2">
                          <ExternalLink className="w-4 h-4" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fix Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Fixes & Code Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Optimize Database Connection Pool",
                    priority: "High",
                    description: "Current connection pool size may be insufficient during peak traffic",
                    code: `// Increase connection pool size in config/database.js
const pool = new Pool({
  max: 20, // increased from 10
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});`
                  },
                  {
                    title: "Add Circuit Breaker Pattern",
                    priority: "Medium",
                    description: "Implement circuit breaker for external API calls to prevent cascade failures",
                    code: `// Add circuit breaker middleware
const CircuitBreaker = require('opossum');
const options = {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
};
const breaker = new CircuitBreaker(apiCall, options);`
                  }
                ].map((fix, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{fix.title}</h4>
                        <Badge variant={fix.priority === 'High' ? 'destructive' : 'secondary'}>
                          {fix.priority} Priority
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">Apply Fix</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{fix.description}</p>
                    <div className="bg-muted rounded-md p-3">
                      <pre className="text-sm overflow-x-auto">{fix.code}</pre>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">My Applications</h2>
              <p className="text-muted-foreground">Monitor and diagnose your assigned applications</p>
            </div>
        
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
            <SelectTrigger className="w-40" data-testid="filter-environment">
              <SelectValue placeholder="Environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Environments</SelectItem>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="development">Development</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32" data-testid="filter-status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
          
          {(environmentFilter !== "all" || statusFilter !== "all") && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setEnvironmentFilter("all");
                setStatusFilter("all");
                console.log("Filters cleared");
              }}
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-card p-4 rounded-lg border border-card-border">
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-sm text-muted-foreground">My Applications</div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-card-border">
            <div className="text-2xl font-bold text-green-600">2</div>
            <div className="text-sm text-muted-foreground">Healthy</div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-card-border">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <div className="text-sm text-muted-foreground">Warnings</div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-card-border">
            <div className="text-2xl font-bold text-blue-600">9</div>
            <div className="text-sm text-muted-foreground">Total Connectors</div>
          </div>
        </div>
        
        {filteredApps.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-2">No applications found</div>
            <div className="text-sm text-muted-foreground">
              {searchQuery ? "Try adjusting your search terms or filters" : "You don't have any applications assigned"}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                showConfigureButton={false}
                onViewDetails={(id) => {
                  const app = mockUserApps.find(a => a.id === id);
                  if (app) setSelectedApp(app);
                }}
              />
            ))}
          </div>
        )}

        <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">My Applications</h2>
              <p className="text-muted-foreground">Monitor and diagnose your assigned applications</p>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>

              <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
                <SelectTrigger className="w-40" data-testid="filter-environment">
                  <SelectValue placeholder="Environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Environments</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32" data-testid="filter-status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="healthy">Healthy</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>

              {(environmentFilter !== "all" || statusFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEnvironmentFilter("all");
                    setStatusFilter("all");
                    console.log("Filters cleared");
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-card p-4 rounded-lg border border-card-border">
                <div className="text-2xl font-bold text-foreground">4</div>
                <div className="text-sm text-muted-foreground">My Applications</div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-card-border">
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-sm text-muted-foreground">Healthy</div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-card-border">
                <div className="text-2xl font-bold text-yellow-600">1</div>
                <div className="text-sm text-muted-foreground">Warnings</div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-card-border">
                <div className="text-2xl font-bold text-red-600">1</div>
                <div className="text-sm text-muted-foreground">Errors</div>
              </div>
            </div>

            {filteredApps.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-2">No applications found</div>
                <div className="text-sm text-muted-foreground">
                  {searchQuery ? "Try adjusting your search terms or filters" : "You don't have any applications assigned"}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApps.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    showConfigureButton={false}
                    onViewDetails={(id) => {
                      const app = mockUserApps.find(a => a.id === id);
                      if (app) setSelectedApp(app);
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      
      {/* Chat Interface - Bottom Right Corner */}
      <div className="fixed bottom-4 right-4 z-50">
        <ChatInterface 
          isMinimized={chatMinimized}
          onToggleMinimize={() => setChatMinimized(!chatMinimized)}
          userRole="user"
        />
      </div>
    </div>
  );
}