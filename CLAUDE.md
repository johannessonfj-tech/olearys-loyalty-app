# O'Learys Loyalty App — Project Context

## What this is
High-fidelity interactive prototype for the O'Learys loyalty program app.
Built as a React web app viewed at 390px mobile width in a browser.
Used to validate UX flows before native development begins.

## Tech stack
- **Vite + React** — project scaffold and dev server
- **Tailwind CSS** — styling with custom brand tokens
- **React Router v6** — tab-based screen navigation
- **Lucide React** — SVG icon set
- **Jost (Google Fonts)** — stand-in for Futura LT Pro Book

## Design system
See `DESIGN.md` for all colors, typography, spacing, and component rules.

## Git strategy
- `main` branch — stable base
- `ui/prototype` branch — all UI work (worktree at `../loyalty-app-ui`)

## App structure
```
/           → Home
/book       → Book
/here       → Already Here?
/challenges → Challenges
/wallet     → Wallet
```

## Screens

### Home
Header with user name, tier badge, Bonus Points. Progress bar toward next tier with milestone dots. "See your benefits" pill button. Horizontal scroll deal cards. Horizontal scroll redeem-with-points cards.

### Book
"My bookings" pill + location selector. Guest count + date filter. Category pills (Watch, Eat & Drink, Combo, Party & Events, Play). Week calendar with upcoming games. Match cards with "Book a table" CTA.

### Already Here?
Location confirmation. Table number input. Category grid (Food, Drinks, Watch Menu, Desserts). Popular picks horizontal scroll. Floating cart button.

### Challenges
Tabs: Unlocked / Active / Finished / Hall of Fame. Two card styles: sports/sponsor (dark) and activity (solid green). Join + Details buttons.

### Wallet
Visual loyalty card (green gradient). "Show QR Code" → full-screen modal. Vouchers horizontal scroll. Buy Gift Card CTA.
thanks, can yonpx skills add anthropics/claude-code --skill frontend-design
## Loyalty tiers
Regular → All Star → MVP

## Points currency
Bonus Points

## Key decisions
- Font: Jost (swap to Futura LT Pro Book when files available via @font-face)
- Logo: fetched from https://olearys.com/api/logo/
- Clean white minimalism — green is the ONLY color accent
- No dark backgrounds except challenge cards (#23695a)
- Language: English
