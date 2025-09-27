import { useState, useEffect } from 'react';
import { getCurrentBreakpoint, type Breakpoint } from '@/lib/responsive';

export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const updateBreakpoint = () => {
      const current = getCurrentBreakpoint();
      setBreakpoint(current);
      setIsMobile(current === 'mobile' || current === 'sm');
      setIsTablet(current === 'md');
      setIsDesktop(current === 'lg' || current === 'xl' || current === '2xl');
    };

    // Set initial values
    updateBreakpoint();

    // Listen for window resize
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
  };
}