import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, Plus } from "lucide-react";

interface LogService {
  name: string;
  description: string;
  logo: string;
  website: string;
  connected: boolean;
  category: "Cloud" | "Open Source" | "Enterprise";
}

const logServices: LogService[] = [
  {
    name: "AWS CloudWatch Logs",
    description: "Centralized logging for AWS resources and applications",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    website: "https://aws.amazon.com/cloudwatch/",
    connected: true,
    category: "Cloud"
  },
  {
    name: "Splunk",
    description: "Enterprise platform for searching, monitoring, and analyzing machine data",
    logo: "https://www.splunk.com/content/dam/splunk2/images/icons/splunk-logomark.svg",
    website: "https://www.splunk.com/",
    connected: true,
    category: "Enterprise"
  },
  {
    name: "Datadog Logs",
    description: "Log management and analytics platform",
    logo: "https://imgix.datadoghq.com/img/dd_logo_v_rgb.png",
    website: "https://www.datadoghq.com/product/log-management/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Elasticsearch (ELK Stack)",
    description: "Open source search and analytics engine for logs",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg",
    website: "https://www.elastic.co/elasticsearch/",
    connected: true,
    category: "Open Source"
  },
  {
    name: "New Relic Logs",
    description: "Log management as part of observability platform",
    logo: "https://newrelic.com/assets/newrelic/source/NewRelic-logo-square.svg",
    website: "https://newrelic.com/platform/logs",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Fluentd",
    description: "Open source data collector for unified logging layer",
    logo: "https://www.fluentd.org/assets/img/miscellany/fluentd-logo.png",
    website: "https://www.fluentd.org/",
    connected: false,
    category: "Open Source"
  },
  {
    name: "LogDNA",
    description: "Real-time log aggregation and monitoring",
    logo: "https://logdna.com/wp-content/uploads/2019/03/LogDNA-logo.svg",
    website: "https://www.mezmo.com/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Papertrail",
    description: "Cloud-hosted log management service",
    logo: "https://papertrail-production.s3.amazonaws.com/assets/favicon-96x96.png",
    website: "https://www.papertrail.com/",
    connected: false,
    category: "Cloud"
  }
];

export default function LogsConnector() {
  const handleConnect = (service: LogService) => {
    window.open(service.website, '_blank');
  };

  const connectedServices = logServices.filter(s => s.connected);
  const availableServices = logServices.filter(s => !s.connected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Log Management Connectors</h1>
        <p className="text-muted-foreground mt-2">
          Connect your log management systems to aggregate and analyze application logs
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
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/%3E%3Cpolyline points='14,2 14,8 20,8'/%3E%3Cline x1='16' y1='13' x2='8' y2='13'/%3E%3Cline x1='16' y1='17' x2='8' y2='17'/%3E%3Cpolyline points='10,9 9,9 8,9'/%3E%3C/svg%3E";
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
                  Open Console
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
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/%3E%3Cpolyline points='14,2 14,8 20,8'/%3E%3Cline x1='16' y1='13' x2='8' y2='13'/%3E%3Cline x1='16' y1='17' x2='8' y2='17'/%3E%3Cpolyline points='10,9 9,9 8,9'/%3E%3C/svg%3E";
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