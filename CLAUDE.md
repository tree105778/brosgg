# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BROS.GG is a Teamfight Tactics (TFT) companion web application built with Next.js. It provides team composition building tools, champion/item information, and ranking leaderboards for TFT players.

## Development Commands

### Setup and Running
- `npm install` - Install dependencies
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

### Git Hooks
- Husky is configured for pre-commit hooks
- Lint-staged automatically runs ESLint and Prettier on staged files

## Architecture

### Tech Stack
- **Framework**: Next.js 15 (Pages Router) with Turbopack
- **Styling**: Tailwind CSS 4 + Emotion for CSS-in-JS
- **State Management**: Zustand with Immer middleware
- **Data Fetching**: TanStack Query (React Query)
- **Database**: Supabase (PostgreSQL)
- **API Mocking**: MSW (Mock Service Worker) for development
- **UI Components**: Radix UI primitives + custom components
- **Drag & Drop**: react-dnd with multi-backend support (HTML5 + Touch)

### Project Structure

```
src/
├── components/
│   ├── builder/        # Team composition builder components (drag & drop)
│   ├── common/         # Shared components (headers, containers, panels)
│   ├── meta/           # Meta page components (deck cards, filters)
│   ├── profile/        # Profile page components (stats, match history)
│   ├── rank/           # Ranking leaderboard components
│   └── ui/             # Base UI components (Radix wrappers)
├── data/               # Static data and sample data
├── lib/
│   ├── api.ts          # API client functions
│   ├── supabase.ts     # Supabase client and queries
│   ├── constants.ts    # Public constants
│   ├── internalConstants.ts  # Internal constants
│   └── utils.ts        # Utility functions
├── mocks/
│   ├── handlers/       # MSW request handlers
│   │   ├── deckHandler.ts      # Deck/meta API mocking
│   │   ├── summonerHandler.ts  # Summoner API mocking
│   │   └── rankingHandler.ts   # Ranking API mocking
│   ├── browser.ts      # Browser MSW worker
│   ├── server.ts       # Node MSW server
│   └── index.ts        # MSW initialization
├── pages/
│   ├── _app.tsx        # App root with providers
│   ├── index.tsx       # Home page
│   ├── builder.tsx     # Team composition builder
│   ├── rank.tsx        # Ranking leaderboard
│   ├── meta.tsx        # Meta team compositions page
│   ├── champ/[id].tsx  # Champion detail page
│   ├── item/[id].tsx   # Item detail page
│   └── profile/
│       └── [user].tsx  # Summoner profile page (dynamic route)
├── store.ts            # Zustand stores (champion positions, synergies)
├── styles/             # Global styles and common style components
└── types/
    ├── index.ts        # Core domain types
    ├── api.ts          # API response types
    ├── prop.ts         # Component prop types
    └── database.types.ts  # Supabase generated types
```

### State Management

**Zustand Stores** (src/store.ts):
- `useChampionAndIndexStore` - Manages champion positions on the hexagonal board (x,y grid)
- `useTraitsStateStore` - Tracks active synergies/traits based on placed champions

Both stores use Immer middleware for immutable updates.

### Data Flow

1. **Static**: Champions/items from Supabase via `getStaticProps` (build time)
2. **Dynamic**: Ranking/summoner data from API server via TanStack Query
3. **Mocking**: MSW handlers activated with `NEXT_PUBLIC_API_MOCKING=true`

### Key Features

#### Team Builder (pages/builder.tsx)
- Hexagonal drag-and-drop board (4 rows × 7 columns, alternating offset)
- Real-time synergy/trait calculation via Zustand store
- Screenshot capture with html-to-image
- Uses `react-dnd-multi-backend` (HTML5 + Touch support)
- Position tracking with `"x,y"` string keys in store

#### Ranking System (pages/rank.tsx)
- Displays TFT ranked ladder by tier (Challenger, Grandmaster, Master, etc.)
- Fetches data from custom API server
- Pagination support with `@/components/ui/pagination`

#### Meta Page (pages/meta.tsx)
- Displays recommended team compositions filtered by tier (S, A, B, C, D)
- Shows champion lineups, items, synergies, and win rate stats
- Uses TFTMetaPanel component for deck visualization
- Fetches from `/api/decks` endpoint with SSR
- Client-side tier filtering with tab navigation

