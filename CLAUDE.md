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
/here           → Already Here? (Order, Play Game, Predict Match)
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

### Already Here?
- O'LEARYS header + location selector
- 3 features: Order (unavailable sheet), Play Game, Predict Match

### Play Game
- 3 Kamp / 5 Kamp: full 4-phase game (setup → teams → play → results with confetti)
- Bowling Bingo: 5x5 bingo grid with BINGO detection

### Predict Match
- 4 upcoming + 1 finished match
- Expandable cards with score prediction input
- Finished games greyed out (non-interactive)

### Challenges
- Tabs: Unlocked (3), Active (2), Finished (0), Hall of Fame
- **Unlocked**: Matchday Experience Liverpool vs Man Utd (sports/Carlsberg), Bowling King (activity), Globetrotter (activity — visit 10 O'Learys, 2000 pts)
- **Active**: Burger Ronaldo (progress 7/15 burgers, 2000 pts), Professional Quizzer (progress 4/10 quizzes, 4000 pts)
- Card types: Sports (hero + Join/Details), Activity (green card + icon), Progress (progress bar + achievement)
- Sports Join button navigates to detail page with auto-enrollment (?joined=true)
- Challenge Detail pages with leaderboards (sports), step guides (activity), progress bars (progress)
- Hall of Fame: Bonus + Bowling tabs, 10 entries each, gold/silver/bronze rows

### Wallet
- Flippable loyalty card (front: green gradient with name/tier/points, back: baseball player card with stats)
- "Show QR Code" → full-screen scanning modal
- Vouchers horizontal scroll → detail pages
- Buy Cards: Summer Card (499 kr), Family Card (349 kr) with purchase flow + "Send to a friend"
- Gift Cards by category (Birthday, Thank You, Just Because) with amount selector
- Order History with spending stats and expandable order details

### Highscore
- Three arcade games: Bowling, Basketball Arcade, Boxing Arcade
- Game list with personal best scores
- Game detail with AI scouting report, score history
- Log new score form (score, date, venue, photo evidence, honor checkbox)
- Player card image at bottom

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
- Already Here nav button styled as a baseball with red stitching
- Language: English
- All icons: Lucide React SVG (no emojis)
