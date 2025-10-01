import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Determine if we're building for GitHub Pages
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'sreai';

export default defineConfig(({ mode }) => ({
  // Set base URL for GitHub Pages deployment
  base: isGitHubPages ? `/${repoName}/` : mode === "demo" ? "/demo/" : "/",
  define: {
    // Pass environment variables to client
    'import.meta.env.VITE_GITHUB_PAGES': JSON.stringify(isGitHubPages ? 'true' : 'false'),
    'import.meta.env.VITE_REPO_NAME': JSON.stringify(repoName),
  },
  plugins: [
    react(),
    runtimeErrorOverlay(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: isGitHubPages
      ? path.resolve(__dirname, "dist/github-pages")
      : path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    // Use consistent asset names to prevent 404 errors
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'index.css';
          }
          return '[name].[ext]';
        },
        manualChunks: isGitHubPages ? {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        } : undefined,
      },
    },
  },
  server: {
    port: 3000,
    host: true,
    fs: {
      strict: false,
      allow: ['..']
    },
  },
}));