#### Profile Page (pages/profile/[user].tsx)
- Dynamic route that displays summoner statistics and match history
- URL format: `/profile/:user` where user is `{gameName}-{tagLine}`
- Fetches unified summoner data from `/summoner/detail/{name}/{tag}` endpoint
- Server-side rendering with `getServerSideProps`

**Profile Components** (src/components/profile/):
- **ProfileHeader**: Summoner name, level, rank badge, tier, LP
- **StatsCards**: Match count, avg placement, top 4 rate, win rate
- **TierGraph**: LP progression visualization with placement-based estimation
- **ChampionStats**: Most played champions
- **SynergyStats**: Most played traits/synergies
- **MatchHistory**: Match cards with placement, queue type, team comp, and traits
- **Queue Filtering**: Tab-based filtering (전체/RANKED/NORMAL/TURBO)

### API Integration

#### Summoner API
**Endpoint**: `GET /summoner/detail/{name}/{tag}`

Returns unified summoner data including:
- Basic summoner info (puuid, name, tag, level, icon, rank)
- Detailed rank stats (tier, division, LP, wins/losses)
- Summary statistics (match count, placements, win rates)
- Match history with full match details
- Most played champions and synergies

**Response Structure**: `SummonerDetailResponse` (see `src/types/api.ts`)

#### Deck/Meta API
**Endpoint**: `GET /api/decks?tier={tier}&setVersion={version}&activate={boolean}`

Returns meta deck recommendations with:
- Deck metadata (ID, title, tier, version)
- Champion lineup with items
- Synergy/trait composition
- Statistics (win rate, top 4 rate, pick rate, avg placement)

**Response Structure**: Array of `MetaDeckSummary` (see `src/types/api.ts`)

### Styling Conventions

- **Tailwind**: Utility classes for layout and common styles
- **Emotion**: Component-specific styled components in `src/styles/style.common.ts`
- **CSS Modules**: Legacy styles (`.module.css`) for specific pages
- **CSS Variables**: Custom properties defined via Tailwind config
- **Typography**: Uses Pretendard variable font loaded in `_app.tsx`

### Environment Variables

Required in `.env`:
```
SUPABASE_URL=<supabase-project-url>
SUPABASE_ANON_KEY=<supabase-anon-key>
NEXT_PUBLIC_API_SERVER=<api-server-url>
NEXT_PUBLIC_API_MOCKING=true  # Enable MSW in development
```

### Path Aliases

- `@/*` maps to `src/*` (configured in tsconfig.json)

### TypeScript Configuration

- **JSX Import Source**: `@emotion/react` for emotion styling
- **Target**: ES2017
- **Module**: ESNext with bundler resolution
- **Strict Mode**: Enabled

## Common Development Tasks

### Adding a New Champion/Item
1. Data is managed in Supabase `champions_s14` and `items` tables
2. Types are auto-generated in `src/types/database.types.ts`
3. Fetch functions are in `src/lib/supabase.ts`

### Adding MSW Handlers
1. Create handler in `src/mocks/handlers/`
2. Export and add to `handlers` array in `src/mocks/index.ts`

**Existing**: `deckHandler`, `summonerHandler`, `rankingHandler`

### Creating UI Components
- Prefer Radix UI primitives wrapped in `src/components/ui/`
- Use Tailwind for styling
- Add to appropriate subdirectory (common/builder/rank/meta/profile/ui)

### Working with Profile/Meta Pages
- Profile components consume `SummonerDetailResponse` from API
- Meta page uses `MetaDeckSummary` for deck displays
- TFTMetaPanel is preferred over DeckCard component
- Champion images extracted from `characterId` (e.g., `TFT14_Ahri` → `Ahri`)
- All API timestamps are epoch milliseconds (not ISO strings)

### Updating Database Types
Run Supabase CLI to regenerate `src/types/database.types.ts` when schema changes.

## Important Notes

- **Pages Router**: Uses Next.js Pages Router (not App Router)
- **Rendering**: SSG for champion/item pages, SSR for profile/meta pages
- **Language**: UI text is primarily in Korean
- **Mocking**: Enable MSW with `NEXT_PUBLIC_API_MOCKING=true` in development
- **Timestamps**: API returns epoch milliseconds (not ISO strings)
- **Image Sources**: Remote patterns configured for Supabase, AWS S3, Riot CDN, Canva CDN, CloudFront
