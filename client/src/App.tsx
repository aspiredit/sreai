import { useState } from "react";
import { Switch, Route, Router, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MarketingHomepage from "@/components/MarketingHomepage";
import LoginPage from "@/components/LoginPage";
import AdminDashboard from "@/components/AdminDashboard";
import UserDashboard from "@/components/UserDashboard";
import NotFound from "@/pages/not-found";
import ErrorBoundary from "@/components/ErrorBoundary";
import { getBasePath } from "./lib/router";

function AppRouter() {
  const [currentRole, setCurrentRole] = useState<"admin" | "user" | null>(null);
  const [isInDemo, setIsInDemo] = useState(false);
  const [location, setLocation] = useLocation();

  const handleDemoAccess = () => {
    setIsInDemo(true);
    console.log("Entering demo mode");
  };

  const handleLogin = (role: "admin" | "user") => {
    setCurrentRole(role);
    setLocation(role === "admin" ? "/demo/admin" : "/demo/user");
    console.log(`User logged in as: ${role}`);
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setIsInDemo(false);
    setLocation("/");
    console.log("User logged out, returning to marketing homepage");
  };

  const handleBackToMarketing = () => {
    setIsInDemo(false);
    setCurrentRole(null);
    setLocation("/");
    console.log("Returning to marketing homepage");
  };

  return (
    <Switch>
      {/* Marketing Homepage */}
      <Route path="/" component={() => (
        <MarketingHomepage onDemoAccess={handleDemoAccess} />
      )} />
      
      {/* Demo Application Routes */}
      <Route path="/demo/login" component={() => (
        <LoginPage
          onLogin={handleLogin}
          onBackToMarketing={handleBackToMarketing}
        />
      )} />
      <Route path="/demo/admin" component={() => (
        currentRole === "admin" ? (
          <AdminDashboard 
            onLogout={handleLogout} 
            onBackToMarketing={handleBackToMarketing}
          />
        ) : <NotFound />
      )} />
      <Route path="/demo/user" component={() => (
        currentRole === "user" ? (
          <UserDashboard 
            onLogout={handleLogout} 
            onBackToMarketing={handleBackToMarketing}
          />
        ) : <NotFound />
      )} />
      
      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const basePath = getBasePath();
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router base={basePath}>
            <AppRouter />
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
