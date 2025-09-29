import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, LogIn, User, Shield, Info, Eye, EyeOff } from "lucide-react";

interface LoginPageProps {
  onLogin: (role: "admin" | "user") => void;
  onBackToMarketing?: () => void;
}

export default function LoginPage({ onLogin, onBackToMarketing }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simple mock authentication
    setTimeout(() => {
      if (username === "admin" && password === "AiWithCi@Oct03") {
        onLogin("admin");
      } else if (username === "user" && password === "AiWithCi@Oct03") {
        onLogin("user");
      } else {
        setError("Invalid username or password. Please use the demo credentials provided below.");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (role: "admin" | "user") => {
    setUsername(role);
    setPassword("AiWithCi@Oct03");
    setError("");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          {onBackToMarketing && (
            <button
              onClick={onBackToMarketing}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 mx-auto"
              data-testid="button-back-to-marketing"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Homepage
            </button>
          )}
          <h1 className="text-2xl font-bold text-foreground">YESRE</h1>
          <p className="text-muted-foreground mt-2">Agentic AI for Faster Incident Resolution</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="w-5 h-5" />
              Demo Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  data-testid="input-username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    data-testid="input-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                data-testid="button-login"
              >
                {isLoading ? "Signing in..." : "Sign In to Demo"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        {/* <Card className="mt-6 bg-muted/30 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Info className="w-5 h-5" />
              Demo Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Use these credentials to explore different user experiences:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-purple-500" />
                  <span className="font-semibold">Administrator</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div><strong>Username:</strong> admin</div>
                  <div><strong>Password:</strong> AiWithCi@Oct03</div>
                </div>
                <Button
                  onClick={() => handleDemoLogin("admin")}
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full"
                  data-testid="button-demo-admin"
                >
                  Use Admin Credentials
                </Button>
              </div>
              
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold">User</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div><strong>Username:</strong> user</div>
                  <div><strong>Password:</strong> AiWithCi@Oct03</div>
                </div>
                <Button
                  onClick={() => handleDemoLogin("user")}
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full"
                  data-testid="button-demo-user"
                >
                  Use User Credentials
                </Button>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Admin Experience:</strong> Full access to configuration, AI chat, and system management
              </p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>User Experience:</strong> Application monitoring with diagnostic tools and dashboards
              </p>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
