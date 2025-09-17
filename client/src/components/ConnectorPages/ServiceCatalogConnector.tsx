import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, Plus } from "lucide-react";

interface ServiceCatalogTool {
  name: string;
  description: string;
  logo: string;
  website: string;
  connected: boolean;
  category: "Cloud" | "Open Source" | "Enterprise";
}

const serviceCatalogTools: ServiceCatalogTool[] = [
  {
    name: "Backstage",
    description: "Open platform for building developer portals and service catalogs",
    logo: "https://backstage.io/img/logo.svg",
    website: "https://backstage.io/",
    connected: true,
    category: "Open Source"
  },
  {
    name: "Port",
    description: "Developer portal with service catalog and dependency mapping",
    logo: "https://docs.getport.io/img/port.png",
    website: "https://www.getport.io/",
    connected: true,
    category: "Cloud"
  },
  {
    name: "OpsLevel",
    description: "Service ownership and maturity tracking platform",
    logo: "https://www.opslevel.com/hubfs/opslevel-icon.svg",
    website: "https://www.opslevel.com/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Cortex",
    description: "Service catalog with ownership and compliance tracking",
    logo: "https://www.cortex.io/favicon-32x32.png",
    website: "https://www.cortex.io/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "ServiceNow ITSM",
    description: "IT service management with configuration management database",
    logo: "https://logos-world.net/wp-content/uploads/2021/02/ServiceNow-Logo.png",
    website: "https://www.servicenow.com/products/itsm.html",
    connected: false,
    category: "Enterprise"
  },
  {
    name: "Compass (Atlassian)",
    description: "Developer experience platform for tracking service health",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/atlassian/atlassian-original.svg",
    website: "https://www.atlassian.com/software/compass",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Clutch",
    description: "Extensible platform for infrastructure management",
    logo: "https://clutch.sh/img/microservice-dark.svg",
    website: "https://clutch.sh/",
    connected: false,
    category: "Open Source"
  },
  {
    name: "Hygieia",
    description: "DevOps dashboard for visualizing the entire delivery pipeline",
    logo: "https://hygieia.github.io/Hygieia/media/images/hygieia_b.png",
    website: "https://hygieia.github.io/Hygieia/",
    connected: false,
    category: "Open Source"
  }
];

export default function ServiceCatalogConnector() {
  const handleConnect = (tool: ServiceCatalogTool) => {
    window.open(tool.website, '_blank');
  };

  const connectedServices = serviceCatalogTools.filter(s => s.connected);
  const availableServices = serviceCatalogTools.filter(s => !s.connected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Service Catalog & Configuration</h1>
        <p className="text-muted-foreground mt-2">
          Connect your service catalog tools to manage application configurations, dependencies, and ownership
        </p>
      </div>

      {/* Connected Services */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-500" />
          Connected Services ({connectedServices.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {connectedServices.map((tool) => (
            <Card key={tool.name} className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 3h20v18H2z'/%3E%3Cpath d='M8 6h1v4H8z'/%3E%3Cpath d='M15 6h1v4h-1z'/%3E%3Cpath d='M8 14h1v4H8z'/%3E%3Cpath d='M15 14h1v4h-1z'/%3E%3C/svg%3E";
                      }}
                    />
                    <div>
                      <CardTitle className="text-sm">{tool.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {tool.category}
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
                  {tool.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConnect(tool)}
                  className="w-full"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Catalog
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
          {availableServices.map((tool) => (
            <Card key={tool.name} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 3h20v18H2z'/%3E%3Cpath d='M8 6h1v4H8z'/%3E%3Cpath d='M15 6h1v4h-1z'/%3E%3Cpath d='M8 14h1v4H8z'/%3E%3Cpath d='M15 14h1v4h-1z'/%3E%3C/svg%3E";
                      }}
                    />
                    <div>
                      <CardTitle className="text-sm">{tool.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {tool.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">
                  {tool.description}
                </p>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleConnect(tool)}
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