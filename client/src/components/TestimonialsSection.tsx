import React, { useState, useEffect } from "react";
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote,
  TrendingUp,
  Clock,
  Shield,
  Users,
  Award,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  companyLogo?: string;
  metrics?: {
    improvement: string;
    timeReduction: string;
  };
}

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("testimonials");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: "1",
      quote: "unQuery has transformed how our team handles incidents. What used to take hours now takes minutes, and our engineers can focus on building instead of firefighting. The AI insights are incredibly accurate.",
      author: "Anil Srikantham",
      title: "CEO & Founder",
      company: "CluCloud",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      metrics: {
        improvement: "75% faster resolution",
        timeReduction: "4 hours → 45 minutes"
      }
    },
    {
      id: "2", 
      quote: "The autonomous AI agents have been a game-changer for our SRE team. We've reduced our mean time to resolution by 80% and our on-call stress has practically disappeared. Best investment we've made.",
      author: "Rayulu V",
      title: "CTO & Co-Founder",
      company: "Sanketika Technologies",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      metrics: {
        improvement: "80% MTTR reduction",
        timeReduction: "24/7 → 2 hours/week on-call"
      }
    },
    {
      id: "3",
      quote: "unQuery's proactive monitoring caught issues we didn't even know existed. The AI chat feature feels like having a senior engineer available 24/7. Our uptime has never been better.",
      author: "Kranthi D",
      title: "CTO",
      company: "myabsolutefaith.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      metrics: {
        improvement: "99.9% uptime achieved",
        timeReduction: "Zero unplanned downtime"
      }
    },
    {
      id: "4",
      quote: "Implementation was seamless and the ROI was immediate. Our team productivity increased dramatically once we stopped spending time on manual incident investigation. The insights are phenomenal.",
      author: "Raja Gunasekhar",
      title: "Head of Platform",
      company: "High Q Technologies",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      metrics: {
        improvement: "300% productivity gain",
        timeReduction: "Setup in under 2 minutes"
      }
    }
  ];

  const companyLogos = [
    { name: "CluCloud", logo: "CC" },
    { name: "Sanketika Technologies", logo: "ST" },
    { name: "myabsolutefaith.com", logo: "AF" },
    { name: "High Q Technologies", logo: "HQ" },
    { name: "InnovateLab", logo: "IL" },
    { name: "ScaleUp", logo: "SU" },
    { name: "DevOps Pro", logo: "DP" },
    { name: "CloudFirst", logo: "CF" }
  ];

  const socialProofMetrics = [
    {
      icon: Users,
      value: "5+",
      label: "Engineering Teams",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: TrendingUp,
      value: "99.9%",
      label: "Customer Satisfaction",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Clock,
      value: "75%",
      label: "Faster Resolution",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Shield,
      value: "99.99%",
      label: "Platform Uptime",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Trusted by Engineering Teams Worldwide
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            See how teams like yours are transforming their incident resolution with unQuery's AI-powered platform
          </p>
        </div>

        {/* Social Proof Metrics */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {socialProofMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${metric.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{metric.value}</div>
              <div className="text-muted-foreground font-medium">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Testimonial */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-background rounded-2xl border border-border p-8 md:p-12 shadow-lg">
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(currentTestimonialData.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl font-medium text-foreground text-center mb-8 leading-relaxed italic">
                "{currentTestimonialData.quote}"
              </blockquote>

              {/* Metrics */}
              {currentTestimonialData.metrics && (
                <div className="flex flex-col sm:flex-row justify-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {currentTestimonialData.metrics.improvement}
                    </div>
                    <div className="text-sm text-muted-foreground">Performance Improvement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {currentTestimonialData.metrics.timeReduction}
                    </div>
                    <div className="text-sm text-muted-foreground">Time Reduction</div>
                  </div>
                </div>
              )}

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative">
                  <img
                    src={currentTestimonialData.avatar}
                    alt={`${currentTestimonialData.author} profile`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-lg font-bold text-primary border-2 border-primary/20 hidden"
                    style={{ display: 'none' }}
                  >
                    {currentTestimonialData.author.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground text-lg">{currentTestimonialData.author}</div>
                  <div className="text-primary font-medium">{currentTestimonialData.title}</div>
                  <div className="text-muted-foreground">{currentTestimonialData.company}</div>
                </div>
                <div className="ml-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
              data-testid="testimonial-prev"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
              data-testid="testimonial-next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  data-testid={`testimonial-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Company Logos */}
        <div className={`transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-8">
            <p className="text-lg text-muted-foreground">
              Trusted by innovative companies worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-8 gap-8 items-center opacity-60">
            {companyLogos.map((company, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center mx-auto text-sm font-bold text-muted-foreground hover:bg-muted transition-colors">
                  {company.logo}
                </div>
                <div className="text-xs text-muted-foreground mt-2 hidden md:block">
                  {company.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Join thousands of satisfied customers
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Start your free trial today and see why engineering teams choose unQuery for incident resolution
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 px-8 py-3"
              data-testid="testimonials-cta"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}