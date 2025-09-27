/**
 * Performance monitoring and Core Web Vitals tracking
 */

import React from 'react';

// Core Web Vitals metrics
export interface WebVitalsMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

// Performance observer for tracking metrics
class PerformanceMonitor {
  private metrics: Map<string, WebVitalsMetric> = new Map();
  private observers: PerformanceObserver[] = [];
  private onMetricCallback?: (metric: WebVitalsMetric) => void;

  constructor(onMetric?: (metric: WebVitalsMetric) => void) {
    this.onMetricCallback = onMetric;
    this.initializeObservers();
  }

  private initializeObservers() {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    this.observeLCP();
    
    // First Input Delay (FID) / Interaction to Next Paint (INP)
    this.observeFID();
    this.observeINP();
    
    // Cumulative Layout Shift (CLS)
    this.observeCLS();
    
    // First Contentful Paint (FCP)
    this.observeFCP();
    
    // Time to First Byte (TTFB)
    this.observeTTFB();
  }

  private observeLCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
        
        if (lastEntry) {
          const value = lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime;
          this.reportMetric({
            name: 'LCP',
            value,
            rating: value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor',
            delta: value,
            id: this.generateId(),
            navigationType: this.getNavigationType()
          });
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('LCP observer not supported:', error);
    }
  }

  private observeFID() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { processingStart?: number }) => {
          const value = entry.processingStart ? entry.processingStart - entry.startTime : 0;
          this.reportMetric({
            name: 'FID',
            value,
            rating: value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor',
            delta: value,
            id: this.generateId(),
            navigationType: this.getNavigationType()
          });
        });
      });

      observer.observe({ type: 'first-input', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('FID observer not supported:', error);
    }
  }

  private observeINP() {
    try {
      let maxInteractionDelay = 0;
      
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { processingStart?: number; processingEnd?: number }) => {
          if (entry.processingStart && entry.processingEnd) {
            const interactionDelay = entry.processingEnd - entry.startTime;
            if (interactionDelay > maxInteractionDelay) {
              maxInteractionDelay = interactionDelay;
              this.reportMetric({
                name: 'INP',
                value: interactionDelay,
                rating: interactionDelay <= 200 ? 'good' : interactionDelay <= 500 ? 'needs-improvement' : 'poor',
                delta: interactionDelay,
                id: this.generateId(),
                navigationType: this.getNavigationType()
              });
            }
          }
        });
      });

      observer.observe({ type: 'event', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('INP observer not supported:', error);
    }
  }

  private observeCLS() {
    try {
      let clsValue = 0;
      
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { value?: number; hadRecentInput?: boolean }) => {
          if (!entry.hadRecentInput && entry.value) {
            clsValue += entry.value;
            this.reportMetric({
              name: 'CLS',
              value: clsValue,
              rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor',
              delta: entry.value,
              id: this.generateId(),
              navigationType: this.getNavigationType()
            });
          }
        });
      });

      observer.observe({ type: 'layout-shift', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('CLS observer not supported:', error);
    }
  }

  private observeFCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.reportMetric({
            name: 'FCP',
            value: entry.startTime,
            rating: entry.startTime <= 1800 ? 'good' : entry.startTime <= 3000 ? 'needs-improvement' : 'poor',
            delta: entry.startTime,
            id: this.generateId(),
            navigationType: this.getNavigationType()
          });
        });
      });

      observer.observe({ type: 'paint', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('FCP observer not supported:', error);
    }
  }

  private observeTTFB() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { responseStart?: number }) => {
          if (entry.responseStart) {
            const value = entry.responseStart - entry.startTime;
            this.reportMetric({
              name: 'TTFB',
              value,
              rating: value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor',
              delta: value,
              id: this.generateId(),
              navigationType: this.getNavigationType()
            });
          }
        });
      });

      observer.observe({ type: 'navigation', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('TTFB observer not supported:', error);
    }
  }

  private reportMetric(metric: WebVitalsMetric) {
    this.metrics.set(metric.name, metric);
    
    // Call callback if provided
    if (this.onMetricCallback) {
      this.onMetricCallback(metric);
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${metric.name}:`, {
        value: Math.round(metric.value),
        rating: metric.rating,
        delta: Math.round(metric.delta)
      });
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private getNavigationType(): string {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = (performance as any).navigation;
      if (navigation) {
        return navigation.type || 'unknown';
      }
    }
    return 'unknown';
  }

  public getMetrics(): WebVitalsMetric[] {
    return Array.from(this.metrics.values());
  }

  public getMetric(name: WebVitalsMetric['name']): WebVitalsMetric | undefined {
    return this.metrics.get(name);
  }

  public disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// Performance utilities
export const performanceUtils = {
  // Measure function execution time
  measureFunction: <T extends (...args: any[]) => any>(
    fn: T,
    name?: string
  ): T => {
    return ((...args: Parameters<T>) => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${name || fn.name}: ${(end - start).toFixed(2)}ms`);
      }
      
      return result;
    }) as T;
  },

  // Measure async function execution time
  measureAsyncFunction: <T extends (...args: any[]) => Promise<any>>(
    fn: T,
    name?: string
  ): T => {
    return (async (...args: Parameters<T>) => {
      const start = performance.now();
      const result = await fn(...args);
      const end = performance.now();
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${name || fn.name}: ${(end - start).toFixed(2)}ms`);
      }
      
      return result;
    }) as T;
  },

  // Mark performance milestones
  mark: (name: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(name);
    }
  },

  // Measure between marks
  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name, 'measure')[0];
        if (measure && process.env.NODE_ENV === 'development') {
          console.log(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`);
        }
        return measure?.duration || 0;
      } catch (error) {
        console.warn('Performance measure failed:', error);
        return 0;
      }
    }
    return 0;
  },

  // Get resource loading times
  getResourceTiming: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      return performance.getEntriesByType('resource').map(entry => ({
        name: entry.name,
        duration: entry.duration,
        size: (entry as any).transferSize || 0,
        type: entry.name.split('.').pop() || 'unknown'
      }));
    }
    return [];
  },

  // Get navigation timing
  getNavigationTiming: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          domInteractive: navigation.domInteractive - navigation.navigationStart,
          firstByte: navigation.responseStart - navigation.requestStart,
          dns: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp: navigation.connectEnd - navigation.connectStart,
          ssl: navigation.connectEnd - navigation.secureConnectionStart
        };
      }
    }
    return null;
  }
};

