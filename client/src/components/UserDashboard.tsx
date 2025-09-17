import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ApplicationCard, { Application } from "./ApplicationCard";
import ThemeToggle from "./ThemeToggle";
import { Search, Filter, Bell, User, LogOut, RefreshCw } from "lucide-react";

export default function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [environmentFilter, setEnvironmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // todo: remove mock functionality
  const mockUserApps: Application[] = [
    {
      id: "1",
      name: "My E-commerce Store",
      description: "Online retail platform with payment processing",
      status: "healthy",
      lastUpdated: "1 hour ago",
      connectorsCount: 3,
      environment: "production"
    },
    {
      id: "2", 
      name: "Analytics Dashboard",
      description: "Customer behavior and sales analytics",
      status: "warning",
      lastUpdated: "15 minutes ago", 
      connectorsCount: 2,
      environment: "production"
    },
    {
      id: "3",
      name: "Dev Environment", 
      description: "Development and testing environment",
      status: "healthy",
      lastUpdated: "3 hours ago",
      connectorsCount: 4,
      environment: "development"
    }
  ];

  const filteredApps = mockUserApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEnvironment = environmentFilter === "all" || app.environment === environmentFilter;
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesEnvironment && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-card-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">AD</span>
                </div>
                <h1 className="text-xl font-semibold text-foreground">AppDiagnostics</h1>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search your applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                  data-testid="input-search"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => console.log('Refresh data')}
                data-testid="button-refresh"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <ThemeToggle />
              <Button variant="ghost" size="icon" data-testid="button-profile">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-logout">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">My Applications</h2>
          <p className="text-muted-foreground">Monitor and diagnose your assigned applications</p>
        </div>
        
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
            <SelectTrigger className="w-40" data-testid="filter-environment">
              <SelectValue placeholder="Environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Environments</SelectItem>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="development">Development</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32" data-testid="filter-status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
          
          {(environmentFilter !== "all" || statusFilter !== "all") && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setEnvironmentFilter("all");
                setStatusFilter("all");
                console.log("Filters cleared");
              }}
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-card p-4 rounded-lg border border-card-border">
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-sm text-muted-foreground">My Applications</div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-card-border">
            <div className="text-2xl font-bold text-green-600">2</div>
            <div className="text-sm text-muted-foreground">Healthy</div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-card-border">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <div className="text-sm text-muted-foreground">Warnings</div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-card-border">
            <div className="text-2xl font-bold text-blue-600">9</div>
            <div className="text-sm text-muted-foreground">Total Connectors</div>
          </div>
        </div>
        
        {filteredApps.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-2">No applications found</div>
            <div className="text-sm text-muted-foreground">
              {searchQuery ? "Try adjusting your search terms or filters" : "You don't have any applications assigned"}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <ApplicationCard 
                key={app.id} 
                application={app}
                showConfigureButton={false}
                onViewDetails={(id) => console.log('View app details:', id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}