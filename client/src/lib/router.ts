/**
 * Router configuration for GitHub Pages compatibility
 * Handles base URL and client-side routing for subdirectory deployment
 */

// Get base URL from Vite's import.meta.env or fallback to root
export const getBasePath = (): string => {
  // In GitHub Pages, the base path is set by Vite config
  const base = import.meta.env.BASE_URL || '/';
  return base === '/' ? '' : base.replace(/\/$/, '');
};

// Create router-compatible paths
export const createPath = (path: string): string => {
  const basePath = getBasePath();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
};

// Extract path without base for routing
export const getRoutePath = (fullPath: string): string => {
  const basePath = getBasePath();
  if (!basePath || fullPath === basePath) return '/';
  
  return fullPath.startsWith(basePath) 
    ? fullPath.slice(basePath.length) || '/'
    : fullPath;
};

// Check if we're running on GitHub Pages
export const isGitHubPages = (): boolean => {
  return import.meta.env.VITE_GITHUB_PAGES === 'true' || 
         window.location.hostname.includes('github.io') ||
         window.location.pathname.includes('/sreai/');
};

// Navigation helper that works with base path
export const navigate = (path: string): void => {
  const fullPath = createPath(path);
  window.history.pushState({}, '', fullPath);
  
  // Dispatch a custom event to trigger router updates
  window.dispatchEvent(new PopStateEvent('popstate'));
};