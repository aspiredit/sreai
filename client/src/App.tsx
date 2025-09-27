import { useState, useEffect } from "react";
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
import PerformanceDashboard from "@/components/PerformanceDashboard";
import { getBasePath } from "./lib/router";
import { initializePerformanceMonitoring, performanceUtils } from "@/lib/performance";
import { initializePerformanceOptimizations } from "@/lib/serviceWorker";

function AppRouter() {
  const [currentRole, setCurrentRole] = useState<"admin" | "user" | null>(null);
  const [isInDemo, setIsInDemo] = useState(false);
  const [location, setLocation] = useLocation();

  // Initialize performance monitoring and optimizations on app start
  useEffect(() => {
    const monitor = initializePerformanceMonitoring();
    performanceUtils.mark('app-start');
    
    // Initialize performance optimizations (service worker, caching, etc.)
    initializePerformanceOptimizations();

    return () => {
      performanceUtils.mark('app-end');
      performanceUtils.measure('app-lifetime', 'app-start', 'app-end');
    };
  }, []);

  const handleDemoAccess = () => {
    performanceUtils.mark('demo-access');
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
          <PerformanceDashboard />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
