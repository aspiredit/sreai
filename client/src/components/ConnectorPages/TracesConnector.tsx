import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, Plus } from "lucide-react";

interface TracingService {
  name: string;
  description: string;
  logo: string;
  website: string;
  connected: boolean;
  category: "Cloud" | "Open Source" | "Enterprise";
}

const tracingServices: TracingService[] = [
  {
    name: "Jaeger",
    description: "Open source, end-to-end distributed tracing",
    logo: "https://www.jaegertracing.io/img/jaeger-logo.svg",
    website: "https://www.jaegertracing.io/",
    connected: true,
    category: "Open Source"
  },
  {
    name: "Zipkin",
    description: "Distributed tracing system to gather timing data for microservices",
    logo: "https://zipkin.io/public/img/zipkin-logo-200x119.jpg",
    website: "https://zipkin.io/",
    connected: true,
    category: "Open Source"
  },
  {
    name: "AWS X-Ray",
    description: "Analyze and debug production and distributed applications",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    website: "https://aws.amazon.com/xray/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Datadog APM",
    description: "Application performance monitoring with distributed tracing",
    logo: "https://imgix.datadoghq.com/img/dd_logo_v_rgb.png",
    website: "https://www.datadoghq.com/product/apm/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "New Relic APM",
    description: "Application performance monitoring with distributed tracing",
    logo: "https://newrelic.com/assets/newrelic/source/NewRelic-logo-square.svg",
    website: "https://newrelic.com/products/application-monitoring",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Honeycomb",
    description: "Observability for complex software systems",
    logo: "https://www.honeycomb.io/wp-content/uploads/2021/05/Honeycomb-Logo-Icon.svg",
    website: "https://www.honeycomb.io/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Lightstep",
    description: "Observability platform for microservices and distributed systems",
    logo: "https://lightstep.com/static/lightstep-logo.svg",
    website: "https://lightstep.com/",
    connected: false,
    category: "Enterprise"
  },
  {
    name: "OpenTelemetry",
    description: "Vendor-neutral observability framework for cloud-native software",
    logo: "https://opentelemetry.io/img/logos/opentelemetry-logo-nav.png",
    website: "https://opentelemetry.io/",
    connected: true,
    category: "Open Source"
  }
];

export default function TracesConnector() {
  const handleConnect = (service: TracingService) => {
    window.open(service.website, '_blank');
  };

  const connectedServices = tracingServices.filter(s => s.connected);
  const availableServices = tracingServices.filter(s => !s.connected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Distributed Tracing Connectors</h1>
        <p className="text-muted-foreground mt-2">
          Connect your distributed tracing systems to understand request flows and performance bottlenecks
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
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'/%3E%3Cpolyline points='3.27,6.96 12,12.01 20.73,6.96'/%3E%3Cline x1='12' y1='22.08' x2='12' y2='12'/%3E%3C/svg%3E";
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
                  Open Traces
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
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'/%3E%3Cpolyline points='3.27,6.96 12,12.01 20.73,6.96'/%3E%3Cline x1='12' y1='22.08' x2='12' y2='12'/%3E%3C/svg%3E";
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