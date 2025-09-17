# Design Guidelines for Professional SaaS Diagnostics Platform

## Design Approach
**System-Based Approach**: Using modern enterprise design patterns inspired by Linear, Notion, and Vercel's dashboard aesthetics. This utility-focused application prioritizes efficiency, clarity, and professional polish for both admin configuration and user diagnostic workflows.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Brand Primary: 220 91% 60% (Professional blue)
- Brand Dark: 220 91% 45%
- Background Light: 0 0% 98%
- Background Dark: 220 13% 9%

**Functional Colors:**
- Success: 142 76% 36%
- Warning: 38 92% 50%
- Error: 0 84% 60%
- Info: 217 91% 60%

**Neutral Grays:**
- Text Primary: 220 9% 10% / 0 0% 98% (light/dark)
- Text Secondary: 220 9% 46% / 220 9% 70%
- Border: 220 13% 91% / 220 13% 15%
- Card Background: 0 0% 100% / 220 13% 11%

### Typography
**Primary Font**: Inter (Google Fonts)
- Headings: 600-700 weight
- Body: 400-500 weight
- Code/Technical: JetBrains Mono

**Scale:**
- Page Titles: 2xl (24px)
- Section Headers: xl (20px)
- Card Titles: lg (18px)
- Body Text: base (16px)
- Captions: sm (14px)

### Layout System
**Spacing Units**: Tailwind 2, 4, 6, 8, 12, 16
- Component padding: p-4 to p-6
- Section spacing: space-y-8
- Card margins: m-4
- Grid gaps: gap-6

## Component Library

### Navigation
- **Admin Sidebar**: Fixed left navigation with connector categories, collapsible sections
- **User Header**: Top navigation with app selector, user profile, notifications
- **Breadcrumbs**: Always visible for deep navigation contexts

### Data Display
- **Status Indicators**: Colored dots with labels (green/yellow/red for healthy/warning/error)
- **Connector Cards**: Clean cards with connection status, last sync time, action buttons
- **Metrics Dashboard**: Grid layout with key performance indicators
- **Application Lists**: Table view with sortable columns and status filters

### Forms & Interaction
- **Chat Interface**: Floating panel or dedicated section with conversation history
- **Configuration Wizards**: Step-based forms with progress indicators
- **Search & Filters**: Prominent search bars with filter chips
- **Action Buttons**: Primary (filled), secondary (outline), and ghost variants

### Overlays
- **Modal Dialogs**: For connector setup and confirmation actions
- **Slide-out Panels**: For detailed configuration and chat interface
- **Toast Notifications**: Success/error feedback positioned top-right

## Key Design Principles

1. **Role-Based Visual Hierarchy**: Admin views use deeper navigation, user views prioritize simplicity
2. **Status-First Design**: Health indicators and connection status prominently displayed
3. **Progressive Disclosure**: Complex configuration hidden behind intuitive entry points
4. **Consistent Iconography**: Use Heroicons for all interface elements
5. **Minimal Motion**: Subtle hover states and loading indicators only

## Layout Patterns

### Admin Dashboard
- Left sidebar with connector management
- Main content area with tabbed views
- Right panel for chat interface (collapsible)
- Status bar at bottom showing system health

### User Dashboard
- Header with app selector and user controls
- Grid of application cards with quick status overview
- Detailed views accessed through card interactions
- No chat interface in user views

## Professional Polish
- Subtle shadows and borders for depth
- Consistent 8px border radius
- Loading states with skeleton screens
- Empty states with helpful guidance
- Responsive breakpoints at 768px and 1024px

This design system creates a professional, efficient interface that scales from simple user diagnostics to complex admin configuration while maintaining visual consistency and usability.