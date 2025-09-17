import { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ApplicationCard, { Application } from "./ApplicationCard";
import ConnectorCard, { Connector } from "./ConnectorCard";
import ChatInterface from "./ChatInterface";
import ThemeToggle from "./ThemeToggle";
import LogsConnector from "./ConnectorPages/LogsConnector";
import MetricsConnector from "./ConnectorPages/MetricsConnector";
import TracesConnector from "./ConnectorPages/TracesConnector";
import CodeConnector from "./ConnectorPages/CodeConnector";
import CicdConnector from "./ConnectorPages/CicdConnector";
import ErrorTrackingConnector from "./ConnectorPages/ErrorTrackingConnector";
import DatabaseConnector from "./ConnectorPages/DatabaseConnector";
import InfrastructureConnector from "./ConnectorPages/InfrastructureConnector";
import IncidentManagementConnector from "./ConnectorPages/IncidentManagementConnector";
import ServiceCatalogConnector from "./ConnectorPages/ServiceCatalogConnector";
import { Plus, Search, Settings, BarChart3, Database, FileText, Code, BookOpen, PlayCircle, Users, Bell, LogOut, Globe, GitBranch, Server, Shield, Zap, TrendingUp, AlertTriangle, HardDrive, Eye, EyeOff, Activity, ClipboardList, Layers } from "lucide-react";

interface AdminSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

function AdminSidebar({ activeView, setActiveView }: AdminSidebarProps) {

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
    },
    {
      category: "Service Management",
      connectors: [
        { id: "incidents", title: "Incident Management", icon: ClipboardList },
        { id: "servicecatalog", title: "Service Catalog", icon: Layers },
      ]
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <img 
            src="/sreai-logo.png" 
            alt="sreai logo" 
            className="w-8 h-8 rounded"
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
                      onClick={() => {
                        setActiveView(connector.id);
                        console.log(`Viewing ${connector.title} connectors`);
                      }}
                      className={activeView === connector.id ? "bg-sidebar-accent" : ""}
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

interface AdminDashboardProps {
  onLogout?: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMinimized, setChatMinimized] = useState(false);
  const [isAdminView, setIsAdminView] = useState(true);
  const [activeView, setActiveView] = useState("overview");

  const renderMainContent = () => {
    switch (activeView) {
      case "applications":
        return renderApplicationsContent();
      case "connectors":
        return renderConnectorsContent();
      case "users":
        return renderUserManagementContent();
      case "logs":
        return <LogsConnector />;
      case "metrics":
        return <MetricsConnector />;
      case "traces":
        return <TracesConnector />;
      case "code":
        return <CodeConnector />;
      case "cicd":
        return <CicdConnector />;
      case "errors":
        return <ErrorTrackingConnector />;
      case "database":
        return <DatabaseConnector />;
      case "infrastructure":
        return <InfrastructureConnector />;
      case "incidents":
        return <IncidentManagementConnector />;
      case "servicecatalog":
        return <ServiceCatalogConnector />;
      case "performance":
        return <div className="p-8 text-center"><h1 className="text-2xl font-bold">Performance Monitoring</h1><p className="text-muted-foreground mt-2">Performance monitoring connectors coming soon...</p></div>;
      case "backup":
        return <div className="p-8 text-center"><h1 className="text-2xl font-bold">Backup Systems</h1><p className="text-muted-foreground mt-2">Backup system connectors coming soon...</p></div>;
      case "security":
        return <div className="p-8 text-center"><h1 className="text-2xl font-bold">Security</h1><p className="text-muted-foreground mt-2">Security monitoring connectors coming soon...</p></div>;
      case "notifications":
        return <div className="p-8 text-center"><h1 className="text-2xl font-bold">Notifications</h1><p className="text-muted-foreground mt-2">Notification system connectors coming soon...</p></div>;
      case "analytics":
        return <div className="p-8 text-center"><h1 className="text-2xl font-bold">Analytics</h1><p className="text-muted-foreground mt-2">Analytics platform connectors coming soon...</p></div>;
      case "api":
        return <div className="p-8 text-center"><h1 className="text-2xl font-bold">API Monitoring</h1><p className="text-muted-foreground mt-2">API monitoring connectors coming soon...</p></div>;
      case "docs":
        return <div className="p-8 text-center"><h1 className="text-2xl font-bold">Documentation</h1><p className="text-muted-foreground mt-2">Documentation platform connectors coming soon...</p></div>;
      case "runbooks":
        return <div className="p-8 text-center"><h1 className="text-2xl font-bold">Runbooks</h1><p className="text-muted-foreground mt-2">Runbook management connectors coming soon...</p></div>;
      case "overview":
      default:
        return renderOverviewContent();
    }
  };

  const renderApplicationsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor all applications in your infrastructure
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Application
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-card-border">
          <div className="text-2xl font-bold text-foreground">12</div>
          <div className="text-sm text-muted-foreground">Total Applications</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-card-border">
          <div className="text-2xl font-bold text-green-600">8</div>
          <div className="text-sm text-muted-foreground">Healthy</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-card-border">
          <div className="text-2xl font-bold text-yellow-600">3</div>
          <div className="text-sm text-muted-foreground">Warning</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-card-border">
          <div className="text-2xl font-bold text-red-600">1</div>
          <div className="text-sm text-muted-foreground">Critical</div>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search applications..."
          className="pl-8 max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockApplications.map((app) => (
          <ApplicationCard
            key={app.id}
            application={app}
            showConfigureButton={true}
            onViewDetails={(id) => console.log('View app details:', id)}
            onConfigure={(id) => console.log('Configure app:', id)}
          />
        ))}
      </div>
    </div>
  );

  const renderConnectorsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Connectors</h1>
          <p className="text-muted-foreground mt-2">
            Manage integrations with your infrastructure and development tools
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Connector
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-card-border">
          <div className="text-2xl font-bold text-foreground">18</div>
          <div className="text-sm text-muted-foreground">Total Connectors</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-card-border">
          <div className="text-2xl font-bold text-green-600">15</div>
          <div className="text-sm text-muted-foreground">Active</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-card-border">
          <div className="text-2xl font-bold text-yellow-600">2</div>
          <div className="text-sm text-muted-foreground">Warning</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-card-border">
          <div className="text-2xl font-bold text-red-600">1</div>
          <div className="text-sm text-muted-foreground">Failed</div>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search connectors..."
          className="pl-8 max-w-md"
        />
      </div>

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
    </div>
  );

  const renderUserManagementContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-card-border">
          <div className="text-2xl font-bold text-foreground">24</div>
          <div className="text-sm text-muted-foreground">Total Users</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-card-border">
          <div className="text-2xl font-bold text-green-600">22</div>
          <div className="text-sm text-muted-foreground">Active</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-card-border">
          <div className="text-2xl font-bold text-blue-600">5</div>
          <div className="text-sm text-muted-foreground">Admins</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-card-border">
          <div className="text-2xl font-bold text-gray-600">2</div>
          <div className="text-sm text-muted-foreground">Inactive</div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-card-border">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
          <div className="space-y-4">
            {[
              { name: "John Doe", email: "john@company.com", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
              { name: "Jane Smith", email: "jane@company.com", role: "User", status: "Active", lastLogin: "1 day ago" },
              { name: "Mike Johnson", email: "mike@company.com", role: "User", status: "Active", lastLogin: "3 days ago" },
              { name: "Sarah Wilson", email: "sarah@company.com", role: "User", status: "Inactive", lastLogin: "2 weeks ago" }
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">{user.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium">{user.role}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status}
                  </span>
                  <span className="text-muted-foreground">{user.lastLogin}</span>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverviewContent = () => (
    <div>
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
            <div className="text-sm text-muted-foreground">Warning</div>
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
    </div>
  );

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
      description: "Source code repository integration with commit tracking"
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
      description: "Application performance monitoring and alerting"
    },
    {
      id: "4",
      name: "Jaeger Traces",
      type: "traces",
      status: "healthy",
      lastSync: "2 minutes ago",
      provider: "Jaeger",
      description: "Distributed tracing and performance analysis"
    },
    {
      id: "5",
      name: "PostgreSQL Monitor",
      type: "database",
      status: "healthy",
      lastSync: "30 seconds ago",
      provider: "PostgreSQL",
      description: "Database performance and query monitoring"
    },
    {
      id: "6",
      name: "Jenkins CI/CD",
      type: "cicd",
      status: "warning",
      lastSync: "15 minutes ago",
      provider: "Jenkins",
      description: "Build pipeline monitoring and deployment tracking"
    },
    {
      id: "7",
      name: "AWS Security Hub",
      type: "security",
      status: "healthy",
      lastSync: "5 minutes ago",
      provider: "AWS Security",
      description: "Security compliance and threat monitoring"
    },
    {
      id: "8",
      name: "Grafana Analytics",
      type: "analytics",
      status: "healthy",
      lastSync: "1 minute ago",
      provider: "Grafana",
      description: "Business intelligence and custom dashboards"
    }
  ];

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
        
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
              <Button variant="ghost" size="icon" onClick={onLogout} data-testid="button-logout">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6">
            {renderMainContent()}
          </main>
        </div>
        
        {/* Chat Interface - Bottom Right Corner */}
        <div className="fixed bottom-4 right-4 z-50">
          <ChatInterface 
            isMinimized={chatMinimized}
            onToggleMinimize={() => setChatMinimized(!chatMinimized)}
            userRole="admin"
          />
        </div>
      </div>
    </SidebarProvider>
  );
}