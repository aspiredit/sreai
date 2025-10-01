import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatusIndicator, { StatusType } from "./StatusIndicator";
import { Code, FileText, BarChart3, BookOpen, PlayCircle, Settings, Trash2, Globe, Database, GitBranch, Server, Shield, Zap, TrendingUp, AlertTriangle, Bell, HardDrive, Activity } from "lucide-react";

export type ConnectorType = "code" | "logs" | "metrics" | "traces" | "documentation" | "runbooks" | "api" | "database" | "cicd" | "infrastructure" | "security" | "performance" | "analytics" | "errors" | "notifications" | "backup";

export interface Connector {
  id: string;
  name: string;
  type: ConnectorType;
  status: StatusType;
  lastSync: string;
  provider: string;
  description: string;
}

interface ConnectorCardProps {
  connector: Connector;
  onConfigure?: (id: string) => void;
  onDelete?: (id: string) => void;
  onTest?: (id: string) => void;
}

const connectorIcons = {
  code: Code,
  logs: FileText,
  metrics: BarChart3,
  traces: Activity,
  documentation: BookOpen,
  runbooks: PlayCircle,
  api: Globe,
  database: Database,
  cicd: GitBranch,
  infrastructure: Server,
  security: Shield,
  performance: Zap,
  analytics: TrendingUp,
  errors: AlertTriangle,
  notifications: Bell,
  backup: HardDrive
};

const connectorColors = {
  code: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  logs: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  metrics: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
  traces: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300",
  documentation: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
  runbooks: "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300",
  api: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300",
  database: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300",
  cicd: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  infrastructure: "bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300",
  security: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
  performance: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
  analytics: "bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-300",
  errors: "bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-300",
  notifications: "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300",
  backup: "bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-300"
};

export default function ConnectorCard({ connector, onConfigure, onDelete, onTest }: ConnectorCardProps) {
  const Icon = connectorIcons[connector.type];

  const handleConfigure = () => {
    console.log(`Configuring connector: ${connector.name}`);
    onConfigure?.(connector.id);
  };

  const handleDelete = () => {
    console.log(`Deleting connector: ${connector.name}`);
    onDelete?.(connector.id);
  };

  const handleTest = () => {
    console.log(`Testing connector: ${connector.name}`);
    onTest?.(connector.id);
  };

  return (
    <Card className="hover-elevate transition-all duration-200" data-testid={`connector-card-${connector.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-md ${connectorColors[connector.type]}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{connector.name}</h3>
              <p className="text-sm text-muted-foreground">{connector.provider}</p>
            </div>
          </div>
          <Badge variant="outline" className="capitalize">
            {connector.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{connector.description}</p>
        
        <div className="flex items-center justify-between">
          <StatusIndicator status={connector.status} label={`Status: ${connector.status}`} />
          <span className="text-xs text-muted-foreground">
            Last sync: {connector.lastSync}
          </span>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleTest}
            data-testid={`button-test-${connector.id}`}
          >
            Test
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleConfigure}
            data-testid={`button-configure-${connector.id}`}
          >
            <Settings className="w-4 h-4 mr-1" />
            Configure
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDelete}
            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
            data-testid={`button-delete-${connector.id}`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}