import React, { useState, useRef, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';
import { colors, borderRadius } from '@/lib/design-system';
import { Skeleton } from './LoadingStates';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  placeholder?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
  containerClassName?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallbackSrc,
  placeholder,
  threshold = 0.1,
  rootMargin = '50px',
  onLoad,
  onError,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Load image when in view
  useEffect(() => {
    if (isInView && !currentSrc) {
      setCurrentSrc(src);
    }
  }, [isInView, src, currentSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    } else {
      onError?.();
    }
  };

  const renderPlaceholder = () => {
    if (placeholder) {
      return placeholder;
    }

    if (hasError) {
      return (
        <div 
          className="flex items-center justify-center bg-muted text-muted-foreground"
          style={{ borderRadius: borderRadius.base }}
        >
          <div className="text-center space-y-2">
            <ImageIcon className="w-8 h-8 mx-auto opacity-50" />
            <div className="text-sm">Failed to load image</div>
          </div>
        </div>
      );
    }

    return <Skeleton width="100%" height="100%" />;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0">
          {renderPlaceholder()}
        </div>
      )}
      
      {currentSrc && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

// Optimized image component with responsive sizes
interface ResponsiveImageProps extends LazyImageProps {
  sizes?: string;
  srcSet?: string;
  webpSrc?: string;
  webpSrcSet?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  srcSet,
  webpSrc,
  webpSrcSet,
  sizes = '100vw',
  ...props
}) => {
  return (
    <picture>
      {/* WebP sources for better compression */}
      {webpSrcSet && (
        <source
          srcSet={webpSrcSet}
          sizes={sizes}
          type="image/webp"
        />
      )}
      {webpSrc && (
        <source
          srcSet={webpSrc}
          type="image/webp"
        />
      )}
      
      {/* Fallback sources */}
      {srcSet && (
        <source
          srcSet={srcSet}
          sizes={sizes}
        />
      )}
      
      <LazyImage
        src={src}
        sizes={sizes}
        {...props}
      />
    </picture>
  );
};

// Background image component with lazy loading
interface LazyBackgroundImageProps {
  src: string;
  fallbackSrc?: string;
  children?: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyBackgroundImage: React.FC<LazyBackgroundImageProps> = ({
  src,
  fallbackSrc,
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Load image when in view
  useEffect(() => {
    if (isInView && !currentSrc) {
      const img = new Image();
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoaded(true);
        setHasError(false);
        onLoad?.();
      };
      img.onerror = () => {
        setHasError(true);
        if (fallbackSrc && src !== fallbackSrc) {
          const fallbackImg = new Image();
          fallbackImg.onload = () => {
            setCurrentSrc(fallbackSrc);
            setIsLoaded(true);
            setHasError(false);
          };
          fallbackImg.onerror = () => {
            onError?.();
          };
          fallbackImg.src = fallbackSrc;
        } else {
          onError?.();
        }
      };
      img.src = src;
    }
  }, [isInView, src, fallbackSrc, currentSrc, onLoad, onError]);

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-500 ${className}`}
      style={{
        backgroundImage: isLoaded && currentSrc ? `url(${currentSrc})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {!isLoaded && (
        <div className="absolute inset-0">
          <Skeleton width="100%" height="100%" />
        </div>
      )}
      {children}
    </div>
  );
};

// Image optimization utilities
export const imageOptimization = {
  // Generate responsive image URLs (placeholder for actual CDN integration)
  generateResponsiveSrc: (src: string, width: number, quality = 80) => {
    // In a real application, you would integrate with a CDN like Cloudinary, ImageKit, etc.
    // For now, we'll return the original src
    return src;
  },

  // Generate WebP version URL
  generateWebPSrc: (src: string) => {
    // In a real application, you would convert to WebP format
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  },

  // Generate srcSet for responsive images
  generateSrcSet: (src: string, widths: number[] = [320, 640, 768, 1024, 1280, 1920]) => {
    return widths
      .map(width => `${imageOptimization.generateResponsiveSrc(src, width)} ${width}w`)
      .join(', ');
  },

  // Generate sizes attribute for responsive images
  generateSizes: (breakpoints: { [key: string]: string } = {
    '(max-width: 640px)': '100vw',
    '(max-width: 1024px)': '50vw',
    default: '33vw'
  }) => {
    const entries = Object.entries(breakpoints);
    const mediaQueries = entries
      .filter(([key]) => key !== 'default')
      .map(([query, size]) => `${query} ${size}`);
    
    const defaultSize = breakpoints.default || '100vw';
    return [...mediaQueries, defaultSize].join(', ');
  },

  // Preload critical images
  preloadImage: (src: string, as: 'image' = 'image') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = src;
    document.head.appendChild(link);
  },

  // Preload multiple images
  preloadImages: (srcs: string[]) => {
    srcs.forEach(src => imageOptimization.preloadImage(src));
  }
};