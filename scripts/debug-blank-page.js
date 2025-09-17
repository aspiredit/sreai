#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';

console.log('🔍 Debugging blank page issue...\n');

// 1. Check if build files exist
console.log('📁 Checking build files:');
const buildFiles = [
  'dist/github-pages/index.html',
  'dist/github-pages/sreai_1758074442530.png',
  'dist/github-pages/assets'
];

buildFiles.forEach(file => {
  if (existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
  }
});

// 2. Check HTML content
console.log('\n📄 Checking HTML content:');
if (existsSync('dist/github-pages/index.html')) {
  const html = readFileSync('dist/github-pages/index.html', 'utf8');
  
  // Check for essential elements
  const checks = [
    { name: 'Root div', pattern: '<div id="root">' },
    { name: 'Script tag', pattern: '<script type="module"' },
    { name: 'CSS link', pattern: 'stylesheet' },
    { name: 'Base path', pattern: '/sreai/' }
  ];
  
  checks.forEach(check => {
    if (html.includes(check.pattern)) {
      console.log(`✅ ${check.name} found`);
    } else {
      console.log(`❌ ${check.name} missing`);
    }
  });
}

// 3. Check for TypeScript/JavaScript errors
console.log('\n🔧 Running TypeScript check:');
try {
  execSync('npm run check', { stdio: 'pipe' });
  console.log('✅ TypeScript check passed');
} catch (error) {
  console.log('❌ TypeScript errors found:');
  console.log(error.stdout?.toString() || error.message);
}

// 4. Test local development build
console.log('\n🏗️ Testing development build:');
try {
  // Kill any existing dev server
  try {
    execSync('pkill -f "vite.*--port 3000"', { stdio: 'ignore' });
  } catch (e) {
    // Ignore if no process found
  }
  
  console.log('Starting dev server for 5 seconds...');
  const devProcess = execSync('timeout 5s npm run dev || true', { 
    stdio: 'pipe',
    timeout: 6000 
  });
  console.log('✅ Dev server started without immediate errors');
} catch (error) {
  console.log('❌ Dev server failed to start:');
  console.log(error.stdout?.toString() || error.message);
}

console.log('\n🎯 Recommendations:');
console.log('1. Check browser console for JavaScript errors');
console.log('2. Verify logo file loads correctly');
console.log('3. Test with: open dist/github-pages/index.html');
console.log('4. Check network tab for failed asset loads');