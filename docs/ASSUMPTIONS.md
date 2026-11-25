# Product & Engineering Assumptions

To execute autonomously without blocking on routine decisions, the following documented assumptions govern the product, content, and technical implementation:

## 1. Brand & Market Positioning Assumptions
1. **Multi-Specialty Showcase Scope:** The fictional brand **Noor Medical & Diagnostic Centre** combines an Outpatient Specialist Hospital, Family & Pediatric Clinic, Modern Dental Suite, and Diagnostic Laboratory under one roof. This satisfies the brief's requirement that the demo be suitable for pitching to private hospitals, general clinics, dental clinics, specialist practices, and diagnostic centres alike.
2. **Geographic Anchor:** The demo campus is anchored in **Gulberg III, Lahore, Pakistan**, using Pakistan Standard Time (`PKT / UTC+5`), `PKR / Rs.` currency formatting, and `+92 42` landline / `03XX` mobile formatting.
3. **Fictional Governance:** Every doctor profile uses clearly badged demo credentials (e.g., `MBBS, FCPS (Demo Profile) • Reg: DEMO-PMDC-4012`) so no real physician's identity or PMDC registration is appropriated.

## 2. Functional & Privacy Assumptions
4. **Frontend-Only Persistence:** Browser `localStorage` is used strictly for:
   - Saving the user's language preference (`en` vs `ur`).
   - Optionally storing simulated demo appointment requests and demo contact inquiries on the user's own device, with a single-click **"Clear Demo History"** button.
5. **WhatsApp Safety Assumption:** Because the brief explicitly states *"Do not invent a real phone number. If no valid demo number exists, offer copy-message behavior or a clearly marked configuration placeholder"*, our WhatsApp action provides an interactive **WhatsApp Message Composer & Demo Drawer**. It generates a properly URL-encoded prefilled message, allows instant copying to clipboard, and shows the exact `wa.me` link configuration placeholder for production deployment without accidentally opening a chat to a random real person's phone number.
6. **Imagery Independence:** Rather than relying on hotlinked third-party stock URLs that may fail, rate-limit, or violate clinical authenticity, we use custom-authored, deterministic SVG clinical portraits and architectural illustrations bundled directly in the repository with explicit aspect ratios and descriptive `alt` text.

## 3. Localization Assumptions
7. **Complete Bilingual Coverage:** We implement a comprehensive English (`LTR`) and Urdu (`RTL`) dictionary covering navigation, hero sections, search/filter controls, all 8 departments, all 12 doctors' specialties/schedules, the appointment booking wizard, FAQs, contact page, and demo privacy disclaimers.
