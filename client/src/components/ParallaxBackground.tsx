import { useEffect, useRef } from 'react';
import { useParallax } from '@/hooks/use-scroll-animation';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxBackground({ 
  children, 
  speed = 0.5, 
  className = '' 
}: ParallaxBackgroundProps) {
  const parallaxRef = useParallax(speed);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Parallax Background Elements */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 -z-10"
      >
        {/* Animated Background Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-bounce delay-500" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-500/20 rounded-full animate-bounce delay-1000" />
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-purple-500/20 rounded-full animate-bounce delay-1500" />
        <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-green-500/20 rounded-full animate-bounce delay-2000" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}