#!/bin/bash

# Script to help enable GitHub Pages
# This script provides instructions since GitHub Pages must be enabled manually

set -e

echo "🔧 GitHub Pages Setup Helper"
echo "=============================="
echo ""

# Get repository information
if git remote get-url origin > /dev/null 2>&1; then
    REPO_URL=$(git remote get-url origin)
    REPO_PATH=$(echo $REPO_URL | sed 's/.*github.com[:/]//' | sed 's/.git$//')
    REPO_NAME=$(basename "$REPO_URL" .git)
    
    echo "📦 Repository: $REPO_NAME"
    echo "🔗 Repository URL: https://github.com/$REPO_PATH"
    echo ""
else
    echo "❌ No git remote found. Please ensure you're in a git repository with a GitHub remote."
    exit 1
fi

echo "🚨 IMPORTANT: GitHub Pages must be enabled manually!"
echo ""
echo "Please follow these steps:"
echo ""
echo "1. 🌐 Open your repository settings:"
echo "   https://github.com/$REPO_PATH/settings/pages"
echo ""
echo "2. ⚙️  Configure GitHub Pages:"
echo "   - Source: GitHub Actions"
echo "   - Click Save"
echo ""
echo "3. 🔐 Set workflow permissions (if needed):"
echo "   https://github.com/$REPO_PATH/settings/actions"
echo "   - Workflow permissions: Read and write permissions"
echo "   - Allow GitHub Actions to create and approve pull requests"
echo ""
echo "4. 🚀 After enabling, run:"
echo "   git add ."
echo "   git commit -m 'Add GitHub Pages deployment'"
echo "   git push origin main"
echo ""
echo "5. 📊 Monitor deployment:"
echo "   https://github.com/$REPO_PATH/actions"
echo ""
echo "6. 🎉 Your site will be available at:"
echo "   https://$(echo $REPO_PATH | cut -d'/' -f1).github.io/$REPO_NAME/"
echo ""

# Check if GitHub CLI is available
if command -v gh &> /dev/null; then
    echo "💡 GitHub CLI detected! You can also try:"
    echo "   gh repo edit --enable-pages --pages-source-branch=main"
    echo ""
fi

echo "📚 For troubleshooting, see: docs/GITHUB_PAGES_TROUBLESHOOTING.md"