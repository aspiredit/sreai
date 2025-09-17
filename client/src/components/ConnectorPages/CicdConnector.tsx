import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, Plus } from "lucide-react";

interface CicdService {
  name: string;
  description: string;
  logo: string;
  website: string;
  connected: boolean;
  category: "Cloud" | "Open Source" | "Enterprise";
}

const cicdServices: CicdService[] = [
  {
    name: "GitHub Actions",
    description: "Automate workflows directly from GitHub repositories",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    website: "https://github.com/features/actions",
    connected: true,
    category: "Cloud"
  },
  {
    name: "GitLab CI/CD",
    description: "Built-in continuous integration and deployment",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    website: "https://docs.gitlab.com/ee/ci/",
    connected: true,
    category: "Cloud"
  },
  {
    name: "Jenkins",
    description: "Open source automation server for CI/CD pipelines",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
    website: "https://www.jenkins.io/",
    connected: true,
    category: "Open Source"
  },
  {
    name: "Azure Pipelines",
    description: "Microsoft's cloud-based CI/CD service",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    website: "https://azure.microsoft.com/en-us/services/devops/pipelines/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "CircleCI",
    description: "Continuous integration and delivery platform",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/circleci/circleci-plain.svg",
    website: "https://circleci.com/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Travis CI",
    description: "Hosted continuous integration service",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/travis/travis-plain.svg",
    website: "https://travis-ci.org/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "TeamCity",
    description: "JetBrains' build management and continuous integration server",
    logo: "https://resources.jetbrains.com/storage/products/teamcity/img/meta/teamcity_logo_300x300.png",
    website: "https://www.jetbrains.com/teamcity/",
    connected: false,
    category: "Enterprise"
  },
  {
    name: "Bamboo",
    description: "Atlassian's continuous integration and deployment tool",
    logo: "https://wac-cdn.atlassian.com/dam/jcr:e348b562-4152-4cdc-8a55-63d27c4a50ec/bamboo-icon-gradient-blue.svg",
    website: "https://www.atlassian.com/software/bamboo",
    connected: false,
    category: "Enterprise"
  },
  {
    name: "AWS CodePipeline",
    description: "Continuous integration and deployment service on AWS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    website: "https://aws.amazon.com/codepipeline/",
    connected: false,
    category: "Cloud"
  },
  {
    name: "Google Cloud Build",
    description: "Serverless CI/CD platform on Google Cloud",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    website: "https://cloud.google.com/build",
    connected: false,
    category: "Cloud"
  }
];

export default function CicdConnector() {
  const handleConnect = (service: CicdService) => {
    window.open(service.website, '_blank');
  };

  const connectedServices = cicdServices.filter(s => s.connected);
  const availableServices = cicdServices.filter(s => !s.connected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">CI/CD Pipeline Connectors</h1>
        <p className="text-muted-foreground mt-2">
          Connect your continuous integration and deployment pipelines to monitor build status and deployment metrics
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
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'/%3E%3C/svg%3E";
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
                  Open Pipelines
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
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'/%3E%3C/svg%3E";
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