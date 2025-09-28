import { useLocation } from "wouter";
import { Suspense, useEffect } from "react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import PricingSection from "./PricingSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactSection from "./ContactSection";
import ErrorBoundary from "./ErrorBoundary";
import { HeroSkeleton, AboutSkeleton, PricingSkeleton, SectionSkeleton } from "./LoadingStates";
import { useActiveSection } from "@/hooks/use-active-section";
import { initializePerformanceMonitoring, performanceUtils } from "@/lib/performance";

interface MarketingHomepageProps {
  onDemoAccess: () => void;
}

export default function MarketingHomepage({ onDemoAccess }: MarketingHomepageProps) {
  const [, setLocation] = useLocation();
  const currentSection = useActiveSection({ 
    sections: ["home", "about", "pricing", "testimonials", "contact"],
    offset: 100 
  });

  // Initialize performance monitoring
  useEffect(() => {
    const monitor = initializePerformanceMonitoring();
    performanceUtils.mark('marketing-homepage-mount');
    
    return () => {
      performanceUtils.mark('marketing-homepage-unmount');
      performanceUtils.measure('marketing-homepage-lifetime', 'marketing-homepage-mount', 'marketing-homepage-unmount');
    };
  }, []);

  const handleDemoAccess = performanceUtils.measureFunction(() => {
    performanceUtils.mark('demo-access-start');
    setLocation("/demo/login");
    onDemoAccess();
  }, 'handleDemoAccess');

  const handleSectionChange = (section: string) => {
    // The active section will be automatically updated by the scroll listener
    // This function is mainly for manual navigation
    performanceUtils.mark(`section-change-${section}`);
  };

  const handleLearnMore = () => {
    const aboutElement = document.getElementById("about");
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ErrorBoundary>
        <Navigation
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
          onDemoAccess={handleDemoAccess}
        />
      </ErrorBoundary>

      <ErrorBoundary fallback={<HeroSkeleton />}>
        <Suspense fallback={<HeroSkeleton />}>
          <HeroSection 
            onDemoAccess={handleDemoAccess}
            onLearnMore={handleLearnMore}
          />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<AboutSkeleton />}>
        <Suspense fallback={<AboutSkeleton />}>
          <AboutSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<PricingSkeleton />}>
        <Suspense fallback={<PricingSkeleton />}>
          <PricingSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<SectionSkeleton showGrid gridItems={6} gridCols={3} />}>
        <Suspense fallback={<SectionSkeleton showGrid gridItems={6} gridCols={3} />}>
          <TestimonialsSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<SectionSkeleton lines={5} />}>
        <Suspense fallback={<SectionSkeleton lines={5} />}>
          <ContactSection />
        </Suspense>
      </ErrorBoundary>

      {/* Footer */}
      <ErrorBoundary>
        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-muted-foreground">
              © 2025 RootOps. Agentic AI for faster incident resolution and autonomous system monitoring.
            </p>
          </div>
        </footer>
      </ErrorBoundary>
    </div>
  );
}