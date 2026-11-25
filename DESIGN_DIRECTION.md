# Design Direction — Noor Medical & Diagnostic Centre

> **Demonstration Brand Note:** Noor Medical & Diagnostic Centre is a fictional multi-specialty outpatient hospital, dental suite, and diagnostic centre in Gulberg III, Lahore, created as a frontend portfolio showcase for FuturePlix.

---

## 1. Brand Personality
- **Reassuring, not sentimental:** Speaks in calm, plain facts (who sits today, which room, what the consultation costs in PKR, whether fasting is needed) rather than emotional slogans.
- **Clinical, not cold:** Crisp hospital legibility softened by warm stone paper, dignified Urdu typography, and respectful patient privacy notes (e.g., all-female Gynecology South Wing, step-free ground-floor Orthopedics).
- **Contemporary, not trendy:** Architectural geometry, hairline rules, and tabular schedules that will still look credible in five years—no glassmorphism, neon gradients, or floating SaaS cards.
- **Locally grounded in Pakistan, not stereotypical:** Natural PKT schedules, `Rs.` tabular tariffs, `+92` / `03XX` phone validation, Gulberg III floor/room wayfinding, and genuine **Noto Nastaliq Urdu** RTL support—with zero decorative flags or forced cultural clichés.

---

## 2. Core Visual Concept: *Hospital Wayfinding & Lobby Directory*
Every well-designed modern hospital has a physical **wayfinding system**: a lobby directory board showing which consultants are in today, floor-by-floor wing signage, room-number plaques (`G-01`, `101`, `D-1`), colour-coded clinical wings, and clear printed fee schedules.

Our website **is** that wayfinding system translated to the screen:
1. **Live "Today's OPD" Lobby Board (Hero centerpiece):** Computed dynamically from each doctor's real weekly schedule and the current weekday in Pakistan. Patients immediately see who is seeing patients today, in which room, and at what time.
2. **Department Wing Colour Strips:** Each of the 8 clinical departments owns one muted architectural signage colour—used *strictly* as a 3px/4px structural bar, room plaque accent, and doctor monogram square. Never as a full-card neon fill.
3. **Floor-by-Floor Directory & Tabular Schedules:** Departments are organised by **Ground Floor** and **First Floor**; doctors are presented as scannable **roster rows** with a **Mon–Sat 6-day availability grid**; fees are laid out as a **printed tariff sheet with dotted leaders**.
4. **Honest Imagery System:** Instead of cartoon SVG faces or unverified stock photos of real people, consultants use **architectural door-plaque monograms** in their wing colour, and campus locations use **technical architectural wayfinding diagrams** (building cross-section + ground-floor arrival map). When adapted for a real Pakistani clinic client, these slots are designed to drop in commissioned editorial photography with consistent natural-light art direction.

**Anti-template test:** Even if the name "Noor Medical Centre" and its mark are removed, the combination of cool architectural paper (`#F5F6F3`), tight-tracked `Archivo` signage typography, tabular room plaques, Mon–Sat schedule grids, live Today's OPD board, and 3px wing colour bars remains immediately distinctive.

---

## 3. Colour System & Proportion Rules

| Role | Token | Hex | Proportion & Usage Rule |
| :--- | :--- | :--- | :--- |
| **Primary Ground** | `--paper` | `#F5F6F3` | ~65% of page surface — calm, glare-free cool limestone paper |
| **Elevated Surface** | `--surface` | `#FFFFFF` | ~20% — directory boards, tables, form sheets, header |
| **Secondary Band** | `--tint` | `#ECEFE9` | ~8% — alternating full-bleed bands (e.g., Campus & Hours) |
| **Primary Ink** | `--ink` | `#11181C` | Headings, primary copy, active borders (16.4:1 contrast on `#FFF`) |
| **Secondary Ink** | `--ink-2` | `#3F4C52` | Body paragraphs, descriptions (8.5:1 contrast on `#FFF`, WCAG AAA) |
| **Muted Metadata** | `--ink-3` | `#59676D` | Room numbers, qualifications, captions (5.7:1 contrast on `#FFF`, WCAG AA+) |
| **Hairline Rule** | `--rule` | `#D7DDD9` | 1px structural dividers, table rows, directory borders |
| **Strong Rule** | `--rule-strong` | `#9CA8A3` | Input outlines, active table headers |
| **Primary Action** | `--action` | `#0B4F6C` | ~5% — Primary buttons ("Request Appointment"), active nav underline, focus rings |
| **Action Hover** | `--action-hover` | `#083A50` | Hover/active state for primary buttons |
| **Signal / Today** | `--signal` | `#B45309` / `#FEF3C7` | ~1% — "In Clinic Today" status indicator, demo-mode notices |
| **Urgent / Error** | `--danger` | `#B91C1C` / `#FEF2F2` | ~1% — Form validation errors & Rescue 1122 emergency notice |

