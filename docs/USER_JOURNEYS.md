# User Journeys: Noor Medical & Diagnostic Centre

This document maps the complete, connected user journeys engineered into the application. Every journey avoids dead ends and links stateful controls across routes.

---

## Journey 1: Rapid Specialist Discovery & Direct Booking (Homepage → Doctor → Booking)
1. **Entry (`/`):** Visitor lands on the homepage and uses the embedded **Quick Consultant & Slot Finder** in the hero section.
2. **Action:** Selects *"Cardiology"* (امراضِ قلب) and availability *"Available Today / Evening"*, then clicks **Find Specialists**.
3. **Directory (`/doctors?department=cardiology`):** Page loads pre-filtered to Cardiology specialists with a live result counter and removable filter chip.
4. **Profile (`/doctors/dr-ayesha-siddiqui`):** Visitor reviews Dr. Ayesha Siddiqui's fictional demo profile (`MBBS, FCPS Cardiology (Demo)`), consultation fee (`Rs. 3,500`), languages (`English, Urdu, Punjabi`), and weekly PKT schedule.
5. **Booking Handoff (`/appointment?department=cardiology&doctor=dr-ayesha-siddiqui`):** Clicking **Request Appointment with Dr. Ayesha** opens the booking flow with Cardiology and Dr. Ayesha pre-selected.

---

## Journey 2: Department & Diagnostic Price Exploration (Departments → Service Detail → Appointment)
1. **Entry (`/departments`):** Visitor browses the 8 clinical departments or searches for a specific service (e.g., *"Root Canal"*, *"Echocardiography"*, or *"Ultrasound"*).
2. **Detail (`/departments/dentistry`):** Visitor opens the Dentistry & Oral Care department page, inspects clinical procedures with transparent indicative fees in `PKR` (e.g., *Routine Consultation & Dental Charting — Rs. 2,000*), reads patient preparation notes, and views assigned dental consultants.
3. **Conversion:** Clicks **Request Dental Consultation**, which routes to `/appointment?department=dentistry` with Dentistry pre-selected and the doctor dropdown automatically scoped to dental specialists.

---

## Journey 3: Multi-Step Validated Appointment Simulation (`/appointment`)
1. **Step 1 — Clinical Selection:**
   - Visitor chooses a Department (required).
   - Doctor dropdown dynamically updates to show only doctors in that department (plus an *"Any Available Specialist in Department"* option).
   - Visitor chooses a future date (past dates are disabled and rejected by validation) and a PKT time slot (Morning, Afternoon, or Evening OPD).
   - Selects visit type (*First Consultation*, *Follow-up Review*, or *Diagnostic / Lab Visit*).
2. **Step 2 — Visitor Contact Details:**
   - Enters Patient Full Name, Pakistani mobile number (`03XX-XXXXXXX` or `+92 3XX XXXXXXX`), optional Email, and optional brief non-sensitive note.
   - Inline validation provides immediate, accessible feedback if a phone number is invalid or required fields are blank.
   - Explicit notice warns against entering CNIC or confidential medical records.
3. **Step 3 — Review & Demo Submission:**
   - Visitor reviews a structured summary of selected department, doctor, consultation fee (`Rs.`), date, PKT time slot, and contact details.
   - Submits the request; a brief loading state transitions to a clearly marked **DEMO APPOINTMENT REQUEST RECEIPT** with reference code `NMC-2026-XXXX`.
   - The demo booking is saved in browser `localStorage` (removable at any time) so the user can view their saved demo requests in the header drawer, print the demo slip, or start another request.

---

## Journey 4: Bilingual Urdu (RTL) Experience
1. **Trigger:** Visitor clicks the **اردو (Urdu)** toggle in the top utility bar or mobile navigation drawer.
2. **Transformation:**
   - Document root switches to `lang="ur"` and `dir="rtl"`.
   - Navigation, hero headings, department names, doctor cards, form labels, fee displays, and demo notices switch to natural Pakistani Urdu typography with proper right-to-left physical and logical alignment.
3. **Persistence:** Preference is saved in `localStorage` so navigating across `/doctors`, `/departments`, `/appointment`, and `/contact` preserves RTL layout seamlessly.

---

## Journey 5: Safe Contact, WhatsApp Composer & Location Verification (`/contact` & `/patient-info`)
1. **Entry (`/contact`):** Visitor checks clinic timings (Mon–Sat 9:00 AM – 9:00 PM PKT) and fictional address (*Plot 42-B, Main Boulevard, Gulberg III, Lahore — Demo Address*).
2. **Copy & WhatsApp Actions:**
   - Clicking **Copy Demo Phone** copies `+92 42 3555 0199` to clipboard with an accessible toast confirmation.
   - Clicking **Prepare WhatsApp Inquiry** opens a transparent modal that formats a pre-filled inquiry message, explains that this is a fictional demo clinic without an active live WhatsApp Business phone line, and lets the user copy the formatted message or preview the encoded `https://wa.me/` URI structure safely.
3. **Contact Form:** Visitor submits a validated general inquiry and receives a frontend-only demo confirmation receipt explaining no external email/SMS was transmitted.
