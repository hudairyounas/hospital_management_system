# Product Brief: Noor Medical & Diagnostic Centre

## 1. Executive Summary
**Noor Medical & Diagnostic Centre** (نور میڈیکل اینڈ ڈائیگناسٹک سینٹر) is a fictional, premium multi-specialty outpatient hospital, family clinic, dental practice, and diagnostic centre conceptualized for the Pakistani private healthcare market (headquartered in a fictional campus in Gulberg III, Lahore).

This application is built as a **client-facing portfolio showcase and sales demonstration** for FuturePlix. It demonstrates how a modern private hospital or specialist clinic in Pakistan can establish immediate clinical trust, transparent consultant discovery, clear PKR fee communication, and mobile-first appointment request workflows without relying on cluttered templates or misleading medical claims.

> **Important Demonstration Notice:** Noor Medical & Diagnostic Centre, its doctors, qualifications, PMDC demo numbers, address, and contact channels are strictly fictional demonstration content. No real medical bookings, patient records, or emergency services are provided.

---

## 2. Business Objectives
1. **Establish Institutional Trust:** Convey clinical authority, hygiene, calm organization, and ethical care through restrained architectural design and transparent information rather than fabricated awards or exaggerated cure claims.
2. **Accelerate Consultant & Department Discovery:** Allow anxious patients or family members to locate the right specialist by symptom area, department, language spoken (English/Urdu/Punjabi), gender, day of availability, or consultation fee in `PKR`.
3. **Streamline Appointment Requests:** Offer a clear, mobile-friendly multi-step appointment request simulation that pre-fills department and doctor context from anywhere on the site and generates a downloadable/printable demo reference slip.
4. **Support Pakistani Communication Norms:** Provide transparent clinic hours in Pakistan Standard Time (PKT, UTC+5), `+92` / `03XX` phone formatting, a safe WhatsApp inquiry preview/composer, and complete English + Urdu (RTL) bilingual support.
5. **Versatile B2B Sales Demo:** Structure the platform so clinic owners visiting the demo can envision it adapted for a private hospital, dental centre, diagnostic lab, or multi-specialty polyclinic.

---

## 3. Target Audience Analysis (Pakistani Healthcare Context)
| Segment | Primary Goal | Device & Language Preference | Key Anxiety / Friction |
| :--- | :--- | :--- | :--- |
| **Family Caregivers (Ages 25–50)** | Booking cardiology, internal medicine, or orthopedic consultations for aging parents. | 80% Mobile (Android/iOS), bilingual English & Urdu. | Unclear doctor timings, hidden consultation fees, or difficulty finding parking/wheelchair access details. |
| **Parents of Young Children** | Finding a trusted pediatrician with evening or weekend OPD slots. | Mobile-first, often searching urgently during evening hours. | Wants to know exact OPD hours, vaccination/well-baby scope, and whether a doctor is available today. |
| **Dental & Aesthetic Patients** | Comparing clean, modern dental procedures (scaling, root canal, orthodontics) and transparent pricing. | Mobile & Desktop, English/Urdu. | Apprehension about sterilization standards and unpredictable procedure costs. |
| **Diagnostic & Lab Visitors** | Checking fasting requirements and PKR prices for CBC, Lipid Profile, Ultrasound, or ECG. | Mobile-first. | Needs clear sample collection hours and turnaround times before travelling. |

---

## 4. Core Value Propositions & Conversion Goals
- **Primary Conversion:** Completed simulated Appointment Request (`/appointment`) with a unique demo reference number (`NMC-2026-XXXX`) stored optionally in browser `localStorage`.
- **Secondary Conversions:**
  - Direct consultant booking initiation from `/doctors`, `/doctors/:id`, or `/departments/:slug`.
  - Safe WhatsApp message preparation via the interactive WhatsApp Preview & Copy modal.
  - Contact Inquiry submission on `/contact`.
  - Diagnostic test price lookup and preparation check on `/departments/diagnostics` and `/patient-info`.

---

## 5. Ethical & Regulatory Guardrails
- **Zero PHI Collection:** Forms explicitly instruct visitors not to enter CNIC numbers, sensitive medical histories, or diagnostic reports.
- **No Unverified Claims:** Zero fabricated ISO/JCI badges, zero "100% cure rate" promises, and zero invented patient testimonials presented as real endorsements.
- **Clear Emergency Redirection:** Visitors experiencing chest pain, trauma, or acute emergencies are immediately directed to call Pakistan's official emergency services (`1122`) or visit the nearest tertiary emergency room.