### Department Wing Signage Colours (3px structural bar & monogram plaque only)
- **General & Internal Medicine:** `#1B5E5A` (Deep Clinical Teal)
- **Cardiology & Vascular Care:** `#9B2C2C` (Cardiac Crimson)
- **Pediatrics & Child Health:** `#B7791F` (Warm Amber Ochre)
- **Dentistry & Oral Care:** `#2B6CB0` (Dental Cobalt)
- **Gynecology & Women's Health:** `#74427B` (Muted Plum)
- **Orthopedics & Physiotherapy:** `#4A5568` (Structural Slate)
- **Clinical Dermatology:** `#8C5A3C` (Warm Terracotta)
- **Diagnostic Lab & Imaging:** `#2F5D50` (Pathology Pine)

---

## 4. Typography System

- **Latin Display & UI Family:** `'Archivo', -apple-system, BlinkMacSystemFont, sans-serif` (Variable font loaded with weights `400, 500, 600, 700`).
  - Uses `font-variant-numeric: tabular-nums` across all PKR fees (`Rs. 3,500`), PKT schedules (`05:00 – 08:30 PM`), and room plaques (`G-01`, `101`).
  - Zero monospace fonts for prices or headings; monospace is omitted entirely to avoid the "developer dashboard" cliché.
- **Urdu RTL Family:** `'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif` with generous `line-height: 2.05` so Nastaliq ascenders/descenders never clip.

| Role | Desktop | Mobile | Weight | Line-Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display (`h1`)** | `2.75rem` (44px) | `1.875rem` (30px) | `700` | `1.08` | `-0.025em` |
| **Page Title (`h1` inner)** | `2.25rem` (36px) | `1.625rem` (26px) | `700` | `1.12` | `-0.02em` |
| **Section Heading (`h2`)** | `1.625rem` (26px) | `1.375rem` (22px) | `600` | `1.2` | `-0.015em` |
| **Subheading (`h3`)** | `1.125rem` (18px) | `1.0625rem` (17px) | `600` | `1.3` | `-0.01em` |
| **Body Lead** | `1.0625rem` (17px) | `1.0rem` (16px) | `400` | `1.6` | `0` |
| **Body Standard** | `0.9375rem` (15px) | `0.9375rem` (15px) | `400` | `1.6` | `0` |
| **UI Control / Nav** | `0.875rem` (14px) | `0.875rem` (14px) | `500–600` | `1.3` | `0` |
| **Metadata / Table Cell** | `0.8125rem` (13px) | `0.8125rem` (13px) | `500` | `1.4` | `0` |

*Rules:* No text smaller than `13px` (`0.8125rem`) for readable metadata. No tracked-out ALL-CAPS eyebrows above every heading.

---

## 5. Layout, Grid, Radii & Component Principles
- **Container:** `max-w-[1240px]` centered with `px-4 sm:px-6 lg:px-8`.
- **Border Radius:** Crisp architectural corners — `rounded` (`4px`) for buttons, inputs, and room plaques; `rounded-md` (`6px`) for panels and modals. Never `rounded-2xl` / `24px` SaaS bubbles.
- **Shadows:** Flat by default; structure comes from `1px solid var(--rule)` borders and background value shifts. Elevation shadow (`0 8px 24px rgba(17,24,28,0.08)`) is reserved strictly for modals, drawers, and the sticky mobile bottom bar.
- **Interactive States:**
  - **Primary Button:** Solid `--action` (`#0B4F6C`), white text, `min-h-[44px]`, sharp `4px` radius, darkens to `#083A50` on hover.
  - **Secondary Button:** Transparent or `#FFFFFF`, `1px solid #11181C`, `#11181C` text, fills `#ECEFE9` on hover.
  - **Text Link:** Underlined with `underline-offset-4` and `decoration-[#0B4F6C]/40` that solidifies on hover.
  - **Focus State:** `2px solid #0B4F6C` outline with `2px` offset (`:focus-visible`).
  - **Disabled State:** `opacity-50 cursor-not-allowed`.
  - **Error State:** `1.5px solid #B91C1C` border, `#FEF2F2` tint, and `role="alert"` inline message linked via `aria-describedby`.
- **Mobile Architecture (`375px` & `390px`):**
  - Compact single-row header (`h-16`), condensed brand mark, full-screen accessible menu drawer with scroll lock.
  - Persistent **Mobile Bottom Action Bar** (`Call`, `WhatsApp`, `Book`) with `pb-20 lg:pb-0` on the page shell so footer content is never obscured.
  - Condensed doctor roster rows and floor-grouped department lists keep mobile page height disciplined and fast to scan.
