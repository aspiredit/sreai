import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ExternalLink, Search, Filter, Play, Pause, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";
import { Application } from "../ApplicationCard";

interface LogsTabProps {
  application: Application;
}

interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
  message: string;
  source: string;
  metadata?: Record<string, any>;
}

// Mock log data generator
const generateLogEntry = (appId: string, level: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' = 'INFO'): LogEntry => {
  const isPaymentService = appId === "3";
  const now = new Date();
  
  const errorMessages = [
    "Database connection pool exhausted - unable to acquire connection",
    "Payment gateway timeout after 30s - transaction failed",
    "Circuit breaker OPEN - too many failures detected",
    "Authentication service unavailable - request timeout",
    "Rate limit exceeded for API endpoint /api/payments",
    "Memory allocation failed - heap space exhausted",
    "SSL handshake failed with payment processor",
    "Database deadlock detected - transaction rolled back"
  ];
  
  const infoMessages = [
    "User authentication successful",
    "Payment processed successfully",
    "Cache hit for user profile data",
    "Health check endpoint responded OK",
    "Background job completed successfully",
    "Session created for user",
    "API request processed in 234ms",
    "Database connection established"
  ];
  
  const warnMessages = [
    "High memory usage detected - 85% of heap used",
    "Slow query detected - execution time 2.3s",
    "Connection pool utilization at 90%",
    "API response time above threshold - 1.2s",
    "Retry attempt 3/5 for external service call",
    "Cache miss rate above normal - 15%",
    "Queue depth increasing - 150 pending jobs",
    "SSL certificate expires in 30 days"
  ];

  let message: string;
  let source: string;
  
  if (level === 'ERROR') {
    message = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    source = isPaymentService ? 'payment-service' : 'application-service';
  } else if (level === 'WARN') {
    message = warnMessages[Math.floor(Math.random() * warnMessages.length)];
    source = isPaymentService ? 'payment-gateway' : 'app-monitor';
  } else {
    message = infoMessages[Math.floor(Math.random() * infoMessages.length)];
    source = isPaymentService ? 'payment-api' : 'web-service';
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date(now.getTime() - Math.random() * 3600000), // Random time within last hour
    level,
    message,
    source,
    metadata: {
      requestId: Math.random().toString(36).substr(2, 9),
      userId: Math.floor(Math.random() * 10000),
      endpoint: level === 'ERROR' ? '/api/payments' : '/api/health'
    }
  };
};

