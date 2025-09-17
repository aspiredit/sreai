# GitHub Pages Deployment Plan

## Overview
This plan outlines the steps to deploy your demo site to GitHub Pages using the static build configuration we've implemented.

## Prerequisites
- [x] Static build configuration implemented
- [x] GitHub Pages compatible routing configured
- [x] Build scripts created (`npm run build:github-pages`)

## Deployment Steps

### 1. Repository Setup
1. **Ensure your code is in a GitHub repository**
   ```bash
   # If not already done, initialize and push to GitHub
   git init
   git add .
   git commit -m "Initial commit with GitHub Pages support"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sreai.git
   git push -u origin main
   ```

2. **Verify repository name matches configuration**
   - Current config expects repository name: `sreai`
   - If different, update `GITHUB_REPOSITORY` environment variable

### 2. GitHub Pages Configuration

#### Option A: Manual Deployment
1. **Build the static site locally**
   ```bash
   npm run build:github-pages
   ```

2. **Create gh-pages branch**
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r dist/github-pages/* .
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

3. **Enable GitHub Pages in repository settings**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / (root)
   - Save

#### Option B: Automated Deployment with GitHub Actions (Recommended)

1. **Create GitHub Actions workflow**
   ```bash
   mkdir -p .github/workflows
   ```

2. **Add deployment workflow** (see workflow file below)

3. **Enable GitHub Pages with Actions**
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - Save

### 3. GitHub Actions Workflow
Create `.github/workflows/deploy-github-pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build for GitHub Pages
        run: npm run build:github-pages
        env:
          GITHUB_REPOSITORY: ${{ github.repository }}

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist/github-pages'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4. Environment Variables Configuration

The build script automatically detects:
- Repository name from `GITHUB_REPOSITORY` environment variable
- Sets base URL to `/repository-name/`
- Configures static asset paths

### 5. Custom Domain (Optional)

If you want to use a custom domain:

1. **Add CNAME file**
   ```bash
   echo "your-domain.com" > dist/github-pages/CNAME
   ```

2. **Update build script environment**
   ```bash
   GITHUB_PAGES_DOMAIN=your-domain.com npm run build:github-pages
   ```

3. **Configure DNS**
   - Add CNAME record pointing to `username.github.io`

### 6. Verification Steps

After deployment:

1. **Check build logs**
   - Verify no errors in GitHub Actions
   - Confirm all assets are generated

2. **Test the deployed site**
   - Visit: `https://username.github.io/sreai/`
   - Test navigation between routes
   - Verify assets load correctly

3. **Monitor for issues**
   - Check browser console for errors
   - Verify routing works with direct URLs

## Troubleshooting

### Common Issues

1. **404 on navigation**
   - Ensure 404.html is created (handled by build script)
   - Verify base URL configuration

2. **Assets not loading**
   - Check base URL in vite.config.ts
   - Verify GITHUB_REPOSITORY environment variable

3. **Build failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

### Debug Commands

```bash
# Test build locally
npm run build:github-pages

# Check generated files
ls -la dist/github-pages/

# Verify base URL in HTML
grep -r "sreai" dist/github-pages/
```

## Next Steps

1. Choose deployment method (Manual or GitHub Actions)
2. Set up repository and GitHub Pages
3. Test deployment
4. Configure custom domain (if needed)
5. Set up monitoring and updates

## Files Modified/Created

- ✅ `vite.config.ts` - GitHub Pages base URL configuration
- ✅ `scripts/build-github-pages.js` - Build script for static assets
- ✅ `client/src/lib/router.ts` - Router configuration for subdirectory
- ✅ `client/src/config/environment.ts` - Environment detection
- ✅ `package.json` - Build scripts
- 📝 `.github/workflows/deploy-github-pages.yml` - GitHub Actions workflow (to be created)

## Expected URL
After deployment: `https://YOUR_USERNAME.github.io/sreai/`