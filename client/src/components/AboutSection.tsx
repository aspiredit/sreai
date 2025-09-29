import { useState, useEffect } from "react";
import { 
  Target, 
  Zap, 
  Shield, 
  Users, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Star,
  Building,
  Globe,
  Heart
} from "lucide-react";
import { useResponsive } from "@/hooks/use-responsive";
import { useScrollAnimation, useCounterAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";
import { responsiveGrids, responsiveSpacing, responsiveTypography } from "@/lib/responsive";
import { colors, spacing, borderRadius, shadows } from "@/lib/design-system";
import { Section, Container, Heading, Text, FeatureCard, StatCard, Grid } from "@/components/ui/styled-components";

export default function AboutSection() {
  const { isMobile, isTablet } = useResponsive();
  const { elementRef: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { elementRef: valuesRef, visibleItems: valuesVisible } = useStaggeredAnimation(3, 150);
  const { elementRef: teamRef, visibleItems: teamVisible } = useStaggeredAnimation(4, 100);
  
  // Counter animations for stats
  const { elementRef: stat1Ref, count: count1 } = useCounterAnimation(5, 1000, '+');
  const { elementRef: stat2Ref, count: count2 } = useCounterAnimation(3, 1000, '+');
  const { elementRef: stat3Ref, count: count3 } = useCounterAnimation(99.9, 2000, '%');
  const { elementRef: stat4Ref, count: count4 } = useCounterAnimation(2, 2000, 'min');

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Eliminate the stress and complexity of incident resolution through intelligent automation and proactive monitoring.",
      color: "red" as keyof typeof colors.feature
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "Advanced AI agents that learn from your systems and provide contextual insights for faster problem resolution.",
      color: "yellow" as keyof typeof colors.feature
    },
    {
      icon: Heart,
      title: "Customer Success",
      description: "Faster resolution times, reduced downtime, and happier engineering teams through autonomous AI assistance.",
      color: "pink" as keyof typeof colors.feature
    }
  ];

  const teamMembers = [
    {
      name: "AJ",
      role: "CEO & Co-Founder",
      bio: "Innovator, Enterprise Architect, 20+ years of experience",
      avatar: ""
    },
    {
      name: "KD",
      role: "CTO & Co-Founder", 
      bio: "AI/ML expert, Principal SRE with 20+ years of experience",
      avatar: ""
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "Company Founded",
      description: "Started with a vision to revolutionize incident response"
    }
  ];

  const trustSignals = [
    {
      icon: Shield,
      title: "Enterprise Grade Security",
      description: "Enterprise-grade security and compliance",
      color: "emerald" as keyof typeof colors.feature
    },
    {
      icon: Building,
      title: "Fed RAMP Compliant",
      description: "FedRAMP Compliant ",
      color: "amber" as keyof typeof colors.feature
    },
    {
      icon: Globe,
      title: "99.9% Uptime SLA",
      description: "Guaranteed availability with global infrastructure",
      color: "cyan" as keyof typeof colors.feature
    }
  ];

  const stats = [
    { number: "5+", label: "Engineering Teams", icon: Users, color: "blue" as keyof typeof colors.feature },
    { number: "3+", label: "Countries Served", icon: Globe, color: "green" as keyof typeof colors.feature },
    { number: "99.9%", label: "Uptime Guarantee", icon: TrendingUp, color: "purple" as keyof typeof colors.feature },
    { number: "<5min", label: "Average Setup", icon: Clock, color: "orange" as keyof typeof colors.feature }
  ];

  return (
    <Section 
      id="about" 
      ref={sectionRef as React.RefObject<HTMLElement>}
      variant="muted"
      size="xl"
    >
      <Container size="lg">
        {/* Header */}
        <div className={`text-center ${isMobile ? 'mb-12' : 'mb-16'} transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Heading as="h2" size="3xl" weight="bold" className="mb-6">
            About YESRE
          </Heading>
          <Text size="xl" color="muted" className="max-w-4xl mx-auto leading-relaxed text-balance">
            We're building the future of incident resolution with autonomous AI agents that understand your systems, 
            diagnose problems, and provide actionable solutions in real-time.
          </Text>
        </div>

        {/* Stats */}
        <Grid 
          cols={4} 
          gap="lg" 
          className={`${isMobile ? 'mb-16' : 'mb-20'} transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {stats.map((stat, index) => {
            const refs = [stat1Ref, stat2Ref, stat3Ref, stat4Ref];
            const counts = [count1, count2, count3, count4];
            
            return (
              <StatCard
                key={index}
                ref={refs[index]}
                icon={<stat.icon className="w-8 h-8" />}
                value={counts[index].toString()}
                label={stat.label}
                iconColor={stat.color}
                animated
              />
            );
          })}
        </Grid>

        {/* Values */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <Heading as="h3" size="2xl" weight="bold" className="mb-4">
              Our Values
            </Heading>
            <Text size="lg" color="muted" className="max-w-2xl mx-auto">
              The principles that guide everything we do at YESRE
            </Text>
          </div>
          
          <Grid cols={3} gap="lg" ref={valuesRef}>
            {values.map((value, index) => (
              <FeatureCard
                key={index}
                icon={<value.icon className="w-6 h-6" />}
                title={value.title}
                description={value.description}
                iconColor={value.color}
                variant="default"
                className={`transition-all duration-500 ${
                  valuesVisible[index] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              />
            ))}
          </Grid>
        </div>

        {/* Team */}
        <div className={`mb-20 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <Heading as="h3" size="2xl" weight="bold" className="mb-4">
              Meet Our Team
            </Heading>
            <Text size="lg" color="muted" className="max-w-2xl mx-auto">
              Experienced leaders from top tech companies, united by a passion for solving complex problems
            </Text>
          </div>
          
          <Grid cols={2} gap="lg" ref={teamRef}>
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className={`group text-center transition-all duration-600 ${
                  teamVisible[index] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-6">
                  <div className="relative w-32 h-32 mx-auto">
                    <img
                      src={member.avatar}
                      alt={`${member.name} profile`}
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 hover-lift"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 hidden absolute inset-0"
                      style={{ display: 'none' }}
                    >
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <Heading as="h4" size="lg" weight="semibold" className="mb-1">
                  {member.name}
                </Heading>
                <Text size="base" weight="medium" className="text-primary mb-3">
                  {member.role}
                </Text>
                <Text size="sm" color="muted" className="leading-relaxed">
                  {member.bio}
                </Text>
              </div>
            ))}
          </Grid>
        </div>

        {/* Timeline */}
        <div className={`mb-20 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <Heading as="h3" size="2xl" weight="bold" className="mb-4">
              Our Journey
            </Heading>
            <Text size="lg" color="muted" className="max-w-2xl mx-auto">
              Key milestones in building the future of incident resolution
            </Text>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div 
                      className="card-default hover-lift"
                      style={{
                        padding: spacing[6],
                        borderRadius: borderRadius.xl
                      }}
                    >
                      <Text size="2xl" weight="bold" className="text-primary mb-2">
                        {milestone.year}
                      </Text>
                      <Heading as="h4" size="lg" weight="semibold" className="mb-2">
                        {milestone.title}
                      </Heading>
                      <Text color="muted">{milestone.description}</Text>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className={`transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <Heading as="h3" size="2xl" weight="bold" className="mb-4">
              Trust & Security
            </Heading>
            <Text size="lg" color="muted" className="max-w-2xl mx-auto">
              Enterprise-grade security and compliance you can rely on
            </Text>
          </div>
          
          <Grid cols={3} gap="md">
            {trustSignals.map((signal, index) => (
              <FeatureCard
                key={index}
                icon={<signal.icon className="w-6 h-6" />}
                title={signal.title}
                description={signal.description}
                iconColor={signal.color}
                variant="default"
              />
            ))}
          </Grid>
        </div>

        {/* Customer Testimonial Preview */}
        <div 
          className={`text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ marginTop: spacing[20] }}
        >
          <div 
            className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20"
            style={{
              padding: spacing[8],
              borderRadius: borderRadius['2xl']
            }}
          >
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
              ))}
            </div>
            <Text size="2xl" weight="medium" className="mb-6 italic text-balance">
              "YESRE has transformed how our team handles incidents. What used to take hours now takes minutes,
              and our engineers can focus on building instead of firefighting."
            </Text>
            <div className="flex items-center justify-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-primary"
                style={{ backgroundColor: `${colors.primary[500]}20` }}
              >
                AS
              </div>
              <div className="text-left">
                <Text weight="semibold">Anil Srikantham</Text>
                <Text color="muted">CEO, CluCloud</Text>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}