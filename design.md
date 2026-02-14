# JS Choice Group - Website Design Brief
**Sleek, Modern, Glassy Look NDIS Care Website**
**Visual Style**: Sleek Design | Modern | Glassy Look | UI Decorators Used


---

## 🎨 Brand Identity

### Color Palette (Well Defined)
```css
/* Vibrant yet soft tones for a premium glassy feel */
--primary: #ABB3F1      /* Sleek Lavender Blue - primary brand color */
--secondary: #F1ABAB    /* Modern Coral Pink - secondary brand color */
--accent: #E8EAFF      /* Light lavender - background decorators */
--dark: #1A202C        /* Deep Charcoal - for high contrast headings */
--light: #F7FAFC       /* Off-white - main background */
--success: #68D391     /* Mint green - positive actions */

/* Button Text Rule */
--btn-text: #1A202C    /* Dark charcoal text for better contrast on light primary/secondary buttons */
```

### Typography
### Typography
- **Headings**: Dosis (Bold, 600) - rounded, friendly, slick
- **Body**: Poppins (Regular, 400) - clean, modern
- **UI Elements**: Buttons are fully rounded (`rounded-full`)
- **Button Colors**: Primary and Secondary backgrounds with **Dark Text** (#1A202C)
- **Colors**: Headings and Borders are Dark Black

### Color Refinement
- **Primary**: #ABB3F1 (Purple)
- **Secondary**: #F1ABAB (Pink)

### Animation Principles
- **Smooth & Gentle**: 300-600ms transitions
- **Fade-in on scroll**: Elements appear with subtle upward motion
- **Hover effects**: Soft scale (1.02-1.05), shadow elevation
- **No jarring movements**: Respect accessibility (prefers-reduced-motion)

---

## 🏗️ Page Structure

### Navigation Bar
**Style**: Sticky, glassmorphism effect on scroll
```
Layout: Logo (left) | Nav Links (center) | CTA Button (right)
Background: White → rgba(255,255,255,0.9) backdrop-blur on scroll
Shadow: none → soft shadow on scroll
```

**Visual Elements**:
- **Logo**: JS Choice Group wordmark with subtle gradient (primary to secondary)
- **Nav hover**: Underline animation (left to right)
- **CTA Button**: "Contact Us" - gradient background (primary to secondary)

**Images Needed**:
1. Logo SVG (transparent background)
2. Mobile menu icon (hamburger, modern minimal style)

---

## 📍 Section 1: Hero Section
**Layout**: Full viewport height, split layout (60% content, 40% image)

### Content (Left)
```
Eyebrow text: "NDIS Registered Provider Since 2020"
  Style: Small caps, primary color, letter-spacing: 2px

Headline: "Empowering Lives Through Inclusive Care"
  Style: 3.5rem, bold, gradient text (primary to dark)
  Animation: Fade-in from bottom, 400ms delay

Subheadline: "We understand neurodiversity, embrace cultural diversity, 
and acknowledge inclusion in care. Your trusted partner in the NDIS journey."
  Style: 1.25rem, light gray, line-height: 1.8
  Animation: Fade-in from bottom, 600ms delay

CTA Buttons:
  Primary: "Get Started" (gradient, primary to secondary)
  Secondary: "Our Services" (outline, primary border)
  Animation: Fade-in from bottom, 800ms delay
```

### Visual (Right)
**Image 1**: Diverse group of people smiling, caregiver assisting participant
- **Style**: Rounded corners (24px), subtle shadow
- **Effect**: Floating animation (gentle up/down motion, 3s loop)
- **Overlay**: Soft gradient overlay (primary color, 10% opacity)

**Decorative Elements**:
- Floating geometric shapes (circles, rounded rectangles) in brand colors with 20% opacity
- Subtle particle animation in background

**Image 2**: Abstract illustration representing connection/community
- **Position**: Bottom right corner, 30% opacity
- **Style**: Minimalist line art, primary color

---

## 📍 Section 2: Trust Badges
**Layout**: Horizontal strip, light background (--accent)

### Content
```
4 Columns with icons and text:
1. ✓ NDIS Registered | ABN: 54 644 196 270
2. 🏆 5+ Years Experience
3. 🌏 Serving Melbourne Wide
4. 🕐 24/7 Care Available
```

**Style**:
- Icons: 48px, primary color
- Text: Center aligned, 0.95rem
- Animation: Count-up effect on scroll for numbers
- Hover: Gentle scale (1.05)

**Image 3**: NDIS Quality and Safeguards Commission logo
- **Position**: Far right
- **Style**: Grayscale → color on hover

---

## 📍 Section 3: About Us
**Layout**: Two-column (image left, content right)

### Visual (Left - 45%)
**Image 4**: Team photo or caring moment (caregiver with participant)
- **Style**: 
  - Large rounded corners (32px)
  - Shadow: 0 20px 60px rgba(171,179,241,0.3)
  - Border: 4px solid white
- **Animation**: Parallax effect (scrolls slightly slower)

**Image 5**: Decorative background pattern
- **Position**: Behind main image, offset
- **Style**: Geometric pattern, 15% opacity, secondary color

### Content (Right - 55%)
```
Section Label: "About Us"
  Style: Small, uppercase, primary color, 0.875rem

Heading: "Supporting Your Independence with Compassion"
  Style: 2.5rem, bold, dark color
  Animation: Fade-in on scroll

Body Text:
"Welcome to Js Choice Care and Support! We have extensive experience 
working with individuals across various conditions, including Autism 
Spectrum Disorders, ADHD, Down Syndrome, Schizophrenia, PTSD, 
Pathological Demand Avoidance (PDA), Stroke, Muscular dystrophy, and more.

Based in Point Cook, Melbourne, we've been empowering participants 
across Melbourne's western and northern suburbs. We aim to connect 
with our wider NDIS community through personalised, neuro-affirming care."

Feature List (with icons):
✓ Neuro-affirming practice
✓ Culturally diverse team
✓ Person-centered care plans
✓ Experienced support workers

CTA: "Learn Our Story" button (outline style)
```

**Style**:
- Paragraph: 1.125rem, line-height: 1.9, gray-700
- Features: Icon (primary) + text, hover reveals checkmark animation
- Spacing: Generous padding (4rem vertical)

---

## 📍 Section 4: Services Grid
**Layout**: Full-width background (light gradient), 3-column grid

### Header
```
Centered text:
"Comprehensive NDIS Services in Melbourne"
  Style: 2.75rem, bold, centered
  
Subtext: "Tailored supports designed around your unique needs and goals"
  Style: 1.125rem, gray-600, centered
```

### Service Cards (Grid: 3 columns, 4 rows)

**Card Structure**:
```
- Icon (top) - 64px, gradient background circle
- Service Name - 1.5rem, bold
- Short Description - 0.95rem, 2 lines max
- "Learn More →" link
```

**Card Style**:
- Background: White
- Border-radius: 20px
- Padding: 2.5rem
- Shadow: 0 4px 20px rgba(0,0,0,0.06)
- **Hover Effect**: 
  - Lift up 8px
  - Shadow increases
  - Icon rotates 5deg
  - Border appears (2px, primary gradient)
- **Animation**: Stagger fade-in (each card 100ms after previous)

**Services to Display**:
1. Assistance With Daily Life
2. Psychosocial Recovery Coaching
3. Assistance With Nursing Care
4. Emergency Respite
5. Group/Centre Activities
6. Transportation Assistance
7. Access To Community Activities
8. Support Coordination
9. Allied Health Services
10. Client & Family Advocacy
11. NDIS Access Requests
12. Innovative Community Participation

**Image 6**: Icon set (12 custom icons in brand style)
- **Style**: Line icons, 2px stroke, rounded caps
- **Colors**: Primary color default, gradient on hover

**Image 7**: Background illustration for section
- **Position**: Bottom left, 25% opacity
- **Style**: Abstract shapes representing care/support

---

## 📍 Section 5: Why Choose Us
**Layout**: Alternating content blocks (zigzag layout)

### Block 1 (Image Left)
**Image 8**: Support worker teaching participant new skill
- **Style**: Rounded, shadow, 600px width
- **Effect**: Reveal animation (slide from left)

**Content (Right)**:
```
Heading: "Because We Never Stop Learning"
Text: "As a neuro-affirming NDIS provider, we recognize all the various 
ways our brains work. We embrace all diversity within our community and 
design plans that best suit your needs."

Icon Features:
🧠 Neuro-affirming approach
🤝 Collaborative care model
🎯 Goal-oriented support
```

### Block 2 (Image Right)
**Image 9**: Diverse team collaboration photo
- **Style**: Rounded, shadow, 600px width
- **Effect**: Reveal animation (slide from right)

**Content (Left)**:
```
Heading: "Personalized Support, Real Results"
Text: "We don't decide for you – we give you the tools needed to navigate 
your NDIS journey. Our trained support workers coordinate with you and 
your family to ensure seamless service delivery."

Stats Display:
- 500+ Participants Supported
- 98% Satisfaction Rate
- 24/7 Availability
```

**Image 10**: Infographic showing support process
- **Style**: Clean, minimal, brand colors
- **Animation**: Elements draw in sequentially

---

## 📍 Section 6: Areas We Serve
**Layout**: Interactive map section

### Visual
**Image 11**: Stylized map of Melbourne with pins
- **Style**: Simplified, brand color gradient
- **Interactive**: Hover on location shows info tooltip
- **Animation**: Pins pulse gently

### Content
```
Heading: "Serving Melbourne's Western & Northern Suburbs"

Location Grid (4 columns):
Point Cook | Werribee | Hoppers Crossing | Williams Landing
Laverton | Altona | Truganina | Footscray
Tarneit | Craigieburn | South Morang | Epping
Geelong | Lara | Shepperton | Altona Meadows

Footer Text: "Can't find your area? Contact us to discuss your location."
```

**Style**:
- Location tags: Pill-shaped, hover grows and changes to gradient
- Background: Light accent color with subtle pattern

**Image 12**: Community diversity illustration
- **Position**: Right side overlay
- **Style**: Modern, inclusive, brand colors

---

## 📍 Section 7: Testimonials
**Layout**: Carousel slider, centered

### Card Design
```
Structure:
- Quote text (large, italic)
- Star rating (5 stars, primary color)
- Participant name + photo
- Service used (small text)
```

**Image 13-15**: Participant photos (3 different people)
- **Style**: Circular crop, 80px diameter, subtle border (primary)
- **Note**: Use stock photos representing diversity

**Slider Style**:
- Dots navigation (primary color)
- Auto-play with pause on hover
- Smooth fade transitions (600ms)
- Background: Soft gradient (accent to white)

---

## 📍 Section 8: FAQ Accordion
**Layout**: Single column, centered (max-width: 900px)

### Style
```
Question Button:
- Full width, left-aligned text
- Icon: chevron (rotates 180deg when open)
- Background: White, hover: light accent
- Border-bottom: 1px solid gray-200

Answer Panel:
- Expands smoothly (400ms)
- Padding: 2rem
- Background: Light accent
- Text: Gray-700, 1.125rem
```

**Animation**: 
- Accordion opens with height transition + opacity fade
- Only one panel open at a time

**Common Questions**:
1. What is the NDIS and am I eligible?
2. How do I get started with Js Choice?
3. What areas do you cover?
4. Are your support workers qualified?
5. Can I choose my own support worker?
6. Do you offer 24/7 services?

---

## 📍 Section 9: Contact CTA
**Layout**: Full-width, gradient background (primary to secondary)

### Content
```
Headline: "Ready to Start Your NDIS Journey?"
  Style: 3rem, white, bold, centered

Subtext: "Contact us today for a free consultation. We're here to help."
  Style: 1.25rem, white/90% opacity

CTA Buttons (side by side):
- "Call Us Now: 0421 622 262" (white background, primary text)
- "Send Message" (outline white)

Additional Info:
Office Hours: 8 AM - 6 PM | Care Services: 24 Hours
```

**Image 16**: Abstract waves or flowing shapes
- **Position**: Background pattern
- **Style**: White, 10% opacity, flowing animation

**Image 17**: Phone icon + Email icon (large, decorative)
- **Style**: Outlined, white, 120px size
- **Animation**: Gentle pulse

---

## 📍 Footer
**Layout**: 4 columns on desktop, stacked on mobile

### Structure
```
Column 1: About
- Logo
- Short description (2 lines)
- Social media icons

Column 2: Services (Links)
- Top 6 services listed

Column 3: Quick Links
- About Us
- Blog
- Career
- Resources
- Contact

Column 4: Contact Info
- Address with map pin icon
- Phone numbers
- Email
- Hours
```

**Style**:
- Background: Dark gray (#2D3748)
- Text: Light gray
- Links: Hover changes to primary color
- Generous spacing (3rem padding)

### Bottom Bar
```
Left: Copyright © 2026 JS Choice Group Pty Ltd
Center: ABN: 54 644 196 270 | Licence: 4050118332
Right: "Design by JR Technologies Web"
```

**Image 18**: Indigenous Australian art pattern (subtle)
- **Position**: Footer background
- **Style**: 5% opacity, respectful design
- **Purpose**: Reflects Acknowledgement of Country

---

## 📱 Responsive Design Notes

### Mobile (< 768px)
- Hero: Stack vertically, image below text
- Services: 1 column grid
- Why Choose: Single column, images full-width
- Navigation: Hamburger menu with slide-in drawer
- Font sizes: Scale down 20-30%

### Tablet (768px - 1024px)
- Services: 2 column grid
- Maintain general layout with adjusted spacing

### Desktop (> 1024px)
- Full design as specified
- Max container width: **8xl (1536px)** (centered)
- Responsive: Fully fluid layout from mobile to ultra-wide

---

## 🎭 Animation Library

### Scroll Animations (AOS/Framer Motion)
```javascript
fadeInUp: { opacity: 0→1, y: 40→0, duration: 600ms }
fadeInLeft: { opacity: 0→1, x: -40→0, duration: 600ms }
fadeInRight: { opacity: 0→1, x: 40→0, duration: 600ms }
scaleIn: { opacity: 0→1, scale: 0.9→1, duration: 500ms }
```

### Hover Effects
```css
Card Lift: transform: translateY(-8px), shadow: increase
Button: scale(1.02), shadow elevation
Image: scale(1.05), brightness(1.1)
```

### Loading States
- Skeleton screens for images
- Shimmer effect on cards while loading

---

## 🖼️ Complete Image List

1. **Logo SVG** - Header/Footer
2. **Mobile menu icon** - Navigation
3. **NDIS Commission logo** - Trust badge
4. **Hero image** - Caregiver with participant
5. **Hero decoration** - Abstract community illustration
6. **About team photo** - Real/stock team photo
7. **About background pattern** - Geometric design
8. **Service icons set** - 12 custom icons
9. **Services background** - Abstract shapes
10. **Why Choose - Learning** - Support worker teaching
11. **Why Choose - Team** - Diverse collaboration
12. **Support process infographic** - Custom graphic
13. **Melbourne map** - Stylized location map
14. **Community illustration** - Inclusive diversity art
15-17. **Testimonial photos** - 3 diverse participants
18. **Contact CTA background** - Wave pattern
19. **Contact icons** - Phone/Email large icons
20. **Footer pattern** - Indigenous-inspired art

---

## ✅ Accessibility Checklist

- [ ] WCAG 2.1 AA contrast ratios (4.5:1 text, 3:1 UI)
- [ ] All images have alt text
- [ ] Keyboard navigation support
- [ ] Focus indicators visible
- [ ] `prefers-reduced-motion` media query respected
- [ ] ARIA labels on interactive elements
- [ ] Semantic HTML structure (header, main, section, footer)
- [ ] Form labels properly associated
- [ ] Color not sole means of conveying information

---

## 🚀 Performance Targets

- **Lighthouse Score**: 90+ (all categories)
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

**Optimization**:
- WebP images with fallbacks
- Lazy loading for below-fold images
- Critical CSS inline
- Preload hero image
- Minified CSS/JS

---

## 🛠️ Tech Stack Recommendation

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Custom components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel
- **CMS** (optional): Sanity.io for blog/services

---

**Design Philosophy**: Sleek, modern, and glassy. Every element should reinforce trust, professionalism, and genuine care for participants. The design uses UI decorators and glassmorphism (backdrop-blur) to create a premium, state-of-the-art NDIS experience. The 8xl layout ensures readability on large screens while remaining perfectly responsive on mobile.
