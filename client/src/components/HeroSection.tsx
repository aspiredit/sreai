import { useState } from "react";
import { ArrowRight, Play, CheckCircle, Zap, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResponsive } from "@/hooks/use-responsive";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";
import { responsiveTypography, responsiveSpacing } from "@/lib/responsive";
import { colors, spacing, borderRadius, shadows } from "@/lib/design-system";
import { Section, Container, Heading, Text, Badge } from "@/components/ui/styled-components";
import ParallaxBackground from "./ParallaxBackground";

interface HeroSectionProps {
  onDemoAccess: () => void;
  onLearnMore: () => void;
}

export default function HeroSection({ onDemoAccess, onLearnMore }: HeroSectionProps) {
  const [selectedRole, setSelectedRole] = useState<"admin" | "user" | null>(null);
  const { isMobile } = useResponsive();
  const { elementRef: heroRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: featuresRef, visibleItems } = useStaggeredAnimation(3, 200);

  const handleGetStarted = () => {
    if (selectedRole) {
      onDemoAccess();
    }
  };

  const keyFeatures = [
    {
      icon: Zap,
      text: "Autonomous AI agents",
      color: "yellow" as keyof typeof colors.feature
    },
    {
      icon: BarChart3,
      text: "Real-time monitoring",
      color: "blue" as keyof typeof colors.feature
    },
    {
      icon: Shield,
      text: "Enterprise security",
      color: "green" as keyof typeof colors.feature
    }
  ];

  return (
    <ParallaxBackground 
      speed={0.3}
      className="pt-16 min-h-screen flex items-center justify-center"
    >
      <Section 
        id="home" 
        ref={heroRef as React.RefObject<HTMLElement>}
        className="relative w-full min-h-screen flex items-center"
        size="xl"
      >
        <Container size="lg" className="relative z-10">
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-8' : 'lg:grid-cols-2 gap-12'} items-center`}>
            {/* Left Column - Content */}
            <div className={`${isMobile ? 'text-center' : 'lg:text-left'} space-y-6 md:space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Badge */}
              <div className={isMobile ? 'flex justify-center' : ''}>
                <Badge variant="primary" size="md" className="inline-flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Powered by Advanced AI
                </Badge>
              </div>

              {/* Main Headline */}
              <Heading 
                as="h1" 
                size="4xl" 
                weight="bold"
                className={`${isMobile ? 'text-center' : 'lg:text-left'} leading-tight`}
              >
                Agentic AI for{" "}
                <span className="text-gradient">
                  Faster Incident Resolution
                </span>
              </Heading>

              {/* Subheadline */}
              <Text 
                size="xl" 
                color="muted"
                className={`${isMobile ? 'max-w-lg mx-auto text-center' : 'max-w-2xl lg:text-left'} leading-relaxed text-balance`}
              >
                Autonomous AI agents accelerate incident resolution with intelligent root cause analysis, 
                automated troubleshooting, and proactive system monitoring for enterprise SRE teams.
              </Text>

              {/* Key Features */}
              <div 
                ref={featuresRef}
                className={`flex ${isMobile ? 'flex-col gap-3' : 'flex-wrap gap-6'} ${isMobile ? 'items-center' : 'items-start'}`}
              >
                {keyFeatures.map((feature, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 text-muted-foreground transition-all duration-800 ${
                      visibleItems[index] 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <feature.icon 
                      className="w-4 h-4 flex-shrink-0" 
                      style={{ color: colors.feature[feature.color] }}
                    />
                    <Text size="base" weight="medium" className="text-foreground">
                      {feature.text}
                    </Text>
                  </div>
                ))}
              </div>

              {/* Role Selection */}
              <div className="space-y-4">
                <Text size="sm" weight="medium" color="muted" className={isMobile ? 'text-center' : ''}>
                  Choose your role to get started:
                </Text>
                <div className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} gap-3`}>
                  <button
                    onClick={() => setSelectedRole("admin")}
                    className={`interactive flex items-center gap-3 p-4 md:p-6 rounded-xl border-2 transition-all duration-300 ${
                      selectedRole === "admin"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/50 hover:bg-muted"
                    }`}
                    style={{
                      borderRadius: borderRadius.xl,
                      padding: spacing[6],
                      boxShadow: selectedRole === "admin" ? shadows.md : shadows.sm
                    }}
                    data-testid="hero-role-admin"
                  >
                    <Shield 
                      className="w-5 h-5 flex-shrink-0" 
                      style={{ 
                        color: selectedRole === "admin" 
                          ? colors.primary[500] 
                          : colors.feature.purple 
                      }} 
                    />
                    <div className={`${isMobile ? 'text-center flex-1' : 'text-left'}`}>
                      <Text size="base" weight="semibold" className="mb-1">Administrator</Text>
                      <Text size="sm" color="muted">Manage all applications and AI agents</Text>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedRole("user")}
                    className={`interactive flex items-center gap-3 p-4 md:p-6 rounded-xl border-2 transition-all duration-300 ${
                      selectedRole === "user"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/50 hover:bg-muted"
                    }`}
                    style={{
                      borderRadius: borderRadius.xl,
                      padding: spacing[6],
                      boxShadow: selectedRole === "user" ? shadows.md : shadows.sm
                    }}
                    data-testid="hero-role-user"
                  >
                    <BarChart3 
                      className="w-5 h-5 flex-shrink-0" 
                      style={{ 
                        color: selectedRole === "user" 
                          ? colors.primary[500] 
                          : colors.feature.blue 
                      }} 
                    />
                    <div className={`${isMobile ? 'text-center flex-1' : 'text-left'}`}>
                      <Text size="base" weight="semibold" className="mb-1">User</Text>
                      <Text size="sm" color="muted">Monitor assigned applications</Text>
                    </div>
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={handleGetStarted}
                  disabled={!selectedRole}
                  size="lg"
                  className={`group btn-primary hover-lift hover-glow ${
                    selectedRole 
                      ? "" 
                      : "bg-muted text-muted-foreground cursor-not-allowed hover:bg-muted"
                  }`}
                  style={{
                    padding: `${spacing[4]} ${spacing[8]}`,
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.semibold,
                    borderRadius: borderRadius.lg,
                    boxShadow: selectedRole ? shadows.lg : shadows.sm
                  }}
                  data-testid="hero-cta-demo"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Try Interactive Demo
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
                
                <Button
                  onClick={onLearnMore}
                  variant="outline"
                  size="lg"
                  className="btn-secondary hover-lift"
                  style={{
                    padding: `${spacing[4]} ${spacing[8]}`,
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.semibold,
                    borderRadius: borderRadius.lg
                  }}
                  data-testid="hero-cta-learn-more"
                >
                  Learn More
                </Button>
              </div>

              {/* Role Description */}
              {selectedRole && (
                <div 
                  className={`transition-all duration-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    padding: spacing[4],
                    backgroundColor: `${colors.primary[500]}10`,
                    border: `1px solid ${colors.primary[500]}20`,
                    borderRadius: borderRadius.lg
                  }}
                >
                  <Text size="sm" className="text-primary">
                    {selectedRole === "admin" 
                      ? "Access full configuration controls, AI chat assistance, and system management capabilities."
                      : "View your assigned applications with diagnostic tools, monitoring dashboards, and AI insights."
                    }
                  </Text>
                </div>
              )}
            </div>

            {/* Right Column - Visual */}
            <div className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="relative">
                <div 
                  className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
                  style={{
                    borderRadius: borderRadius['2xl'],
                    padding: spacing[8]
                  }}
                >
                  <div 
                    className="w-full h-full bg-gradient-to-br from-background to-muted border border-border flex items-center justify-center"
                    style={{ borderRadius: borderRadius.xl }}
                  >
                    <div className="text-center space-y-4">
                      <div 
                        className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto"
                        style={{ backgroundColor: `${colors.primary[500]}20` }}
                      >
                        <Zap className="w-8 h-8 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <Heading as="h3" size="lg" weight="semibold">
                          AI-Powered Diagnostics
                        </Heading>
                        <Text size="sm" color="muted">
                          Real-time system analysis
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div 
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center animate-bounce"
                  style={{ backgroundColor: `${colors.feature.emerald}20` }}
                >
                  <CheckCircle className="w-6 h-6" style={{ color: colors.feature.emerald }} />
                </div>
                <div 
                  className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center animate-pulse"
                  style={{ backgroundColor: `${colors.feature.cyan}20` }}
                >
                  <BarChart3 className="w-6 h-6" style={{ color: colors.feature.cyan }} />
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div 
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ marginTop: spacing[16] }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: colors.feature.emerald }}
                ></div>
                <Text size="sm" weight="medium" color="muted">99.9% Uptime Guaranteed</Text>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: colors.feature.blue }}
                ></div>
                <Text size="sm" weight="medium" color="muted">2,000+ Engineering Teams</Text>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: colors.feature.violet }}
                ></div>
                <Text size="sm" weight="medium" color="muted">24/7 AI-Powered Support</Text>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: colors.feature.amber }}
                ></div>
                <Text size="sm" weight="medium" color="muted">&lt; 2min Average Setup</Text>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </ParallaxBackground>
  );
}