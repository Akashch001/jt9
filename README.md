# JT9 Detailing — Premium Digital Experience Demo

> **Important Notice:**
> **This project is a concept/sales demo and does NOT replace the current JT9 production website.**
> No connection to JT9 production systems, CRM (LeadConnector/HighLevel), or DNS was made, and no customer quotes are transmitted or stored.

---

## 1. Project Overview

- **Project Name:** JT9 Detailing — Premium Digital Experience Demo
- **Client / Business:** Detailing JT9
- **Visual Direction:** Design 3 — Luxury Cinematic / High Impact
- **Purpose:** Demonstrate to the business owner how Detailing JT9’s brand, customer journey, and conversion rate can be elevated through a luxury dark-mode automotive aesthetic, transparent service positioning, verified Google social proof, an interactive before/after transformation slider, and a frictionless multi-step mobile quote experience.

---

## 2. Technology Used

- **Markup:** Semantic HTML5 (`index.html`, `services.html`, `premium-detailing.html`, `quote.html`)
- **Styling:** Custom Modern Vanilla CSS (`assets/css/style.css`) with CSS custom properties (tokens), clamp fluid typography, glassmorphism, responsive CSS grid/flexbox, and `@media (prefers-reduced-motion)` support.
- **Interactions:** Vanilla JavaScript (`assets/js/main.js`) handling scroll-aware glass header, mobile navigation drawer, interactive touch/drag before-after slider, client-side 3-step quote wizard with demo safety disclaimer, and accessible FAQ accordion.
- **Build / Dev Server:** Vite 6 with zero heavy framework runtime (no React, no Next.js, no external telemetry or heavy WebGL/Three.js dependencies).

---

## 3. Verified Business Facts Used

All information utilized in this project was strictly restricted to verified public data:

| Fact | Locked Verified Value |
|---|---|
| **Business Name** | Detailing JT9 |
| **Domain** | jt9detailing.com |
| **Physical Address** | 6150 Alma Rd, McKinney, TX 75070 |
| **Direct Phone** | +1 (945) 237-2560 (configured with tap-to-call `tel:+19452372560`) |
| **Google Categories** | Car detailing service / Car wash |
| **Google Rating** | 5.0 Stars |
| **Google Reviews** | 100+ Reviews (103 verified) |
| **Google Place ID** | `ChIJo0DA33YXTIYRdt07a2CCyOg` (linked directly to Google Business Profile) |
| **Service Positioning** | Premium Mobile Detailing in McKinney, TX & Surrounding Areas |
| **Service Locations** | Home, Office, or Apartment Complex (where access permits) |
| **Service Duration** | Typically 2–6 hours depending on package and vehicle condition |
| **Vehicle Types** | Everyday vehicles, luxury, and exotic automobiles |

---

## 4. Verified Services Catalog

### Interior:
- Premium Interior
- Standard Interior

### Exterior:
- Standard Exterior
- One Step Polish
- 2 Step Paint Correction
- Ceramic Coating
- Headlight Restoration
- Engine Detailing

### Interior + Exterior:
- Basic Interior & Exterior Detail
- Premium Interior & Exterior Detail

### Verified Add-Ons:
- 4 Month Paint Sealant
- Leather Conditioning
- Headliner Service
- Seatbelts
- Pet Hair Removal
- Baby Chair Cleaning
- Stain Extraction

---

## 5. Asset Catalog & Image Inventory

In strict compliance with truth-in-advertising guidelines and project review findings:

