import React, { useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  MessageSquare,
  Calendar,
  Globe,
  Linkedin,
  Twitter,
  Github
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  inquiryType: string;
}

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    inquiryType: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("contact");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@yesre.ai",
      subtitle: "We'll respond within 24 hours",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      action: "mailto:hello@yesre.ai"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (781) 504-2520",
      subtitle: "Mon-Fri, 9am-6pm CST",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      action: "tel:+15551234567"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      content: "Chat with our team",
      subtitle: "Available 24/7",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      action: "#"
    },
    {
      icon: Calendar,
      title: "Schedule a Demo",
      content: "Book a meeting",
      subtitle: "30-minute consultation",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      action: "#"
    }
  ];

  const officeLocations = [
    {
      city: "Sugar Land",
      address: "PO Box 16402",
      zipCode: "Sugar Land, TX 77479",
      timezone: "CST"
    },
    {
      city: "Phoenix",
      address: "456 Innovation Ave, Floor 12",
      zipCode: "Phoenix, AZ 10001",
      timezone: "MST"
    },
    {
      city: "Bengaluru",
      address: "789 Digital Lane, Level 8",
      zipCode: "Bengaluru, IN 600042",
      timezone: "GMT"
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://linkedin.com/company/YESRE",
      color: "text-blue-600"
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "https://twitter.com/YESRE",
      color: "text-sky-500"
    },
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com/YESRE",
      color: "text-gray-700"
    }
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "sales", label: "Sales & Pricing" },
    { value: "support", label: "Technical Support" },
    { value: "partnership", label: "Partnership" },
    { value: "press", label: "Press & Media" }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Check if response is actually JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      console.log('Contact form submitted successfully:', result.message);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
        inquiryType: "general"
      });
    } catch (error) {
      console.error('Form submission error:', error);
      // You could add error state handling here
      alert(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Thank You for Reaching Out!
            </h2>
            <p className="text-lg text-green-700 mb-6">
              We've received your message and will get back to you within 24 hours.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Get in Touch
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            Ready to transform your incident resolution? Contact our team for a 
            personalized demo or to discuss your specific requirements.
          </p>
        </div>

        {/* Contact Methods */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.action}
              className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg text-center"
            >
              <div className={`w-16 h-16 ${method.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <method.icon className={`w-8 h-8 ${method.color}`} />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">{method.title}</h3>
              <p className="text-foreground font-medium mb-1">{method.content}</p>
              <p className="text-sm text-muted-foreground">{method.subtitle}</p>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-card rounded-2xl border border-border p-8">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-foreground">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
                      data-testid="contact-name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@company.com"
                      className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                      data-testid="contact-email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company" className="text-sm font-medium text-foreground">
                      Company
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Your company name"
                      className="mt-1"
                      data-testid="contact-company"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="inquiryType" className="text-sm font-medium text-foreground">
                      Inquiry Type
                    </Label>
                    <select
                      id="inquiryType"
                      value={formData.inquiryType}
                      onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      data-testid="contact-inquiry-type"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us about your monitoring needs, team size, and any specific requirements..."
                    rows={5}
                    className={`mt-1 ${errors.message ? 'border-red-500' : ''}`}
                    data-testid="contact-message"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 py-3 font-semibold"
                  data-testid="contact-submit"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`space-y-8 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Office Locations */}
            <div className="bg-card rounded-2xl border border-border p-8">
              <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Our Offices
              </h3>
              
              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <div key={index} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-semibold text-foreground mb-2">{office.city}</h4>
                    <p className="text-muted-foreground text-sm mb-1">{office.address}</p>
                    <p className="text-muted-foreground text-sm mb-2">{office.zipCode}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Business hours: 9am-6pm {office.timezone}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card rounded-2xl border border-border p-8">
              <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                Follow Us
              </h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              
              <p className="text-muted-foreground text-sm mt-4">
                Stay updated with the latest news, product updates, and engineering insights.
              </p>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8">
              <h3 className="text-xl font-bold mb-4 text-foreground">Quick Response Guarantee</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">General inquiries: Within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Sales questions: Within 4 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Technical support: Within 2 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}