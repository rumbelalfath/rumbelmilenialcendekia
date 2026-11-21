# AGENTS.md

This document describes the project for developers and AI agents working on this codebase.

## Project Overview

Website for **Rumah Belajar Milenial Cendekia**, a non-formal education community in Cinangka, Depok (founded 10 August 2020). The content and visual identity come from the community's portfolio deck: sky-blue house-and-book logo, navy/teal accents, a yellow highlight colour, and heavy condensed uppercase headings.

The site has two parts:

1. **Landing page** (`/`): hero, background, vision & mission, the four core programs, an English Games teaser, a filterable activity timeline, collaboration partners, and a contact form that opens WhatsApp with a pre-filled registration message.
2. **English Games** (`/games`): browser-only English practice games for SD, SMP, and SMA levels, plus a teacher tool to create and share custom multiple-choice quizzes.

There is no backend, database, or login. Everything runs in the browser.

### Tech Stack

| Layer         | Technology                                          |
| ------------- | --------------------------------------------------- |
| Framework     | TanStack Start                                      |
| Frontend      | React 19, TanStack Router                           |
| Build         | Vite 8                                              |
| Styling       | Tailwind CSS 4, theme variables in `src/styles.css` |
| UI Components | shadcn/ui (Radix UI + Tailwind)                     |
| Toasts        | sonner                                              |
| Icons         | lucide-react                                        |
| Language      | TypeScript 6.0 (strict mode)                        |
| Deployment    | Netlify, via `@netlify/vite-plugin-tanstack-start`  |

## Directory Structure

```
├── public/img/               # Photos and logo cropped from the portfolio deck (served via Netlify Image CDN)
├── src
│   ├── components
│   │   ├── site/             # SiteHeader (with BrandMark) and SiteFooter, shared by every page
│   │   ├── games/            # Game engines + shared game UI
│   │   │   ├── choice-quiz.tsx    # Multiple choice: timer, streak bonus, solo or 2-team "Mode Kelas"
│   │   │   ├── scramble-game.tsx  # Word scramble with letter tiles
│   │   │   ├── fill-game.tsx      # Fill in the blank (typed answer, normalized compare)
│   │   │   ├── match-game.tsx     # Memory match English ↔ Indonesian
│   │   │   ├── game-ui.tsx        # ProgressBar, StatPill, ResultCard, normalizeAnswer
│   │   │   └── games-layout.tsx   # Page chrome for /games/* routes
│   │   ├── error-pages.tsx
│   │   └── ui/               # shadcn/ui components
│   ├── data
│   │   ├── site.ts           # All landing-page content: contact, missions, programs, activities, partners
│   │   ├── english-questions.ts  # Built-in question banks per level (sd / smp / sma) + shuffle()
│   │   └── games.ts          # Game catalogue (id, titles, description)
│   ├── lib
│   │   ├── image.ts          # cdnImg(file, width) → /.netlify/images URL
│   │   ├── quiz-share.ts     # Encode/decode teacher quizzes into a base64url link (zod-validated)
│   │   └── use-mounted.ts    # Render games only after hydration
│   ├── routes
│   │   ├── __root.tsx        # HTML shell, fonts, site name/description
│   │   ├── index.tsx         # Landing page
│   │   ├── games.index.tsx   # /games hub
│   │   ├── games.$game.tsx   # /games/:game?level=sd|smp|sma
│   │   ├── games.buat.tsx    # /games/buat — teacher quiz builder (?set= loads a quiz for editing)
│   │   └── games.kuis-guru.tsx # /games/kuis-guru?set=… — plays a shared teacher quiz
│   └── styles.css            # Theme variables (brand palette, fonts), helper classes, animations
```

## Non-obvious decisions

- **Teacher quizzes live in the URL.** `/games/buat` encodes the quiz as base64url JSON in `?set=`; `/games/kuis-guru` decodes and validates it with zod. No storage is needed to share a quiz. If saved quizzes, class leaderboards, or teacher accounts are ever wanted, that needs Netlify Database (and Identity for accounts) — don't use localStorage for it.
- **Games render after mount** (`useMounted`), because decks are shuffled with `Math.random` and SSR output would not match the client.
- **Contact form → WhatsApp.** The form builds a `wa.me` link in the "Nama – Jenjang – Program" format the community already uses; there is no form backend.
- **Images** are cropped from the uploaded portfolio pages into `public/img/` and always referenced through `cdnImg()` (Netlify Image CDN, WebP, resized). The logo files (`logo.jpg`, `logo-icon.png`) are used directly.
- Add questions by editing `src/data/english-questions.ts`; each game picks a random subset per round (quiz 10, scramble 8, fill 8, match 6 pairs).
- UI copy is in Bahasa Indonesia; game prompts and feedback are in English.
- Brand colours: `primary` (sky blue), `navy`, `teal`, `accent` (yellow), `success`. Headings use Barlow Condensed (uppercase), body uses Plus Jakarta Sans.

## Key Concepts

### File-Based Routing

Route files in `src/routes/` define pages and endpoints:

- `__root.tsx` wraps every page.
- `index.tsx` is `/`.
- `about.tsx` would be `/about`.
- `api.*.ts` files are server API endpoints. See the `tanstack-start-api-routes` skill.

