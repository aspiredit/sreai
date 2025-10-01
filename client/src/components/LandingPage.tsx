import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ThemeToggle from "./ThemeToggle";
import { Shield, BarChart3, Settings, MessageSquare, Users, Zap, CheckCircle, ArrowRight, Play, Image as ImageIcon, Mail, Phone, MapPin, Star } from "lucide-react";

interface LandingPageProps {
  onRoleSelect: (role: "admin" | "user") => void;
}

export default function LandingPage({ onRoleSelect }: LandingPageProps) {
  const [selectedRole, setSelectedRole] = useState<"admin" | "user" | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  useEffect(() => {
    // Trigger hero image animation after component mounts
    const timer = setTimeout(() => setHeroImageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: "Real-time Monitoring",
      description: "Monitor application health and performance with live metrics and alerts"
    },
    {
      icon: Settings,
      title: "Smart Connectors",
      description: "Integrate code repositories, logs, metrics, documentation, and runbooks"
    },
    {
      icon: MessageSquare,
      title: "Agentic AI Assistant",
      description: "Autonomous AI agents that proactively identify, analyze, and resolve incidents"
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Administrators manage all apps, users access only their assigned applications"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Built with security best practices and compliance in mind"
    },
    {
      icon: Zap,
      title: "Quick Setup",
      description: "Get started in minutes with pre-built integrations and templates"
    }
  ];

  const handleGetStarted = () => {
    if (selectedRole) {
      console.log(`Starting as ${selectedRole}`);
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-card-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-foreground">unQuery</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              {[
                { id: "home", label: "Home" },
                { id: "getting-started", label: "Getting Started" },
                { id: "demo", label: "Demo" },
                { id: "pricing", label: "Pricing" },
                { id: "contact", label: "Contact Us" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? "text-primary" : "text-muted-foreground"
                  }`}
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="bg-gradient-to-b from-card to-background py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-5xl font-bold text-foreground mb-6">
                  Agentic AI for 
                  <span className="text-primary"> Faster Incident Resolution</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Autonomous AI agents accelerate incident resolution with intelligent root cause analysis, 
                  automated troubleshooting, and proactive system monitoring for enterprise SRE teams.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex gap-4">
                    <Button
                      variant={selectedRole === "admin" ? "default" : "outline"}
                      size="lg"
                      onClick={() => setSelectedRole("admin")}
                      className="gap-2"
                      data-testid="button-select-admin"
                    >
                      <Settings className="w-4 h-4" />
                      Start as Admin
                    </Button>
                    <Button
                      variant={selectedRole === "user" ? "default" : "outline"}
                      size="lg"
                      onClick={() => setSelectedRole("user")}
                      className="gap-2"
                      data-testid="button-select-user"
                    >
                      <Users className="w-4 h-4" />
                      Start as User
                    </Button>
                  </div>
                  {selectedRole && (
                    <Button 
                      size="lg" 
                      onClick={handleGetStarted}
                      className="bg-primary hover:bg-primary/90 gap-2"
                      data-testid="button-get-started"
                    >
                      Get Started <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                {selectedRole && (
                  <p className="text-sm text-muted-foreground">
                    {selectedRole === "admin" 
                      ? "Access full configuration controls, AI chat assistance, and system management"
                      : "View your assigned applications with diagnostic tools and monitoring dashboards"
                    }
                  </p>
                )}
              </div>
              
              <div className="relative">
                <div 
                  className={`transition-all duration-1000 ease-out ${
                    heroImageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <img 
                    src="/generated_images/Before_after_workflow_transformation_illustration_7f275dcf.png"
                    alt="Before and after workflow transformation showing chaotic systems becoming organized diagnostics"
                    className="w-full h-auto rounded-lg shadow-lg"
                    onLoad={() => setHeroImageLoaded(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="getting-started" className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Getting Started in 3 Simple Steps
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Set up your professional diagnostics platform in minutes, not hours
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Choose Your Role",
                  description: "Select whether you're an administrator managing multiple applications or a user monitoring your assigned apps.",
                  icon: Users
                },
                {
                  step: "02", 
                  title: "Connect Your Systems",
                  description: "Integrate your code repositories, monitoring tools, documentation, and infrastructure with our smart connectors.",
                  icon: Settings
                },
                {
                  step: "03",
                  title: "Start Monitoring",
                  description: "Get instant insights, configure with AI assistance, and maintain healthy applications with real-time diagnostics.",
                  icon: BarChart3
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-card p-8 rounded-lg border border-card-border hover-elevate transition-all duration-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Everything you need for application monitoring
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From code repositories to runbooks, monitor every aspect of your applications 
                with intelligent insights and automated assistance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover-elevate cursor-pointer transition-all duration-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="demo" className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Try unQuery Demo
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience autonomous AI agents in action with intelligent incident resolution
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Card className="hover-elevate cursor-pointer transition-all duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5 text-primary" />
                    Interactive Demo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Try our live demo with sample data to explore the admin dashboard, 
                    user interface, and AI chat functionality.
                  </p>
                  <Button 
                    className="w-full" 
                    data-testid="button-interactive-demo"
                    onClick={() => window.location.href = '/demo/login'}
                  >
                    Launch Interactive Demo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that fits your team size and monitoring needs. 
                All plans include core diagnostics features and AI assistance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Starter",
                  price: "$29",
                  period: "per month",
                  description: "Perfect for small teams and individual developers",
                  features: [
                    "Up to 5 applications",
                    "Basic connectors (Code, Logs, Metrics)",
                    "AI chat support",
                    "Email support",
                    "Dashboard access"
                  ],
                  popular: false
                },
                {
                  name: "Professional", 
                  price: "$79",
                  period: "per month",
                  description: "Advanced features for growing teams",
                  features: [
                    "Up to 25 applications",
                    "All connector types",
                    "Advanced AI automation",
                    "Priority support",
                    "Team management",
                    "Custom integrations"
                  ],
                  popular: true
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  period: "pricing",
                  description: "Comprehensive solution for large organizations",
                  features: [
                    "Unlimited applications",
                    "Enterprise connectors",
                    "Dedicated AI assistant",
                    "24/7 phone support",
                    "Advanced security",
                    "On-premise deployment"
                  ],
                  popular: false
                }
              ].map((plan, index) => (
                <Card key={index} className={`hover-elevate transition-all duration-200 ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                  <CardHeader>
                    {plan.popular && (
                      <div className="text-center">
                        <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                      <div className="mt-2 mb-4">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">/{plan.period}</span>
                      </div>
                      <p className="text-muted-foreground">{plan.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      data-testid={`button-plan-${plan.name.toLowerCase()}`}
                    >
                      {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Get in Touch
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Ready to transform your application monitoring? Contact our team for a 
                  personalized demo or to discuss your specific requirements.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      title: "Email Us",
                      content: "hello@yesre.ai",
                      subtitle: "We'll respond within 24 hours"
                    },
                    {
                      icon: Phone, 
                      title: "Call Us",
                      content: "+1 (555) 123-4567",
                      subtitle: "Mon-Fri, 9am-6pm EST"
                    },
                    {
                      icon: MapPin,
                      title: "Visit Us",
                      content: "123 Tech Street, San Francisco, CA",
                      subtitle: "Schedule an appointment"
                    }
                  ].map((contact, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <contact.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{contact.title}</h3>
                        <p className="text-foreground">{contact.content}</p>
                        <p className="text-sm text-muted-foreground">{contact.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="Your name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Email address"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        data-testid="input-contact-email"
                      />
                    </div>
                  </div>
                  <Input
                    placeholder="Company name (optional)"
                    value={contactForm.company}
                    onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
                    data-testid="input-contact-company"
                  />
                  <Textarea
                    placeholder="Tell us about your monitoring needs..."
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    data-testid="input-contact-message"
                  />
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      console.log('Contact form submitted:', contactForm);
                      // todo: remove mock functionality - implement actual form submission
                      setContactForm({ name: "", email: "", company: "", message: "" });
                    }}
                    data-testid="button-contact-submit"
                  >
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Trusted by development teams worldwide
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of teams using unQuery to accelerate incident resolution
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime guaranteed</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-primary mb-2">&lt; 2min</div>
                <div className="text-muted-foreground">Average setup time</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">AI-powered support</div>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 opacity-60">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Star key={rating} className="w-6 h-6 fill-current text-yellow-500" />
              ))}
              <span className="text-muted-foreground ml-2">4.9/5 from 2,847 reviews</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t border-card-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            © 2025 unQuery. Agentic AI for faster incident resolution and autonomous system monitoring.
          </p>
        </div>
      </footer>
    </div>
  );
}