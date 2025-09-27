import React from 'react';
import { Loader2 } from 'lucide-react';
import { colors, spacing, borderRadius, animations } from '@/lib/design-system';
import { Container, Grid } from '@/components/ui/styled-components';

// Loading Spinner Component
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: keyof typeof colors.feature;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'blue',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <Loader2 
      className={`animate-spin ${sizes[size]} ${className}`}
      style={{ color: colors.feature[color] }}
    />
  );
};

// Skeleton Component
interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  variant?: 'text' | 'rectangular' | 'circular';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  width = '100%', 
  height = '1rem',
  variant = 'rectangular'
}) => {
  const baseClasses = 'skeleton animate-pulse bg-muted';
  
  const variantClasses = {
    text: 'rounded',
    rectangular: 'rounded',
    circular: 'rounded-full'
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ 
        width, 
        height,
        borderRadius: variant === 'circular' ? '50%' : borderRadius.base
      }}
    />
  );
};

// Hero Section Skeleton
export const HeroSkeleton: React.FC = () => {
  return (
    <Container size="lg" className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          {/* Badge skeleton */}
          <div className="flex justify-center lg:justify-start">
            <Skeleton width="200px" height="32px" className="rounded-full" />
          </div>
          
          {/* Headline skeleton */}
          <div className="space-y-3">
            <Skeleton width="100%" height="3rem" />
            <Skeleton width="80%" height="3rem" />
          </div>
          
          {/* Subheadline skeleton */}
          <div className="space-y-2">
            <Skeleton width="100%" height="1.5rem" />
            <Skeleton width="90%" height="1.5rem" />
            <Skeleton width="70%" height="1.5rem" />
          </div>
          
          {/* Features skeleton */}
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton width="20px" height="20px" variant="circular" />
                <Skeleton width="20px" height="20px" variant="circular" />
                <Skeleton width="150px" height="1rem" />
              </div>
            ))}
          </div>
          
          {/* Role selection skeleton */}
          <div className="space-y-3">
            <Skeleton width="200px" height="1rem" />
            <div className="space-y-3">
              <Skeleton width="100%" height="80px" className="rounded-xl" />
              <Skeleton width="100%" height="80px" className="rounded-xl" />
            </div>
          </div>
          
          {/* CTAs skeleton */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton width="200px" height="48px" className="rounded-lg" />
            <Skeleton width="150px" height="48px" className="rounded-lg" />
          </div>
        </div>
        
        {/* Visual skeleton */}
        <div className="relative">
          <Skeleton width="100%" height="400px" className="rounded-2xl" />
          <Skeleton 
            width="48px" 
            height="48px" 
            variant="circular" 
            className="absolute -top-4 -right-4" 
          />
          <Skeleton 
            width="48px" 
            height="48px" 
            variant="circular" 
            className="absolute -bottom-4 -left-4" 
          />
        </div>
      </div>
    </Container>
  );
};

// About Section Skeleton
export const AboutSkeleton: React.FC = () => {
  return (
    <Container size="lg" className="py-20">
      {/* Header skeleton */}
      <div className="text-center mb-16 space-y-4">
        <Skeleton width="300px" height="3rem" className="mx-auto" />
        <div className="space-y-2 max-w-4xl mx-auto">
          <Skeleton width="100%" height="1.5rem" />
          <Skeleton width="80%" height="1.5rem" />
        </div>
      </div>
      
      {/* Stats skeleton */}
      <Grid cols={4} gap="lg" className="mb-20">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="text-center space-y-4">
            <Skeleton width="64px" height="64px" variant="circular" className="mx-auto" />
            <Skeleton width="80px" height="2.5rem" className="mx-auto" />
            <Skeleton width="120px" height="1rem" className="mx-auto" />
          </div>
        ))}
      </Grid>
      
      {/* Values skeleton */}
      <div className="mb-20">
        <div className="text-center mb-12 space-y-4">
          <Skeleton width="200px" height="2rem" className="mx-auto" />
          <Skeleton width="400px" height="1.5rem" className="mx-auto" />
        </div>
        
        <Grid cols={3} gap="lg">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-8 space-y-4">
              <Skeleton width="64px" height="64px" variant="circular" />
              <Skeleton width="150px" height="1.5rem" />
              <div className="space-y-2">
                <Skeleton width="100%" height="1rem" />
                <Skeleton width="90%" height="1rem" />
                <Skeleton width="80%" height="1rem" />
              </div>
            </div>
          ))}
        </Grid>
      </div>
      
      {/* Team skeleton */}
      <div className="mb-20">
        <div className="text-center mb-12 space-y-4">
          <Skeleton width="250px" height="2rem" className="mx-auto" />
          <Skeleton width="500px" height="1.5rem" className="mx-auto" />
        </div>
        
        <Grid cols={4} gap="lg">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center space-y-4">
              <Skeleton width="128px" height="128px" variant="circular" className="mx-auto" />
              <Skeleton width="120px" height="1.5rem" className="mx-auto" />
              <Skeleton width="150px" height="1rem" className="mx-auto" />
              <div className="space-y-2">
                <Skeleton width="100%" height="0.875rem" />
                <Skeleton width="80%" height="0.875rem" />
              </div>
            </div>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

