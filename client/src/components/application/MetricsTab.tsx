import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Users, Activity, Clock, Zap, AlertTriangle, CheckCircle, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Application } from "../ApplicationCard";

interface MetricsTabProps {
  application: Application;
}

// Mock time series data generator
const generateTimeSeriesData = (points: number = 24, baseValue: number = 100, variance: number = 20) => {
  const data = [];
  const now = new Date();
  
  for (let i = points - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 15 * 60 * 1000); // 15-minute intervals
    const value = baseValue + (Math.random() - 0.5) * variance;
    data.push({
      timestamp: timestamp.toISOString(),
      time: timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      value: Math.max(0, Math.round(value))
    });
  }
  
  return data;
};

// Mock metric data
const getMetricsData = (appId: string, timeRange: string) => {
  const isPaymentService = appId === "3"; // Payment Service has ongoing incident
  
  return {
    customerMetrics: {
      totalUsers: {
        value: isPaymentService ? 8247 : 12543,
        change: isPaymentService ? -12.3 : 8.7,
        data: generateTimeSeriesData(24, isPaymentService ? 8000 : 12000, isPaymentService ? 500 : 800)
      },
      activeConnections: {
        value: isPaymentService ? 156 : 342,
        change: isPaymentService ? -23.1 : 15.2,
        data: generateTimeSeriesData(24, isPaymentService ? 180 : 320, isPaymentService ? 40 : 60)
      },
      uniqueUsers: {
        value: isPaymentService ? 3421 : 5678,
        change: isPaymentService ? -8.9 : 12.4,
        data: generateTimeSeriesData(24, isPaymentService ? 3500 : 5500, isPaymentService ? 200 : 300)
      },
      responseTime: {
        value: isPaymentService ? 2847 : 234,
        change: isPaymentService ? 156.7 : -5.2,
        data: generateTimeSeriesData(24, isPaymentService ? 2500 : 250, isPaymentService ? 800 : 50),
        threshold: { warning: 500, critical: 1000 }
      },
      mttr: {
        value: isPaymentService ? 18.5 : 4.2,
        change: isPaymentService ? 89.3 : -12.1,
        target: 15.0
      }
    },
    applicationMetrics: {
      responses2xx: {
        value: isPaymentService ? 72.3 : 98.7,
        change: isPaymentService ? -15.2 : 1.2,
        data: generateTimeSeriesData(24, isPaymentService ? 75 : 98, isPaymentService ? 10 : 2)
      },
      responses4xx: {
        value: isPaymentService ? 18.9 : 1.1,
        change: isPaymentService ? 234.5 : -8.3,
        data: generateTimeSeriesData(24, isPaymentService ? 15 : 1, isPaymentService ? 8 : 0.5),
        threshold: { warning: 5, critical: 10 }
      },
      responses5xx: {
        value: isPaymentService ? 8.8 : 0.2,
        change: isPaymentService ? 567.8 : 12.5,
        data: generateTimeSeriesData(24, isPaymentService ? 6 : 0.1, isPaymentService ? 4 : 0.1),
        threshold: { warning: 1, critical: 5 }
      }
    }
  };
};

export default function MetricsTab({ application }: MetricsTabProps) {
  const [timeRange, setTimeRange] = useState("1h");
  const [metricsData, setMetricsData] = useState(getMetricsData(application.id, timeRange));

  // Simulate real-time updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMetricsData(getMetricsData(application.id, timeRange));
    }, 10000);

    return () => clearInterval(interval);
  }, [application.id, timeRange]);

  // Update data when time range changes
  useEffect(() => {
    setMetricsData(getMetricsData(application.id, timeRange));
  }, [application.id, timeRange]);

  const getStatusColor = (value: number, threshold?: { warning: number; critical: number }) => {
    if (!threshold) return "text-green-600";
    if (value >= threshold.critical) return "text-red-600";
    if (value >= threshold.warning) return "text-yellow-600";
    return "text-green-600";
  };

  const getStatusIcon = (value: number, threshold?: { warning: number; critical: number }) => {
    if (!threshold) return CheckCircle;
    if (value >= threshold.critical) return AlertTriangle;
    if (value >= threshold.warning) return AlertTriangle;
    return CheckCircle;
  };

  const formatChange = (change: number) => {
    const isPositive = change > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const colorClass = isPositive ? "text-green-600" : "text-red-600";
    
    return (
      <div className={`flex items-center gap-1 ${colorClass}`}>
        <Icon className="w-3 h-3" />
        <span className="text-xs">{Math.abs(change).toFixed(1)}%</span>
      </div>
    );
  };

  const MetricCard = ({ 
    title, 
    value, 
    unit = "", 
    change, 
    data, 
    threshold, 
    sourceUrl = "#",
    sourceName = "Grafana Dashboard"
  }: {
    title: string;
    value: number;
    unit?: string;
    change: number;
    data: any[];
    threshold?: { warning: number; critical: number };
    sourceUrl?: string;
    sourceName?: string;
  }) => {
    const StatusIcon = getStatusIcon(value, threshold);
    const statusColor = getStatusColor(value, threshold);

    return (
      <Card className="hover-lift transition-all duration-200">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <div className="flex items-center gap-2">
              <StatusIcon className={`w-4 h-4 ${statusColor}`} />
              <Button variant="ghost" size="sm" className="h-6 px-2" asChild>
                <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${statusColor}`}>
                {typeof value === 'number' ? value.toLocaleString() : value}
              </span>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
            {formatChange(change)}
          </div>
          
          <div className="h-20 mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={threshold && value >= threshold.critical ? "#ef4444" : 
                                                 threshold && value >= threshold.warning ? "#f59e0b" : "#10b981"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={threshold && value >= threshold.critical ? "#ef4444" : 
                                                  threshold && value >= threshold.warning ? "#f59e0b" : "#10b981"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={threshold && value >= threshold.critical ? "#ef4444" : 
                         threshold && value >= threshold.warning ? "#f59e0b" : "#10b981"}
                  strokeWidth={2}
                  fill={`url(#gradient-${title})`}
                />
                <Tooltip 
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return payload[0].payload.time;
                    }
                    return label;
                  }}
                  formatter={(value: any) => [value, title]}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Source: {sourceName}</span>
            {threshold && (
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">⚠ {threshold.warning}</span>
                <span className="text-red-600">🚨 {threshold.critical}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Application Metrics</h3>
          <p className="text-sm text-muted-foreground">
            Real-time performance metrics for {application.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live Data
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
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
      </div>

      {/* Customer Level Metrics */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h4 className="text-md font-semibold">Customer Level Metrics</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <MetricCard
            title="Total Users"
            value={metricsData.customerMetrics.totalUsers.value}
            change={metricsData.customerMetrics.totalUsers.change}
            data={metricsData.customerMetrics.totalUsers.data}
            sourceUrl="https://grafana.example.com/d/users"
            sourceName="User Analytics"
          />
          <MetricCard
            title="Active Connections"
            value={metricsData.customerMetrics.activeConnections.value}
            change={metricsData.customerMetrics.activeConnections.change}
            data={metricsData.customerMetrics.activeConnections.data}
            sourceUrl="https://grafana.example.com/d/connections"
            sourceName="Connection Pool"
          />
          <MetricCard
            title="Unique Users"
            value={metricsData.customerMetrics.uniqueUsers.value}
            change={metricsData.customerMetrics.uniqueUsers.change}
            data={metricsData.customerMetrics.uniqueUsers.data}
            sourceUrl="https://grafana.example.com/d/unique-users"
            sourceName="User Tracking"
          />
          <MetricCard
            title="Response Time"
            value={metricsData.customerMetrics.responseTime.value}
            unit="ms"
            change={metricsData.customerMetrics.responseTime.change}
            data={metricsData.customerMetrics.responseTime.data}
            threshold={metricsData.customerMetrics.responseTime.threshold}
            sourceUrl="https://grafana.example.com/d/response-time"
            sourceName="APM Dashboard"
          />
          <Card className="hover-lift transition-all duration-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">MTTR for App</CardTitle>
                <Button variant="ghost" size="sm" className="h-6 px-2" asChild>
                  <a href="https://grafana.example.com/d/mttr" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${
                    metricsData.customerMetrics.mttr.value > metricsData.customerMetrics.mttr.target 
                      ? "text-red-600" : "text-green-600"
                  }`}>
                    {metricsData.customerMetrics.mttr.value}
                  </span>
                  <span className="text-sm text-muted-foreground">min</span>
                </div>
                {formatChange(metricsData.customerMetrics.mttr.change)}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Target: {metricsData.customerMetrics.mttr.target} min</span>
                <Badge variant={
                  metricsData.customerMetrics.mttr.value <= metricsData.customerMetrics.mttr.target 
                    ? "default" : "destructive"
                } className="text-xs">
                  {metricsData.customerMetrics.mttr.value <= metricsData.customerMetrics.mttr.target 
                    ? "On Target" : "Above Target"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Level Metrics */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-green-600" />
          <h4 className="text-md font-semibold">Application Level Metrics</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="2XX Responses"
            value={metricsData.applicationMetrics.responses2xx.value}
            unit="%"
            change={metricsData.applicationMetrics.responses2xx.change}
            data={metricsData.applicationMetrics.responses2xx.data}
            sourceUrl="https://grafana.example.com/d/http-status"
            sourceName="HTTP Metrics"
          />
          <MetricCard
            title="4XX Responses"
            value={metricsData.applicationMetrics.responses4xx.value}
            unit="%"
            change={metricsData.applicationMetrics.responses4xx.change}
            data={metricsData.applicationMetrics.responses4xx.data}
            threshold={metricsData.applicationMetrics.responses4xx.threshold}
            sourceUrl="https://grafana.example.com/d/http-status"
            sourceName="HTTP Metrics"
          />
          <MetricCard
            title="5XX Responses"
            value={metricsData.applicationMetrics.responses5xx.value}
            unit="%"
            change={metricsData.applicationMetrics.responses5xx.change}
            data={metricsData.applicationMetrics.responses5xx.data}
            threshold={metricsData.applicationMetrics.responses5xx.threshold}
            sourceUrl="https://grafana.example.com/d/http-status"
            sourceName="HTTP Metrics"
          />
        </div>
      </div>

      {/* Status Summary */}
      {application.hasOngoingIncident && (
        <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertTriangle className="w-5 h-5" />
              Metrics Impact from Ongoing Incident
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-600">+156%</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">-23%</div>
                <div className="text-sm text-muted-foreground">Active Connections</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">+567%</div>
                <div className="text-sm text-muted-foreground">5XX Errors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">+89%</div>
                <div className="text-sm text-muted-foreground">MTTR</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}