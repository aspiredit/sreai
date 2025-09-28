// Service Worker for caching and performance optimization
const CACHE_NAME = 'rootops-marketing-v1';
const STATIC_CACHE_NAME = 'rootops-static-v1';
const DYNAMIC_CACHE_NAME = 'rootops-dynamic-v1';

// Detect if we're on GitHub Pages
const isGitHubPages = self.location.hostname.includes('github.io') ||
  self.location.pathname.includes('/sreai/');

// Get base path for GitHub Pages
const getBasePath = () => {
  if (!isGitHubPages) return '';
  const pathParts = self.location.pathname.split('/');
  return pathParts.length > 1 ? `/${pathParts[1]}` : '';
};

const basePath = getBasePath();

// Assets to cache immediately (with base path support)
const STATIC_ASSETS = [
  basePath + '/',
  basePath + '/index.html',
  basePath + '/manifest.json',
  // Add other critical assets here
].filter(Boolean);

// Assets to cache on first request (with base path support)
const DYNAMIC_ASSETS = [
  basePath + '/demo/login',
  basePath + '/demo/admin',
  basePath + '/demo/user'
].filter(Boolean);

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker');

  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME &&
              cacheName !== DYNAMIC_CACHE_NAME &&
              cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests (but allow GitHub Pages subdirectory)
  if (url.origin !== location.origin && !url.pathname.startsWith(basePath)) {
    return;
  }

  // Handle different types of requests
  if (isStaticAsset(request.url)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isAPIRequest(request.url)) {
    event.respondWith(handleAPIRequest(request));
  } else if (isImageRequest(request.url)) {
    event.respondWith(handleImageRequest(request));
  } else {
    event.respondWith(handleDynamicRequest(request));
  }
});

// Check if request is for a static asset
function isStaticAsset(url) {
  return url.includes('/assets/') ||
    url.endsWith('.js') ||
    url.endsWith('.css') ||
    url.endsWith('.woff2') ||
    url.endsWith('.woff');
}

// Check if request is for API
function isAPIRequest(url) {
  return url.includes('/api/');
}

// Check if request is for an image
function isImageRequest(url) {
  return url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i);
}

// Handle static assets - cache first
async function handleStaticAsset(request) {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      // Return cached version and update in background
      updateCacheInBackground(request, cache);
      return cachedResponse;
    }

    // Not in cache, fetch and cache
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Error handling static asset:', error);
    return new Response('Asset not available', { status: 404 });
  }
}

// Handle API requests - network first
async function handleAPIRequest(request) {
  try {
    // Always try network first for API requests
    const response = await fetch(request);

    // Cache successful GET requests
    if (response.ok && request.method === 'GET') {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    // Try cache as fallback
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response('API not available', {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Service unavailable' })
    });
  }
}

// Handle image requests - cache first with fallback
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Error handling image:', error);
    // Return a placeholder image or empty response
    return new Response('', { status: 404 });
  }
}

// Handle dynamic requests (HTML pages) - network first with cache fallback
async function handleDynamicRequest(request) {
  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    // Try cache as fallback
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page or main page as fallback
    const mainPageCache = await caches.open(STATIC_CACHE_NAME);
    const mainPage = await mainPageCache.match('/');

    if (mainPage) {
      return mainPage;
    }

    return new Response('Page not available offline', { status: 404 });
  }
}

// Update cache in background
async function updateCacheInBackground(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
  } catch (error) {
    console.warn('[SW] Background cache update failed:', error);
  }
}

// Handle messages from main thread
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;

    case 'CACHE_URLS':
      if (payload && payload.urls) {
        cacheUrls(payload.urls);
      }
      break;

    case 'CLEAR_CACHE':
      clearAllCaches();
      break;

    default:
      console.log('[SW] Unknown message type:', type);
  }
});

// Cache specific URLs
async function cacheUrls(urls) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    await cache.addAll(urls);
    console.log('[SW] URLs cached:', urls);
  } catch (error) {
    console.error('[SW] Failed to cache URLs:', error);
  }
}

// Clear all caches
async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('[SW] All caches cleared');
  } catch (error) {
    console.error('[SW] Failed to clear caches:', error);
  }
}

// Performance monitoring
self.addEventListener('fetch', (event) => {
  // Track fetch performance
  const startTime = performance.now();

  event.respondWith(
    (async () => {
      try {
        const response = await handleRequest(event.request);
        const endTime = performance.now();
        const duration = endTime - startTime;

        // Log slow requests in development
        if (duration > 1000) {
          console.warn(`[SW] Slow request (${duration.toFixed(2)}ms):`, event.request.url);
        }

        return response;
      } catch (error) {
        console.error('[SW] Request failed:', error);
        throw error;
      }
    })()
  );
});

// Route request to appropriate handler
function handleRequest(request) {
  if (isStaticAsset(request.url)) {
    return handleStaticAsset(request);
  } else if (isAPIRequest(request.url)) {
    return handleAPIRequest(request);
  } else if (isImageRequest(request.url)) {
    return handleImageRequest(request);
  } else {
    return handleDynamicRequest(request);
  }
}