// Pricing Section Skeleton
export const PricingSkeleton: React.FC = () => {
  return (
    <Container size="lg" className="py-20">
      {/* Header skeleton */}
      <div className="text-center mb-16 space-y-6">
        <Skeleton width="400px" height="3rem" className="mx-auto" />
        <div className="space-y-2 max-w-4xl mx-auto">
          <Skeleton width="100%" height="1.5rem" />
          <Skeleton width="70%" height="1.5rem" />
        </div>
        <Skeleton width="200px" height="40px" className="mx-auto rounded-lg" />
      </div>
      
      {/* Pricing cards skeleton */}
      <Grid cols={3} gap="lg" className="mb-20">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-8 space-y-6 border rounded-2xl">
            {/* Popular badge for middle card */}
            {i === 2 && (
              <Skeleton width="120px" height="32px" className="mx-auto rounded-full" />
            )}
            
            {/* Header */}
            <div className="text-center space-y-4">
              <Skeleton width="120px" height="2rem" className="mx-auto" />
              <Skeleton width="100px" height="3rem" className="mx-auto" />
              <Skeleton width="200px" height="1rem" className="mx-auto" />
            </div>
            
            {/* Features */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="flex items-center gap-3">
                  <Skeleton width="20px" height="20px" variant="circular" />
                  <Skeleton width="150px" height="1rem" />
                </div>
              ))}
            </div>
            
            {/* CTA */}
            <Skeleton width="100%" height="48px" className="rounded-lg" />
          </div>
        ))}
      </Grid>
    </Container>
  );
};

// Generic Section Skeleton
interface SectionSkeletonProps {
  lines?: number;
  showHeader?: boolean;
  showGrid?: boolean;
  gridItems?: number;
  gridCols?: 1 | 2 | 3 | 4;
}

export const SectionSkeleton: React.FC<SectionSkeletonProps> = ({
  lines = 3,
  showHeader = true,
  showGrid = false,
  gridItems = 6,
  gridCols = 3
}) => {
  return (
    <Container size="lg" className="py-20">
      {showHeader && (
        <div className="text-center mb-16 space-y-4">
          <Skeleton width="300px" height="2.5rem" className="mx-auto" />
          <div className="space-y-2 max-w-2xl mx-auto">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} width={i === 1 ? "80%" : "100%"} height="1.5rem" />
            ))}
          </div>
        </div>
      )}
      
      {showGrid ? (
        <Grid cols={gridCols} gap="lg">
          {Array.from({ length: gridItems }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton width="100%" height="200px" className="rounded-lg" />
              <Skeleton width="80%" height="1.5rem" />
              <div className="space-y-2">
                {Array.from({ length: 2 }).map((_, j) => (
                  <Skeleton key={j} width={j === 1 ? "60%" : "100%"} height="1rem" />
                ))}
              </div>
            </div>
          ))}
        </Grid>
      ) : (
        <div className="space-y-4 max-w-4xl mx-auto">
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton 
              key={i} 
              width={i === lines - 1 ? "70%" : "100%"} 
              height="1.5rem" 
            />
          ))}
        </div>
      )}
    </Container>
  );
};

// Loading Overlay
interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading, 
  children, 
  message = "Loading..." 
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
      <div 
        className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        style={{ borderRadius: borderRadius.lg }}
      >
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <div className="text-muted-foreground font-medium">{message}</div>
        </div>
      </div>
    </div>
  );
};