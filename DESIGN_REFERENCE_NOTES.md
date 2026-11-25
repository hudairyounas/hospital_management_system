# Design Reference Notes

These notes record the healthcare websites actually inspected via headless Chrome screenshots (`scripts/shoot.mjs` at `1440px` and `390px`) during this redesign pass.

> **Access Disclosure:** `nhs.uk` (desktop + mobile), `uclahealth.org`, `dukehealth.org`, and `childrensnational.org` loaded fully and were visually inspected from captured screenshots (`scratch/refs/`). `mammothhospital.com`, `piedmont.org`, and `adventhealth.com` returned `403 Access Denied` to automated requests, and `england.nhs.uk/nhsidentity/examples/nhs-organisations-website/` rendered a blank page; those four are not claimed as inspected.

---

## 1. NHS Website (`https://www.nhs.uk/` — Desktop 1440px & Mobile 390px)

**Concrete observations:**
- **Task-first plain language:** The hero headline is plain and literal (*"Find information and services to help you manage your health"*) with zero marketing slogans.
- **No card bloat for common tasks:** Below the hero, *"Manage your health"* is a simple vertical list of 5 underlined links with small directional circles, followed by *"NHS services"* as a tight stacked button list paired beside a calm grey *"Help from NHS 111"* guidance box.
- **Controlled colour proportion:** Over 80% of the page is white or light cool grey (`#F0F4F5`). NHS Blue is reserved strictly for the header band, primary action rows, and link text; green appears only on directional task arrows and primary confirmation buttons.
- **Mobile discipline (390px):** The header stays compact (logo + account + full-width search bar), and the page stacks into crisp scannable lists rather than tall repetitive cards.

**Principle to adapt:**
- Lead with plain-language patient tasks and use **ruled lists** instead of cards for high-frequency actions, services, and emergency redirection (e.g., Rescue 1122 guidance sitting calmly beside outpatient services).

**What not to copy:**
- NHS Blue (`#005EB8`) or the NHS government-portal utilitarian feel; a private Pakistani multi-specialty clinic still needs warmth and architectural presence.

**Application to Noor Medical Centre:**
- Replace our 8 identical department cards and 6-card homepage sprawl with a floor-grouped building directory list and a compact 4-task utility strip right under the hero. Keep urgent-care 1122 redirection calm, boxed, and unmistakable.

---

## 2. Duke Health (`https://www.dukehealth.org/` — Desktop 1440px)

**Concrete observations:**
- **Compact, disciplined header:** Single-row navigation with just 4 concise patient links (*Find a Doctor*, *Treatments*, *Locations*, *Patients & Visitors*) separated by a hairline vertical divider from utility actions (*My Duke Health*, *Give*, search, language toggle `ES`). Nothing wraps onto two lines.
- **Immediate action + phone strip below hero:** Directly beneath the hero sits a clean 3-column horizontal bar: *Schedule Appointments Online*, *For Clinicians*, and a large typographic phone number (**855-855-6484**) with *"Give Us a Call"* above it—no card chrome around the phone number.
- **Asymmetric content rhythm:** The lower page pairs an editorial left column (*Duke Health Blog* with compact horizontal thumbnails) beside a structured right column (*Events* with crisp date-block badges `NOV 25` + time), demonstrating how two distinct content types can share a grid without repeating the same card template.

**Principle to adapt:**
- Keep top-level navigation to concise 1–2 word labels on a single row, separate utility controls with a hairline rule, and display the clinic phone number as clean, large, scannable typography rather than hiding it inside a small icon card.

**What not to copy:**
- Institutional academic-medical-center news/blog sections or donor/fundraising CTAs, which do not fit a focused private Pakistani outpatient clinic.

**Application to Noor Medical Centre:**
- Shorten header links to *Doctors*, *Departments*, *Fees*, *About*, *Patient Guide*, *Contact* so they never wrap. Pair a prominent typographic phone/hours readout with our primary booking action, and use an asymmetric 2-column split on inner pages (e.g., Campus info + Floor directory).

---

## 3. Children's National Hospital (`https://www.childrensnational.org/` — Desktop 1440px)

**Concrete observations:**
- **Unmistakable graphic identity without clichés:** Even without reading the logo, the combination of crisp geometric sans typography, bold colour-blocked horizontal bands (saturated blue, warm golden yellow), and sharp 0–4px corners makes the brand instantly recognisable.
- **Guided task box in the hero:** A compact *"HOW CAN WE HELP?"* utility panel sits cleanly at the top-right with 6 direct patient shortcuts (*Find a Doctor*, *Schedule an Appointment*, *Symptom Checker*, etc.).
- **Dedicated search split:** *"Find a Location"* and *"Find a Doctor"* each get a focused, single-input search box rather than a multi-dropdown form wall.

**Principle to adapt:**
- Commit to a distinctive graphic language (sharp architectural geometry, purposeful colour coding, and a single focused search input) so the site remains recognisable even if the logo is covered.

**What not to copy:**
- Bright primary pediatric red/yellow/blue colour blocks, which suit a children's hospital but would feel loud for an adult + family multi-specialty clinic.

**Application to Noor Medical Centre:**
- Use sharp architectural corners (`2px–6px`), crisp 1px hairlines, and a restrained **wayfinding wing colour system** (8 muted architectural colours—one per department wing) so every department and doctor row carries an immediate visual cue without looking loud.

---

## 4. UCLA Health (`https://www.uclahealth.org/` — Desktop 1440px)

**Concrete observations:**
- **Confident typography scale & contrast:** Large, tight-tracked condensed display type in the hero creates immediate authority without needing decorative badges, borders, or floating blobs.
- **Clear separation of utility bar and primary nav:** A slim dark utility bar at the top holds *Contact Us*, *Translate*, and *Search*, keeping the white primary nav row calm and uncluttered with a single highlighted *"Find a Doctor"* CTA on the right.
- **Honest restraint on decorative elements:** Solid flat surfaces, clean rectangular buttons, and clear visual contrast between warm off-white editorial bands and light tinted feature bands.

**Principle to adapt:**
- Use a single high-craft display/UI sans family with tight tracking on large headings, solid flat rectangular surfaces, and clear separation between the slim top utility bar (hours, language, saved slips) and the main navigation bar.

**What not to copy:**
- Ranking/award callout graphics (*"Ranked #1 in California"*) — our fictional demo must never fabricate awards, rankings, or accreditations.

**Application to Noor Medical Centre:**
- Adopt **Archivo** (variable neo-grotesque with condensed/normal width and crisp tabular figures) for authoritative architectural headings and clean scannable schedules, paired with a slim dark utility bar and an uncluttered single-row primary header.
