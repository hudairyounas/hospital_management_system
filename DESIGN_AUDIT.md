# Design Audit — Original Noor Medical Centre Frontend

**Project:** FuturePlix portfolio demo. Noor Medical & Diagnostic Centre is a **fictional** Pakistani clinic.
**Audit method:** I captured full-page screenshots of the original build with headless Chrome (`scripts/shoot.mjs`, puppeteer-core with the locally installed Chrome) at 1440px and 375px for `/`, `/doctors`, and `/appointment`, and reviewed the source code of every route. Screenshots are stored in the conversation scratch folder (`scratch/before/`).

Measured facts from that run:

| Route | 1440px page height | 375px page height | Horizontal overflow | Console errors |
| :--- | ---: | ---: | :--- | :--- |
| `/` | 4,979px | **12,764px** | none | none |
| `/doctors` | 2,835px | **8,445px** | none | none |
| `/appointment` | 1,841px | 3,800px | none | none |

---

## 1. Visual identity: no point of view

**What feels wrong.** The site is a dark bottle-green hero, cream body, a high-contrast serif (Fraunces) for every heading, and white rounded cards. If I swap "Noor Medical Centre" for any other clinic name, nothing about the page changes. The only "brand" signals are a cross-in-a-circle logo and a colour.

**Why it matters.** A clinic owner looking at a portfolio piece needs to see a site that could only belong to *their* clinic. Patients need something to recognise when they come back. Generic identity reads as low effort, so it lowers trust.

**Change.** Build the identity around a real-world idea specific to a multi-floor outpatient building: **hospital wayfinding**, meaning room numbers, floors, a lobby directory board and colour-coded wings. That idea gives the layout, the typography and the graphics something to come from, and it is useful in itself because patients really do need to know where Room 101 is.

## 2. Hero: the AI formula, almost exactly

**What feels wrong.** The left side has a pill-shaped eyebrow badge, a three-line serif headline ("Calm, specialist outpatient care and diagnostics built around Pakistani families."), a paragraph, and three buttons in a row (primary, secondary, ghost). Under that sits a **three-number stats strip** ("8 / 12 / Rs. 2,000+"). On the right is a floating white card with a form. On mobile this becomes about 1,000px of dark green before a patient reaches any department.

**Why it matters.** The headline is a slogan, not information. The stats strip has a "metrics" look but tells a patient nothing they can act on. Three equally weighted buttons split attention. The floating form card duplicates the doctors page filters.

**Change.** Use a split, task-led hero. On the left, a plain-language statement of *what is in the building* and one search field. On the right, a live **"Today's OPD" directory board**: which doctors are seeing patients today, in which room and at what time, worked out from the real schedule data for the current weekday. That board is the memorable element, and it is useful.

## 3. Typography: generic serif + monospace "data" labels

**What feels wrong.**
- Fraunces is used for every heading at every level. With so much bold serif, nothing stands out.
- JetBrains Mono is used for fees, eyebrows and badges. It renders `Rs. 2,000` with slashed zeros, which looks like code, not a price.
- There are tracked-out ALL-CAPS mono eyebrows above nearly every section ("OUTPATIENT SPECIALTIES & DIAGNOSTICS", "FICTIONAL DEMO MEDICAL FACULTY"). This is the most recognisable generated-site tell.
- At 1440px the desktop nav wraps onto two lines ("About / Centre", "Departments / & Fees") because the labels are too long.

**Why it matters.** Hierarchy comes from contrast, and here every heading looks the same. Monospace prices make costs harder to scan. The two-line nav looks broken.

**Change.** Use one family with a width axis, **Archivo**, so that "display" and "body" differ by width and weight within a single typographic voice. That fits the signage idea. Show numbers (fees, rooms, times) as tabular figures in the same family. Drop eyebrows almost everywhere. Cut nav labels to one or two words. Use **Noto Nastaliq Urdu** for Urdu, the script Urdu readers expect, instead of the Naskh-style Noto Sans Arabic.

## 4. Card overuse and repetition

**What feels wrong.** Departments, doctors, the "why choose us" items, process steps, FAQ items, contact methods and facility wings are all the same white `rounded-xl` box with a 1px border and the same soft shadow. Most also have a tinted icon square. The doctors directory is 12 identical cards, each about 300px tall with three buttons. That is why `/doctors` is 8,445px tall on mobile.

**Why it matters.** When everything is a card, nothing is grouped by meaning, and patients have to scroll past chrome to compare doctors. A directory is a comparison task, so it should be a **list/table**, not a gallery.

**Change.** Give each kind of content its own form:
- Doctors → directory **rows**, with a Mon–Sat day grid so days can be compared at a glance.
- Departments → a **building directory** grouped by floor, with room ranges.
- Fees → a **tariff list** with dotted leaders, like a printed rate board.
- Steps → a short **numbered list**, used only where the content really is a sequence.
- Contact → large **typographic** phone and address blocks, no card.

## 5. Spacing: consistent but monotonous

