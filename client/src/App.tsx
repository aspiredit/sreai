import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "@/components/LandingPage";
import AdminDashboard from "@/components/AdminDashboard";
import UserDashboard from "@/components/UserDashboard";
import NotFound from "@/pages/not-found";

function Router() {
  const [currentRole, setCurrentRole] = useState<"admin" | "user" | null>(null);

  const handleRoleSelect = (role: "admin" | "user") => {
    setCurrentRole(role);
    console.log(`User selected role: ${role}`);
  };

  const handleBackToLanding = () => {
    setCurrentRole(null);
    console.log("Returning to landing page");
  };

  if (!currentRole) {
    return <LandingPage onRoleSelect={handleRoleSelect} />;
  }

  return (
    <Switch>
      <Route path="/" component={() => {
        if (currentRole === "admin") {
          return <AdminDashboard />;
        } else if (currentRole === "user") {
          return <UserDashboard />;
        }
        return <LandingPage onRoleSelect={handleRoleSelect} />;
      }} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/user" component={UserDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
