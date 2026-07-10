# AGENTS.md

Guidance for AI coding agents (and humans) working in this repository.

## Project Overview

Official website for **Grace on the Ashley** (Baptist church). Marketing/informational site built with Next.js — homepage, ministries pages, events, sermon library, volunteer/next-steps flows. Content (posts, events, announcements) is managed in **Sanity CMS**.

- Live site: https://gota-site.vercel.app
- Repo: `joshconverse/gota-site` (GitHub)

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4, shadcn/ui ("new-york" style), Radix UI primitives, lucide-react icons |
| CMS | Sanity (`next-sanity`, GROQ queries) |
| Language | TypeScript |
| Testing | Vitest |
| Lint | ESLint 9 (`eslint-config-next`) |
| Deployment | Vercel (auto-deploy on push to `main`) |
| Integrations | Planning Center (Calendar API v2, events), YouTube Data API v3 (homepage background/playlists) |

## Commands

```bash
npm install        # install deps
npm run dev         # start dev server (localhost:3000)
npm run build        # production build (Turbopack)
npm run start        # run production build locally
npm run lint         # ESLint
npm test           # vitest run
```

Always run `npm run lint` and `npm test` before committing. Run `npm run build` before pushing anything touching routing, data fetching, or Sanity/PCO/YouTube integration code — it catches TypeScript and static-generation errors that `dev` mode won't.

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── api/planning-center/     # Planning Center events proxy (server-side)
│   ├── api/youtube/           # YouTube playlists route
│   ├── ministries/            # Ministry sub-pages (children, students, married, worship, missions, community groups)
│   ├── about/, volunteer/, next-steps/, watch/
│   ├── layout.tsx, page.tsx, globals.css
├── components/                 # Reusable React components (Header, Footer, Hero, cards, nav, etc.)
│   └── ui/                    # shadcn/ui primitives (item, popover, dropdown-menu, separator, collapsible)
├── sanity/                     # Sanity client, GROQ queries, image URL helper
├── lib/utils.ts                 # Shared helpers (cn(), etc.)
└── utils/                      # planningcenter.ts, youtube.ts, dates.ts (+ *.test.ts alongside)
docs/                          # planning-center.md, pco-support.md — integration notes
scripts/                       # e.g. probe-pco-instances.mjs (manual PCO debugging script)
```

Path aliases (see `components.json`): `@/components`, `@/components/ui`, `@/lib`, `@/hooks`.

## Environment Variables

**No `.env.example` committed** — `.env*` is gitignored entirely (see `.gitignore`). Runtime secrets (YouTube API key, Sanity project config, Planning Center credentials) live in **Vercel's environment variable settings** for the deployed site, not in this repo. `npm run build` succeeds locally without them (features that depend on them just log warnings / return empty data), so a clean build is not proof those integrations work end-to-end.

Known variables (from README / code, not exhaustive):
- `YOUTUBE_API_KEY` — homepage background/playlist images
- `PLANNING_CENTER_PAT` (or `PLANNING_CENTER_CLIENT_ID` + `PLANNING_CENTER_SECRET`) — events calendar
- Sanity project ID/dataset/API version — currently hardcoded in `src/sanity/client.ts` (check there before assuming an env var exists)

If you need to test these locally, ask Josh for values or pull them from Vercel — do not invent placeholder values and commit them.

## Deployment

**Vercel is connected to this GitHub repo. Any push to `main` triggers an automatic production deployment.** Treat `main` accordingly:

- **All changes require a PR — no direct pushes to `main`.** Work on a feature branch, open a PR, get it merged through GitHub.
- **The PR must pass `npm run build` before it can be merged.** Merging to `main` = shipping to production, so an unbuilt/broken PR must not land.
- Run `npm run build` (and `npm run lint` / `npm test`) locally before opening or updating a PR to catch issues early.
- No staging environment is documented — verify locally before merging.

> Note: this workflow is a repo convention documented here for agents/contributors. If GitHub branch protection / required status checks aren't yet configured on `main` to enforce it automatically, treat this as a hard rule to follow manually until that's set up.

## Conventions & Notes

- Static pages are prerendered (`○` in build output); the two API routes (`/api/planning-center/events`, `/api/youtube/playlists`) are dynamic/server-rendered.
- Tests live next to source files as `*.test.ts` (Vitest), e.g. `src/utils/dates.test.ts`, `src/app/api/planning-center/events/route.test.ts`.
- There's a stray `console.log`/debug dump ("Announcement data: ...") firing during build for Sanity announcement content with a null title — worth cleaning up if you touch that code path, but it's non-fatal.
- `logs/` directory holds output from the PCO probe script (`scripts/probe-pco-instances.mjs`) — not app runtime logs.
- README.md has a stale `- [ ] ... @username` TODO list; treat it as historical, confirm current priorities with Josh rather than assuming it's authoritative.

## Safety / Approval

- This is a live production site for a church — no destructive or speculative changes to `main` without explicit approval.
- Never commit secrets or `.env*` files (already gitignored, keep it that way).
- Confirm before force-pushing, rewriting history, or deleting branches.
