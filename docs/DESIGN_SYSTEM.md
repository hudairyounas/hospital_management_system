# Design System Specification

## 1. Color Tokens

### Surface & Neutral Palette
| Token Name | Hex Value | Usage | Contrast Check |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#F8F7F4` | Warm Alabaster Stone primary page background | 14.8:1 vs `--text-primary` |
| `--bg-surface` | `#FFFFFF` | Pure clinical white for cards, tables, and form panels | 16.4:1 vs `--text-primary` |
| `--bg-subtle` | `#EFECE6` | Secondary section background & subtle table headers | 13.5:1 vs `--text-primary` |
| `--bg-cypress-deep` | `#0D352C` | High-contrast institutional dark sections & footer | 12.9:1 vs `#F8F7F4` |
| `--border-subtle` | `#DCE2DF` | Structural 1px borders and table dividers | — |
| `--border-strong` | `#9FB0A9` | Input borders and active card outlines | 3.1:1 vs `--bg-surface` |

### Text Hierarchy
| Token Name | Hex Value | Usage | WCAG 2.2 AA Ratio |
| :--- | :--- | :--- | :--- |
| `--text-primary` | `#14221E` | Deep Charcoal Cypress for headings and body copy | 14.8:1 on `#F8F7F4` (AAA) |
| `--text-secondary` | `#43544E` | Muted Slate Sage for supporting descriptions | 7.6:1 on `#FFFFFF` (AAA) |
| `--text-muted` | `#5F706A` | Metadata, captions, and secondary labels | 4.9:1 on `#FFFFFF` (AA) |

### Brand & Semantic Accents
| Token Name | Hex Value | Usage |
| :--- | :--- | :--- |
| `--accent-primary` | `#145947` | Primary Clinical Jade — main CTA buttons, active states, focus rings |
| `--accent-primary-hover` | `#0E4033` | Hover/active state for primary buttons |
| `--accent-soft` | `#E4F0EC` | Soft jade tint for active pills, specialty badges, and highlights |
| `--accent-amber` | `#B85D3B` | Terracotta Ochre — demo notices, urgent care callouts |
| `--status-success` | `#166534` | Available today badge, validated field confirmation (`#DCFCE7` bg) |
| `--status-warning` | `#92400E` | Demo mode warning banner, fasting required notice (`#FEF3C7` bg) |
| `--status-danger` | `#B91C1C` | Form error text, emergency 1122 guidance (`#FEE2E2` bg) |

---

## 2. Typography Scale

- **Heading Font (`--font-display`):** `'Fraunces', Georgia, serif` (for English) / `'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif` (for Urdu RTL).
- **Body & UI Font (`--font-sans`):** `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif`.
- **Technical / Reference Font (`--font-mono`):** `'JetBrains Mono', monospace` (used for `NMC-2026-XXXX` booking references, `DEMO-PMDC` numbers, and PKT time ranges).

| Element | Desktop Size | Mobile Size | Line Height | Weight |
| :--- | :--- | :--- | :--- | :--- |
| Display Hero (`h1`) | `2.75rem` (44px) | `2.0rem` (32px) | `1.15` | `600` |
| Section Title (`h2`) | `2.0rem` (32px) | `1.625rem` (26px) | `1.22` | `600` |
| Subsection / Card (`h3`) | `1.25rem` (20px) | `1.125rem` (18px) | `1.35` | `600` |
| Body Large | `1.0625rem` (17px) | `1.0rem` (16px) | `1.65` | `400` |
| Body Standard | `0.9375rem` (15px) | `0.9375rem` (15px) | `1.6` | `400` |
| UI Control / Label | `0.875rem` (14px) | `0.875rem` (14px) | `1.4` | `600` |
| Caption / Badge | `0.75rem` (12px) | `0.75rem` (12px) | `1.35` | `500` |

---

## 3. Spacing, Grid & Radii
- **Container Max Width:** `1280px` (`max-w-7xl`) with responsive horizontal padding (`1rem` at 375px, `1.5rem` at 768px, `2rem` at 1024px+).
- **Border Radii:** Restrained architectural corners — `rounded-lg` (`8px`) for buttons and inputs, `rounded-xl` (`12px`) for cards and panels. No exaggerated pill-shaped cards.
- **Touch Targets:** Minimum `44px × 44px` hit area on all interactive buttons, form inputs, filter chips, and mobile menu links.
- **Focus States:** Explicit `2px solid #145947` outline with `2px` offset (`focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145947]`).
