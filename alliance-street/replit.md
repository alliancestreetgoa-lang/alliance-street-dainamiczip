# Alliance Street Accounting Pvt Ltd - Business Website with CMS

## Overview

This is a modern, professional business website for **Alliance Street Accounting Pvt Ltd**, a global accounting and outsourcing firm offering services up to Virtual CFO level. The site targets businesses in the US, UK, EU, UAE, Canada, and India with a premium corporate look and feel.

The website consists of 7 main public pages: Home, About, Services, Why Us, Global Coverage, Blog, and Contact. It features a dark theme (#0B0B0B background) with red accent colors, responsive design, and Framer Motion animations.

**CMS Admin Dashboard** at `/admin` allows managing all website content, blog posts, site settings, and viewing contact form submissions without touching code.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **Styling**: Tailwind CSS v4 with CSS variables for theming, dark color scheme (#0B0B0B background, white text, red-500 accent)
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Animations**: Framer Motion for scroll-triggered animations
- **Forms**: React Hook Form with Zod validation
- **Data Fetching**: TanStack React Query for server state management
- **Fonts**: Plus Jakarta Sans and Inter from Google Fonts
- **Build Tool**: Vite
- **Dynamic Content**: Pages use `usePageContent` hook to fetch editable text from the database, with hardcoded fallbacks

### Backend
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript, executed via tsx
- **API**: REST endpoints under `/api/` prefix
- **Authentication**: Session-based with bcrypt password hashing, connect-pg-simple session store
- **AI Chatbot**: OpenAI GPT-4o-mini powered customer support chatbot

### API Endpoints
- **Public**:
  - `POST /api/contact` — Contact form submissions
  - `POST /api/chat` — AI chatbot messages
  - `GET /api/content/:page` — Dynamic page content by page name
  - `GET /api/blog` — Published blog posts
  - `GET /api/blog/:slug` — Single blog post by slug
  - `GET /api/settings` — Public site settings
- **Auth**:
  - `POST /api/admin/login` — Admin login
  - `POST /api/admin/logout` — Admin logout
  - `GET /api/admin/me` — Current admin user
- **Admin** (requires auth):
  - `GET/PUT /api/admin/content` — Manage page content sections
  - `GET/POST /api/admin/blog` — List/create blog posts
  - `PUT/DELETE /api/admin/blog/:id` — Update/delete blog posts
  - `GET/PUT /api/admin/settings` — Manage site settings
  - `GET /api/admin/contacts` — View contact submissions

### Data Storage
- **Database**: PostgreSQL via `DATABASE_URL` environment variable
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` — shared between client and server
- **Tables**:
  - `users` — id (UUID), username, password (bcrypt hashed)
  - `contact_submissions` — id (serial), name, email, company, service, message, created_at
  - `page_contents` — id (serial), page, section_key, content (JSONB), updated_at
  - `blog_posts` — id (serial), title, slug (unique), excerpt, content, cover_image, meta_title, meta_description, published, author_name, created_at, updated_at
  - `site_settings` — id (serial), key (unique), value, updated_at
  - `session` — Auto-created by connect-pg-simple for session management
- **Validation**: Drizzle-Zod generates insert schemas from table definitions
- **Migrations**: Drizzle Kit with `db:push` command for schema synchronization
- **Seed Script**: `scripts/seed.ts` — Seeds admin user and initial page content

### Project Structure
```
client/           → Frontend React app
  src/
    components/   → Reusable components (layout, contact-form, service-card, chatbot)
    components/ui/→ shadcn/ui component library
    pages/        → Public page components (home, about, services, blog, etc.)
    pages/admin/  → Admin dashboard pages (login, dashboard, content-editor, blog-manager, settings-manager, contacts-view)
    hooks/        → Custom React hooks (use-toast, use-page-content)
    lib/          → Utilities (queryClient, cn helper)
  public/         → Static assets (images, favicon)
server/           → Backend Express server
  index.ts        → Entry point, middleware setup, session config
  routes.ts       → API route registration (public + admin)
  storage.ts      → Database access layer (IStorage interface + DatabaseStorage)
  db.ts           → Drizzle + pg pool setup
  vite.ts         → Vite dev server middleware integration
  static.ts       → Production static file serving
shared/           → Shared code between client and server
  schema.ts       → Drizzle table definitions and Zod schemas
scripts/          → Utility scripts
  seed.ts         → Database seeding (admin user + page content)
```

### Admin Dashboard
- **Login**: `/admin` — username: admin, password: admin123
- **Dashboard**: `/admin/dashboard` — Overview stats, sidebar navigation
- **Content Editor**: Edit page content sections (hero text, mission, values, etc.) stored as JSON
- **Blog Manager**: Create, edit, publish, and delete blog posts
- **Settings Manager**: Edit site-wide settings (name, contact info, meta tags)
- **Contacts Viewer**: View all contact form submissions

### Key Design Decisions
1. **Dynamic CMS**: All page text content stored in `page_contents` table as JSONB, editable through admin dashboard. Pages use `usePageContent` hook with hardcoded fallbacks for resilience.
2. **Shared schema**: The `shared/` directory allows type-safe data contracts between frontend and backend.
3. **Storage interface pattern**: `IStorage` interface abstracts database operations.
4. **Single server**: Both API and client served from one Express server.
5. **Session-based auth**: Admin authentication uses express-session with PostgreSQL session store.

## External Dependencies

### Required Services
- **PostgreSQL Database**: Required. Connection via `DATABASE_URL` environment variable.
- **OpenAI API**: Required for AI chatbot. Key stored as `OPENAI_API_KEY` secret.

### Key NPM Packages
- **drizzle-orm** + **drizzle-kit**: ORM and migration tooling for PostgreSQL
- **express** v5: HTTP server framework
- **bcrypt**: Password hashing for admin authentication
- **express-session** + **connect-pg-simple**: Session management with PostgreSQL store
- **openai**: OpenAI API client for chatbot
- **@tanstack/react-query**: Client-side server state management
- **wouter**: Lightweight client-side routing
- **framer-motion**: Animation library
- **react-hook-form** + **@hookform/resolvers**: Form handling with Zod validation
- **shadcn/ui components**: Built on Radix UI primitives
