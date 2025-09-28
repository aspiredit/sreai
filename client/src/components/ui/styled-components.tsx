/**
 * Reusable styled components based on the RootOps design system
 */

import React from 'react';
import { colors, spacing, borderRadius, shadows, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';

// Section Container
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'muted' | 'primary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', size = 'lg', children, ...props }, ref) => {
    const variants = {
      default: 'bg-background',
      muted: 'bg-muted/30',
      primary: 'bg-primary/5',
    };

    const sizes = {
      sm: 'py-12 md:py-16',
      md: 'py-16 md:py-20',
      lg: 'py-20 md:py-24',
      xl: 'py-24 md:py-32',
    };

    return (
      <section
        ref={ref}
        className={cn(
          'relative',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = 'Section';

// Container
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', children, ...props }, ref) => {
    const sizes = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-8xl',
      full: 'max-w-full',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto px-4 sm:px-6 lg:px-8',
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = 'Container';

// Heading
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  gradient?: boolean;
  children: React.ReactNode;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = 'h2', size = 'lg', weight = 'bold', gradient = false, children, ...props }, ref) => {
    const sizes = {
      sm: 'text-lg md:text-xl',
      md: 'text-xl md:text-2xl',
      lg: 'text-2xl md:text-3xl',
      xl: 'text-3xl md:text-4xl',
      '2xl': 'text-4xl md:text-5xl',
      '3xl': 'text-5xl md:text-6xl',
      '4xl': 'text-6xl md:text-7xl',
    };

    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          'text-foreground leading-tight tracking-tight',
          sizes[size],
          weights[weight],
          gradient && 'bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Heading.displayName = 'Heading';

// Text
interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size = 'base', weight = 'normal', color = 'default', children, ...props }, ref) => {
    const sizes = {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    };

    const weights = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    const colors = {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      success: 'text-green-600',
      warning: 'text-amber-600',
      error: 'text-red-600',
    };

    return (
      <p
        ref={ref}
        className={cn(
          'leading-relaxed',
          sizes[size],
          weights[weight],
          colors[color],
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
Text.displayName = 'Text';

// Feature Card
interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
  variant?: 'default' | 'elevated' | 'outlined';
  iconColor?: keyof typeof colors.feature;
  children?: React.ReactNode;
}

export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, icon, title, description, variant = 'default', iconColor = 'blue', children, ...props }, ref) => {
    const variants = {
      default: 'bg-background border border-border hover:border-primary/50 shadow-sm hover:shadow-md',
      elevated: 'bg-background border-0 shadow-lg hover:shadow-xl',
      outlined: 'bg-transparent border-2 border-border hover:border-primary/50',
    };

    const iconColors = {
      blue: 'text-blue-500 bg-blue-500/10',
      green: 'text-green-500 bg-green-500/10',
      purple: 'text-purple-500 bg-purple-500/10',
      orange: 'text-orange-500 bg-orange-500/10',
      pink: 'text-pink-500 bg-pink-500/10',
      yellow: 'text-yellow-500 bg-yellow-500/10',
      red: 'text-red-500 bg-red-500/10',
      emerald: 'text-emerald-500 bg-emerald-500/10',
      cyan: 'text-cyan-500 bg-cyan-500/10',
      violet: 'text-violet-500 bg-violet-500/10',
      amber: 'text-amber-500 bg-amber-500/10',
      indigo: 'text-indigo-500 bg-indigo-500/10',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'group p-6 md:p-8 rounded-xl transition-all duration-300 hover-lift',
          variants[variant],
          className
        )}
        {...props}
      >
        {icon && (
          <div className={cn(
            'w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300',
            iconColors[iconColor]
          )}>
            {icon}
          </div>
        )}
        
        <Heading as="h3" size="md" className="mb-3 md:mb-4">
          {title}
        </Heading>
        
        <Text color="muted" className="leading-relaxed">
          {description}
        </Text>
        
        {children}
      </div>
    );
  }
);
FeatureCard.displayName = 'FeatureCard';

// Stat Card
interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  value: string;
  label: string;
  iconColor?: keyof typeof colors.feature;
  animated?: boolean;
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, icon, value, label, iconColor = 'blue', animated = false, ...props }, ref) => {
    const iconColors = {
      blue: 'text-blue-500 bg-blue-500/10',
      green: 'text-green-500 bg-green-500/10',
      purple: 'text-purple-500 bg-purple-500/10',
      orange: 'text-orange-500 bg-orange-500/10',
      pink: 'text-pink-500 bg-pink-500/10',
      yellow: 'text-yellow-500 bg-yellow-500/10',
      red: 'text-red-500 bg-red-500/10',
      emerald: 'text-emerald-500 bg-emerald-500/10',
      cyan: 'text-cyan-500 bg-cyan-500/10',
      violet: 'text-violet-500 bg-violet-500/10',
      amber: 'text-amber-500 bg-amber-500/10',
      indigo: 'text-indigo-500 bg-indigo-500/10',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'text-center group',
          animated && 'hover-lift transition-all duration-300',
          className
        )}
        {...props}
      >
        {icon && (
          <div className={cn(
            'w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4',
            iconColors[iconColor],
            animated && 'group-hover:scale-110 transition-transform duration-300'
          )}>
            {icon}
          </div>
        )}
        
        <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          {value}
        </div>
        
        <Text size="sm" color="muted" weight="medium">
          {label}
        </Text>
      </div>
    );
  }
);
StatCard.displayName = 'StatCard';

// Badge
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-muted text-muted-foreground',
      primary: 'bg-primary/10 text-primary border border-primary/20',
      success: 'bg-green-100 text-green-700 border border-green-200',
      warning: 'bg-amber-100 text-amber-700 border border-amber-200',
      error: 'bg-red-100 text-red-700 border border-red-200',
      outline: 'border border-border text-foreground',
    };

    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';

// Grid
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
  children: React.ReactNode;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 3, gap = 'md', responsive = true, children, ...props }, ref) => {
    const colsMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    };

    const responsiveColsMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
      6: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6',
    };

    const gaps = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          responsive ? responsiveColsMap[cols] : colsMap[cols],
          gaps[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Grid.displayName = 'Grid';