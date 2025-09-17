#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';

console.log('🔄 Adding cache-busting for Chrome/Arc browsers...');

const indexPath = 'dist/github-pages/index.html';
if (existsSync(indexPath)) {
    let html = readFileSync(indexPath, 'utf8');
    
    // Add timestamp to force cache refresh
    const timestamp = Date.now();
    
    // Add cache-busting meta tag
    const cacheBustingMeta = `
    <!-- Cache Busting for Chrome/Arc - Build: ${timestamp} -->
    <meta name="build-timestamp" content="${timestamp}">
    <meta http-equiv="Last-Modified" content="${new Date().toUTCString()}">`;
    
    html = html.replace('</head>', `${cacheBustingMeta}\n  </head>`);
    
    // Add cache-busting to asset URLs (if needed)
    html = html.replace(
        /src="([^"]+\.(js|css))"/g,
        `src="$1?v=${timestamp}"`
    );
    
    html = html.replace(
        /href="([^"]+\.css)"/g,
        `href="$1?v=${timestamp}"`
    );
    
    writeFileSync(indexPath, html);
    console.log(`✅ Added cache-busting timestamp: ${timestamp}`);
} else {
    console.log('❌ index.html not found');
}

// Also update 404.html
const notFoundPath = 'dist/github-pages/404.html';
if (existsSync(notFoundPath)) {
    let html = readFileSync(notFoundPath, 'utf8');
    const timestamp = Date.now();
    
    const cacheBustingMeta = `
    <!-- Cache Busting for Chrome/Arc - Build: ${timestamp} -->
    <meta name="build-timestamp" content="${timestamp}">`;
    
    html = html.replace('</head>', `${cacheBustingMeta}\n  </head>`);
    writeFileSync(notFoundPath, html);
    console.log('✅ Updated 404.html with cache-busting');
}