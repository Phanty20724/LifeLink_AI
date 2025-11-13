# LifeLink AI - Emergency Healthcare Platform

## Overview

LifeLink AI is an AI-powered emergency healthcare platform that provides real-time medical triage, emergency SOS alerts, and health monitoring. The application enables patients to receive instant AI-based medical guidance through Google Gemini AI, activate emergency alerts that connect to hospitals and first responders, and track health metrics through an interactive dashboard. The core purpose is to save lives by providing immediate medical guidance and connecting emergency responders with patients in critical situations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Technology Stack**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing (smaller alternative to React Router)
- TanStack Query (React Query) v5 for server state management, caching, and optimistic updates

**UI Component System**
- Shadcn UI (New York variant) built on Radix UI primitives for accessible, composable components
- Tailwind CSS with custom design tokens for utility-first styling
- Custom healthcare-focused dark theme with purple gradient backgrounds (266° 100% 50% → 280° 61% 65%)
- Emergency color system: critical (red #ef4444), warning (amber), success (green), info (blue)
- Framer Motion for smooth animations and transitions

**State Management Strategy**
- React Context API (UserContext) for global authentication state
- localStorage persistence for user sessions (temporary JSON-based auth for development)
- TanStack Query for all server state with automatic refetching and background updates
- Query invalidation patterns for real-time data synchronization

**Key Application Features**
- Real-time health metrics dashboard displaying vital signs (heart rate, blood pressure, temperature, oxygen levels)
- Interactive Leaflet-based map system for emergency alert visualization
- AI-powered chat interface for medical symptom analysis using Google Gemini
- One-tap SOS emergency activation with geolocation services
- Admin panel for monitoring and managing active emergency alerts
- Offline-capable architecture with sync when connectivity is restored

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Session-based authentication using express-session with configurable storage
- Middleware architecture for logging, authentication, and request processing

**Database & ORM**
- Drizzle ORM configured for PostgreSQL (via @neondatabase/serverless)
- Schema-first approach with type-safe queries
- Database schema includes: users, healthLogs, alerts, aiChatLogs tables
- UUID primary keys with automatic generation
- JSONB columns for complex data (location coordinates, AI responses)

**Authentication & Authorization**
- bcrypt password hashing (10 rounds)
- Session-based authentication with HTTP-only cookies
- Role-based access control (patient/admin roles)
- Middleware guards: requireAuth, requireAdmin

**AI Integration**
- Google Gemini AI integration via @google/genai SDK
- Medical triage analysis with structured response format (TriageResponse type)
- Rule-based fallback system for critical keywords when AI is unavailable
- Bilingual support (English and Bengali) for emergency summaries
- Confidence scoring and urgency assessment (0-10 scale)

**API Design Patterns**
- RESTful endpoints organized by resource type
- Consistent error handling with appropriate HTTP status codes
- Request validation using Zod schemas
- Optimistic updates coordinated between client and server

**Real-time Features**
- 5-second polling interval for active alerts in admin panel
- Geolocation API integration for SOS functionality
- Live alert status updates (pending → active → resolved)

### Development & Build Configuration

**Build Tools**
- esbuild for server bundling (ESM format)
- Vite with code splitting (vendor/ui chunks for optimal loading)
- TypeScript strict mode with path aliases (@/, @shared/, @db)
- Source maps disabled in production for smaller bundle sizes

**Environment Configuration**
- DATABASE_URL for PostgreSQL connection string
- GEMINI_API_KEY for Google AI integration
- SESSION_SECRET for session encryption (must be set in production)
- NODE_ENV for environment-specific behavior

## External Dependencies

**Database Services**
- Neon PostgreSQL serverless database (@neondatabase/serverless)
- WebSocket connection support for real-time queries

**AI Services**
- Google Gemini AI (@google/genai) for medical triage and chat functionality
- Fallback to rule-based triage when AI service is unavailable

**Mapping & Geolocation**
- Leaflet.js for interactive emergency alert maps
- OpenStreetMap tile layers
- Browser Geolocation API for patient location tracking

**UI Component Libraries**
- Radix UI primitives (20+ components for accessible interactions)
- Framer Motion for declarative animations
- Lucide React for consistent iconography

**Session Management**
- express-session for server-side session handling
- connect-pg-simple for PostgreSQL session store (production-ready)

**Development Tools**
- Replit-specific plugins (vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner)
- PostCSS with Tailwind CSS and Autoprefixer

**Form Handling**
- React Hook Form with @hookform/resolvers
- Zod schemas for validation (integrated via drizzle-zod)

**Key Design Decisions**
- Chose Drizzle ORM over Prisma for lighter bundle size and better TypeScript inference
- Implemented temporary localStorage authentication for rapid development iteration before production deployment
- Selected Wouter over React Router for minimal bundle impact (~1KB vs 9KB)
- Uses session-based auth instead of JWT to reduce client-side security concerns
- Implements polling instead of WebSockets for simplicity in alert updates (5s interval balances freshness vs server load)