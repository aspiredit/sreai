import React from "react";
import ApplicationCard from '../ApplicationCard';

export default function ApplicationCardExample() {
  const sampleApps = [
    {
      id: "1",
      name: "E-commerce API",
      description: "Core payment and inventory management service",
      status: "healthy" as const,
      lastUpdated: "2 hours ago",
      connectorsCount: 5,
      environment: "production" as const
    },
    {
      id: "2", 
      name: "Analytics Dashboard",
      description: "Real-time user analytics and reporting",
      status: "warning" as const,
      lastUpdated: "5 minutes ago", 
      connectorsCount: 3,
      environment: "staging" as const
    },
    {
      id: "3",
      name: "User Authentication",
      description: "OAuth and user session management",
      status: "error" as const,
      lastUpdated: "1 day ago",
      connectorsCount: 2,
      environment: "development" as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {sampleApps.map((app) => (
        <ApplicationCard 
          key={app.id} 
          application={app}
          showConfigureButton={true}
          onViewDetails={(id) => console.log('View details:', id)}
          onConfigure={(id) => console.log('Configure:', id)}
        />
      ))}
    </div>
  );
}