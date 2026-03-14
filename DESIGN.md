# O'Learys Loyalty App — Design System

## Brand

**App name:** O'Learys Loyalty Program
**Style:** Clean white minimalism, abundant whitespace, green as the single accent color

---

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `green-primary` | `#2d9b87` | CTAs, active nav, progress bar, icons |
| `green-dark` | `#23695a` | Hover states, dark challenge cards, booking heroes |
| `green-light` | `#96beaf` | Inactive progress, subtle backgrounds |
| `yellow` | `#ffdc1e` | Booking CTA buttons, contrast badges, tier highlights |
| `black` | `#3c3c3c` | All body text and headings |
| `white` | `#ffffff` | Page backgrounds, card surfaces |
| `gray-100` | `#f5f5f5` | Section backgrounds |
| `gray-300` | `#e0e0e0` | Borders, dividers |
| `gray-500` | `#9e9e9e` | Secondary / muted text |

---

## Typography

- **Font family:** Jost (Google Fonts) — stand-in for Futura LT Pro Book
- **Swap:** Replace with `@font-face` Futura LT Pro Book when files are available

| Size | px | Usage |
|------|----|-------|
| xs | 12 | Labels, badges |
| sm | 14 | Secondary text, captions |
| base | 16 | Body text |
| lg | 18 | Card titles |
| xl | 24 | Section headings |
| 2xl | 32 | Page headings |

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body |
| Medium | 500 | Labels, nav items |
| Bold | 700 | Headings, CTAs |

---

## Spacing (4px grid)

`4 / 8 / 12 / 16 / 24 / 32 / 48px`

---

## Cards

- **Border radius:** 12px (cards), 8px (buttons), 999px (pills/badges), 50px (phone frame)
- **Shadow:** `0 2px 8px rgba(0,0,0,0.08)`
- **Background:** `#ffffff`
- **Border:** `1px solid #e0e0e0`

---

## Logo

- Source: `https://olearys.com/api/logo/`
- Stored at: `public/logo.png`

---

## Loyalty Tiers

`Regular` → `Starter` → `All Star` → `MVP`

Points currency: **Bonus Points**

---

## Navigation (Bottom Tabs)

5 tabs — max per `bottom-nav-limit` guideline:

| Tab | Route | Icon style |
|-----|-------|------------|
| Home | `/` | Diamond (outline → filled active) |
| Book | `/book` | Diamond (outline → filled active) |
| Already Here? | `/here` | Raised circle (center FAB) |
| Challenges | `/challenges` | Diamond (outline → filled active) |
| Wallet | `/wallet` | Diamond (outline → filled active) |

Active color: `#2d9b87`
Inactive color: `#9e9e9e`

---

## Mobile Frame

- **Device:** iPhone 14 Pro (393x852)
- **Bezel:** 8px black with rounded-[50px] corners
- **Dynamic Island:** 120x32px centered at top
- **Home indicator:** 128x4px bar at bottom
- Content scrolls within the fixed phone viewport

---

## CTA Patterns

| Context | Style |
|---------|-------|
| Primary actions (green) | `bg-green-primary text-white rounded-lg/2xl` |
| Booking CTAs (yellow) | `bg-[#ffdc1e] text-[#3c3c3c] rounded-2xl` |
| Destructive actions | `bg-red-500 text-white` or `border-red-200 text-red-500` |
| Outline buttons | `border-green-primary text-green-primary rounded-full` |
| Disabled | `bg-brand-gray-100 text-brand-gray-500` |

---

## Anti-patterns (avoid)

- No dark backgrounds on main screens (challenge/booking heroes are exceptions)
- No emoji as icons — use Lucide SVG only
- No mixing of filled/outline icons at the same hierarchy level
- No horizontal scroll on the page level — only inside designated scroll containers
- No `fixed` positioning for CTAs inside phone frame — use `sticky` instead
- No framer-motion dependency — use CSS transitions/animations
