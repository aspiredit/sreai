import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, Plus } from "lucide-react";

interface CodeService {
  name: string;
  description: string;
  logo: string;
  website: string;
  connected: boolean;
  category: "Cloud" | "Open Source" | "Enterprise";
}

const codeServices: CodeService[] = [
  {
    name: "GitHub",
    description: "Git repository hosting service with collaboration features",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    website: "https://github.com/",
    connected: true,
    category: "Cloud"
  },
  {
    name: "GitLab",
    description: "DevOps platform with built-in CI/CD and project management",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    website: "https://gitlab.com/",
    connected: true,
    category: "Cloud"
  },
  {
    name: "Bitbucket",
    description: "Git repository management solution designed for teams",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg",
    website: "https://bitbucket.org/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Azure DevOps",
    description: "Microsoft's suite of development tools and services",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    website: "https://azure.microsoft.com/en-us/services/devops/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Git",
    description: "Distributed version control system",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    website: "https://git-scm.com/",
    connected: true,
    category: "Open Source"
  },
  {
    name: "Subversion (SVN)",
    description: "Centralized version control system",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/subversion/subversion-original.svg",
    website: "https://subversion.apache.org/",
    connected: false,
    category: "Open Source"
  },
  {
    name: "Perforce",
    description: "Enterprise version control and collaboration platform",
    logo: "https://www.perforce.com/sites/default/files/image/2020-07/image-blog-enterprises-database-git-performance.jpg",
    website: "https://www.perforce.com/",
    connected: false,
    category: "Enterprise"
  },
  {
    name: "CodeCommit",
    description: "AWS managed source control service that hosts Git repositories",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    website: "https://aws.amazon.com/codecommit/",
    connected: false,
    category: "Cloud"
  }
];

export default function CodeConnector() {
  const handleConnect = (service: CodeService) => {
    window.open(service.website, '_blank');
  };

  const connectedServices = codeServices.filter(s => s.connected);
  const availableServices = codeServices.filter(s => !s.connected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Code Repository Connectors</h1>
        <p className="text-muted-foreground mt-2">
          Connect your code repositories to track commits, branches, and code quality metrics
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
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 19c-5 0-8-3-8-6 0-1 0-2 1-3h11.5a6.5 6.5 0 0 0 0-13 4.5 4.5 0 0 0-4.5 4.5'/%3E%3Cpath d='M12 12l6-6'/%3E%3Cpath d='m18 6-6 6'/%3E%3C/svg%3E";
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
                  Open Repository
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
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 19c-5 0-8-3-8-6 0-1 0-2 1-3h11.5a6.5 6.5 0 0 0 0-13 4.5 4.5 0 0 0-4.5 4.5'/%3E%3Cpath d='M12 12l6-6'/%3E%3Cpath d='m18 6-6 6'/%3E%3C/svg%3E";
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