# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Build and Development
- `npm run dev` - Start development server on port 3000 (Vite frontend)
- `npm run dev:server` - Start backend server in development mode
- `npm run build` - Build production version (frontend + backend bundle)
- `npm run build:demo` - Build demo version for GitHub Pages
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking

### Database
- `npm run db:push` - Push database schema changes to PostgreSQL using Drizzle

## Architecture Overview

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter (lightweight React router)
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Styling**: TailwindCSS with custom design system

### Project Structure
```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components (UI, pages, features)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and configurations
│   │   └── pages/          # Page components
├── server/                 # Express.js backend
│   ├── index.ts           # Main server entry point
│   ├── routes.ts          # API route definitions (currently empty)
│   ├── db.ts              # Database connection setup
│   ├── storage.ts         # Database operations interface
│   └── vite.ts            # Vite dev server integration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Drizzle database schema definitions
└── attached_assets/        # Static assets
```

### Frontend Architecture
- **Main App**: Uses role-based routing (`admin` vs `user` dashboards)
- **Component Library**: Custom UI components built on Radix primitives
- **Design System**: Professional SaaS aesthetic following design_guidelines.md
- **Key Components**:
  - `LandingPage.tsx` - Marketing homepage
  - `AdminDashboard.tsx` - Admin interface for managing connectors/applications
  - `UserDashboard.tsx` - User interface for monitoring assigned applications
  - `ChatInterface.tsx` - AI assistant chat (different capabilities per role)
  - `LoginPage.tsx` - Demo authentication

### Backend Architecture
- **Express Server**: Handles both API routes and static file serving
- **Development Mode**: Integrates Vite dev server for hot reloading
- **Production Mode**: Serves built static files from dist/public
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Basic session-based auth setup (currently placeholder)

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Schema Location**: `shared/schema.ts` using Drizzle ORM
- **Migrations**: Generated in `./migrations` directory

### Path Aliases
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

## Key Features

### Dual Deployment Architecture
This is an SRE AI platform with both:
1. **Marketing Site** (`/`) - Landing page with product information
2. **Demo Application** (`/demo`) - Interactive demo with role-based dashboards

### Role-Based Interface
- **Admin Role**: Full system management, connector configuration, application monitoring
- **User Role**: View assigned applications, AI chat for troubleshooting, limited monitoring

### AI Chat Integration
- Context-aware AI assistant integrated into both admin and user dashboards
- Role-specific capabilities and responses
- Positioned as floating interface (bottom-right corner in admin view)

## Development Guidelines

### Component Development
- Follow existing component patterns in `client/src/components/`
- Use Radix UI primitives for accessibility
- Follow design guidelines in `design_guidelines.md`
- Implement both light and dark theme support

### API Development
- Add routes in `server/routes.ts` with `/api` prefix
- Use `storage` interface for database operations
- Follow existing logging middleware pattern

### Database Changes
- Update schema in `shared/schema.ts`
- Run `npm run db:push` to apply changes
- Use Drizzle's type-safe query builder

### Styling
- Follow TailwindCSS utility-first approach
- Use design tokens from `design_guidelines.md`
- Maintain 8px border radius and consistent spacing (2, 4, 6, 8, 12, 16)

## Environment Setup

### Required Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (defaults to 5000 in production, 3000 in development)
- `NODE_ENV` - Environment mode (development/production)

### Demo Credentials
- Admin: `admin` / `admin123`
- User: `user` / `user123`