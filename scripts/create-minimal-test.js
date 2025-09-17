#!/usr/bin/env node

import { writeFileSync } from 'fs';

console.log('🧪 Creating minimal test page...');

// Create a minimal HTML test page
const minimalHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>sreai - Test Page</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: #f5f5f5; 
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            padding: 20px; 
            border-radius: 8px; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .logo { 
            width: 64px; 
            height: 64px; 
            margin: 0 auto 20px; 
            display: block; 
        }
        .status { 
            padding: 10px; 
            margin: 10px 0; 
            border-radius: 4px; 
        }
        .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    </style>
</head>
<body>
    <div class="container">
        <img src="/sreai/sreai-logo.png" alt="sreai logo" class="logo" id="logo">
        <h1>sreai - Test Page</h1>
        <p>This is a minimal test page to verify GitHub Pages deployment.</p>
        
        <div id="status" class="status">
            <strong>Status:</strong> Loading...
        </div>
        
        <div id="tests">
            <h3>Tests:</h3>
            <ul id="test-results"></ul>
        </div>
        
        <div>
            <h3>Debug Info:</h3>
            <ul>
                <li><strong>URL:</strong> <span id="current-url"></span></li>
                <li><strong>Base URL:</strong> <span id="base-url"></span></li>
                <li><strong>User Agent:</strong> <span id="user-agent"></span></li>
                <li><strong>Timestamp:</strong> <span id="timestamp"></span></li>
            </ul>
        </div>
    </div>

    <script>
        // Test script
        const addTest = (name, passed, details = '') => {
            const li = document.createElement('li');
            li.innerHTML = \`<strong>\${name}:</strong> \${passed ? '✅ PASS' : '❌ FAIL'} \${details}\`;
            li.style.color = passed ? 'green' : 'red';
            document.getElementById('test-results').appendChild(li);
        };

        // Basic tests
        addTest('JavaScript Execution', true, '- JS is running');
        addTest('DOM Ready', document.readyState === 'complete' || document.readyState === 'interactive', \`- State: \${document.readyState}\`);
        
        // Logo test
        const logo = document.getElementById('logo');
        logo.onload = () => addTest('Logo Load', true, '- Logo loaded successfully');
        logo.onerror = () => {
            addTest('Logo Load', false, '- Logo failed to load');
            // Try fallback
            logo.src = '/sreai/sreai_1758074442530.png';
            logo.onload = () => addTest('Logo Fallback', true, '- Fallback logo loaded');
            logo.onerror = () => addTest('Logo Fallback', false, '- Fallback logo also failed');
        };

        // Fill debug info
        document.getElementById('current-url').textContent = window.location.href;
        document.getElementById('base-url').textContent = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
        document.getElementById('user-agent').textContent = navigator.userAgent;
        document.getElementById('timestamp').textContent = new Date().toISOString();

        // Update status
        document.getElementById('status').innerHTML = '<strong>Status:</strong> ✅ Test page loaded successfully';
        document.getElementById('status').className = 'status success';

        console.log('Test page loaded at:', new Date().toISOString());
        console.log('Current URL:', window.location.href);
        console.log('User Agent:', navigator.userAgent);
    </script>
</body>
</html>`;

writeFileSync('dist/github-pages/test.html', minimalHTML);
console.log('✅ Created test page: dist/github-pages/test.html');
console.log('🌐 Test URL: https://aspiredit.github.io/sreai/test.html');
console.log('📋 This will help diagnose the blank page issue');