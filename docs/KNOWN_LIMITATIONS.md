# Known Limitations & Frontend-Only Constraints

In compliance with Section 4 (*Frontend-only restrictions*) and Section 15 (*Privacy and healthcare responsibility*) of the brief, the following boundaries and limitations apply by design:

## 1. Simulated Appointment Requests (No Backend or Database)
- **What happens:** Submitting the `/appointment` form validates all inputs client-side, transitions through a review step, generates a demo reference number (`NMC-2026-XXXX`), and saves the record in the visitor's own browser `localStorage` (`nmc_demo_bookings_v1`).
- **Limitation:** No backend API, database, hospital reception desk, SMS gateway, or physician receives the request. Every confirmation screen and slip carries a prominent **"SIMULATED DEMO REQUEST — NOT A REAL CONFIRMED APPOINTMENT"** notice.

## 2. Simulated Contact Form Inquiries
- **What happens:** Submitting the inquiry form on `/contact` validates Pakistani phone formatting and message length, then displays an immediate frontend-only confirmation receipt (`INQ-2026-XXXX`).
- **Limitation:** No email or network payload is dispatched to any external server.

## 3. WhatsApp Demo Number Placeholder
- **What happens:** Clicking any WhatsApp button opens the **WhatsApp Click-to-Chat Composer (Demo)** dialog with a context-specific prefilled message, 1-click clipboard copy, and a visible preview of the URL-encoded `https://wa.me/923000000199?text=...` target URI.
- **Limitation:** Because this is a fictional brand and the brief prohibits inventing a real person's phone number or claiming a message was delivered, the modal uses a clearly marked placeholder (`+92 300 0000199 (Demo Placeholder)`) rather than dialing an unverified live phone number.

## 4. Illustrative Map & Fictional Campus Credentials
- **What happens:** The `/contact` page features a custom schematic vector map of Main Boulevard, Gulberg III, Lahore (`Plot 42-B`), and doctor profiles feature `DEMO-PMDC-XXXXX` registration codes.
- **Limitation:** These are fictional demonstration representations and do not correspond to a real physical hospital building or real PMDC-registered physicians.

## 5. Static OPD Slot Windows
- **What happens:** Time slots (`09:30 AM – 11:30 AM PKT`, etc.) are selectable for any today/future date.
- **Limitation:** Without a live multi-user backend database, slot capacity is not decremented across different visitors' devices.
