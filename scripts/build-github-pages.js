#!/usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';

/**
 * Build script for GitHub Pages deployment
 * Generates static assets optimized for GitHub Pages hosting
 */

console.log('🚀 Building for GitHub Pages deployment...');

// Set environment variables for GitHub Pages build
process.env.GITHUB_PAGES = 'true';
process.env.NODE_ENV = 'production';

// Get repository name from GitHub environment or package.json
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'sreai';
process.env.GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY || `owner/${repoName}`;

console.log(`📦 Repository: ${repoName}`);
console.log(`🌐 Base URL: /${repoName}/`);

try {
  // Clean and create output directory
  const outputDir = 'dist/github-pages';
  if (existsSync(outputDir)) {
    execSync(`rm -rf ${outputDir}`, { stdio: 'inherit' });
  }
  mkdirSync(outputDir, { recursive: true });

  // Run Vite build with GitHub Pages configuration
  console.log('🔨 Running Vite build...');
  execSync('npm run build:vite', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      GITHUB_PAGES: 'true',
      NODE_ENV: 'production'
    }
  });

  // Create .nojekyll file to prevent Jekyll processing
  writeFileSync(path.join(outputDir, '.nojekyll'), '');
  console.log('📄 Created .nojekyll file');

  // Create CNAME file if custom domain is specified
  if (process.env.GITHUB_PAGES_DOMAIN) {
    writeFileSync(path.join(outputDir, 'CNAME'), process.env.GITHUB_PAGES_DOMAIN);
    console.log(`🌍 Created CNAME file for domain: ${process.env.GITHUB_PAGES_DOMAIN}`);
  }

  // Create 404.html for SPA routing fallback
  const indexPath = path.join(outputDir, 'index.html');
  const notFoundPath = path.join(outputDir, '404.html');
  
  if (existsSync(indexPath)) {
    execSync(`cp "${indexPath}" "${notFoundPath}"`, { stdio: 'inherit' });
    console.log('📄 Created 404.html for SPA routing');
  }

  // Apply Chrome/Arc browser compatibility fixes
  console.log('🔧 Applying browser compatibility fixes...');
  execSync('node scripts/fix-chrome-compatibility.js', { stdio: 'inherit' });

  console.log('✅ GitHub Pages build completed successfully!');
  console.log(`📁 Output directory: ${outputDir}`);

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}