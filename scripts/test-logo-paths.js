#!/usr/bin/env node

import { existsSync } from 'fs';

console.log('🔍 Testing logo file paths...\n');

// Test local files
const localPaths = [
  'client/public/sreai-logo.png',
  'client/public/sreai_1758074442530.png',
  'dist/github-pages/sreai-logo.png',
  'dist/github-pages/sreai_1758074442530.png'
];

console.log('📁 Local file check:');
localPaths.forEach(path => {
  if (existsSync(path)) {
    console.log(`✅ ${path} exists`);
  } else {
    console.log(`❌ ${path} missing`);
  }
});

console.log('\n🌐 GitHub Pages URLs to test:');
console.log('Primary: https://aspiredit.github.io/sreai/sreai-logo.png');
console.log('Fallback: https://aspiredit.github.io/sreai/sreai_1758074442530.png');

console.log('\n🔧 Debugging steps:');
console.log('1. Open browser dev tools');
console.log('2. Check Network tab for failed image requests');
console.log('3. Try accessing logo URLs directly');
console.log('4. Check console for "Logo failed to load" messages');

console.log('\n💡 If logo still shows alt text:');
console.log('- Image file is not loading (404 error)');
console.log('- Check browser network tab for the exact error');
console.log('- Verify GitHub Pages is serving static files correctly');