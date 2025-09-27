import React, { useState, useEffect } from "react";
import { 
  Check, 
  X, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  Phone, 
  Mail, 
  Clock,
  BarChart3,
  Settings,
  Globe,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { colors, spacing, borderRadius, shadows, typography } from "@/lib/design-system";
import { Section, Container, Heading, Text, Badge, Grid } from "@/components/ui/styled-components";

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  popular?: boolean;
  features: string[];
  cta: string;
  color: keyof typeof colors.feature;
}

export default function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("pricing");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const pricingTiers: PricingTier[] = [
    {
      id: "starter",
      name: "Starter",
      price: billingPeriod === "monthly" ? "$29" : "$24",
      period: "per month",
      description: "Perfect for small teams and individual developers",
      features: [
        "Up to 5 applications",
        "Basic connectors (Code, Logs, Metrics)",
        "AI chat support",
        "Email support",
        "Dashboard access",
        "Basic incident tracking",
        "Community forum access"
      ],
      cta: "Start Free Trial",
      color: "blue"
    },
    {
      id: "professional",
      name: "Professional",
      price: billingPeriod === "monthly" ? "$79" : "$65",
      period: "per month",
      description: "Advanced features for growing teams",
      popular: true,
      features: [
        "Up to 25 applications",
        "All connector types",
        "Advanced AI automation",
        "Priority support",
        "Team management",
        "Custom integrations",
        "Advanced analytics",
        "SLA monitoring",
        "Custom dashboards"
      ],
      cta: "Start Free Trial",
      color: "purple"
    },
    {
      id: "enterprise",
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
        "On-premise deployment",
        "Custom training",
        "Dedicated success manager",
        "Custom SLA agreements"
      ],
      cta: "Contact Sales",
      color: "violet"
    }
  ];

  const comparisonFeatures = [
    {
      category: "Applications & Monitoring",
      features: [
        { name: "Applications included", starter: "5", professional: "25", enterprise: "Unlimited" },
        { name: "Real-time monitoring", starter: true, professional: true, enterprise: true },
        { name: "Custom dashboards", starter: false, professional: true, enterprise: true },
        { name: "Advanced analytics", starter: false, professional: true, enterprise: true }
      ]
    },
    {
      category: "AI & Automation",
      features: [
        { name: "AI chat support", starter: true, professional: true, enterprise: true },
        { name: "Advanced AI automation", starter: false, professional: true, enterprise: true },
        { name: "Dedicated AI assistant", starter: false, professional: false, enterprise: true },
        { name: "Custom AI training", starter: false, professional: false, enterprise: true }
      ]
    },
    {
      category: "Integrations & Connectors",
      features: [
        { name: "Basic connectors", starter: true, professional: true, enterprise: true },
        { name: "All connector types", starter: false, professional: true, enterprise: true },
        { name: "Custom integrations", starter: false, professional: true, enterprise: true },
        { name: "Enterprise connectors", starter: false, professional: false, enterprise: true }
      ]
    },
    {
      category: "Support & Security",
      features: [
        { name: "Email support", starter: true, professional: true, enterprise: true },
        { name: "Priority support", starter: false, professional: true, enterprise: true },
        { name: "24/7 phone support", starter: false, professional: false, enterprise: true },
        { name: "Dedicated success manager", starter: false, professional: false, enterprise: true }
      ]
    }
  ];

  const handlePlanSelect = (planId: string) => {
    if (planId === "enterprise") {
      // In a real app, this would open a contact form or redirect to sales
      console.log("Contact sales for enterprise plan");
    } else {
      // In a real app, this would redirect to signup/trial
      console.log(`Starting free trial for ${planId} plan`);
    }
  };

  return (
    <Section id="pricing" size="xl">
      <Container size="lg">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Heading as="h2" size="4xl" weight="bold" className="mb-6">
            Simple, Transparent Pricing
          </Heading>
          <Text size="xl" color="muted" className="max-w-4xl mx-auto mb-8 text-balance">
            Choose the plan that fits your team size and monitoring needs. 
            All plans include core diagnostics features and AI assistance.
          </Text>

          {/* Billing Toggle */}
          <div 
            className="inline-flex items-center bg-muted p-1"
            style={{ borderRadius: borderRadius.lg }}
          >
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 text-sm font-medium transition-all duration-200 ${
                billingPeriod === "monthly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ borderRadius: borderRadius.md }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-6 py-2 text-sm font-medium transition-all duration-200 ${
                billingPeriod === "annual"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ borderRadius: borderRadius.md }}
            >
              Annual
              <Badge variant="success" size="sm" className="ml-2">
                Save 20%
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <Grid 
          cols={3} 
          gap="lg" 
          className={`mb-20 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.id}
              className={`relative transition-all duration-300 hover-lift ${
                tier.popular 
                  ? 'shadow-lg scale-105' 
                  : 'hover:shadow-xl'
              }`}
              style={{
                padding: spacing[8],
                borderRadius: borderRadius['2xl'],
                border: `2px solid ${tier.popular ? colors.primary[500] : colors.neutral[200]}`,
                backgroundColor: tier.popular 
                  ? `${colors.primary[500]}05` 
                  : 'hsl(var(--background))',
                boxShadow: tier.popular ? shadows.lg : shadows.sm
              }}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge 
                    variant="primary" 
                    size="md" 
                    className="flex items-center gap-1"
                    style={{
                      backgroundColor: colors.primary[500],
                      color: 'white',
                      borderRadius: borderRadius.full
                    }}
                  >
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <Heading as="h3" size="xl" weight="bold" className="mb-2">
                  {tier.name}
                </Heading>
                <div className="mb-4">
                  <Text size="4xl" weight="bold" className="inline">
                    {tier.price}
                  </Text>
                  {tier.price !== "Custom" && (
                    <Text color="muted" className="inline">
                      /{tier.period}
                    </Text>
                  )}
                  {tier.price === "Custom" && (
                    <Text color="muted" className="inline">
                      {" "}{tier.period}
                    </Text>
                  )}
                </div>
                <Text color="muted">{tier.description}</Text>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check 
                      className="w-5 h-5 flex-shrink-0 mt-0.5" 
                      style={{ color: colors.feature.green }}
                    />
                    <Text size="sm">{feature}</Text>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePlanSelect(tier.id)}
                className={`w-full font-semibold transition-all duration-200 hover-lift ${
                  tier.popular ? "btn-primary" : "btn-secondary"
                }`}
                style={{
                  padding: `${spacing[3]} ${spacing[6]}`,
                  borderRadius: borderRadius.lg
                }}
                variant={tier.popular ? "default" : "outline"}
                data-testid={`pricing-cta-${tier.id}`}
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </Grid>

        {/* Feature Comparison Table */}
        <div className={`transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <Heading as="h3" size="2xl" weight="bold" className="mb-4">
              Feature Comparison
            </Heading>
            <Text size="lg" color="muted" className="max-w-2xl mx-auto">
              Compare all features across our pricing tiers
            </Text>
          </div>

          <div className="bg-background rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-6 font-semibold">Features</th>
                    <th className="text-center p-6 font-semibold">Starter</th>
                    <th className="text-center p-6 font-semibold relative">
                      Professional
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <Star className="w-4 h-4 text-primary fill-current" />
                      </div>
                    </th>
                    <th className="text-center p-6 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                      <tr className="bg-muted/20">
                        <td colSpan={4} className="p-4 font-semibold text-foreground">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={featureIndex} className="border-t border-border">
                          <td className="p-4 text-muted-foreground">{feature.name}</td>
                          <td className="p-4 text-center">
                            {typeof feature.starter === 'boolean' ? (
                              feature.starter ? (
                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-muted-foreground mx-auto" />
                              )
                            ) : (
                              <span className="font-medium">{feature.starter}</span>
                            )}
                          </td>
                          <td className="p-4 text-center bg-primary/5">
                            {typeof feature.professional === 'boolean' ? (
                              feature.professional ? (
                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-muted-foreground mx-auto" />
                              )
                            ) : (
                              <span className="font-medium">{feature.professional}</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof feature.enterprise === 'boolean' ? (
                              feature.enterprise ? (
                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-muted-foreground mx-auto" />
                              )
                            ) : (
                              <span className="font-medium">{feature.enterprise}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={`mt-20 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <Heading as="h3" size="2xl" weight="bold" className="mb-4">
              Frequently Asked Questions
            </Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences."
              },
              {
                question: "What's included in the free trial?",
                answer: "All paid plans include a 14-day free trial with full access to features. No credit card required to start."
              },
              {
                question: "Do you offer custom enterprise solutions?",
                answer: "Yes, our Enterprise plan can be customized for your specific needs including on-premise deployment, custom SLAs, and dedicated support."
              },
              {
                question: "What kind of support do you provide?",
                answer: "We offer email support for all plans, priority support for Professional, and 24/7 phone support plus dedicated success managers for Enterprise."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="bg-muted/30"
                style={{
                  padding: spacing[6],
                  borderRadius: borderRadius.xl
                }}
              >
                <Heading as="h4" size="base" weight="semibold" className="mb-3">
                  {faq.question}
                </Heading>
                <Text color="muted">{faq.answer}</Text>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div 
            className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20"
            style={{
              padding: spacing[8],
              borderRadius: borderRadius['2xl']
            }}
          >
            <Heading as="h3" size="2xl" weight="bold" className="mb-4">
              Ready to transform your incident resolution?
            </Heading>
            <Text size="lg" color="muted" className="mb-6">
              Join thousands of engineering teams using YESRE to reduce downtime and accelerate problem resolution.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handlePlanSelect("professional")}
                size="lg"
                className="btn-primary hover-lift"
                style={{
                  padding: `${spacing[3]} ${spacing[8]}`
                }}
              >
                Start Free Trial
              </Button>
              <Button
                onClick={() => handlePlanSelect("enterprise")}
                variant="outline"
                size="lg"
                className="btn-secondary hover-lift"
                style={{
                  padding: `${spacing[3]} ${spacing[8]}`
                }}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}