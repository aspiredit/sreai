import React from "react";
import ConnectorCard from '../ConnectorCard';

export default function ConnectorCardExample() {
  const sampleConnectors = [
    {
      id: "1",
      name: "GitHub Integration",
      type: "code" as const,
      status: "healthy" as const,
      lastSync: "5 minutes ago",
      provider: "GitHub",
      description: "Source code repository integration for code analysis and deployment tracking"
    },
    {
      id: "2", 
      name: "CloudWatch Logs",
      type: "logs" as const,
      status: "healthy" as const,
      lastSync: "1 minute ago",
      provider: "AWS CloudWatch", 
      description: "Centralized logging and log analysis from AWS infrastructure"
    },
    {
      id: "3",
      name: "Datadog Metrics",
      type: "metrics" as const,
      status: "warning" as const,
      lastSync: "10 minutes ago", 
      provider: "Datadog",
      description: "Application performance monitoring and custom metrics collection"
    },
    {
      id: "4",
      name: "Confluence Docs",
      type: "documentation" as const,
      status: "healthy" as const,
      lastSync: "2 hours ago",
      provider: "Atlassian Confluence",
      description: "Technical documentation and knowledge base integration"
    },
    {
      id: "5",
      name: "PagerDuty Runbooks",
      type: "runbooks" as const,
      status: "error" as const,
      lastSync: "1 day ago",
      provider: "PagerDuty",
      description: "Incident response procedures and operational runbooks"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {sampleConnectors.map((connector) => (
        <ConnectorCard 
          key={connector.id} 
          connector={connector}
          onConfigure={(id) => console.log('Configure connector:', id)}
          onDelete={(id) => console.log('Delete connector:', id)}
          onTest={(id) => console.log('Test connector:', id)}
        />
      ))}
    </div>
  );
}