**What feels wrong.** Every section uses the same `py-14/16`, the same max-width and the same heading + link header row. The rhythm is a stack of equal blocks. On mobile every card keeps its full desktop padding.

**Change.** Vary the density by content. The directory board is dense. The departments list is medium and ruled. "Before your visit" is airy editorial text. The full-bleed location band changes the background. Mobile gets tighter spacing and condensed rows.

## 6. Palette: green + cream + gradient-adjacent tints

**What feels wrong.** Deep green, cream (`#F8F7F4`), green tints and terracotta for warnings. That is close to the warm-cream + serif + clay cliché. Colour has no system: green is used for the brand, the buttons, the badges, the icons and the section backgrounds all at once.

**Change.** Use a neutral, cool paper ground, one ink colour, one action colour, and a **wing colour per department**. Wing colours are used only as small markers and on the department's own header, which is how real hospital wayfinding colour works. One signal yellow marks "today / now". Every colour gets a written job.

## 7. Imagery: cartoon SVG avatars

**What feels wrong.** The 12 "portraits" are flat cartoon SVGs with identical faces in slightly different colours. The facility "photos" are three green arches. They look childish next to clinical content and inconsistent with the serious tone.

**Why it matters.** Patients notice fake-looking imagery, and it weakens trust. But using stock photos of real people as *named fictional doctors* would be misleading too.

**Change.** Be honest instead of decorative:
- Doctors are shown with **typographic monograms** on their wing colour, like a door nameplate. No invented faces.
- Places are shown with **wayfinding diagrams**: a building cross-section and a ground-floor arrival plan. These carry real information (where to go) rather than mood.
- `DESIGN_DIRECTION.md` recommends commissioned real photography when the template is adapted for a real client.

## 8. Copy: slogans and over-labelling

**What feels wrong.**
- Slogans: "Calm, specialist outpatient care…", "Designed to remove the stress of hospital visits in Pakistan.", "Thoughtful Outpatient Architecture".
- The word "demo" appears in nearly every component: badges, headings, button labels ("WhatsApp Demo", "Book Demo Slot").
- Some doctor bios include unverifiable praise ("Parents appreciate her calm approach…").

**Change.** Write copy that answers patient questions (what, who, when, where, how much). State clearly **once**, in a persistent utility strip and at the points of submission, that this is a fictional demo, instead of in every label. Remove praise-style claims from the bios.

## 9. Patient task hierarchy

**What feels wrong.** The phone number and "today's hours" are not visible in the header. The key tasks are buried below 4,000+ px of cards on mobile. There is no persistent call or WhatsApp action on mobile.

**Change.** The header shows the phone number and "open today" status on desktop. On mobile, a **bottom action bar** offers Call / WhatsApp / Book, and the page gets matching bottom padding so the bar never covers content. A quick-task strip sits right under the hero.

## 10. Data correctness bug that looks like a design problem

**What feels wrong.** On the doctors page, 10 of 12 doctors show "Available Today", which is hard-coded in the data (`availableToday: true`). The screenshots were taken on a Wednesday, yet Dr. Humaira Khalid (Mon/Tue/Thu/Fri/Sat) is still shown as available. The "Next OPD window" labels are also static strings that say "Today".

**Change.** Work out today's availability and the next session from each doctor's `schedule` and the current weekday (`src/lib/schedule.ts`). Remove the static fields.

## 11. Mobile behaviour

**What feels wrong.** Mobile is the desktop layout stacked: the 3-button hero, a stats strip squeezed into three columns, and 8 full department cards before the doctors. The wordmark wraps onto three lines in the header ("Noor / Medical / Centre").

**Change.** Mobile gets its own compositions: a condensed wordmark, a hero reduced to the search plus the today board, department rows instead of cards, a doctor list with compact rows, a filter drawer on the directory, and the bottom action bar.

## 12. Accessibility

**Present and kept:** form labels, `aria-invalid` + `role="alert"` errors, the skip link, `aria-live` result counts, Escape-to-close dialogs, reduced-motion CSS.
**Problems found:**
- The 10–11px muted text (`text-[11px] text-ink-muted`) is too small at body sizes, even where the contrast ratio passes.
- Modals do not move focus into the dialog or restore it on close.
- The mobile menu is rendered conditionally but does not trap focus or lock page scroll.
- Several buttons are icon-only with `title` but no visible text on mobile.

**Change:** Set a minimum text size of 13px for metadata and 15–17px for body. Move focus into dialogs and restore it on close. Lock body scroll while the menu or a dialog is open. Keep visible labels on primary actions.

## 13. Performance

**Problems found:**
- Four font families are loaded (Fraunces, Plus Jakarta Sans, JetBrains Mono, Noto Sans Arabic).
- `lucide-react` is fine (tree-shaken).
- The JS bundle is ~439 kB, largely from duplicated inline bilingual markup.

**Change:** Load two families (Archivo variable + Noto Nastaliq Urdu). Delete the illustration component and the card components. No images to lazy-load beyond inline SVG diagrams, so there is no layout shift from images.