| Asset | Visible Subject & Specs | Format / Variant | Placement / Role | Status & Rationale |
|---|---|---|---|---|
| `logo.webp` | Detailing JT9 brand logo (500×158, 31 KB) | Optimized WebP | Global Header & Mobile Drawer | **Active**: Official JT9 brand identity mark. |
| `hero_bg.webp` | Audi/luxury car in moody dark garage (1920×1080, 615 KB) | Optimized WebP | Homepage Hero Background | **Active**: High-impact cinematic background setting. |
| `hero_car.webp` | White supercar in dark studio (1376×768, 72 KB) | Optimized WebP | Homepage Hero Main Subject | **Active**: Core vehicle representation matching Design 3 direction. |
| `card_interior.webp` | Leather steering wheel & cockpit (1024×1024, 101 KB) | Optimized WebP | Featured Service 01 & Services Interior | **Active**: Detailed interior cabin craftsmanship. |
| `card_paint_correction.webp` | Polishing machine on clear coat (1024×1024, 77 KB) | Optimized WebP | Featured Service 02 & Services Correction | **Active**: Machine polishing craftsmanship. |
| `card_ceramic.webp` | Hydrophobic water beading (1024×1024, 49 KB) | Optimized WebP | Featured Service 03 & Ceramic Sections | **Active**: Water droplet beading on dark glossy paint. |
| `showcase_care.webp` | Porsche cockpit interior care prep (1200×900, 324 KB) | Optimized WebP | Homepage Static Detailing Showcase (`#results`) | **Active**: Authentic vehicle care preparation with discreet illustrative demo disclosure. Replaced previous ineffective slider. |
| `service_paint_correction.webp` | Dual-action polisher on glossy paint (1920×1080, 450 KB) | Optimized WebP | Homepage Spotlight & Premium Page Hero | **Active**: High-gloss correction banner background. |
| `wheel_gold_caliper.webp` | Forged rim & gold Brembo caliper (1376×768, 118 KB) | Optimized WebP | Homepage Final CTA Background | **Active**: Dramatic detail macro shot for final conversion CTA. |
| `service_interior_exterior.webp` | Full sedan exterior & cockpit detail (700×350, 33 KB) | Optimized WebP | Services Page — Premium Combo Card | **Active**: Depicts combined inside-and-out detailing. |
| `service_headlight.webp` | Restored clear headlight lens (3500×2333, 466 KB) | Optimized WebP | Services Page — Headlight Restoration Card | **Active**: Crystal clear restored headlight lens. |
| `service_engine.webp` | Detailed vehicle engine bay (1024×682, 128 KB) | Optimized WebP | Services Page — Engine Detailing Card | **Active**: Detailed and dressed engine compartment. |
| `about_bg.jpeg`, `cta_bg.jpeg`, etc. | Uncompressed duplicates (3–6 MB each) | Legacy JPEG | Excluded | **Excluded**: Replaced by optimized WebP equivalents for CWV performance. |
| `demo_before_paint.webp` / `demo_after_paint.webp` | AI-generated simulated paint swirl test | WebP | Excluded | **Excluded**: Removed to prevent presenting non-authentic before/after customer work proof. |

---

## 6. Static Detailing Showcase & Quote Integration

- **Static Detailing Showcase (`#results`):** The non-functional comparison slider (which previously displayed identical layers) has been replaced with an editorial, static detailing showcase featuring authentic vehicle care preparation photography (`showcase_care.webp`), clear descriptive heading, and a discreet *"Illustrative demo imagery"* disclosure.
- **Quote URL Pre-selection (`?service=...`):** Every service card across `services.html` and `premium-detailing.html` includes a direct quote CTA that passes the selected service via a non-sensitive URL query parameter (e.g. `/quote.html?service=Paint%20Correction`).
  - Allowed parameters are strictly validated (`Interior Detail`, `Exterior Detail`, `Interior + Exterior`, `Paint Correction`, `Ceramic Coating`, `Not Sure — Recommend a Service`).
  - On page load, the requested service is pre-selected in Step 2 with an accessible notice banner. The user intentionally confirms their vehicle type in Step 1, then smoothly proceeds to Step 3 without re-selecting.
- **Strict Demo Safety Guardrail:** The 3-step quote flow displays a clear *"Demo only — nothing will be sent"* disclaimer, performs strict client-side validation, and presents a focus-trapped demo confirmation modal with Escape key and visible close controls. Absolutely no customer data is transmitted or stored.

---

## 6. Information Intentionally Omitted (Not Verified)

Per project guidelines, the following were intentionally omitted rather than fabricated:
- **No Invented Pricing:** All reference mockup prices were removed; every service features "Request Quote" or "Get My Quote".
- **No Invented Email:** No unverified email address (`info@`, `contact@`, etc.) was used.
- **No Invented Social Links:** No dummy Facebook/Instagram/TikTok links were placed.
- **No Invented Customer Testimonials:** Testimonials were not fabricated; aggregate 5.0 Google Rating with 100+ reviews is displayed with a direct link to the verified Google Place listing.
- **No Invented Certifications or Guarantees:** No unverified manufacturer certifications, coating lifespan warranties, or scratch removal percentage claims.
- **No Unverified Service Boundaries:** Positioned strictly as McKinney, TX and surrounding areas.

---

## 7. How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
```bash
cd /Users/akashchakraborty/Desktop/JT9Demo
npm install
```

### Start Development Server
```bash
npm run dev
```
The site will be live at `http://localhost:5173/`.

### Run Production Build
```bash
npm run build
```
Generates a minified, optimized static bundle in the `dist/` directory in under 100ms.

### Preview Production Build
```bash
npm run preview
```
Previews the optimized build at `http://localhost:4173/`.

---

## 8. Deployment Guidelines

This website is a completely static, standalone bundle located in `dist/`. It can be deployed instantly to any HTTPS static host:

- **Vercel:** Run `npx vercel` or connect repository to Vercel with output directory `dist`.
- **Cloudflare Pages / Netlify / GitHub Pages:** Point build output to `dist`.
- **WordPress Migration:** The clean semantic HTML, modular CSS tokens, and vanilla JS make it trivial to migrate into custom WordPress templates (or page builders like Elementor/Bricks) in the future.

---

*Concept by Nexus World • Prepared for Detailing JT9*
# jt9
