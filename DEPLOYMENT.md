# GitHub Pages Deployment Guide

This project is set up for dual GitHub Pages deployment:
1. **Main Site** - Marketing/informational landing page
2. **Demo Site** - Interactive demo with login functionality

## Setup Instructions

### 1. Enable GitHub Pages for Main Site

1. Go to your repository Settings
2. Navigate to Pages section
3. Set Source to "GitHub Actions"
4. The main site will be available at `https://yourusername.github.io/your-repo-name`

### 2. Enable GitHub Pages for Demo Site

1. Go to your repository Settings
2. Navigate to Pages section
3. Under "Source", select "GitHub Actions" for the demo environment
4. The demo site will be available at `https://yourusername.github.io/your-repo-name/demo/`

## Deployment Workflows

### Main Site Deployment
- **Trigger**: Push to `main` branch
- **Workflow**: `.github/workflows/deploy.yml`
- **Environment**: `github-pages`
- **Build Command**: `npm run build`

### Demo Site Deployment
- **Trigger**: Push to `main` branch with changes in `demo/` directory
- **Workflow**: `.github/workflows/deploy-demo.yml`
- **Environment**: `github-pages-demo`
- **Build Command**: `npm run build:demo`

## Local Development

### Running the Main Site
```bash
npm run dev
```

### Building for Production
```bash
# Main site
npm run build

# Demo site
npm run build:demo
```

## Demo Credentials

The demo site includes a simple login system with these credentials:

- **Admin**: `admin` / `admin123`
- **User**: `user` / `user123`

## Features

### Main Site (`/`)
- Landing page with product information
- Getting started guide
- Features overview
- Pricing information
- Contact form
- Link to demo

### Demo Site (`/demo/`)
- Login page with role selection
- Admin dashboard with:
  - Application management
  - Connector configuration
  - AI chat assistant (bottom-right corner)
  - Full system monitoring capabilities
- User dashboard with:
  - Assigned applications view
  - AI chat assistant for logs/traces/code analysis
  - Application monitoring

## Customization

### Adding New Connector Types
1. Update `ConnectorType` in `client/src/components/ConnectorCard.tsx`
2. Add corresponding icon and color in `connectorIcons` and `connectorColors`
3. Update mock data in `AdminDashboard.tsx`

### Modifying Chat Capabilities
1. Edit `ChatInterface.tsx` to add role-specific responses
2. Update placeholder text and initial messages based on user role

### Styling Changes
- All components use Tailwind CSS
- Theme toggle available in both main and demo sites
- Dark/light mode support throughout

## Troubleshooting

### Build Issues
- Ensure Node.js 18+ is installed
- Run `npm ci` to install dependencies
- Check that all environment variables are set correctly

### GitHub Pages Issues
- Verify repository permissions allow GitHub Actions
- Check that Pages source is set to "GitHub Actions"
- Review workflow logs for specific error messages

### Demo Access Issues
- Ensure you're using the correct credentials
- Check that the demo URL includes `/demo/` path
- Verify the build completed successfully
