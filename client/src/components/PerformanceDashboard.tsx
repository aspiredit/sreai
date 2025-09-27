import React, { useState, useEffect } from 'react';
import { Activity, Clock, Zap, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { colors, spacing, borderRadius } from '@/lib/design-system';
import { Container, Heading, Text, Grid, Badge } from '@/components/ui/styled-components';
import { WebVitalsMetric, getPerformanceMonitor, performanceUtils } from '@/lib/performance';

// Only show in development
const PerformanceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<WebVitalsMetric[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [resourceTiming, setResourceTiming] = useState<any[]>([]);
  const [navigationTiming, setNavigationTiming] = useState<any>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const updateMetrics = () => {
      const monitor = getPerformanceMonitor();
      if (monitor) {
        setMetrics(monitor.getMetrics());
      }
      
      setResourceTiming(performanceUtils.getResourceTiming());
      setNavigationTiming(performanceUtils.getNavigationTiming());
    };

    // Update metrics periodically
    const interval = setInterval(updateMetrics, 2000);
    updateMetrics();

    return () => clearInterval(interval);
  }, []);

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return colors.feature.green;
      case 'needs-improvement': return colors.feature.amber;
      case 'poor': return colors.feature.red;
      default: return colors.neutral[500];
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'good': return CheckCircle;
      case 'needs-improvement': return AlertTriangle;
      case 'poor': return AlertTriangle;
      default: return Activity;
    }
  };

  const formatValue = (name: string, value: number) => {
    if (name === 'CLS') {
      return value.toFixed(3);
    }
    return Math.round(value);
  };

  const getMetricDescription = (name: string) => {
    switch (name) {
      case 'LCP': return 'Largest Contentful Paint - Loading performance';
      case 'FID': return 'First Input Delay - Interactivity';
      case 'CLS': return 'Cumulative Layout Shift - Visual stability';
      case 'FCP': return 'First Contentful Paint - Loading performance';
      case 'TTFB': return 'Time to First Byte - Server response';
      case 'INP': return 'Interaction to Next Paint - Responsiveness';
      default: return '';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="mb-2 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover-lift"
        style={{ borderRadius: borderRadius.full }}
        title="Performance Dashboard"
      >
        <Activity className="w-5 h-5" />
      </button>

      {/* Dashboard Panel */}
      {isVisible && (
        <div 
          className="w-96 max-h-96 overflow-y-auto bg-background border border-border shadow-2xl"
          style={{
            borderRadius: borderRadius.xl,
            padding: spacing[4]
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <Heading as="h3" size="base" weight="semibold">
              Performance Metrics
            </Heading>
            <Badge variant="outline" size="sm">
              DEV
            </Badge>
          </div>

          {/* Core Web Vitals */}
          <div className="space-y-3 mb-6">
            <Text size="sm" weight="medium" color="muted">
              Core Web Vitals
            </Text>
            
            {metrics.length === 0 ? (
              <Text size="sm" color="muted">
                Collecting metrics...
              </Text>
            ) : (
              <div className="space-y-2">
                {metrics.map((metric) => {
                  const Icon = getRatingIcon(metric.rating);
                  return (
                    <div 
                      key={metric.name}
                      className="flex items-center justify-between p-2 bg-muted/30 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <Icon 
                          className="w-4 h-4" 
                          style={{ color: getRatingColor(metric.rating) }}
                        />
                        <div>
                          <Text size="sm" weight="medium">
                            {metric.name}
                          </Text>
                          <Text size="xs" color="muted">
                            {getMetricDescription(metric.name)}
                          </Text>
                        </div>
                      </div>
                      <div className="text-right">
                        <Text size="sm" weight="semibold">
                          {formatValue(metric.name, metric.value)}
                          {metric.name === 'CLS' ? '' : 'ms'}
                        </Text>
                        <Text 
                          size="xs" 
                          style={{ color: getRatingColor(metric.rating) }}
                        >
                          {metric.rating}
                        </Text>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navigation Timing */}
          {navigationTiming && (
            <div className="space-y-3 mb-6">
              <Text size="sm" weight="medium" color="muted">
                Navigation Timing
              </Text>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-muted/30 rounded">
                  <Text size="xs" color="muted">DOM Ready</Text>
                  <Text size="sm" weight="medium">
                    {Math.round(navigationTiming.domContentLoaded)}ms
                  </Text>
                </div>
                <div className="p-2 bg-muted/30 rounded">
                  <Text size="xs" color="muted">Load Complete</Text>
                  <Text size="sm" weight="medium">
                    {Math.round(navigationTiming.loadComplete)}ms
                  </Text>
                </div>
                <div className="p-2 bg-muted/30 rounded">
                  <Text size="xs" color="muted">First Byte</Text>
                  <Text size="sm" weight="medium">
                    {Math.round(navigationTiming.firstByte)}ms
                  </Text>
                </div>
                <div className="p-2 bg-muted/30 rounded">
                  <Text size="xs" color="muted">DNS</Text>
                  <Text size="sm" weight="medium">
                    {Math.round(navigationTiming.dns)}ms
                  </Text>
                </div>
              </div>
            </div>
          )}

          {/* Resource Summary */}
          {resourceTiming.length > 0 && (
            <div className="space-y-3">
              <Text size="sm" weight="medium" color="muted">
                Resources ({resourceTiming.length})
              </Text>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {resourceTiming
                  .sort((a, b) => b.duration - a.duration)
                  .slice(0, 5)
                  .map((resource, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <Text size="xs" className="truncate flex-1 mr-2">
                        {resource.name.split('/').pop() || resource.name}
                      </Text>
                      <Text size="xs" color="muted">
                        {Math.round(resource.duration)}ms
                      </Text>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Clear Button */}
          <div className="mt-4 pt-3 border-t border-border">
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && 'performance' in window) {
                  performance.clearMarks();
                  performance.clearMeasures();
                }
                setMetrics([]);
                setResourceTiming([]);
                setNavigationTiming(null);
              }}
              className="w-full p-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear Metrics
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceDashboard;