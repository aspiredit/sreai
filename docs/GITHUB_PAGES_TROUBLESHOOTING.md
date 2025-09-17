# GitHub Pages Deployment Troubleshooting

## Common Error: "Get Pages site failed"

If you're seeing this error:
```
HttpError: Not Found
Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions
```

### Solution Steps:

#### 1. Enable GitHub Pages in Repository Settings

**IMPORTANT**: You must manually enable GitHub Pages before the first deployment.

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

#### 2. Verify Repository Permissions

Ensure your repository has the correct permissions:

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
3. Click **Save**

#### 3. Check Branch Protection Rules

If you have branch protection on `main`:

1. Go to **Settings** → **Branches**
2. Edit the `main` branch rule
3. Under **Restrict pushes that create files**, ensure GitHub Actions can push
4. Or temporarily disable branch protection for initial setup

#### 4. Manual First Deployment (Alternative)

If GitHub Actions continues to fail, try manual deployment:

```bash
# Build the site
npm run build:github-pages

# Create gh-pages branch
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/github-pages/* .
git add .
git commit -m "Initial GitHub Pages deployment"
git push origin gh-pages

# Switch back to main
git checkout main
```

Then in repository settings:
- **Source**: Deploy from a branch
- **Branch**: gh-pages / (root)

#### 5. Verify Build Output

Check that the build creates the correct files:

```bash
npm run build:github-pages
ls -la dist/github-pages/
```

Should contain:
- `index.html`
- `404.html`
- `.nojekyll`
- `assets/` directory

#### 6. Repository Visibility

GitHub Pages works with:
- ✅ Public repositories (free)
- ✅ Private repositories (GitHub Pro/Team/Enterprise)

For private repos on free plans, GitHub Pages is not available.

### Debugging Steps

#### Check GitHub Actions Logs

1. Go to **Actions** tab in your repository
2. Click on the failed workflow run
3. Expand the failed step to see detailed error messages

#### Verify Environment Variables

In the GitHub Actions workflow, check that:
- `GITHUB_REPOSITORY` is set correctly
- Build completes without errors
- Artifacts are uploaded successfully

#### Test Local Build

```bash
# Test the build locally
GITHUB_PAGES=true GITHUB_REPOSITORY=username/sreai npm run build:github-pages

# Check the output
open dist/github-pages/index.html
```

### Expected Workflow

1. **First time setup**:
   - Enable GitHub Pages in settings
   - Push code with GitHub Actions workflow
   - First deployment may take 5-10 minutes

2. **Subsequent deployments**:
   - Push to main branch
   - Automatic build and deployment
   - Usually completes in 2-3 minutes

### Success Indicators

✅ **GitHub Actions workflow completes successfully**
✅ **Pages section shows "Your site is live at..."**
✅ **Site accessible at `https://username.github.io/sreai/`**
✅ **Navigation works between routes**
✅ **Assets load without 404 errors**

### Still Having Issues?

1. **Check repository name**: Ensure it matches the expected name (`sreai`)
2. **Verify GitHub account**: Ensure you have permissions to enable Pages
3. **Try different browser**: Sometimes caching causes issues
4. **Wait for propagation**: DNS changes can take up to 24 hours

### Alternative: Use Different Base Path

If you want to deploy to a different path, update the repository name in the build:

```bash
GITHUB_REPOSITORY=username/my-app npm run build:github-pages
```

This will set the base URL to `/my-app/` instead of `/sreai/`.