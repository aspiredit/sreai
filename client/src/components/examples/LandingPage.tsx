import React, { useState } from "react";
import LandingPage from '../LandingPage';

export default function LandingPageExample() {
  const [selectedRole, setSelectedRole] = useState<"admin" | "user" | null>(null);
  
  const handleRoleSelect = (role: "admin" | "user") => {
    setSelectedRole(role);
    console.log(`Role selected: ${role}`);
  };
  
  return (
    <div>
      <LandingPage onRoleSelect={handleRoleSelect} />
      {selectedRole && (
        <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
          Selected: {selectedRole}
        </div>
      )}
    </div>
  );
}