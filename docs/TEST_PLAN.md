# Test & Verification Plan

## 1. Automated Unit & Integration Tests (`Vitest` + `React Testing Library`)
We will write and run automated tests covering:
1. **Validation Logic (`src/lib/validation.ts`)**:
   - Accepts valid Pakistani mobile numbers (`0300-1234567`, `+92 321 7654321`, `03331234567`) and Lahore landlines (`042-35550199`).
   - Rejects malformed phone numbers (`12345`, `021-123`, alphabetical strings).
   - Rejects past dates and accepts today/future dates.
   - Generates unique `NMC-2026-XXXX` demo reference codes.
2. **Navigation & Page Rendering**:
   - Renders Homepage hero, Quick Consultant Finder, departments, and featured doctors.
   - Navigates between Home, About, Departments, Doctors, Patient Info, Contact, and 404 Not Found.
3. **Doctors Directory Filtering**:
   - Filters doctors by search query (e.g., `"Ayesha"` or `"Cardiology"`).
   - Filters by specialty and day of availability.
   - Renders empty state when no doctor matches and restores full list on clicking Reset Filters.
4. **Appointment Workflow & Department/Doctor Dependency**:
   - Selecting a department filters the available doctors dropdown.
   - Submitting empty form displays accessible error messages.
   - Submitting valid form transitions to Review and then Confirmation state with a `NMC-2026-` demo reference number and explicit demo disclaimer.
5. **Bilingual Language Switcher (English ⇄ Urdu RTL)**:
   - Toggling Urdu updates document `dir="rtl"` and switches primary UI labels to Urdu.

## 2. Live Browser & Visual Responsive Verification
Using the browser agent against the running Vite dev server:
- Inspect and verify layout, overflow (`document.documentElement.scrollWidth <= window.innerWidth`), contrast, interactive widgets, and image rendering across:
  - `375px` (Small Mobile)
  - `390px` (Standard Mobile)
  - `768px` (Tablet)
  - `1024px` (Laptop)
  - `1440px` (Desktop)
- Test interactive flows end-to-end in the live browser and verify zero console errors or failed asset loads.
