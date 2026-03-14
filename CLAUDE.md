# O'Learys Loyalty App — Project Context

## What this is
High-fidelity interactive prototype for the O'Learys loyalty program app.
Built as a React web app displayed in an iPhone frame (393×852) centered on screen.
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
- `master` branch — stable base
- `feature/player-card` branch — current working branch
- `ui/prototype` branch — UI worktree at `../loyalty-app-ui`
- `feature/challenges` branch — challenges worktree at `../loyalty-app-challenges`

## App structure
```
/                    → Home
/book                → Book
/here                → Already Here?
/challenges          → Challenges
/challenges/:id      → Challenge Detail
/wallet              → Wallet
/wallet/vouchers     → All Vouchers
/wallet/history      → Order History
/wallet/:type/:id    → Voucher / Pass / Gift Card Detail
/benefits            → Tier Benefits
/deals               → All Deals
/deals/:dealId       → Deal Detail
/rewards             → All Rewards
/rewards/:rewardId   → Claim Reward
/highscore           → My Highscores
```

## Screens

### Home
Header with user name, tier badge (All Star), Bonus Points (58,231). Highscore button + player card thumbnail (top right). Progress bar with 4 tiers (Regular → Starter → All Star → MVP). Benefits checkmarks. "See your benefits" pill button. Horizontal scroll deal cards. Horizontal scroll redeem-with-points cards. Player card modal with Upload Photo / Generate (sport selector) flow → preview with Regenerate / Cancel / Keep.

### Book
"My bookings" pill + location selector. Guest count + date filter. Category pills: Watch, Eat & Drink, Happenings, Party & Events, Play. Each category shows different content. Watch: week calendar + match cards. Eat & Drink: menu items. Happenings: upcoming events. Party & Events: event packages. Play: activity bookings.

### Already Here?
Baseball-themed center nav button. O'LEARYS header with tagline. Location selector. Three feature cards: Order (food & drinks), Play Game (3 Kamp, 5 Kamp, Bowling Bingo), Predict Match. Order unavailable sheet for unsupported locations.

### Challenges
Tabs: Unlocked / Active / Finished / Hall of Fame. Challenges include: Matchday Experience (sports/sponsor), Bowling King, Globetrotter, Burger Ronaldo (progress bar), Professional Quizzer. Two card styles: sports/sponsor (dark) and activity (solid green). Join + Details buttons with detail pages.

### Wallet
Flippable loyalty card (front: green gradient with name/tier/points, back: baseball player card with stats). Show QR Code → full-screen modal. Vouchers horizontal scroll with detail pages. Buy Cards section (Summer Card 499 kr, Family Card 349 kr) with purchase flow. Gift Cards by category (Birthday, Thank You, Just Because). Order History with spending stats.

### Highscore
Three arcade games: Bowling, Basketball Arcade, Boxing Arcade. Game list with personal best scores. Game detail with AI scouting report, score history, log new score form (score, date, venue, photo evidence, honor checkbox). Player card image at bottom.

## Loyalty tiers
Regular → Starter → All Star → MVP

## Points currency
Bonus Points

## Key decisions
- Font: Jost (swap to Futura LT Pro Book when files available via @font-face)
- Logo: fetched from https://olearys.com/api/logo/
- Clean white minimalism — green is the ONLY color accent
- No dark backgrounds except challenge cards (#23695a)
- iPhone frame: 393×852 with Dynamic Island, status bar, home indicator
- Already Here nav button styled as a baseball with red stitching
- Language: English
