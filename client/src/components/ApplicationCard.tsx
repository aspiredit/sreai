import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatusIndicator, { StatusType } from "./StatusIndicator";
import { Settings, Activity, AlertTriangle, CheckCircle } from "lucide-react";

export interface Application {
  id: string;
  name: string;
  description: string;
  status: StatusType;
  lastUpdated: string;
  connectorsCount: number;
  environment: "production" | "staging" | "development";
}

interface ApplicationCardProps {
  application: Application;
  onViewDetails?: (id: string) => void;
  onConfigure?: (id: string) => void;
  showConfigureButton?: boolean;
}

export default function ApplicationCard({ 
  application, 
  onViewDetails, 
  onConfigure,
  showConfigureButton = false 
}: ApplicationCardProps) {
  const environmentColors = {
    production: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
    staging: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300", 
    development: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
  };

  const handleViewDetails = () => {
    console.log(`Viewing details for ${application.name}`);
    onViewDetails?.(application.id);
  };

  const handleConfigure = () => {
    console.log(`Configuring ${application.name}`);
    onConfigure?.(application.id);
  };

  return (
    <Card className="hover-elevate cursor-pointer transition-all duration-200" data-testid={`app-card-${application.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-foreground">{application.name}</h3>
            <p className="text-sm text-muted-foreground">{application.description}</p>
          </div>
          <Badge className={environmentColors[application.environment]}>
            {application.environment}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <StatusIndicator status={application.status} label={`Status: ${application.status}`} />
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Activity className="w-4 h-4" />
            <span>{application.connectorsCount} connectors</span>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Last updated: {application.lastUpdated}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleViewDetails}
            className="flex-1"
            data-testid={`button-view-${application.id}`}
          >
            View Details
          </Button>
          {showConfigureButton && (
            <Button 
              variant="default" 
              size="sm"
              onClick={handleConfigure}
              className="flex-1"
              data-testid={`button-configure-${application.id}`}
            >
              <Settings className="w-4 h-4 mr-1" />
              Configure
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}