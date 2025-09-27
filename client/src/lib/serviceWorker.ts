/**
 * Service Worker registration and management
 */

// Service worker registration
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Worker not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });

    console.log('Service Worker registered:', registration);

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker is available
            console.log('New service worker available');
            
            // Notify user about update (you can show a toast or banner)
            if (process.env.NODE_ENV === 'development') {
              console.log('New version available. Refresh to update.');
            }
          }
        });
      }
    });

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};

// Unregister service worker
export const unregisterServiceWorker = async (): Promise<boolean> => {
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const result = await registration.unregister();
      console.log('Service Worker unregistered:', result);
      return result;
    }
    return false;
  } catch (error) {
    console.error('Service Worker unregistration failed:', error);
    return false;
  }
};

// Update service worker
export const updateServiceWorker = async (): Promise<void> => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.update();
      console.log('Service Worker update check completed');
    }
  } catch (error) {
    console.error('Service Worker update failed:', error);
  }
};

// Skip waiting and activate new service worker
export const skipWaiting = (): void => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
  }
};

// Cache specific URLs
export const cacheUrls = (urls: string[]): void => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CACHE_URLS',
      payload: { urls }
    });
  }
};

// Clear all caches
export const clearCaches = (): void => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' });
  }
};

// Preload critical resources
export const preloadCriticalResources = (): void => {
  const criticalUrls = [
    '/demo/login',
    '/demo/admin',
    '/demo/user'
  ];

  cacheUrls(criticalUrls);
};

// Check if app is running in standalone mode (PWA)
export const isStandalone = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
};

// Check if device is online
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Listen for online/offline events
export const setupNetworkListeners = (
  onOnline?: () => void,
  onOffline?: () => void
): (() => void) => {
  const handleOnline = () => {
    console.log('App is online');
    onOnline?.();
  };

  const handleOffline = () => {
    console.log('App is offline');
    onOffline?.();
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// Service worker utilities
export const serviceWorkerUtils = {
  // Check if service worker is supported
  isSupported: () => 'serviceWorker' in navigator,

  // Get current registration
  getRegistration: () => navigator.serviceWorker.getRegistration(),

  // Get active service worker
  getActiveWorker: async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    return registration?.active || null;
  },

  // Check if service worker is controlling the page
  isControlling: () => !!navigator.serviceWorker.controller,

  // Wait for service worker to be ready
  waitForReady: () => navigator.serviceWorker.ready,

  // Send message to service worker
  sendMessage: (message: any) => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(message);
    }
  },

  // Listen for service worker messages
  onMessage: (callback: (event: MessageEvent) => void) => {
    navigator.serviceWorker.addEventListener('message', callback);
    
    // Return cleanup function
    return () => {
      navigator.serviceWorker.removeEventListener('message', callback);
    };
  }
};

// Performance optimization utilities
export const performanceOptimizations = {
  // Preload next page
  preloadPage: (url: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  },

  // Preload multiple pages
  preloadPages: (urls: string[]) => {
    urls.forEach(url => performanceOptimizations.preloadPage(url));
  },

  // Preload critical images
  preloadImages: (urls: string[]) => {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  },

  // Enable resource hints
  enableResourceHints: () => {
    // DNS prefetch for external domains
    const externalDomains = [
      'https://images.unsplash.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    externalDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  },

  // Optimize images loading
  optimizeImages: () => {
    // Add loading="lazy" to images that don't have it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      (img as HTMLImageElement).loading = 'lazy';
    });
  }
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = async (): Promise<void> => {
  try {
    // Register service worker
    await registerServiceWorker();

    // Preload critical resources
    preloadCriticalResources();

    // Enable resource hints
    performanceOptimizations.enableResourceHints();

    // Optimize images
    performanceOptimizations.optimizeImages();

    // Setup network listeners
    setupNetworkListeners(
      () => {
        // Handle online
        console.log('Connection restored');
      },
      () => {
        // Handle offline
        console.log('Connection lost - using cached content');
      }
    );

    console.log('Performance optimizations initialized');
  } catch (error) {
    console.error('Failed to initialize performance optimizations:', error);
  }
};