export default function LogsTab({ application }: LogsTabProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [isLivePreview, setIsLivePreview] = useState(false);
  const [logLevel, setLogLevel] = useState<string>("ERROR");
  const [timeRange, setTimeRange] = useState("1h");
  const [searchQuery, setSearchQuery] = useState("");
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Initialize with some historical logs
  useEffect(() => {
    const initialLogs: LogEntry[] = [];
    const isPaymentService = application.id === "3";
    
    // Generate more errors for payment service (ongoing incident)
    if (isPaymentService) {
      for (let i = 0; i < 20; i++) {
        initialLogs.push(generateLogEntry(application.id, 'ERROR'));
      }
      for (let i = 0; i < 10; i++) {
        initialLogs.push(generateLogEntry(application.id, 'WARN'));
      }
    } else {
      for (let i = 0; i < 5; i++) {
        initialLogs.push(generateLogEntry(application.id, 'ERROR'));
      }
      for (let i = 0; i < 8; i++) {
        initialLogs.push(generateLogEntry(application.id, 'WARN'));
      }
    }
    
    for (let i = 0; i < 15; i++) {
      initialLogs.push(generateLogEntry(application.id, 'INFO'));
    }

    // Sort by timestamp (newest first)
    initialLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    setLogs(initialLogs);
  }, [application.id]);

  // Live preview - add new logs every few seconds
  useEffect(() => {
    if (!isLivePreview) return;

    const interval = setInterval(() => {
      const isPaymentService = application.id === "3";
      let newLog: LogEntry;
      
      // Payment service has more errors during incident
      if (isPaymentService) {
        const rand = Math.random();
        if (rand < 0.6) {
          newLog = generateLogEntry(application.id, 'ERROR');
        } else if (rand < 0.8) {
          newLog = generateLogEntry(application.id, 'WARN');
        } else {
          newLog = generateLogEntry(application.id, 'INFO');
        }
      } else {
        const rand = Math.random();
        if (rand < 0.1) {
          newLog = generateLogEntry(application.id, 'ERROR');
        } else if (rand < 0.3) {
          newLog = generateLogEntry(application.id, 'WARN');
        } else {
          newLog = generateLogEntry(application.id, 'INFO');
        }
      }

      newLog.timestamp = new Date(); // Current timestamp for live logs
      
      setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 99)]); // Keep last 100 logs
    }, 3000); // New log every 3 seconds

    return () => clearInterval(interval);
  }, [isLivePreview, application.id]);

  // Filter logs based on level, time range, and search query
  useEffect(() => {
    let filtered = logs;

    // Filter by log level
    if (logLevel !== "ALL") {
      filtered = filtered.filter(log => log.level === logLevel);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(log => 
        log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.source.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by time range
    const now = new Date();
    const timeRangeMs = {
      "15m": 15 * 60 * 1000,
      "30m": 30 * 60 * 1000,
      "1h": 60 * 60 * 1000,
      "2h": 2 * 60 * 60 * 1000,
      "4h": 4 * 60 * 60 * 1000
    }[timeRange] || 60 * 60 * 1000;

    filtered = filtered.filter(log => 
      now.getTime() - log.timestamp.getTime() <= timeRangeMs
    );

    setFilteredLogs(filtered);
  }, [logs, logLevel, timeRange, searchQuery]);

  // Auto-scroll to bottom when live preview is on
  useEffect(() => {
    if (isLivePreview && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredLogs, isLivePreview]);

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'ERROR': return XCircle;
      case 'WARN': return AlertTriangle;
      case 'INFO': return Info;
      case 'DEBUG': return CheckCircle;
      default: return Info;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'WARN': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'INFO': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'DEBUG': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Application Logs</h3>
          <p className="text-sm text-muted-foreground">
            Real-time log streaming for {application.name}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href="https://logs.example.com/app/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              View in Splunk
            </a>
          </Button>
        </div>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filters & Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Log Level Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Log Level</label>
              <Select value={logLevel} onValueChange={setLogLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Levels</SelectItem>
                  <SelectItem value="ERROR">ERROR</SelectItem>
                  <SelectItem value="WARN">WARN</SelectItem>
                  <SelectItem value="INFO">INFO</SelectItem>
                  <SelectItem value="DEBUG">DEBUG</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15m">Last 15m</SelectItem>
                  <SelectItem value="30m">Last 30m</SelectItem>
                  <SelectItem value="1h">Last 1h</SelectItem>
                  <SelectItem value="2h">Last 2h</SelectItem>
                  <SelectItem value="4h">Last 4h</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Live Preview Toggle */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Live Preview</label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={isLivePreview}
                  onCheckedChange={setIsLivePreview}
                />
                <div className="flex items-center gap-1">
                  {isLivePreview ? (
                    <>
                      <Pause className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Live</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Paused</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 pt-2 border-t">
            <div className="text-sm">
              <span className="font-medium">{filteredLogs.length}</span>
              <span className="text-muted-foreground"> logs shown</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>{filteredLogs.filter(l => l.level === 'ERROR').length} errors</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>{filteredLogs.filter(l => l.level === 'WARN').length} warnings</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{filteredLogs.filter(l => l.level === 'INFO').length} info</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Log Stream */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Log Stream</CardTitle>
            <div className="flex items-center gap-2">
              {isLivePreview && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Streaming
                </div>
              )}
              <Badge variant="outline">{filteredLogs.length} entries</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 max-h-96 overflow-y-auto font-mono text-sm">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No logs found for the selected filters
              </div>
            ) : (
              filteredLogs.map((log) => {
                const LevelIcon = getLevelIcon(log.level);
                const levelColor = getLevelColor(log.level);
                
                return (
                  <div
                    key={log.id}
                    className="flex items-start gap-3 p-2 hover:bg-muted/50 rounded border-l-2 border-l-transparent hover:border-l-primary transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(log.timestamp)}
                      </span>
                      <Badge className={`text-xs px-2 py-0 ${levelColor}`}>
                        <LevelIcon className="w-3 h-3 mr-1" />
                        {log.level}
                      </Badge>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground font-medium">
                          {log.source}
                        </span>
                        {log.metadata?.requestId && (
                          <Badge variant="outline" className="text-xs">
                            {log.metadata.requestId}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm break-words">
                        {log.message}
                      </div>
                      {log.metadata && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {Object.entries(log.metadata)
                            .filter(([key]) => key !== 'requestId')
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(' | ')}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={logsEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Incident Impact */}
      {application.hasOngoingIncident && (
        <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertTriangle className="w-5 h-5" />
              Incident Impact on Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-600">+567%</div>
                <div className="text-sm text-muted-foreground">Error Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">2.3k/min</div>
                <div className="text-sm text-muted-foreground">Log Volume</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">15</div>
                <div className="text-sm text-muted-foreground">Unique Errors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">89%</div>
                <div className="text-sm text-muted-foreground">Error Logs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}