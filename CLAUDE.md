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
/book           → Book (matches, calendar, guest picker)
/book/:matchId  → Match Booking (activities → time → checkout → confirmation)
/my-bookings    → My Bookings (manage existing booking)
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

### Book
- Location selector (Norrköping / Östermalm dropdown)
- Category pills: Watch, Eat & Drink, Happenings, Party & Events, Play
- Guest inputs (tap to type) + total guests badge
- 5-day calendar with "Pick other date"
- 8 live matches from olearys.com (SHL, Premier League, Serie A, NHL)

### Match Booking (4-phase flow)
1. Select Activities — activity list with prices
2. Activity Detail — time grid, duration picker, price calc
3. Checkout — cart, cancellation insurance, pre-pay 5% toggle
4. Confirmation — reference number, venue contact

### My Bookings
- Luleå HF vs Färjestad BK (confirmed)
- Leave a comment, modify guests, cancel booking

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
