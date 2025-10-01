import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { useResponsive } from "@/hooks/use-responsive";

interface NavigationProps {
  currentSection?: string;
  isInDemo?: boolean;
  onSectionChange?: (section: string) => void;
  onDemoAccess?: () => void;
}

const navigationItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "pricing", label: "Pricing" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
  { id: "demo", label: "Demo" },
];

export default function Navigation({ 
  currentSection = "home", 
  isInDemo = false,
  onSectionChange,
  onDemoAccess 
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile, isTablet } = useResponsive();

  // Handle scroll effect for navigation background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when section changes or screen size changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentSection]);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile && !isTablet) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isTablet]);

  const handleSectionClick = (sectionId: string) => {
    if (sectionId === "demo") {
      onDemoAccess?.();
      return;
    }

    onSectionChange?.(sectionId);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => handleSectionClick("home")}
                className="flex items-center gap-3 text-xl font-bold transition-colors"
                data-testid="nav-logo"
                style={{
                  color: '#ffffff',
                  textShadow: '0 0 10px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,1)',
                  fontWeight: '700'
                }}
              >
                <img
                  src="https://yesre-ai-website.s3.amazonaws.com/sreai-logo.png"
                  alt="SREAI Logo"
                  className="w-8 h-8 object-contain"
                  style={{
                    filter: 'brightness(0) invert(1) drop-shadow(0 0 4px rgba(0,0,0,0.8))',
                  }}
                />
                YESRE
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionClick(item.id)}
                  className="text-sm font-medium transition-colors"
                  data-testid={`nav-${item.id}`}
                  style={{
                    color: currentSection === item.id ? '#60a5fa' : '#ffffff',
                    textShadow: '0 0 8px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,1)',
                    fontWeight: currentSection === item.id ? '700' : '600'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Button
                onClick={onDemoAccess}
                size="sm"
                className="transition-colors"
                data-testid="nav-cta-demo"
                style={{
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  textShadow: '0 0 6px rgba(0,0,0,0.8)',
                  fontWeight: '600',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                Try Demo
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md transition-colors"
                data-testid="nav-mobile-toggle"
                aria-label="Toggle mobile menu"
                style={{
                  color: '#ffffff',
                  textShadow: '0 0 6px rgba(0,0,0,0.8)'
                }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.8))' }} />
                ) : (
                  <Menu className="w-5 h-5" style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.8))' }} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="bg-background/95 backdrop-blur-md border-b border-border">
            <div className="px-4 py-4 space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionClick(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    currentSection === item.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-testid={`nav-mobile-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-3 border-t border-border">
                <Button
                  onClick={onDemoAccess}
                  className="w-full bg-primary hover:bg-primary/90"
                  data-testid="nav-mobile-cta-demo"
                >
                  Try Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          data-testid="nav-mobile-overlay"
        />
      )}
    </>
  );
}