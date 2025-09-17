# Deployment Guide

## GitHub Pages Deployment

### Quick Start

1. **Run the setup script:**
   ```bash
   ./scripts/setup-github-pages.sh
   ```

2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - Save

### Manual Deployment

If you prefer manual deployment:

```bash
# Build for GitHub Pages
npm run build:github-pages

# Create and switch to gh-pages branch
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/github-pages/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

Then configure GitHub Pages to use the `gh-pages` branch.

### Build Commands

- `npm run build:github-pages` - Build for GitHub Pages with correct base URL
- `npm run build:aws` - Build for AWS deployment
- `npm run build` - Standard build (includes server)

### Environment Variables

The build automatically configures:
- `GITHUB_PAGES=true` - Enables GitHub Pages mode
- `GITHUB_REPOSITORY` - Sets repository name for base URL
- Base URL: `/repository-name/`

### Troubleshooting

**Build Issues:**
- Ensure all dependencies are installed: `npm install`
- Check Node.js version (18+ recommended)

**Routing Issues:**
- Verify 404.html is created (automatic)
- Check base URL configuration in browser dev tools

**Asset Loading:**
- Confirm assets have correct base path (`/sreai/assets/...`)
- Check network tab for 404 errors

### Custom Domain

To use a custom domain:

1. Set environment variable:
   ```bash
   GITHUB_PAGES_DOMAIN=yourdomain.com npm run build:github-pages
   ```

2. Configure DNS CNAME record pointing to `username.github.io`

### Monitoring

After deployment, verify:
- [ ] Site loads at GitHub Pages URL
- [ ] Navigation works between routes
- [ ] Direct URL access works (e.g., `/admin`)
- [ ] Assets load without errors
- [ ] No console errors in browser dev tools