// Analytics integration
export const analytics = {
  // Send metrics to analytics service
  sendMetric: (metric: WebVitalsMetric) => {
    // In production, you would send this to your analytics service
    // Examples: Google Analytics, DataDog, New Relic, etc.
    
    if (process.env.NODE_ENV === 'production') {
      // Example: Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.value),
          custom_map: {
            metric_rating: metric.rating,
            metric_delta: Math.round(metric.delta)
          }
        });
      }

      // Example: Custom analytics endpoint
      fetch('/api/analytics/web-vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric),
      }).catch(error => {
        console.warn('Failed to send metric to analytics:', error);
      });
    }
  },

  // Send custom event
  sendEvent: (eventName: string, properties: Record<string, any> = {}) => {
    if (process.env.NODE_ENV === 'production') {
      // Example: Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, properties);
      }

      // Example: Custom analytics endpoint
      fetch('/api/analytics/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: eventName,
          properties,
          timestamp: Date.now()
        }),
      }).catch(error => {
        console.warn('Failed to send event to analytics:', error);
      });
    }
  }
};

// Initialize performance monitoring
let performanceMonitor: PerformanceMonitor | null = null;

export const initializePerformanceMonitoring = () => {
  if (typeof window !== 'undefined' && !performanceMonitor) {
    performanceMonitor = new PerformanceMonitor((metric) => {
      // Send metrics to analytics
      analytics.sendMetric(metric);
    });

    // Mark app initialization
    performanceUtils.mark('app-init');

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      if (performanceMonitor) {
        performanceMonitor.disconnect();
      }
    });
  }

  return performanceMonitor;
};

export const getPerformanceMonitor = () => performanceMonitor;

// React hook for performance monitoring
export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = React.useState<WebVitalsMetric[]>([]);

  React.useEffect(() => {
    const monitor = initializePerformanceMonitoring();
    
    if (monitor) {
      // Update metrics when new ones are reported
      const updateMetrics = () => {
        setMetrics(monitor.getMetrics());
      };

      // Check for updates periodically
      const interval = setInterval(updateMetrics, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return {
    metrics,
    getMetric: (name: WebVitalsMetric['name']) => 
      metrics.find(metric => metric.name === name),
    sendEvent: analytics.sendEvent
  };
};