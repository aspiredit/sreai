/**
 * Responsive design utilities and breakpoint management
 */

export const breakpoints = {
  mobile: 320,    // Small phones
  sm: 640,        // Large phones
  md: 768,        // Tablets
  lg: 1024,       // Small desktops
  xl: 1280,       // Large desktops
  '2xl': 1536     // Extra large screens
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Get current breakpoint based on window width
 */
export const getCurrentBreakpoint = (): Breakpoint => {
  if (typeof window === 'undefined') return 'lg'; // SSR fallback
  
  const width = window.innerWidth;
  
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'mobile';
};

/**
 * Check if current screen is mobile
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < breakpoints.md;
};

/**
 * Check if current screen is tablet
 */
export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  return width >= breakpoints.md && width < breakpoints.lg;
};

/**
 * Check if current screen is desktop
 */
export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return true;
  return window.innerWidth >= breakpoints.lg;
};

/**
 * Responsive grid classes for different breakpoints
 */
export const responsiveGrids = {
  // Single column on mobile, 2 on tablet, 3 on desktop
  '1-2-3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  // Single column on mobile, 2 on tablet, 4 on desktop
  '1-2-4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  // 2 on mobile, 3 on tablet, 4 on desktop
  '2-3-4': 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  // 2 on mobile, 4 on tablet, 6 on desktop
  '2-4-6': 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6',
  // 2 on mobile, 4 on tablet, 8 on desktop
  '2-4-8': 'grid-cols-2 md:grid-cols-4 lg:grid-cols-8',
} as const;

/**
 * Responsive spacing classes
 */
export const responsiveSpacing = {
  section: 'py-12 md:py-16 lg:py-20',
  container: 'px-4 sm:px-6 lg:px-8',
  gap: 'gap-4 md:gap-6 lg:gap-8',
  gapLarge: 'gap-6 md:gap-8 lg:gap-12',
} as const;

/**
 * Responsive typography classes
 */
export const responsiveTypography = {
  hero: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  heading: 'text-3xl sm:text-4xl md:text-5xl',
  subheading: 'text-2xl sm:text-3xl md:text-4xl',
  large: 'text-lg sm:text-xl md:text-2xl',
  body: 'text-base sm:text-lg',
} as const;

/**
 * Hook for responsive breakpoint detection
 */
export const useBreakpoint = () => {
  if (typeof window === 'undefined') {
    return {
      current: 'lg' as Breakpoint,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    };
  }

  const current = getCurrentBreakpoint();
  
  return {
    current,
    isMobile: current === 'mobile' || current === 'sm',
    isTablet: current === 'md',
    isDesktop: current === 'lg' || current === 'xl' || current === '2xl',
  };
};