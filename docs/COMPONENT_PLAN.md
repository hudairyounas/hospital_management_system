# Component Plan & Inventory

## 1. Layout & Navigation Components
- **`TopUtilityBar`**: Displays PKT clinic hours (`Mon–Sat: 09:00 AM – 09:00 PM PKT`), urgent care notice (`For Emergencies: Dial 1122`), trigger button for **My Demo Requests (`count`)**, and the **English / اردو** language switcher.
- **`Header`**: Sticky responsive navigation bar with brand mark, active route highlighting, primary links (`Home`, `About`, `Departments`, `Doctors`, `Patient Info`, `Contact`), WhatsApp quick-composer trigger, and primary **Request Appointment** CTA. Includes full keyboard-accessible mobile drawer with `Escape` key closing and focus management.
- **`Footer`**: Comprehensive institutional footer with quick department links, demo address & contact summary, opening hours table, and permanent **Frontend Demonstration & Privacy Disclaimer**.
- **`Breadcrumbs`**: Semantic `<nav aria-label="Breadcrumb">` shown on inner pages (`/doctors/:id`, `/departments/:slug`, `/appointment`, etc.).
- **`SEOHead`**: Dynamically updates `document.title` and meta description on every route and language change.

## 2. Domain Components
- **`QuickDoctorFinder`** (Homepage Hero): Interactive widget allowing immediate selection of Department, Day (`Today`, `Tomorrow`, `Any Day`), and keyword before jumping directly to filtered results or booking.
- **`DoctorCard`**: Displays bespoke SVG portrait, name (English + Urdu), specialty badge, clearly labelled demo qualifications (`MBBS, FCPS (Demo)`), languages spoken, consultation fee (`Rs. 2,500 – Rs. 4,000`), available days, **View Profile** link, and **Book Consultation** button (which deep-links to `/appointment?department=...&doctor=...`).
- **`DepartmentCard`**: Displays specialty icon, title, clinical summary, procedure count, starting consultation fee in `PKR`, assigned consultant avatars, **Explore Department** link, and **Book in Department** CTA.
- **`ServiceFeeExplorer`**: Searchable table on `/departments` and `/patient-info` letting visitors filter outpatient procedures and diagnostic lab tests with indicative `PKR` prices and preparation tags (e.g., *10–12 Hr Fasting Required*).
- **`WhatsAppModal`**: Accessible dialog explaining demo WhatsApp behavior, allowing the visitor to customize their prefilled inquiry message, copy the formatted text, or inspect the encoded `wa.me` link placeholder.
- **`SavedBookingsDrawer`**: Slide-over modal listing any simulated appointment requests the user has submitted during their session, complete with `NMC-2026-XXXX` reference codes and a **Clear All Demo Data** action.
