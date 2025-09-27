import { useLocation } from "wouter";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import PricingSection from "./PricingSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactSection from "./ContactSection";
import { useActiveSection } from "@/hooks/use-active-section";

interface MarketingHomepageProps {
  onDemoAccess: () => void;
}

export default function MarketingHomepage({ onDemoAccess }: MarketingHomepageProps) {
  const [, setLocation] = useLocation();
  const currentSection = useActiveSection({ 
    sections: ["home", "about", "pricing", "testimonials", "contact"],
    offset: 100 
  });

  const handleDemoAccess = () => {
    setLocation("/demo/login");
    onDemoAccess();
  };

  const handleSectionChange = (section: string) => {
    // The active section will be automatically updated by the scroll listener
    // This function is mainly for manual navigation
  };

  const handleLearnMore = () => {
    const aboutElement = document.getElementById("about");
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        onDemoAccess={handleDemoAccess}
      />

      <HeroSection 
        onDemoAccess={handleDemoAccess}
        onLearnMore={handleLearnMore}
      />

      <AboutSection />

      <PricingSection />

      <TestimonialsSection />

      <ContactSection />

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 YESRE. Agentic AI for faster incident resolution and autonomous system monitoring.
          </p>
        </div>
      </footer>
    </div>
  );
}