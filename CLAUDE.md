# O'Learys Loyalty App — Project Context

## What this is
High-fidelity interactive prototype for the O'Learys loyalty program app.
Built as a React web app displayed in an iPhone 14 Pro frame (393x852) in the browser.
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
- `master` branch — stable base (merge-only, never edit directly in `Loyalty App/`)
- One worktree per screen, each on its own feature branch:

```
Builds/
├── Loyalty App/              ← master (merge point only)
├── loyalty-app-home/         ← feature/home-page
├── loyalty-app-book/         ← feature/booking
├── loyalty-app-already-here/ ← feature/already-here
├── loyalty-app-challenges/   ← feature/challenges
└── loyalty-app-wallet/       ← feature/wallet
```

- Work and commit inside worktree folders — never in `Loyalty App/`
- Merge into master from `Loyalty App/`: `git merge feature/<branch>`
- After merging, sync other worktrees: `git rebase master` (from within each worktree)
- One Claude Code / VS Code window per worktree — never two agents in the same folder

## App structure
```
/               → Home
/benefits       → Tier Benefits (comparison table)
/loyalty-explained → Loyalty Explained (how the program works: earn, tiers, spend)
/deals          → All Deals (grid)
/deals/:id      → Deal Detail + activate
/rewards        → All Rewards (grid)
/rewards/:id    → Claim Reward Card
/book           → Book (5-tab booking hub: Watch, Eat & Drink, Happenings, Party & Events, Play)
/book/:matchId  → Match Booking (select activities → activity detail → checkout → payment → confirmation)
/book/package/:packageId → Package Detail (multi-step time selection, addons, add to booking)
/book/package-checkout   → Checkout from package/happening (reuses MatchBooking checkout flow)
/book/events    → All Events (full list, filterable by category)
/book/parties   → All Party & Event types (list view)
/book/happening/:happeningId → Happening Detail (seating time, addons, add to booking)
/book/party/:partyType       → Party Detail (packages, guests, date picker, inquiry)
/my-bookings    → My Bookings (Upcoming + Requests tabs)
/here           → I'm here (check-in flow with venue picker, notify friends)
/play           → Play Game (3 Kamp, 5 Kamp, Bowling Bingo)
/play/:id       → Game Detail (setup → teams → play → results)
/play/bowling-bingo → Bowling Bingo
/predict        → Predict Match (score predictions)
/challenges     → Challenges (Unlocked, Active, Finished, Hall of Fame)
/challenges/:id → Challenge Detail
/wallet         → Wallet (loyalty card, QR, vouchers, gift cards)
/wallet/vouchers    → All Vouchers
/wallet/history     → Order History
/wallet/:type/:id   → Voucher / Pass / Gift Card Detail
/highscore      → My Highscores
/settings       → Settings
```

## Screens

### Home
- User greeting + name (Daniel Svantesson)
- Bonus Points (58,231) with star icon
- Progress bar with tier icons: Regular → Starter → All Star → MVP
- Benefits chips: "5% DISCOUNT", "Earn 1.5x ON POINTS"
- "See your benefits" → Tier Benefits page
- Deal cards (horizontal swipe, image-only)
- Redeem with points cards (image-based, tap → claim flow)
- Highscore button + player card thumbnail (top right)
- Player card modal with Upload Photo / Generate (sport selector) flow → preview with Regenerate / Cancel / Keep

### Tier Benefits
- Green header with back nav
- Horizontal scroll tier cards (Regular, Starter, All Star, MVP)
- Benefits comparison table (10 rows, 4 tier columns)

### Book (5-tab booking hub)
- Location selector (Norrköping / Östermalm dropdown)
- Category tabs: Watch, Eat & Drink, Happenings, Party & Events, Play
- Guest inputs (adults + kids) + total guests badge
- 5-day calendar with "Pick other date" (full calendar modal with green availability bars)
- Back navigation from sub-pages preserves active tab state

#### Watch tab
- 8 live matches (SHL, Premier League, Serie A, NHL) with team logo circles, time, league badge
- Green gradient background behind match cards
- "Book a table" → Match Booking flow

