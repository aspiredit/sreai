import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, Plus } from "lucide-react";

interface MetricsService {
  name: string;
  description: string;
  logo: string;
  website: string;
  connected: boolean;
  category: "Cloud" | "Open Source" | "Enterprise";
}

const metricsServices: MetricsService[] = [
  {
    name: "Prometheus",
    description: "Open-source monitoring system with a dimensional data model",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg",
    website: "https://prometheus.io/",
    connected: true,
    category: "Open Source"
  },
  {
    name: "Grafana",
    description: "Multi-platform open source analytics and interactive visualization",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
    website: "https://grafana.com/",
    connected: true,
    category: "Open Source"
  },
  {
    name: "AWS CloudWatch",
    description: "Monitoring and observability service for AWS cloud resources",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    website: "https://aws.amazon.com/cloudwatch/",
    connected: true,
    category: "Cloud"
  },
  {
    name: "Datadog",
    description: "Monitoring and analytics platform for cloud applications",
    logo: "https://imgix.datadoghq.com/img/dd_logo_v_rgb.png",
    website: "https://www.datadoghq.com/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "New Relic",
    description: "Full-stack observability platform for modern software teams",
    logo: "https://newrelic.com/assets/newrelic/source/NewRelic-logo-square.svg",
    website: "https://newrelic.com/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "InfluxDB",
    description: "Time series database built for real-time analytics",
    logo: "https://www.influxdata.com/wp-content/uploads/influxdb-logo.svg",
    website: "https://www.influxdata.com/",
    connected: false,
    category: "Open Source"
  },
  {
    name: "AppDynamics",
    description: "Application performance monitoring and business observability",
    logo: "https://www.appdynamics.com/media/uploaded-files/1551971997/appdynamics-logo.svg",
    website: "https://www.appdynamics.com/",
    connected: false,
    category: "Enterprise"
  },
  {
    name: "Dynatrace",
    description: "AI-powered, full stack, automated performance management",
    logo: "https://dt-cdn.net/images/dynatrace-logo-70x70-d36f68c639.png",
    website: "https://www.dynatrace.com/",
    connected: false,
    category: "Enterprise"
  }
];

export default function MetricsConnector() {
  const handleConnect = (service: MetricsService) => {
    window.open(service.website, '_blank');
  };

  const connectedServices = metricsServices.filter(s => s.connected);
  const availableServices = metricsServices.filter(s => !s.connected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Metrics & Monitoring Connectors</h1>
        <p className="text-muted-foreground mt-2">
          Connect your metrics and monitoring systems to track application performance and health
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
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 3v18h18'/%3E%3Cpath d='m19 9-5 5-4-4-3 3'/%3E%3C/svg%3E";
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
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 3v18h18'/%3E%3Cpath d='m19 9-5 5-4-4-3 3'/%3E%3C/svg%3E";
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