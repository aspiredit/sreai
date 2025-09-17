#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

console.log('🔧 Fixing Chrome/Arc browser compatibility issues...\n');

// 1. Update index.html with Chrome-specific fixes
const indexPath = 'dist/github-pages/index.html';
if (existsSync(indexPath)) {
    let html = readFileSync(indexPath, 'utf8');
    
    // Add Chrome-specific meta tags and headers
    const chromeFixHeaders = `
    <!-- Chrome/Arc Browser Compatibility -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">`;
    
    // Insert after viewport meta tag
    html = html.replace(
        /<meta name="viewport"[^>]*>/,
        `$&${chromeFixHeaders}`
    );
    
    // Ensure proper MIME types for assets
    html = html.replace(
        /<script type="module"/g,
        '<script type="module" crossorigin="anonymous"'
    );
    
    writeFileSync(indexPath, html);
    console.log('✅ Updated index.html with Chrome compatibility fixes');
} else {
    console.log('❌ index.html not found - run build first');
}

// 2. Create .htaccess for proper MIME types (if needed)
const htaccessContent = `
# Chrome/Arc Browser Compatibility
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options SAMEORIGIN
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Proper MIME types
<IfModule mod_mime.c>
    AddType application/javascript .js
    AddType text/css .css
    AddType application/json .json
</IfModule>

# Cache control for assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType text/html "access plus 0 seconds"
</IfModule>
`;

writeFileSync('dist/github-pages/.htaccess', htaccessContent.trim());
console.log('✅ Created .htaccess for server-side compatibility');

console.log('\n🎯 Chrome/Arc Browser Fixes Applied:');
console.log('1. ✅ Added cache-busting headers');
console.log('2. ✅ Added security headers for Chrome');
console.log('3. ✅ Fixed CORS and MIME type issues');
console.log('4. ✅ Added .htaccess for server configuration');
console.log('\n🚀 Redeploy to GitHub Pages to apply fixes');