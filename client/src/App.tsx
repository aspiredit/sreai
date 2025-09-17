import { useState } from "react";
import { Switch, Route, Router, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "@/components/LoginPage";
import AdminDashboard from "@/components/AdminDashboard";
import UserDashboard from "@/components/UserDashboard";
import NotFound from "@/pages/not-found";
import ErrorBoundary from "@/components/ErrorBoundary";
import { getBasePath } from "./lib/router";

function AppRouter() {
  const [currentRole, setCurrentRole] = useState<"admin" | "user" | null>(null);
  const [location, setLocation] = useLocation();

  const handleLogin = (role: "admin" | "user") => {
    setCurrentRole(role);
    setLocation(role === "admin" ? "/admin" : "/user");
    console.log(`User logged in as: ${role}`);
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setLocation("/");
    console.log("User logged out");
  };

  return (
    <Switch>
      <Route path="/" component={() => (
        <LoginPage
          onLogin={handleLogin}
        />
      )} />
      <Route path="/admin" component={() => (
        currentRole === "admin" ? <AdminDashboard onLogout={handleLogout} /> : <NotFound />
      )} />
      <Route path="/user" component={() => (
        currentRole === "user" ? <UserDashboard onLogout={handleLogout} /> : <NotFound />
      )} />
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
