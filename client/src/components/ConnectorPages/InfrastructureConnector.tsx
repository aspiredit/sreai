import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, Plus } from "lucide-react";

interface InfraService {
  name: string;
  description: string;
  logo: string;
  website: string;
  connected: boolean;
  category: "Cloud" | "Open Source" | "Enterprise";
}

const infraServices: InfraService[] = [
  {
    name: "AWS",
    description: "Amazon Web Services cloud infrastructure platform",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    website: "https://aws.amazon.com/",
    connected: true,
    category: "Cloud"
  },
  {
    name: "Kubernetes",
    description: "Container orchestration platform",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    website: "https://kubernetes.io/",
    connected: true,
    category: "Open Source"
  },
  {
    name: "Docker",
    description: "Containerization platform",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    website: "https://www.docker.com/",
    connected: true,
    category: "Open Source"
  },
  {
    name: "Google Cloud Platform",
    description: "Google's cloud computing services",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    website: "https://cloud.google.com/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Microsoft Azure",
    description: "Microsoft's cloud computing platform",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    website: "https://azure.microsoft.com/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Terraform",
    description: "Infrastructure as code software tool",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
    website: "https://www.terraform.io/",
    connected: false,
    category: "Open Source"
  },
  {
    name: "Ansible",
    description: "Automation tool for configuration management",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg",
    website: "https://www.ansible.com/",
    connected: false,
    category: "Open Source"
  }
];

export default function InfrastructureConnector() {
  const handleConnect = (service: InfraService) => {
    window.open(service.website, '_blank');
  };

  const connectedServices = infraServices.filter(s => s.connected);
  const availableServices = infraServices.filter(s => !s.connected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Infrastructure Connectors</h1>
        <p className="text-muted-foreground mt-2">
          Connect your cloud infrastructure and container platforms to monitor resources and deployments
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
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'/%3E%3Cline x1='3' y1='6' x2='21' y2='6'/%3E%3Cpath d='M16 10a4 4 0 0 1-8 0'/%3E%3C/svg%3E";
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
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'/%3E%3Cline x1='3' y1='6' x2='21' y2='6'/%3E%3Cpath d='M16 10a4 4 0 0 1-8 0'/%3E%3C/svg%3E";
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