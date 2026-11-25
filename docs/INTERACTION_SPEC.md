# Interaction Specification

Every interactive element in the application has deterministic client-side state, validation, and feedback.

## 1. Doctor Search & Multi-Facet Filtering (`/doctors`)
- **Controls:**
  1. Text Search input (matches doctor name in English/Urdu, specialty title, clinical focus tags, or bio keywords).
  2. Department/Specialty dropdown (`All Departments` + 8 specialties).
  3. Availability Day filter (`All Days`, `Available Today`, `Monday`–`Saturday`).
  4. Language filter (`All Languages`, `Urdu`, `English`, `Punjabi`).
  5. Consultation Fee Sort (`Recommended`, `Fee: Low to High`, `Fee: High to Low`, `Experience: Highest`).
- **Behaviors:**
  - Instant filtering with an `aria-live="polite"` result counter (`Showing X of 12 consultants`).
  - Active filter chips below the toolbar with individual remove buttons and a **Reset All Filters** button.
  - Empty state when zero doctors match, featuring a 1-click **Reset Filters** button and direct link to general appointment booking.

## 2. Multi-Step Appointment Request Engine (`/appointment`)
- **Pre-selection Sync:** Reads `?department=<slug>&doctor=<id>&type=<visitType>` from URL search params on mount.
- **Dependency Rule:** Changing the `department` select automatically filters the `doctor` select to doctors belonging to that department. If a previously selected doctor does not belong to the newly chosen department, `doctorId` resets cleanly to `""` (*Any Available Department Specialist*).
- **Validation Rules:**
  - `department`: Required.
  - `preferredDate`: Required; must be today or a future date (`YYYY-MM-DD >= today` in PKT). Past dates trigger a specific validation error.
  - `timeSlot`: Required (`09:30 AM – 11:30 AM`, `12:00 PM – 02:00 PM`, `03:00 PM – 05:00 PM`, `06:00 PM – 08:30 PM PKT`).
  - `patientName`: Required, minimum 2 characters.
  - `phone`: Required; validated against Pakistani phone formats (`^(\+92|0092|92|0)?3[0-9]{2}[\s-]?[0-9]{7}$` or landline `^(\+92|0)?42[\s-]?[0-9]{7,8}$`).
  - `email`: Optional; validated for standard email format if provided.
  - `notes`: Optional, max 250 characters, accompanied by an explicit warning not to share CNIC or sensitive medical records.
- **Review & Confirmation State:**
  - Step 2 leads to a **Review Request** card before final submission, or displays a live synchronized booking summary sidebar.
  - Submitting triggers a `450ms` simulated processing state, generates a deterministic demo reference code (`NMC-2026-XXXX`), renders the **Demo Request Confirmation Slip** (clearly marked *"DEMO SIMULATION — NOT A CONFIRMED MEDICAL APPOINTMENT"*), saves to `localStorage`, and provides **Print Demo Slip**, **View in Saved Demo Requests**, and **Start Another Request** actions.

## 3. Contact & WhatsApp Interactions
- **Copy Buttons:** Phone (`+92 42 3555 0199`), Emergency info (`1122`), Email (`demo.care@noormedical.example.pk`), and Address feature 1-click clipboard copy with visual checkmarks and toast feedback.
- **Contact Form:** Validates name, Pakistani phone/email, subject, and message; outputs a timestamped frontend-only demo inquiry receipt.
