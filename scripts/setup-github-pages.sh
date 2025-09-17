#!/bin/bash

# GitHub Pages Setup Script
# This script helps set up GitHub Pages deployment for your demo site

set -e

echo "🚀 Setting up GitHub Pages deployment..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Please run 'git init' first."
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please ensure you're in the project root."
    exit 1
fi

# Install dependencies if node_modules doesn't exist or is incomplete
if [ ! -d "node_modules" ] || ! npm list > /dev/null 2>&1; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies. Please check the errors above."
        exit 1
    fi
    echo "✅ Dependencies installed successfully!"
else
    echo "✅ Dependencies already installed"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote origin found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/sreai.git"
    exit 1
fi

# Get repository information
REPO_URL=$(git remote get-url origin)
REPO_NAME=$(basename "$REPO_URL" .git)

echo "📦 Repository: $REPO_NAME"
echo "🔗 Remote URL: $REPO_URL"

# Test the build
echo "🔨 Testing GitHub Pages build..."
npm run build:github-pages

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Check if GitHub Actions workflow exists
if [ -f ".github/workflows/deploy-github-pages.yml" ]; then
    echo "✅ GitHub Actions workflow found"
else
    echo "❌ GitHub Actions workflow not found"
    echo "   Please ensure .github/workflows/deploy-github-pages.yml exists"
    exit 1
fi

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. Commit and push your changes:"
echo "   git add ."
echo "   git commit -m 'Add GitHub Pages deployment'"
echo "   git push origin main"
echo ""
echo "2. Enable GitHub Pages in your repository:"
echo "   - Go to: https://github.com/$(echo $REPO_URL | sed 's/.*github.com[:/]//' | sed 's/.git$//')/settings/pages"
echo "   - Source: GitHub Actions"
echo "   - Save"
echo ""
echo "3. Your site will be available at:"
echo "   https://$(echo $REPO_URL | sed 's/.*github.com[:/]//' | sed 's/.git$//' | sed 's/\/.*//').github.io/$REPO_NAME/"
echo ""
echo "4. Monitor deployment:"
echo "   - Check Actions tab for build status"
echo "   - First deployment may take a few minutes"