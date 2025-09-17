#!/bin/bash

# GitHub Pages Debug Script
# Helps diagnose empty page issues

set -e

echo "🔍 GitHub Pages Debug Analysis"
echo "=============================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Not in project root. Please run from the directory containing package.json"
    exit 1
fi

# Get repository info
if git remote get-url origin > /dev/null 2>&1; then
    REPO_URL=$(git remote get-url origin)
    REPO_PATH=$(echo $REPO_URL | sed 's/.*github.com[:/]//' | sed 's/.git$//')
    REPO_NAME=$(basename "$REPO_URL" .git)
    
    echo "📦 Repository: $REPO_NAME"
    echo "🔗 GitHub Pages URL: https://$(echo $REPO_PATH | cut -d'/' -f1).github.io/$REPO_NAME/"
    echo ""
else
    echo "❌ No git remote found."
    exit 1
fi

# Test local build
echo "🔨 Testing local build..."
npm run build:github-pages

if [ $? -eq 0 ]; then
    echo "✅ Local build successful"
else
    echo "❌ Local build failed - this is likely the issue!"
    exit 1
fi

echo ""
echo "📁 Checking build output..."

# Check if build directory exists
if [ ! -d "dist/github-pages" ]; then
    echo "❌ Build directory 'dist/github-pages' not found!"
    echo "   This means the build didn't create the expected output."
    exit 1
fi

# Check essential files
echo "📄 Checking essential files:"

if [ -f "dist/github-pages/index.html" ]; then
    echo "✅ index.html found"
    FILE_SIZE=$(wc -c < "dist/github-pages/index.html")
    echo "   Size: $FILE_SIZE bytes"
    
    if [ $FILE_SIZE -lt 100 ]; then
        echo "⚠️  index.html is very small - might be empty or corrupted"
    fi
else
    echo "❌ index.html NOT found - this is the problem!"
fi

if [ -f "dist/github-pages/404.html" ]; then
    echo "✅ 404.html found"
else
    echo "⚠️  404.html not found"
fi

if [ -f "dist/github-pages/.nojekyll" ]; then
    echo "✅ .nojekyll found"
else
    echo "⚠️  .nojekyll not found"
fi

# Check assets directory
if [ -d "dist/github-pages/assets" ]; then
    echo "✅ assets directory found"
    ASSET_COUNT=$(ls -1 dist/github-pages/assets | wc -l)
    echo "   Contains $ASSET_COUNT files"
    
    if [ $ASSET_COUNT -eq 0 ]; then
        echo "⚠️  Assets directory is empty"
    fi
else
    echo "❌ assets directory NOT found"
fi

echo ""
echo "🔍 Analyzing index.html content..."

if [ -f "dist/github-pages/index.html" ]; then
    # Check for base path in HTML
    if grep -q "/sreai/" "dist/github-pages/index.html"; then
        echo "✅ Base path '/sreai/' found in HTML"
    else
        echo "❌ Base path '/sreai/' NOT found in HTML"
        echo "   This suggests the build didn't use GitHub Pages configuration"
    fi
    
    # Check for script tags
    SCRIPT_COUNT=$(grep -c "<script" "dist/github-pages/index.html" || echo "0")
    echo "📜 Script tags found: $SCRIPT_COUNT"
    
    # Check for CSS links
    CSS_COUNT=$(grep -c "stylesheet" "dist/github-pages/index.html" || echo "0")
    echo "🎨 CSS links found: $CSS_COUNT"
    
    if [ $SCRIPT_COUNT -eq 0 ] && [ $CSS_COUNT -eq 0 ]; then
        echo "❌ No scripts or CSS found - HTML might be incomplete"
    fi
fi

echo ""
echo "🌐 Environment Check..."

# Check if GITHUB_PAGES environment was set during build
if [ -f "dist/github-pages/index.html" ]; then
    if grep -q "vite" "dist/github-pages/index.html"; then
        echo "✅ Vite build detected"
    else
        echo "⚠️  Vite build signature not found"
    fi
fi

echo ""
echo "🔧 Recommended Actions:"
echo ""

if [ ! -f "dist/github-pages/index.html" ]; then
    echo "1. ❌ CRITICAL: index.html missing"
    echo "   - Check vite.config.ts configuration"
    echo "   - Verify build script runs correctly"
    echo "   - Check for build errors in GitHub Actions"
fi

if [ -f "dist/github-pages/index.html" ]; then
    FILE_SIZE=$(wc -c < "dist/github-pages/index.html")
    if [ $FILE_SIZE -lt 500 ]; then
        echo "1. ⚠️  index.html is very small ($FILE_SIZE bytes)"
        echo "   - Check if React app is building correctly"
        echo "   - Verify all dependencies are installed"
        echo "   - Check for JavaScript errors"
    fi
fi

if ! grep -q "/sreai/" "dist/github-pages/index.html" 2>/dev/null; then
    echo "2. ❌ Base path configuration issue"
    echo "   - Verify GITHUB_PAGES=true environment variable"
    echo "   - Check vite.config.ts base path configuration"
    echo "   - Rebuild with: GITHUB_PAGES=true npm run build:github-pages"
fi

echo ""
echo "🧪 Quick Tests:"
echo ""
echo "Test 1 - Manual build with debug:"
echo "GITHUB_PAGES=true GITHUB_REPOSITORY=$REPO_PATH npm run build:github-pages"
echo ""
echo "Test 2 - Check GitHub Actions logs:"
echo "https://github.com/$REPO_PATH/actions"
echo ""
echo "Test 3 - Open local build:"
echo "open dist/github-pages/index.html"
echo ""
echo "📚 For more help, see: docs/GITHUB_PAGES_TROUBLESHOOTING.md"