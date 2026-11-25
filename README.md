# Noor Medical & Diagnostic Centre — Lahore (Frontend Showcase)

**Noor Medical & Diagnostic Centre** (نور میڈیکل اینڈ ڈائیگناسٹک سینٹر) is a client-facing frontend healthcare application conceptualized and engineered for the **Pakistani private healthcare market** (private hospitals, general & specialist outpatient clinics, dental suites, and diagnostic laboratories).

> **Important Demonstration Notice:** Noor Medical & Diagnostic Centre, its doctors, qualifications (`MBBS, FCPS — Demo Credential`), `DEMO-PMDC` numbers, Gulberg III Lahore address, and phone numbers (`+92 42 3555 0199`) are strictly fictional demonstration content. No real medical bookings, diagnoses, or emergency services are provided.

---

## Key Features Implemented

1. **Lahore Courtyard Clinical Design System**:
   - Warm Alabaster Stone (`#F8F7F4`), Deep Cypress (`#0D352C`), Surgical Jade (`#145947`), and Terracotta Ochre (`#B85D3B`) palette meeting WCAG 2.2 AA/AAA contrast ratios.
   - Editorial `Fraunces` display typography paired with `Plus Jakarta Sans`, `JetBrains Mono` for reference numbers and PKT schedules, and `Noto Sans Arabic` for Urdu RTL mode.
   - Zero broken external stock imagery: every consultant portrait, architectural facility render, and schematic campus map is a bespoke, deterministic SVG component with descriptive `alt` text.
2. **Complete Bilingual English (`LTR`) & Urdu (`اردو RTL`) Mode**:
   - Instant toggle in the top utility bar switches `<html lang="ur" dir="rtl">` and translates navigation, hero finder, all 8 departments, all 12 doctors, the 3-step appointment simulator, FAQs, and privacy notices.
3. **Interactive Consultant Directory (`/doctors` & `/doctors/:id`)**:
   - Search across 12 fictional Pakistani specialists by name, condition, or keyword.
   - Filter by Department, Availability Day (`Available Today`, `Monday`–`Saturday`), Gender (`Female`/`Male`), and sort by PKR consultation fee or seniority.
   - Synchronized with URL search parameters (`?department=cardiology&day=today`) and equipped with 1-click filter reset.
4. **Departments & Interactive PKR Fee Tariff Explorer (`/departments` & `/departments/:slug`)**:
   - Covers 8 core departments: *General & Internal Medicine*, *Cardiology*, *Pediatrics*, *Dentistry & Oral Care*, *Gynecology & Women's Health*, *Orthopedics & Physiotherapy*, *Clinical Dermatology*, and *Diagnostic Lab & Ultrasound Imaging*.
   - Includes a live searchable procedure & diagnostic lab fee table in `PKR (Rs.)` with fasting/preparation tags.
5. **3-Step Appointment Request Simulator (`/appointment`)**:
   - Pre-populates department and doctor from any CTA across the website.
   - Enforces dependent doctor filtering by selected department, Pakistani mobile/landline phone validation (`+92` / `03XX-XXXXXXX`), and future-only date validation.
   - Includes a Review step and generates a clearly labelled **SIMULATED DEMO REQUEST SLIP** (`NMC-2026-XXXX`) stored optionally in browser `localStorage` and viewable in the **Demo Slips** header drawer.
6. **Safe WhatsApp Composer & Validated Contact Desk (`/contact`)**:
   - One-click clipboard copy for demo phone and email with accessible toast notifications.
   - Interactive WhatsApp Click-to-Chat Composer modal that formats and encodes prefilled inquiry messages while explaining demo placeholder configuration.

---

## Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Run automated unit & integration tests (Vitest + React Testing Library)
npm test

# 4. Run production TypeScript check & Vite bundle build
npm run build
```

---

## Project Documentation Index

- [Product Brief](file:///g:/my_practice/hospital_management_system/docs/PRODUCT_BRIEF.md)
- [User Journeys](file:///g:/my_practice/hospital_management_system/docs/USER_JOURNEYS.md)
- [Product & Technical Assumptions](file:///g:/my_practice/hospital_management_system/docs/ASSUMPTIONS.md)
- [Site Map & Route Contract](file:///g:/my_practice/hospital_management_system/docs/SITE_MAP.md)
- [Creative & Design Direction](file:///g:/my_practice/hospital_management_system/docs/DESIGN_DIRECTION.md)
- [Design System Specification](file:///g:/my_practice/hospital_management_system/docs/DESIGN_SYSTEM.md)
- [Frontend Architecture](file:///g:/my_practice/hospital_management_system/docs/FRONTEND_ARCHITECTURE.md)
- [Component Plan](file:///g:/my_practice/hospital_management_system/docs/COMPONENT_PLAN.md)
- [Interaction Specification](file:///g:/my_practice/hospital_management_system/docs/INTERACTION_SPEC.md)
- [Test Plan](file:///g:/my_practice/hospital_management_system/docs/TEST_PLAN.md)
- [Setup Guide](file:///g:/my_practice/hospital_management_system/docs/SETUP.md)
- [Testing & Verification Report](file:///g:/my_practice/hospital_management_system/docs/TESTING.md)
- [Known Limitations](file:///g:/my_practice/hospital_management_system/docs/KNOWN_LIMITATIONS.md)
- [Final Build Report](file:///g:/my_practice/hospital_management_system/docs/FINAL_BUILD_REPORT.md)