### Theme Variables

Colors and corner radius are CSS variables in `src/styles.css` (`--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--radius`, and more), with a second set under `.dark`. Tailwind exposes them as classes such as `bg-primary`, `text-muted-foreground`, and `border-border`.

Set these variables for the product before you build any page. In components, use the variable classes instead of raw colors like `bg-white` or `text-gray-600`, so the whole site changes when a variable changes.

### UI Components

Ready-made components are in `src/components/ui/`. Use them before writing your own, and restyle them through the theme variables or their variants. Add more with `npx shadcn add <name>`. Show a toast by calling `toast()` from `sonner`; the container is already mounted in `__root.tsx`. `TooltipProvider` is mounted there too, so `Tooltip` works anywhere without its own provider.

| Need               | Components                                                         |
| ------------------ | ------------------------------------------------------------------ |
| Actions and status | Button, Badge, Progress, Skeleton, Alert, Sonner                   |
| Forms              | Input, Textarea, Label, Checkbox, RadioGroup, Switch, Select, Form |
| Overlays and menus | Dialog, Sheet, Popover, DropdownMenu, Tooltip                      |
| Content and layout | Card, Tabs, Accordion, Separator, Table                            |

Use `Form` with React Hook Form and the Zod resolver. Start from `src/examples/validated-form.tsx`; it isn't mounted or connected to a backend. Its required `onSubmit` callback must reject on failure. See [the form pattern](docs/forms.md) for HTTP submission and error handling.

Use Sheet for a mobile menu and DropdownMenu for short action lists. Give Dialog and Sheet an accessible title and description. Pair Checkbox, RadioGroup, Switch, and inputs with visible labels. Reserve tables for tabular data and wrap them in their provided scroll container.

### Design Choices

Set the product's palette, heading/body fonts, and layout before building its screens. Use an explicit user design when supplied; otherwise choose defaults that fit the product. Keep Basic's placeholder until you replace it with the requested product.

- Set `--font-body` and `--font-heading` in `src/styles.css`. Use `font-display` for headings when the product needs a separate heading font.
- Use `max-w-content` for a page container and `max-w-reading` for long text. Keep consistent horizontal padding, such as `px-4 sm:px-6`, and a small repeated spacing scale, such as `gap-4`, `gap-6`, and `py-12`.
- Keep one main heading per page and a clear heading order. Use muted text for supporting copy, not essential low-contrast labels.
- Preserve focus rings. Give icon-only buttons an accessible name. Ensure actions work with a keyboard and on narrow screens.
- Use short color/opacity transitions. Add `motion-reduce:transition-none` or `motion-reduce:animate-none` when adding motion; don't make essential content depend on animation.
- Provide loading, empty, error, and success states for each data-driven screen. Skeletons should follow the shape of the content they replace.

### Routing and Server Data

Router types are registered in `src/router.tsx`, so use typed `Link` destinations and route parameters. The root route supplies the themed 404 page; the router's default error component supplies the safe retry/home page, including child-route SSR failures. Use `throw notFound()` for absent records; keep unexpected failures on the error path. See [routing conventions](src/routes/README.md).

Start with route loaders and server functions for server data. Validate server-function input with `.validator(...)`, keep secrets on the server, and handle HTTP failures before returning data. See [the data-fetching pattern](docs/data-fetching.md). Add TanStack Query only when client-side caching, mutations, or background refresh are needed.

### Browser Storage

Pages are rendered on the server first, where `window` and `localStorage` don't exist. Read `localStorage` inside `useEffect`, not during render or in a `useState` initializer, or the first render will differ from the server HTML and React will log a hydration error.

## Configuration Files

| File             | Purpose                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| `vite.config.ts` | Vite path aliases and Tailwind, Netlify, TanStack Start, React plugins                           |
| `tsconfig.json`  | Strict TypeScript, with the `@/*` alias for `src/*`                                              |
| `netlify.toml`   | Builds with `vite build`, publishes `dist/client`, dev server on port 8888 proxying Vite on 3000 |

## Development Commands

Use Node 22.13+ on the Node 22 line, Node 24, or Node 26+. The installed lint and test tools set this minimum alongside the framework.

```bash
npm run dev        # Start the Vite dev server on port 3000
npm run build      # Production build
npm run typecheck  # Type-check with tsc; the build doesn't
npm run lint       # Check TypeScript and React Hooks rules
npm run format:check # Check formatting
npm run format     # Format project files
npm test           # Run local form, control, and error page tests
npm run preview    # Preview the production build
```

## Conventions

- Components: PascalCase. Utilities and hooks: camelCase. Route files: kebab-case.
- Import from `src` with the `@/` alias.
- TypeScript fails on unused locals and parameters, so remove what you don't use.
- Use React hooks for state.
- Run the dev server or build once to generate route types before type-checking a fresh copy.
- Run build, typecheck, lint, format:check, and tests before reporting completion. Verify changed user flows locally; a passing build doesn't prove an interaction works.

## Application Name

Set the product's name and description in `src/routes/__root.tsx`:

- `siteName` is the page title and the title shown when the link is shared.
- `siteDescription` is the meta description and the description shown when the link is shared.

Then replace the placeholder heading and text in `src/routes/index.tsx`.
