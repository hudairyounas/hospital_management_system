# Design Review & Polish Pass — Noor Medical & Diagnostic Centre

**Verification method:** Real headless Chrome screenshots via `scripts/shoot.mjs` (`puppeteer-core` driving local Chrome) inspected visually across two full passes (`scratch/after_p1/` and `scratch/after_p2/`).

## 1. Routes, Viewports & Overflow Verification
Every route below was rendered in headless Chrome and measured for horizontal overflow (`document.documentElement.scrollWidth <= window.innerWidth`) and console/page errors:

| Route | Widths Tested | Horizontal Overflow | Console / Runtime Errors | Height Comparison (Before → After) |
| :--- | :--- | :--- | :--- | :--- |
| `/` (Home) | `1440`, `1024`, `768`, `390`, `375` | **None** at all 5 widths | `0` | 1440px: 4,979px → **3,507px** · 375px: 12,764px → **7,159px** (-44%) |
| `/` (Urdu RTL) | `1440`, `375` | **None** | `0` | 1440px: 3,739px · 375px: 7,301px |
| `/doctors` | `1440`, `375` | **None** | `0` | 375px: 8,445px → **6,293px** (-25%) |
| `/departments` | `1440`, `375` | **None** | `0` | 1440px: 4,901px · 375px: 10,656px |
| `/appointment` | `1440`, `375` | **None** | `0` | 1440px: 1,916px · 375px: 3,717px |
| `/contact` | `1440`, `375` | **None** | `0` | 1440px: 1,637px · 375px: 3,515px |

---

## 2. Issues Found in Pass 1 Screenshot Review & Fixes Applied in Pass 2
1. **Stale Tailwind JIT Cache in Running Dev Server (Critical — Fixed):**
   - *Observed in Pass 1 (`after_p1/home_1440.png`):* Because Vite had been running before `tailwind.config.js` was replaced with the new `ink` (`#11181C`) and `action` (`#0B4F6C`) tokens, dark utility bars, primary buttons, and the footer rendered with transparent backgrounds.
   - *Fix:* Restarted Vite cleanly so Tailwind compiled all custom tokens; verified in Pass 2 (`after_p2/home_1440.png`, `doctors_1440.png`, `departments_1440.png`, `contact_1440.png`, `home_375.png`) that `#11181C` chrome, `#0B4F6C` primary buttons, `#FEF3C7` Today badges, and `#FEF2F2` emergency notices all render with full contrast.
2. **SVG `<text>` Direction Clipping in Urdu RTL Mode (Fixed):**
   - *Observed in Pass 1 (`after_p1/home_1440_ur.png`):* Inside `<html dir="rtl">`, the English room-code labels inside `BuildingCrossSectionSVG` inherited RTL text anchoring and clipped on the left edge.
   - *Fix:* Wrapped `BuildingCrossSectionSVG` and `ArrivalMapSVG` in `<div dir="ltr">` containers so schematic diagrams preserve exact left-to-right coordinate geometry even when the page is in Urdu RTL mode.
3. **Arrival Map Vertical Road Label Spacing & Nastaliq Wordmark Line-Height (Fixed):**
   - *Observed in Pass 1:* `MAIN BOULEVARD` rotated text in `ArrivalMapSVG` sat close to the top border (`y="86"`), and the Nastaliq Urdu header title sat tight against its subtitle.
   - *Fix:* Adjusted `y="102"` in `ArrivalMapSVG` and added `rtl:gap-1` / `rtl:leading-normal` to the header wordmark stack.
4. **Hard-Coded "Available Today" Schedule Bug (Fixed during redesign, verified in `after_p2/doctors_1440.png`):**
   - *Verified:* Captured on Wednesday, `doctors_1440.png` accurately highlights Wednesday (`W`) in amber for doctors whose schedule includes Wednesday and shows `Next: Thu` (without a false "In clinic today" badge) for Dr. Humaira Khalid, Dr. Maham Jahangir, and Dr. Nadia Mansoor.

---

## 3. Anti-Template & Quality Scores (Pass 2)

| Criterion | Score (1–10) | Honest Rationale |
| :--- | :---: | :--- |
| **Distinctive visual identity** | **9.0** | Hospital wayfinding system (lobby OPD board, 3px wing colour strips, architectural door plaques, printed tariff leaders) stays recognisable even if the logo and name are removed. |
| **Non-generic hero composition** | **9.0** | Asymmetric task-led hero on cool paper (`#F5F6F3`) with a single search input and a live weekday-computed "Today's OPD" board—no dark banner + 3-stat strip + floating SaaS card. |
| **Typography hierarchy** | **9.0** | Single `Archivo` variable family with tight-tracked bold display headings, tabular figures for PKR fees/times/rooms, zero monospace prices, and genuine `Noto Nastaliq Urdu` for RTL. |
| **Varied and coherent layout rhythm** | **9.0** | Alternates between split hero, 4-column ruled task strip, 2-column floor directory, full-bleed architectural cross-section band, dotted-leader tariff + hours split, and ruled FAQ list. |
| **Image consistency / art direction** | **8.5** | Eliminated cartoon SVG avatars in favour of cohesive architectural monogram plaques and technical floor/arrival diagrams. Real commissioned photography would elevate it further for a live client. |
| **Restrained component / card usage** | **9.5** | Eliminated repetitive rounded white cards across departments, doctors, FAQs, and contact methods; every content type uses its own native structure (rows, tables, lists, typographic blocks). |
| **Patient-first information hierarchy** | **9.5** | Search, today's doctors & rooms, phone number, opening hours, PKR fees, and Rescue 1122 guidance are immediately scannable without marketing filler. |
| **Mobile quality (`375px` & `390px`)** | **9.0** | Zero horizontal overflow, compact single-line header, 44% shorter homepage, persistent `Call / WhatsApp / Book` bottom action bar with matching footer padding. |
| **Accessibility & interaction clarity** | **9.0** | WCAG AA+ contrast (`#11181C`/`#3F4C52`/`#59676D`), minimum 13px metadata, focus management & scroll lock on dialogs/menu, `role="alert"` form errors, reduced motion support. |

All scores are ≥ 8.5/10 after the second polish pass.
