import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, Plus } from "lucide-react";

interface IncidentService {
  name: string;
  description: string;
  logo: string;
  website: string;
  connected: boolean;
  category: "Cloud" | "Open Source" | "Enterprise";
}

const incidentServices: IncidentService[] = [
  {
    name: "JIRA Service Management",
    description: "Atlassian's IT service management and incident tracking platform",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    website: "https://www.atlassian.com/software/jira/service-management",
    connected: true,
    category: "Enterprise"
  },
  {
    name: "ServiceNow",
    description: "Enterprise service management and IT operations platform",
    logo: "https://logos-world.net/wp-content/uploads/2021/02/ServiceNow-Logo.png",
    website: "https://www.servicenow.com/",
    connected: true,
    category: "Enterprise"
  },
  {
    name: "PagerDuty",
    description: "Incident response and digital operations management platform",
    logo: "https://avatars.githubusercontent.com/u/482226?s=200&v=4",
    website: "https://www.pagerduty.com/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Opsgenie",
    description: "Modern incident management platform for always-on services",
    logo: "https://www.vectorlogo.zone/logos/atlassian_opsgenie/atlassian_opsgenie-icon.svg",
    website: "https://www.atlassian.com/software/opsgenie",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Incident.io",
    description: "Modern incident management for engineering teams",
    logo: "https://incident.io/favicon-32x32.png",
    website: "https://incident.io/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "VictorOps (Splunk On-Call)",
    description: "Real-time incident management and collaborative response",
    logo: "https://www.splunk.com/content/dam/splunk2/en_us/images/icons/icon-splunk-on-call.svg",
    website: "https://www.splunk.com/en_us/products/on-call.html",
    connected: false,
    category: "Enterprise"
  }
];

export default function IncidentManagementConnector() {
  const handleConnect = (service: IncidentService) => {
    window.open(service.website, '_blank');
  };

  const connectedServices = incidentServices.filter(s => s.connected);
  const availableServices = incidentServices.filter(s => !s.connected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Incident & Problem Management</h1>
        <p className="text-muted-foreground mt-2">
          Connect your incident management tools to track, manage, and resolve service incidents
        </p>
      </div>

      {/* Connected Services */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-500" />
          Connected Services ({connectedServices.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {connectedServices.map((service) => (
            <Card key={service.name} className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={service.logo}
                      alt={`${service.name} logo`}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'/%3E%3Cline x1='12' y1='9' x2='12' y2='13'/%3E%3Cline x1='12' y1='17' x2='12.01' y2='17'/%3E%3C/svg%3E";
                      }}
                    />
                    <div>
                      <CardTitle className="text-sm">{service.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-500 text-white">
                    Connected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">
                  {service.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConnect(service)}
                  className="w-full"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Dashboard
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Available Services */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-500" />
          Available Integrations ({availableServices.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableServices.map((service) => (
            <Card key={service.name} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={service.logo}
                      alt={`${service.name} logo`}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'/%3E%3Cline x1='12' y1='9' x2='12' y2='13'/%3E%3Cline x1='12' y1='17' x2='12.01' y2='17'/%3E%3C/svg%3E";
                      }}
                    />
                    <div>
                      <CardTitle className="text-sm">{service.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">
                  {service.description}
                </p>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleConnect(service)}
                  className="w-full"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn More & Connect
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}