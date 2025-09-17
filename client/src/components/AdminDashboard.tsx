import { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ApplicationCard, { Application } from "./ApplicationCard";
import ConnectorCard, { Connector } from "./ConnectorCard";
import ChatInterface from "./ChatInterface";
import ThemeToggle from "./ThemeToggle";
import { Plus, Search, Settings, BarChart3, Database, FileText, Code, BookOpen, PlayCircle, Users, Bell, LogOut, Globe, GitBranch, Server, Shield, Zap, TrendingUp, AlertTriangle, HardDrive, Eye, EyeOff, Activity } from "lucide-react";

interface AdminSidebarProps {}

function AdminSidebar({}: AdminSidebarProps) {
  const [activeView, setActiveView] = useState("overview");

  const navigationItems = [
    { id: "overview", title: "Overview", icon: BarChart3 },
    { id: "applications", title: "Applications", icon: Database },
    { id: "connectors", title: "Connectors", icon: Settings },
    { id: "users", title: "User Management", icon: Users },
  ];

  const connectorGroups = [
    {
      category: "Observability",
      connectors: [
        { id: "metrics", title: "Metrics", icon: BarChart3 },
        { id: "logs", title: "Logs", icon: FileText },
        { id: "traces", title: "Traces", icon: Activity },
      ]
    },
    {
      category: "Development", 
      connectors: [
        { id: "code", title: "Code", icon: Code },
        { id: "cicd", title: "CI/CD Pipelines", icon: GitBranch },
        { id: "errors", title: "Error Tracking", icon: AlertTriangle },
      ]
    },
    {
      category: "Infrastructure",
      connectors: [
        { id: "database", title: "Database", icon: Database },
        { id: "infrastructure", title: "Infrastructure", icon: Server },
        { id: "performance", title: "Performance", icon: Zap },
        { id: "backup", title: "Backup Systems", icon: HardDrive },
      ]
    },
    {
      category: "Security & Alerts",
      connectors: [
        { id: "security", title: "Security", icon: Shield },
        { id: "notifications", title: "Notifications", icon: Bell },
      ]
    },
    {
      category: "Analytics & Docs",
      connectors: [
        { id: "analytics", title: "Analytics", icon: TrendingUp },
        { id: "api", title: "API Monitoring", icon: Globe },
        { id: "docs", title: "Documentation", icon: BookOpen },
        { id: "runbooks", title: "Runbooks", icon: PlayCircle },
      ]
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <img 
            src="/attached_assets/sreai_1758074442530.png" 
            alt="sreai logo" 
            className="w-8 h-8"
          />
          <span className="font-semibold text-lg">sreai</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => {
                      setActiveView(item.id);
                      console.log(`Switching to ${item.title} view`);
                    }}
                    className={activeView === item.id ? "bg-sidebar-accent" : ""}
                    data-testid={`nav-${item.id}`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {connectorGroups.map((group) => (
          <SidebarGroup key={group.category}>
            <SidebarGroupLabel>{group.category}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.connectors.map((connector) => (
                  <SidebarMenuItem key={connector.id}>
                    <SidebarMenuButton 
                      onClick={() => console.log(`Viewing ${connector.title} connectors`)}
                      data-testid={`connector-${connector.id}`}
                    >
                      <connector.icon className="w-4 h-4" />
                      <span>{connector.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMinimized, setChatMinimized] = useState(false);
  const [isAdminView, setIsAdminView] = useState(true);

  // todo: remove mock functionality
  const mockApplications: Application[] = [
    {
      id: "1",
      name: "E-commerce API",
      description: "Core payment and inventory management service",
      status: "healthy",
      lastUpdated: "2 hours ago",
      connectorsCount: 5,
      environment: "production"
    },
    {
      id: "2", 
      name: "Analytics Dashboard",
      description: "Real-time user analytics and reporting",
      status: "warning",
      lastUpdated: "5 minutes ago", 
      connectorsCount: 3,
      environment: "staging"
    },
    {
      id: "3",
      name: "User Authentication",
      description: "OAuth and user session management",
      status: "error",
      lastUpdated: "1 day ago",
      connectorsCount: 2,
      environment: "development"
    },
    {
      id: "4",
      name: "Payment Processing",
      description: "Secure payment gateway integration",
      status: "healthy",
      lastUpdated: "30 minutes ago",
      connectorsCount: 4,
      environment: "production"
    }
  ];

  // todo: remove mock functionality
  const mockConnectors: Connector[] = [
    {
      id: "1",
      name: "GitHub Integration",
      type: "code",
      status: "healthy",
      lastSync: "5 minutes ago",
      provider: "GitHub",
      description: "Source code repository integration"
    },
    {
      id: "2", 
      name: "CloudWatch Logs",
      type: "logs",
      status: "healthy",
      lastSync: "1 minute ago",
      provider: "AWS CloudWatch", 
      description: "Centralized logging and log analysis"
    },
    {
      id: "3",
      name: "Datadog Metrics",
      type: "metrics",
      status: "warning",
      lastSync: "10 minutes ago", 
      provider: "Datadog",
      description: "Application performance monitoring"
    }
  ];

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AdminSidebar />
        
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications, connectors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-80"
                  data-testid="input-search"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                <div className="flex items-center gap-2 px-2">
                  <EyeOff className={`w-4 h-4 ${!isAdminView ? 'text-primary' : 'text-muted-foreground'}`} />
                  <Switch
                    checked={isAdminView}
                    onCheckedChange={(checked) => {
                      setIsAdminView(checked);
                      console.log(`Switched to ${checked ? 'admin' : 'user'} view`);
                    }}
                    data-testid="switch-view-toggle"
                  />
                  <Eye className={`w-4 h-4 ${isAdminView ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <span className="text-sm font-medium text-foreground px-2">
                  {isAdminView ? 'Admin View' : 'User View'}
                </span>
              </div>
              
              <Button variant="ghost" size="icon" data-testid="button-notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <ThemeToggle />
              <Button variant="ghost" size="icon" data-testid="button-logout">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {isAdminView ? 'Admin Dashboard' : 'User Dashboard'}
                  </h1>
                  <p className="text-muted-foreground">
                    {isAdminView 
                      ? 'Manage applications, connectors, and system configuration'
                      : 'Monitor your assigned applications and diagnostics'
                    }
                  </p>
                </div>
                {isAdminView && (
                  <Button className="gap-2" data-testid="button-add-application">
                    <Plus className="w-4 h-4" />
                    Add Application
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-card p-4 rounded-lg border border-card-border">
                  <div className="text-2xl font-bold text-foreground">
                    {isAdminView ? '12' : '3'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {isAdminView ? 'Total Applications' : 'My Applications'}
                  </div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-card-border">
                  <div className="text-2xl font-bold text-green-600">
                    {isAdminView ? '8' : '2'}
                  </div>
                  <div className="text-sm text-muted-foreground">Healthy</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-card-border">
                  <div className="text-2xl font-bold text-yellow-600">
                    {isAdminView ? '3' : '1'}
                  </div>
                  <div className="text-sm text-muted-foreground">Warnings</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-card-border">
                  <div className="text-2xl font-bold text-red-600">
                    {isAdminView ? '1' : '0'}
                  </div>
                  <div className="text-sm text-muted-foreground">Critical</div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">
                  {isAdminView ? 'Applications' : 'My Applications'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(isAdminView ? mockApplications : mockApplications.slice(0, 3)).map((app) => (
                    <ApplicationCard 
                      key={app.id} 
                      application={app}
                      showConfigureButton={isAdminView}
                      onViewDetails={(id) => console.log('View app details:', id)}
                      onConfigure={(id) => console.log('Configure app:', id)}
                    />
                  ))}
                </div>
              </section>
              
              {isAdminView && (
                <section>
                  <h2 className="text-xl font-semibold mb-4">Recent Connectors</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockConnectors.map((connector) => (
                      <ConnectorCard 
                        key={connector.id} 
                        connector={connector}
                        onConfigure={(id) => console.log('Configure connector:', id)}
                        onDelete={(id) => console.log('Delete connector:', id)}
                        onTest={(id) => console.log('Test connector:', id)}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          </main>
        </div>
        
        {isAdminView && (
          <div className="border-l">
            <ChatInterface 
              isMinimized={chatMinimized}
              onToggleMinimize={() => setChatMinimized(!chatMinimized)}
              className="m-4"
            />
          </div>
        )}
      </div>
    </SidebarProvider>
  );
}