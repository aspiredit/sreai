import React, { useState, useEffect } from "react";
import { ArrowRight, Play, CheckCircle, Zap, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResponsive } from "@/hooks/use-responsive";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";
import { responsiveTypography, responsiveSpacing } from "@/lib/responsive";
import { colors, spacing, borderRadius, shadows, typography } from "@/lib/design-system";
import { Section, Container, Heading, Text, Badge } from "@/components/ui/styled-components";
import ParallaxBackground from "./ParallaxBackground";

interface HeroSectionProps {
  onDemoAccess: () => void;
  onLearnMore: () => void;
}

export default function HeroSection({ onDemoAccess, onLearnMore }: HeroSectionProps) {
  const [selectedRole, setSelectedRole] = useState<"admin" | "user" | null>(null);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const { isMobile } = useResponsive();
  const { elementRef: heroRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: featuresRef, visibleItems } = useStaggeredAnimation(3, 200);

  const handleGetStarted = () => {
    if (selectedRole) {
      onDemoAccess();
    }
  };

  const taglines = [
    "Transform chaos into clarity",
    "Incidents analyzed automagically",
    "From alert to resolution in minutes",
    "AI agents that never sleep",
    "Turn complexity into simplicity"
  ];

  // Rotate taglines every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

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
    <>
      <Section
        id="home"
        ref={heroRef as React.RefObject<HTMLElement>}
        className="relative w-full min-h-screen overflow-hidden"
        size="full"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{
              animationName: 'slowVideo',
              animationDuration: '1s',
              animationFillMode: 'forwards'
            }}
            onLoadedData={(e) => {
              const video = e.target as HTMLVideoElement;
              video.playbackRate = 0.85; // 15% slower (100% - 15% = 85%)
            }}
          >
            <source src="https://yesre-ai-videos.s3.amazonaws.com/Res_V1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 min-h-screen flex items-center justify-center pt-16">
          <Container size="lg" className="text-center">
            {/* Hero Content */}
            <div className={`space-y-8 md:space-y-12 mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Badge */}
              <div className="flex justify-center">
                <Badge
                  variant="primary"
                  size="md"
                  className="inline-flex items-center gap-2 border backdrop-blur-md shadow-lg"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    color: '#ffffff',
                    textShadow: '0 0 10px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,1)',
                    fontWeight: '600'
                  }}
                >
                  <Zap className="w-4 h-4" style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.8))' }} />
                  Powered by Advanced AI
                </Badge>
              </div>

              {/* Main Headline */}
              <Heading
                as="h1"
                size="4xl"
                weight="bold"
                className="leading-tight max-w-5xl mx-auto"
                style={{
                  fontSize: isMobile ? '2.5rem' : '4rem',
                  lineHeight: '1.1'
                }}
              >
                <span
                  className="font-extrabold"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 25%, #e0f2fe 50%, #bae6fd 75%, #7dd3fc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8)) drop-shadow(0 0 10px rgba(0,0,0,0.6))'
                  }}
                >
                  Agentic AI for
                </span>
                <br />
                <span
                  className="font-extrabold"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 25%, #e0f2fe 50%, #bae6fd 75%, #7dd3fc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8)) drop-shadow(0 0 10px rgba(0,0,0,0.6))'
                  }}
                >
                  Faster Incident Resolution
                </span>
              </Heading>

              {/* Animated Taglines */}
              <div className="h-16 flex items-center justify-center">
                <Text
                  size="2xl"
                  weight="medium"
                  className="transition-all duration-500 transform"
                  style={{
                    color: '#ffffff',
                    textShadow: '0 0 15px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.7), 2px 2px 4px rgba(0,0,0,1)',
                    fontSize: isMobile ? '1.25rem' : '1.5rem',
                    fontWeight: '600'
                  }}
                  key={currentTaglineIndex}
                >
                  {taglines[currentTaglineIndex]}
                </Text>
              </div>

              {/* Enhanced Subheadline */}
              <Text
                size="xl"
                className="max-w-4xl mx-auto leading-relaxed text-balance"
                style={{
                  color: '#f8fafc',
                  textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6), 1px 1px 2px rgba(0,0,0,1)',
                  fontSize: isMobile ? '1rem' : '1.125rem',
                  fontWeight: '500'
                }}
              >
                Autonomous AI agents accelerate incident resolution with intelligent root cause analysis,
                automated troubleshooting, and proactive system monitoring for enterprise SRE teams.
              </Text>

              {/* Feature highlights with better contrast */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8">
                {keyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center gap-3 p-4 rounded-lg backdrop-blur-sm border"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <feature.icon
                      className="w-6 h-6"
                      style={{
                        color: '#ffffff',
                        filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.8))'
                      }}
                    />
                    <Text
                      size="base"
                      weight="medium"
                      style={{
                        color: '#ffffff',
                        textShadow: '0 0 8px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,1)',
                        fontWeight: '600'
                      }}
                    >
                      {feature.text}
                    </Text>
                  </div>
                ))}
              </div>
            </div>

          </Container>
        </div>
      </Section>

      {/* Features and CTA Section - Outside video background */}
      <Section className="relative bg-background py-16 md:py-24" size="xl">
      <Container size="lg" className="text-center">
        {/* Key Features - Horizontal Row */}
        <div
          ref={featuresRef}
          className={`flex ${isMobile ? 'flex-col gap-6' : 'flex-row justify-center gap-12'} items-center mb-16 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {keyFeatures.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center space-y-3 transition-all duration-800 ${
                visibleItems[index]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${colors.feature[feature.color]}20` }}
              >
                <feature.icon
                  className="w-8 h-8"
                  style={{ color: colors.feature[feature.color] }}
                />
              </div>
              <Text size="lg" weight="semibold" className="text-foreground">
                {feature.text}
              </Text>
            </div>
          ))}
        </div>

        {/* Role Selection and CTAs */}
        <div className="space-y-8">
            {/* Role Selection */}
            <div className="space-y-6">
              <Text size="base" weight="medium" color="muted">
                Choose your role to get started:
              </Text>
              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row justify-center'} gap-6 max-w-4xl mx-auto`}>
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
                    <div className="text-left flex-1">
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
                    <div className="text-left flex-1">
                      <Text size="base" weight="semibold" className="mb-1">User</Text>
                      <Text size="sm" color="muted">Monitor assigned applications</Text>
                    </div>
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row justify-center gap-6">
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
                  className={`max-w-2xl mx-auto transition-all duration-300 ${
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
              <Text size="sm" weight="medium" color="muted">5+ Engineering Teams</Text>
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
              <Text size="sm" weight="medium" color="muted">&lt; 5min Average Setup</Text>
            </div>
          </div>
        </div>
      </Container>
    </Section>
    </>
  );
}