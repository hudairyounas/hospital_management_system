# Site Map & Information Architecture

```text
Noor Medical & Diagnostic Centre
├── Global Utility Bar
│   ├── Clinic Hours in PKT (Mon–Sat: 09:00 AM – 09:00 PM)
│   ├── Emergency Guidance Notice (Call 1122 / Nearest ER)
│   ├── Saved Demo Bookings Drawer Trigger (Shows count from LocalStorage)
│   └── Language Switcher (English LTR ⇄ اردو RTL)
│
├── Primary Header Navigation
│   ├── /                      → Home (Hero, Quick Finder, Departments, Featured Doctors, Process, Hours, FAQ Preview)
│   ├── /about                 → About the Centre (Story, Care Philosophy, Facility Wings, Governance & Demo Notice)
│   ├── /departments           → Departments & Services Directory (8 Specialties + Service & Fee Search)
│   │   └── /departments/:slug → Individual Department Detail (Scope, Services & PKR Fees, Assigned Doctors, Prep Guide)
│   ├── /doctors               → Doctors Directory (12 Consultants, Live Search, Specialty/Day/Language/Gender Filters)
│   │   └── /doctors/:id       → Individual Consultant Profile (Bio, Demo Credentials, Weekly PKT Schedule, Direct Booking CTA)
│   ├── /patient-info          → Patient Information, Insurance/Visiting Guide, Full Searchable FAQs & Demo Privacy Notice
│   ├── /contact               → Contact, Location Guide, WhatsApp Composer Modal & Validated Inquiry Form
│   └── /appointment           → Multi-Step Appointment Request Simulator (Supports ?department=&doctor=&slot= query params)
│
├── Interactive Modals / Drawers
│   ├── WhatsApp Message Composer & Configuration Preview Modal
│   └── My Demo Requests Drawer (Inspect or clear locally saved demo appointment slips)
│
└── /* (Fallback)              → 404 Not Found with Quick Clinical Wayfinding Links
```

## Route & Query Parameter Contract
| Route Path | Supported Query Parameters | Purpose |
| :--- | :--- | :--- |
| `/` | None | Primary landing experience and instant specialist search entry. |
| `/about` | None | Institutional profile, clinical standards, facility showcase, and demo disclaimer. |
| `/departments` | `?q=`, `?category=` | Filter departments and diagnostic/clinical procedures with PKR fee estimates. |
| `/departments/:slug` | None | Deep dive into a department (`general-medicine`, `cardiology`, `pediatrics`, `dentistry`, `gynecology`, `orthopedics`, `dermatology`, `diagnostics`). |
| `/doctors` | `?q=`, `?department=`, `?day=`, `?language=`, `?sort=` | Synchronized URL and client filtering for the 12 fictional specialists. |
| `/doctors/:id` | None | Detailed consultant profile and weekly schedule matrix. |
| `/appointment` | `?department=`, `?doctor=`, `?type=` | Pre-selects department, filters and pre-selects doctor, and opens Step 1 ready for date/time selection. |
| `/patient-info` | `?tab=`, `?faq=` | Visiting guidelines, sample collection instructions, FAQs, and Demo Privacy Policy. |
| `/contact` | `?subject=` | Clinic timings, Gulberg III Lahore fictional campus map, copyable demo contact details, and inquiry form. |
