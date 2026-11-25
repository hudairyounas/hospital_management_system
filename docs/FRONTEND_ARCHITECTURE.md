# Frontend Architecture & Technical Design

## 1. Technology Stack & Rationale
- **React 19 + TypeScript 5:** Strict type contracts across doctors, departments, diagnostic services, appointment submissions, and bilingual translation dictionaries.
- **Vite 6:** Rapid module bundling, optimized asset compilation, and clean static build output.
- **React Router v7 (`react-router-dom`):** Declarative multi-page routing with query-string synchronization (`useSearchParams`) so deep links like `/doctors?department=cardiology` or `/appointment?department=dentistry&doctor=dr-zainab-raza` work reliably on refresh and bookmarking.
- **Tailwind CSS v3 + Custom CSS Variables:** Utility-first responsive layout combined with logical RTL support (`dir="rtl"` / `dir="ltr"`) and semantic design tokens.
- **Lucide React:** Crisp, consistent `1.75px` stroke medical and wayfinding icons.
- **Vitest + React Testing Library + jsdom:** Deterministic unit and integration testing of search/filtering, Pakistani phone validation, date validation, dependent dropdowns, and booking confirmation generation.

---

## 2. Folder Structure
```text
src/
  assets/
    illustrations/         # Deterministic SVG doctor portraits & architectural clinic scenes
  components/
    appointments/          # BookingWizard, SavedBookingsDrawer, BookingReceiptCard
    departments/           # DepartmentCard, ServiceFeeCalculator
    doctors/               # DoctorCard, DoctorFilterBar, ScheduleBadge
    forms/                 # ValidatedInput, SelectField, PhoneInputPK
    layout/                # TopUtilityBar, Header, Footer, EmergencyBanner, Breadcrumbs, ScrollToTop
    shared/                # WhatsAppModal, DemoBadge, SEOHead, EmptyState, ToastBanner
  context/
    AppContext.tsx         # Language (en/ur + RTL), saved demo bookings (localStorage), WhatsApp modal state, toast state
  data/
    clinic.ts              # Clinic metadata, Gulberg III Lahore demo address, timings, FAQs, announcements
    departments.ts         # 8 comprehensive departments with procedures, PKR fees, preparation notes
    doctors.ts             # 12 fictional Pakistani consultants with schedules, demo PMDC numbers, fees, languages
    translations.ts        # Complete English & Urdu UI dictionary
  lib/
    validation.ts          # Pakistani phone validation (+92 / 03XX), future date check, reference generator
    formatters.ts          # PKR currency formatter, PKT date/time display helpers
  pages/
    Home/                  # Landing page with Instant Consultant Finder
    About/                 # Mission, facility tour, governance & demo disclosure
    Doctors/               # Searchable, multi-filter doctors directory
    DoctorDetails/         # Consultant bio, weekly OPD table, related doctors, direct booking CTA
    Departments/           # Specialties overview + interactive procedure & fee explorer
    DepartmentDetails/     # Detailed specialty page with doctors & services
    Appointment/           # 3-step appointment request simulator
    PatientInfo/           # Visiting protocols, lab prep, searchable FAQ hub, Demo Privacy Notice
    Contact/               # Contact cards, copy actions, WhatsApp composer trigger, inquiry form, campus map
    NotFound/              # 404 recovery page
  types/
    index.ts               # Strict TypeScript interfaces for all entities
  test/
    setup.ts               # Vitest + Testing Library setup
    app.test.tsx           # Comprehensive functional test suite
```

---

## 3. State Management Strategy
- **URL Search Params as Source of Truth:** On `/doctors`, `/departments`, and `/appointment`, filters and pre-selections read from and sync with URL query parameters so browser Back/Forward and shared links preserve user state.
- **AppContext (`src/context/AppContext.tsx`):**
  - `language`: `'en' | 'ur'` (synchronizes `<html lang="..." dir="...">` and persists to `localStorage` under `nmc_demo_lang`).
  - `savedBookings`: `DemoAppointmentRecord[]` (persisted to `localStorage` under `nmc_demo_bookings` so visitors can review or clear their simulated appointment requests from any page).
  - `whatsAppModal`: `{ isOpen: boolean; prefillMessage: string; contextLabel: string }` for triggering the safe WhatsApp composer from header, doctor cards, or contact page.
  - `toast`: Accessible live-region toast notification for copy-to-clipboard and saved-booking actions.
