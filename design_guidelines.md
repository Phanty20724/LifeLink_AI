# LifeLink AI Design Guidelines

## Design Approach
**Utility-Focused Healthcare Interface** - This emergency platform prioritizes clarity, accessibility, and rapid decision-making over decorative elements. The design must instill trust while enabling life-critical actions under stress.

## Core Design Elements

### A. Color Palette

**Dark Mode Foundation** (Primary Interface)
- Background Gradient: 266 100% 50% → 280 61% 65% (purple gradient #5a00ff → #9d4edd)
- Surface Cards: 0 0% 100% (white cards with subtle shadows)
- Text Primary: 0 0% 13% (near-black on white cards)
- Text Secondary: 0 0% 40% (gray for supporting text)

**Emergency Accents**
- Critical SOS: 348 83% 57% (neon pink/red #ef4444 range)
- Warning: 38 92% 50% (amber for moderate urgency)
- Success: 142 71% 45% (green for stable status)
- Info: 217 91% 60% (blue for informational alerts)

**Status Indicators**
- Active/Live: 348 83% 57% (pulsing red for live emergencies)
- Pending: 38 92% 50% (amber)
- Resolved: 142 71% 45% (green)

### B. Typography

**Font Stack**
- Primary: 'Inter' via Google Fonts (clean, medical-appropriate)
- Monospace: 'JetBrains Mono' for vital statistics and coordinates

**Hierarchy**
- Hero Headlines: 3xl to 5xl, font-bold (emergency clarity)
- Section Headers: xl to 2xl, font-semibold
- Body Text: base to lg, font-normal
- Metrics/Vitals: 2xl to 4xl, font-bold (high visibility)
- Captions: sm to xs, font-medium

### C. Layout System

**Spacing Units**: Tailwind scale of 4, 6, 8, 12, 16, 24 (p-4, p-6, p-8, etc.)
- Card Padding: p-6 to p-8
- Section Spacing: py-12 to py-24
- Component Gaps: gap-4 to gap-6

**Grid Patterns**
- Dashboard: 3-column grid (lg:grid-cols-3) for vital cards
- Admin Panel: 2-column split (map + incident list)
- Mobile: Single column stack on all breakpoints

### D. Component Library

**Emergency SOS Button**
- Large, impossible-to-miss: min-h-20 to h-24
- Neon pink/red (#ef4444) with pulsing animation
- White text, bold weight
- Prominent placement (sticky or hero position)

**Health Metric Cards**
- White background with shadow-lg
- Large numerical display (text-4xl font-bold)
- Color-coded borders (green=normal, amber=warning, red=critical)
- Icon + label + value structure

**AI Chat Interface**
- Chat bubble design (user vs AI differentiation)
- User messages: purple accent background
- AI responses: white cards with medical icon
- Typing indicator for AI processing

**Map Component** (Leaflet)
- Full-height sidebar or main view
- Custom markers: red pulse for active SOS, blue for hospitals
- Popup cards with patient info and urgency score
- Zoom to user location on load

**Alert List**
- Card-based timeline view
- Color-coded left border (urgency indicator)
- Timestamp, location, status badges
- Expandable for full details

**Navigation**
- Top navbar: logo + user profile + emergency button
- Side navigation for dashboard sections
- Sticky SOS button always visible

**Data Visualization**
- Line charts for vitals over time (Chart.js or Recharts)
- Purple/pink color scheme matching brand
- Tooltips with detailed values
- Responsive scaling

### E. Page-Specific Layouts

**Landing Page**
- Hero: Full-height with gradient background, centered CTA
- Feature grid: 3-column (AI Doctor, SOS, Monitoring)
- Trust indicators: Stats cards (lives saved, response time)
- Footer: Quick links, emergency helpline

**Dashboard**
- Header: Welcome + vitals summary
- Grid: Health cards (heart rate, BP, temperature)
- AI Chat: Side panel or expandable modal
- Incident history: Timeline below vitals

**Admin Panel**
- Split layout: Live map (70%) + Alert feed (30%)
- Filter controls: Status, urgency, time range
- Real-time badge count for active emergencies
- Quick actions: Accept, Dispatch, Resolve

**SOS Page**
- Simplified, single-purpose layout
- Large SOS trigger button (center)
- Location confirmation with map preview
- Emergency contact quick-dial buttons

### F. Interactions & Micro-animations

**Critical: Minimize Distractions**
- SOS button: Subtle pulse (2s cycle) - only element with animation
- Loading states: Simple spinners, no elaborate animations
- Success confirmations: Quick fade-in toast notifications
- Focus states: Clear blue outline for keyboard navigation

**Real-time Updates**
- Smooth fade-in for new alerts (200ms)
- Badge counter animations for urgency changes
- Map marker updates without jarring re-renders

## Images

**Hero Section (Landing)**
- Large hero image: Healthcare professional using tablet in ambulance or emergency room setting
- Image treatment: Dark overlay (50% opacity) to maintain text readability over purple gradient
- Alternative: Abstract medical visualization (ECG lines, vital signs) as subtle background pattern

**Dashboard Context**
- Small profile photo for user identification
- Medical icons for each vital metric (heart for pulse, droplet for BP, thermometer)

**No images needed**: Admin panel (map-focused), SOS page (action-focused), Chat interface (text-focused)

## Accessibility & Emergency Optimization

- **High Contrast**: All text meets WCAA AAA standards against backgrounds
- **Large Touch Targets**: Minimum 44px for all interactive elements
- **Clear Visual Hierarchy**: Critical actions always prominent
- **Color Independence**: Icons and text labels, never color alone
- **Keyboard Navigation**: Tab order prioritizes emergency functions
- **Screen Reader**: Semantic HTML, ARIA labels for all interactive elements
- **Offline Indicators**: Clear visual feedback when connection is lost

## Trust & Credibility Elements

- **Medical Certification Badges** (if applicable)
- **Response Time Indicators** (e.g., "Average response: 3 minutes")
- **Active Users/Incidents Counter** (builds confidence)
- **Secure Connection Indicators** (lock icon, HTTPS badge)