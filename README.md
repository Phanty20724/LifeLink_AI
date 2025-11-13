# LifeLink AI - Emergency Healthcare Platform

## Overview

LifeLink AI is an AI-powered emergency healthcare platform that provides real-time medical triage, emergency SOS alerts, and health monitoring. The application enables patients to receive instant AI-based medical guidance, activate emergency alerts with geolocation, and allows administrators to monitor and respond to active emergencies through a live map interface.

**Core Purpose**: Save lives by providing immediate medical guidance and connecting emergency responders with patients in critical situations.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**October 7, 2025**
- Redesigned login and signup pages to match homepage dark theme with purple/pink gradients
- Created comprehensive documentation page at `/documentation` route
- Implemented temporary JSON-based authentication using localStorage (for development/testing)
- Updated hero section Documentation button to link to new documentation page
- All auth pages now feature consistent glassmorphic design with backdrop blur effects

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and caching

**UI Component Library**
- Shadcn UI (New York variant) with Radix UI primitives for accessible components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom healthcare-focused design system (dark mode with purple gradient backgrounds, emergency color accents)

**State Management**
- React Context API for user authentication state (UserContext)
- TanStack Query for server state with optimistic updates
- Local storage persistence for user sessions

**Key Features**
- Real-time health metrics dashboard with vital signs cards
- Interactive map-based emergency alert system using Leaflet
- AI chat interface for medical symptom analysis
- SOS emergency activation with geolocation
- Admin panel for monitoring and managing active alerts

### Backend Architecture

**Runtime & Framework**
- Node.js with Express.js server
- TypeScript with ESM modules for modern JavaScript features
- Session-based authentication using express-session

**API Design**
- RESTful API endpoints organized by resource type
- Authentication middleware (requireAuth, requireAdmin) for route protection
- Mutation-based endpoints for state changes (POST, PATCH)
- Query endpoints for data retrieval (GET)

**Authentication & Authorization**
- **Current Implementation**: Temporary localStorage-based JSON authentication for development
  - User accounts stored in `lifelink_users` localStorage key
  - Current session stored in `lifelink_current_user` localStorage key
  - Plain text password storage (development only - NOT for production)
- **Production Ready**: bcrypt.js for password hashing, session-based authentication with HTTP-only cookies
- Role-based access control (patient vs admin roles)
- Secure session configuration with environment-based settings

**Core API Endpoints**
- `/api/auth/*` - User authentication (signup, login, logout)
- `/api/triage` - AI-powered symptom analysis
- `/api/health-logs` - Patient vital signs tracking
- `/api/alerts` - Emergency alert management
- `/api/chat` - AI chat interactions

### Database Architecture

**Database System**
- PostgreSQL via Neon serverless platform
- Drizzle ORM for type-safe database operations
- WebSocket-based connection pooling for serverless compatibility

**Schema Design**
- `users` - Patient and admin accounts with authentication credentials
- `health_logs` - Vital signs tracking (heart rate, blood pressure, temperature, oxygen)
- `alerts` - Emergency SOS alerts with geolocation and urgency levels
- `ai_chat_logs` - Conversation history with AI triage responses

**Data Relationships**
- User-centric design with foreign key relationships
- JSON columns for flexible location data storage
- Timestamp tracking for all critical events

**Migration Strategy**
- Drizzle Kit for schema migrations
- Database schema defined in shared TypeScript types
- Push-based deployment via `db:push` script

### AI Integration

**Provider**
- Google Gemini AI (via @google/genai SDK)
- Fallback to rule-based triage system when AI is unavailable

**Triage Logic**
- Symptom analysis with urgency scoring (1-10 scale)
- Medical flag detection for critical conditions
- Multi-language support (English and Bengali)
- First aid recommendations and equipment suggestions
- Critical keyword detection for immediate emergency classification

**Response Structure**
- Structured TriageResponse type with urgency scores, medical flags, and actionable guidance
- Confidence scoring for AI reliability
- Bilingual summaries for emergency responders

## External Dependencies

### Third-Party Services

**AI & Analytics**
- Google Gemini AI API (API key required via GEMINI_API_KEY env var)
- Real-time medical triage and chat functionality

**Database**
- Neon PostgreSQL (serverless)
- Connection via DATABASE_URL environment variable
- WebSocket support for connection pooling

**Geolocation & Mapping**
- Leaflet for interactive maps
- Browser Geolocation API for SOS positioning
- OpenStreetMap tile layer for map rendering

### Development Tools

**Replit Integration**
- Vite plugin for runtime error overlay
- Cartographer plugin for code navigation (dev only)
- Dev banner plugin for development indicators

**Build & Development**
- TypeScript compiler for type checking
- ESBuild for production server bundling
- PostCSS with Tailwind CSS and Autoprefixer

### UI Component Libraries

**Radix UI Primitives** (complete set)
- Accessible component foundations (dialogs, dropdowns, tooltips, etc.)
- Unstyled primitives for custom design implementation

**Supporting Libraries**
- react-day-picker for calendar functionality
- cmdk for command palette interfaces
- class-variance-authority for component variant management
- clsx + tailwind-merge for conditional styling

### Session & Security

**Session Management**
- express-session with configurable storage
- connect-pg-simple for PostgreSQL session storage (available but not currently configured)
- Secure cookie configuration for production environments

**Environment Variables Required**
- `DATABASE_URL` - PostgreSQL connection string
- `GEMINI_API_KEY` - Google AI API key
- `SESSION_SECRET` - Session encryption key (production)
- `NODE_ENV` - Environment mode (development/production)