#### Eat & Drink tab
- Popular Packages: Dinner & Bowling, Dinner & 5 Game Challenge, After Work (real O'Learys images)
- Available table times → SelectActivities ("Would you like to book anything else?")
- Green gradient behind packages, white below

#### Happenings tab
- Popular events scroll (Champions League Night, Music Quiz, O'Learys By Night) with real images
- "See all" → All Events page (grouped by month, filterable: All/Quiz/Nightlife/Sports)
- Date-filtered events for selected day with "Book" button
- Events from olearys.com/norrkoeping/events (Music Quiz weekly, O'Learys By Night Club)

#### Party & Events tab
- "Always at O'Learys" 2x2 grid: Kidsparty, Birthdays, Team Building, Date Night (real images)
- "See all" → full list view
- Each detail page: hero image, packages with real prices (EUR→SEK from olearys.com/gent), guest picker, date picker, inquiry flow

#### Play tab
- Popular Packages: Bowling & Dinner, 3-kamp & Dinner (real images)
- Activity pills (selectable, filter time slots): Bowling, Shuffleboard, Interaktiv Dart, Blacklight Minigolf, Karaokerum, Biljard, 3-kamp, Arkadhall
- Available activity times → activity detail page with pre-selected time

### Package Detail (shared flow for Eat & Play packages)
- Hero image from package, multi-step time selection (e.g. 1. Dinner time, 2. Bowling time)
- Dinner steps always 2h with next slot highlighted
- Time blocking between steps (selected slots greyed in other grids)
- "Often combined with" addons (dinner + activities for play, activities for eat)
- Addon modal: guest picker, time grid, duration, price
- "Add to booking" → checkout flow

### Happening Detail
- Hero with green gradient, event info, seating time pill
- Description with More/Less, guest/date bar, special requests
- "Often combined with" activities (time slots blocked by 2h seating)
- "Add to booking" → checkout flow

### Match Booking (multi-phase flow)
1. Select Activities — "Would you like to book anything else?" with activity list
2. Activity Detail — time grid with duration highlighting, price calc
3. Checkout — cart, cancellation insurance (+49 kr), pre-pay 5% toggle, editable guests
4. Payment (if pre-pay & total > 0) — saved card, Apple Pay, Klarna, new card form
5. Booking Request (if 8+ guests) — request sent with 24h response time
6. Confirmation — reference number, venue contact
- Activities with real prices from olearys.com/norrkoeping: Bowling (449 kr/lane), Shuffleboard (349 kr/board), Blacklight Minigolf (99 kr/person), Interaktiv Dart (299 kr/board), Karaokerum (699 kr/room), Biljard (299 kr/table), 3-kamp (279 kr/person), Arkadhall (token-based)

### My Bookings
- Upcoming / Requests tabs with count badges
- Upcoming: Luleå HF vs Färjestad BK (confirmed, green badge)
- Requests: Birthday Party for 10 people (pending, amber badge)
- Leave a comment, modify guests, cancel/withdraw

### I'm here (check-in)
- States: default (no venue) → location picker sheet → celebration (confetti + football) → checked-in
- Check-in state persists across navigation via CheckInContext (survives back-nav from /predict, /play, etc.)
- Notify guests sheet: pings friends to join, free arcade game if they check in within 60 min
- 3 feature cards (Order, Play Game, Predict Match) gated until venue is selected
- Bottom-nav center button: green MapPin circle labeled "I'm here" (replaced baseball stitching design)

### Play Game
- 3 Kamp / 5 Kamp: full 4-phase game (setup → teams → play → results with confetti)
- Bowling Bingo: 5x5 bingo grid with BINGO detection

### Predict Match
- 4 upcoming + 1 finished match
- Expandable cards with score prediction input
- Finished games greyed out (non-interactive)

### Challenges
- Tabs: Unlocked (3), Active (3), Finished (0), Hall of Fame
- Tab is selectable via `?tab=unlocked|active|finished|fame` query param (used by Highscore "Hall of Fame" deep-link → `/challenges?tab=fame`)
- **Unlocked**: Matchday Liverpool & Arsenal (red hero card + "FREE TO JOIN" pill + Join button), Bowling King (image card + 3 000 pts + bottle prize), Globetrotter (image card + "10 cities" pill + 2 000 pts)
- **Active**: Matchday Experience (2/4 check-ins), Burger Ronaldo (7/15 burgers, 2 000 pts), Professional Quizzer (4/10 quizzes, 4 000 pts)
- Active card pattern: green header with title + body, mini-bowling-pin step tracker, "ACHIEVEMENT" + prize footer, optional "YOU'RE IN THE DRAW" yellow ribbon when complete
- Sports Join button navigates to detail page with auto-enrollment (?joined=true)
- Challenge Detail variants: Matchday (React-built red hero with Premier League pill, prize tile, numbered "How it works", black "Join challenge" CTA), Bowling-King/Globetrotter (image hero + 3-step Award row + special prize panel), Progress (green header + step tracker + achievement footer)
- Hall of Fame: gradient hero with yellow trophy crest, sub-tabs (Bonus / Bowling / Bowling arcade / Boxing arcade), 3-up podium (gold/silver/bronze blocks), leaderboard rows below with "you" highlighted in yellow

### Wallet
- Top toggle: **Wallet** / **Buy Cards**, settings cog (left) → /settings
- **Wallet tab**:
  - Dark Points card: Bonus Points (58 231), yellow All Star tier pill, progress bar to next tier (taps open Tier sheet); points number taps open Activity sheet
  - Member QR row (green) → QRSheet with deterministic 21×21 QR + member number 8821 4427 0093
  - Vouchers: max 3 perforated tickets inline ("Free starter", "Birthday treat", "2 free arcade games", etc.); "See all (N)" if >3 → AllVouchersSheet sorted by expiry
  - Cards: 2-col grid — Gift card (250 kr, black) + VIP Nightclub card (Free entries · Jun–Aug, yellow, sparkles icon) → GiftCardSheet with member QR
  - Redeem with points: horizontal image strip (Bowling/Soft Drink/Shuffleboard/Wings) → /rewards/:id
  - Order history row → /wallet/history
- **Buy Cards tab** (4-step flow in src/screens/BuyCards.jsx):
  1. Design — live card preview, 5 themes with custom SVG art (Classic, Birthday, Sport, Celebration, Game Winner), amount chips (100/250/500/1000 + custom), 80-char message
  2. Recipient — SMS / Email / Keep it; recipient name + contact; Send now / Schedule
  3. Review & pay — summary, pay method radio (Apple Pay / Visa / Klarna), totals
  4. Sent — green check, card preview, receipt, Done
- Sheets: QR, Voucher, Gift card, Tier perks, Activity, All vouchers
- Existing routes preserved: /wallet/vouchers, /wallet/history, /wallet/:type/:id (WalletCardDetail/OrderHistory)

### Highscore
- Three arcade games: Bowling, Basketball Arcade, Boxing Arcade
- Game list with personal best scores
- Game detail with AI scouting report, score history
- Log new score form (score, date, venue, photo evidence, honor checkbox)
- Player card image at bottom
- "Hall of Fame" pill button at the bottom → `/challenges?tab=fame` (lands directly on the Hall of Fame tab)

## Loyalty tiers
Regular → Starter → All Star → MVP

## Points currency
Bonus Points

## Key decisions
- Font: Jost (swap to Futura LT Pro Book when files available via @font-face)
- Logo: fetched from https://olearys.com/api/logo/
- Clean white minimalism — green is the ONLY color accent
- Yellow (#ffdc1e) for booking CTAs
- iPhone 14 Pro frame with Dynamic Island
- No dark backgrounds except challenge/booking heroes
- "I'm here" center nav button: green MapPin circle (#2d9b87)
- Language: English
- All icons: Lucide React SVG (no emojis)
