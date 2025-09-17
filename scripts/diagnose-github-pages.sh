#!/bin/bash

echo "🔍 GitHub Pages Deployment Diagnostics"
echo "======================================"
echo ""

# Get repository info
if git remote get-url origin > /dev/null 2>&1; then
    REPO_URL=$(git remote get-url origin)
    REPO_PATH=$(echo $REPO_URL | sed 's/.*github.com[:/]//' | sed 's/.git$//')
    REPO_NAME=$(basename "$REPO_URL" .git)
    USERNAME=$(echo $REPO_PATH | cut -d'/' -f1)
    
    echo "📦 Repository: $REPO_PATH"
    echo "🌐 Expected GitHub Pages URL: https://$USERNAME.github.io/$REPO_NAME/"
    echo ""
else
    echo "❌ No git remote found."
    exit 1
fi

# Check if GitHub Pages URL is accessible
echo "🌍 Testing GitHub Pages URL accessibility..."
PAGES_URL="https://$USERNAME.github.io/$REPO_NAME/"

# Test with curl
if command -v curl &> /dev/null; then
    echo "Testing: $PAGES_URL"
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PAGES_URL")
    echo "HTTP Status: $HTTP_STATUS"
    
    if [ "$HTTP_STATUS" = "200" ]; then
        echo "✅ GitHub Pages URL is accessible"
        
        # Check if it returns HTML
        CONTENT_TYPE=$(curl -s -I "$PAGES_URL" | grep -i content-type)
        echo "Content-Type: $CONTENT_TYPE"
        
        # Check if it contains our app
        if curl -s "$PAGES_URL" | grep -q "sreai"; then
            echo "✅ Page contains sreai branding"
        else
            echo "❌ Page doesn't contain expected content"
        fi
        
    elif [ "$HTTP_STATUS" = "404" ]; then
        echo "❌ GitHub Pages URL returns 404 - Pages might not be enabled"
    else
        echo "⚠️  Unexpected HTTP status: $HTTP_STATUS"
    fi
else
    echo "⚠️  curl not available, skipping URL test"
fi

echo ""
echo "🔧 GitHub Pages Configuration Check:"
echo "1. Go to: https://github.com/$REPO_PATH/settings/pages"
echo "2. Verify Source is set to 'GitHub Actions'"
echo "3. Check if there's a green checkmark showing deployment success"
echo ""

echo "📊 GitHub Actions Check:"
echo "1. Go to: https://github.com/$REPO_PATH/actions"
echo "2. Look for successful 'Deploy to GitHub Pages' workflow"
echo "3. Check the deployment logs for any errors"
echo ""

echo "🔍 Common Issues:"
echo "1. GitHub Pages not enabled in repository settings"
echo "2. Source set to 'Deploy from branch' instead of 'GitHub Actions'"
echo "3. Repository is private (GitHub Pages requires public repo or Pro plan)"
echo "4. DNS propagation delay (can take up to 10 minutes)"
echo "5. Browser caching (try hard refresh: Ctrl+Shift+R or Cmd+Shift+R)"
echo ""

echo "🧪 Debug Steps:"
echo "1. Try accessing: $PAGES_URL"
echo "2. Check browser developer tools for errors"
echo "3. Try: ${PAGES_URL}index.html"
echo "4. Verify assets load: ${PAGES_URL}assets/"
echo ""

# Check local build
echo "📁 Local Build Check:"
if [ -f "dist/github-pages/index.html" ]; then
    echo "✅ Local build exists"
    
    # Check file size
    SIZE=$(wc -c < "dist/github-pages/index.html")
    echo "📄 index.html size: $SIZE bytes"
    
    if [ $SIZE -lt 500 ]; then
        echo "⚠️  index.html seems too small"
    fi
    
    # Check for key content
    if grep -q "sreai" "dist/github-pages/index.html"; then
        echo "✅ index.html contains sreai branding"
    else
        echo "❌ index.html missing expected content"
    fi
    
else
    echo "❌ Local build not found - run: npm run build:github-pages"
fi