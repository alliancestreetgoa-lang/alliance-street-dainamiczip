# Alliance Street Accounting - Business Website

## Overview

This is a modern, professional business website for **Alliance Street Accounting**, a global accounting and outsourcing firm offering services up to Virtual CFO level. The site targets businesses in the US, UK, EU, UAE, Canada, and India with a premium corporate look and feel.

The website consists of 6 main pages: Home, About, Services, Why Us, Global Coverage, and Contact. It features a dark theme with red accent colors, responsive design, and a contact form that persists submissions to a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **Styling**: Tailwind CSS v4 with CSS variables for theming, using a dark color scheme (near-black background with white text and red accents)
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Animations**: Framer Motion for scroll-triggered animations
- **Forms**: React Hook Form with Zod validation
- **Data Fetching**: TanStack React Query for server state management
- **Fonts**: Plus Jakarta Sans and Inter from Google Fonts
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript, executed via tsx
- **API**: REST endpoints under `/api/` prefix
- **Current Endpoints**:
  - `POST /api/contact` — Accepts contact form submissions with validation

### Data Storage
- **Database**: PostgreSQL via `DATABASE_URL` environment variable
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` — shared between client and server
- **Tables**:
  - `users` — id (UUID), username, password
  - `contact_submissions` — id (serial), name, email, company, service, message, created_at
- **Validation**: Drizzle-Zod generates insert schemas from table definitions
- **Migrations**: Drizzle Kit with `db:push` command for schema synchronization

### Project Structure
```
client/           → Frontend React app
  src/
    components/   → Reusable components (layout, contact-form, service-card)
    components/ui/→ shadcn/ui component library
    pages/        → Route page components (home, about, services, etc.)
    hooks/        → Custom React hooks
    lib/          → Utilities (queryClient, cn helper)
  public/         → Static assets (images, favicon)
server/           → Backend Express server
  index.ts        → Entry point, middleware setup
  routes.ts       → API route registration
  storage.ts      → Database access layer (IStorage interface + DatabaseStorage)
  db.ts           → Drizzle + pg pool setup
  vite.ts         → Vite dev server middleware integration
  static.ts       → Production static file serving
shared/           → Shared code between client and server
  schema.ts       → Drizzle table definitions and Zod schemas
```

### Development vs Production
- **Development**: Vite dev server runs as middleware inside Express, providing HMR via `/vite-hmr` websocket path
- **Production**: Client is built with Vite to `dist/public/`, server is bundled with esbuild to `dist/index.cjs`. Express serves the static files and handles API routes.

### Key Design Decisions
1. **Shared schema**: The `shared/` directory allows type-safe data contracts between frontend and backend using the same Zod schemas derived from Drizzle table definitions.
2. **Storage interface pattern**: `IStorage` interface in `storage.ts` abstracts database operations, making it possible to swap implementations.
3. **Single server**: Both API and client are served from one Express server, simplifying deployment. In dev mode, Vite middleware handles the frontend; in production, pre-built static files are served.

## External Dependencies

### Required Services
- **PostgreSQL Database**: Required. Connection via `DATABASE_URL` environment variable. Used for contact form submissions and user data.

### Key NPM Packages
- **drizzle-orm** + **drizzle-kit**: ORM and migration tooling for PostgreSQL
- **express** v5: HTTP server framework
- **@tanstack/react-query**: Client-side server state management
- **wouter**: Lightweight client-side routing
- **framer-motion**: Animation library
- **react-hook-form** + **@hookform/resolvers**: Form handling with Zod validation
- **shadcn/ui components**: Built on Radix UI primitives (dialog, select, toast, sheet, tabs, etc.)
- **connect-pg-simple**: PostgreSQL session store (available but not yet actively used)

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Runtime error overlay in development
- **@replit/vite-plugin-cartographer**: Dev tooling (dev only)
- **@replit/vite-plugin-dev-banner**: Development banner (dev only)
- **vite-plugin-meta-images**: Custom plugin for OpenGraph meta tag management during builds