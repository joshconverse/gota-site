# CLAUDE.md

Working notes for Claude Code (and other agents) on the **Grace on the Ashley** website.

> `AGENTS.md` is the canonical reference for tech stack, commands, env vars, and deployment. This file focuses on what's specific to *editing this site's content and layout* — the design system, page inventory, people/contacts, and the working conventions Josh expects. Read both.

## What this site is

Marketing/informational website for **Grace on the Ashley** (a Baptist church in Charleston, SC — 2025 Bees Ferry Road, Charleston SC 29414). Next.js 16 App Router + React 19 + Tailwind CSS v4, content partly in Sanity CMS, deployed on Vercel with **auto-deploy on every push to `main`**.

- Live: https://gota-site.vercel.app
- Repo: `joshconverse/gota-site`
- Contact domain for ministries: `@gotachurch.org`; giving is via Church Center (`gotachurch.churchcenteronline.com`).

## Git / working workflow (important — Josh's standing preference)

**Always branch → commit → push → open a PR. Never commit or push directly to `main`.** Then **wait for Josh to say when to merge** — do not auto-merge, even when checks pass. (Exception: if he explicitly says "force merge" / "merge it now," merge without waiting.)

- Branch naming used so far: `content/…`, `fix/…`, `chore/…`, `docs/…`.
- Merge with `gh pr merge <n> --squash --delete-branch`, then `git remote prune origin` to clear the stale remote ref.
- Before starting, `git status` / `git branch`; if a stale branch name collides, pick a fresh one (old branches from prior sessions may linger).
- PRs merge cleanly by fast-forward as long as local `main` is current. If a squash merge can't fast-forward locally, `git reset --hard origin/main` after confirming the PR shows `MERGED`.
- GitHub's API occasionally returns a transient `503` on merge — check `gh pr view <n> --json state,mergedAt` before retrying so you don't double-act.

### Branch protection on `main` (strict merges — matters when batch-merging)

`main` is protected: `required_status_checks.strict: true`, required check context **`build`** (the CI lint+build gate), `enforce_admins: true` (admins **cannot** override — `gh pr merge --admin` won't work), and `required_approving_review_count: 0` (no review approval needed). "Strict" means a PR branch must be **up to date with `main`** before its `build` check counts toward merge.

So when you have several PRs to merge, they go in **serially, not as a batch** — budget ~1 min of CI per PR:

1. Merging one PR advances `main`, which flips every other open PR to `BEHIND` (check `gh pr view <n> --json mergeStateStatus`).
2. A `BEHIND` PR won't merge — run `gh pr update-branch <n>` first.
3. `update-branch` creates a new head commit, which kicks off a **fresh** `build` run; the previously-passing check is now stale — **don't merge on it**. Give the new run a few seconds to register, then `gh pr checks <n> --watch` until it finishes, then `gh pr merge <n> --squash --delete-branch`.
4. Repeat for the next PR.

## Verifying changes

- `npm run lint` and `npm run build` before every PR. The repo has many **pre-existing** `no-img-element` and `no-unused-vars` warnings — 0 errors is the bar; don't chase those warnings unless you touched that line.
- **Deleting a page/route?** Clear the Next build cache (`rm -rf .next`) before `npm run build` — stale generated files in `.next/dev/types/` will otherwise fail the TS check by referencing the deleted route.
- For layout/visual changes, drive it in the browser: `npm run dev` (localhost:3000), then Playwright (chromium is installed) to screenshot. `curl … | grep` is enough for verifying content presence/ordering and that routes return 200/404.
- Always stop the dev server when done (`pkill -f "next dev"`).

## Design system

Brand colors are **plain CSS variables + hand-written utility classes** in `src/app/globals.css` (there is **no `tailwind.config.*`** — Tailwind v4). Use the `bg-brand-*` / `text-brand-*` / `border-brand-*` classes, or the raw hex for inline hero backgrounds:

| Token | Hex | Name | Typical use |
|---|---|---|---|
| `brand-1` | `#96A78D` | deep sage | headings accents, numbered badges, leadership section bg |
| `brand-2` | `#B6CEB4` | light sage | hero tint bg, primary buttons |
| `brand-3` | `#D9E9CF` | pale green | footer bg |
| `brand-4` | `#F0F0F0` | light gray | alternating section bg, cards |

Fonts: Geist Sans (via `--font-geist-sans`); `.hero-title` uses a larger Gotham/Geist treatment. Radius default `0.625rem`.

### Ministry detail page pattern ("Pattern A")

Every ministry detail page (`src/app/ministries/<slug>/page.tsx`) hand-rolls the same structure — **there is no shared Hero/Section/Button component**; match the existing markup by copying a sibling page (`children/page.tsx` is the most fully built-out reference):

- **Hero:** `relative h-screen flex items-center`, `style={{ backgroundColor: '#B6CEB4' }}`, a background `<img>` at `opacity-20` with a `bg-gradient-to-r from-green-900/30 to-transparent` overlay, centered white `font-light` heading + subtitle, and a "Back to Ministries" button (`bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200`) inside the hero.
- **Body:** stacked `py-20` sections **alternating `bg-brand-4` and `bg-white`**; container `container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20`. Cards are `rounded-lg shadow-lg p-8` (card bg is whichever color the section isn't). When you reorder sections, re-check the alternation so no two same-colored sections touch and cards keep contrast.
- **Primary CTA / email button:** `bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition`.
- **Numbered steps / list items:** `flex-shrink-0 w-8 h-8` (or `w-10 h-10`) `rounded-full bg-brand-1 text-white flex items-center justify-center font-semibold`.

## Page & route inventory

Nav (`Header.tsx`): Home, About, Watch, Ministries, Next Steps, **Give** (external → Church Center, `target="_blank"`). `Footer.tsx` has a main-links column (Watch, About, Ministries, Next Steps) and a Ministries column linking each detail page directly at `/ministries/<slug>` (not `#anchor`).

- `/` (`app/page.tsx`) — Hero (pulls latest YouTube stream thumbnail), "Gather with us" service times + location, Mission section (three `FlipCard`s: make / mature / mobilize disciples), "Visit Us" CTA. Service times: **Sunday School 9:30 AM, Main Service 10:45 AM**.
- `/about` (`app/about/page.tsx`, `"use client"`) — Hero; **Beliefs** section = "Our Basic Beliefs Are" (5 numbered cards) followed by an accordion of in-depth doctrinal statements (`beliefsItems`, toggled, one open at a time); then **Leadership**: Elders, Pastors, Staff grids (bio photos are `/bioImage_*.jpg`; missing ones show a "Photo Coming Soon" placeholder).
- `/ministries` (`app/ministries/page.tsx`, `"use client"`) — hero + card grid built from a `ministries[]` array (id, title, description, bgColor). Cards link to `/ministries/<id>`.
- `/ministries/<slug>` — detail pages: `children`, `students`, `community-groups`, `married`, `local-missions`, `worship`, `international-missions`. `children` and `students` are fully built; several others are still "Coming Soon" stubs with only the Pattern A hero.
- `/next-steps`, `/watch` (sermon library, YouTube playlists).
- API routes (dynamic): `/api/planning-center/events`, `/api/youtube/playlists`.
- **Removed:** `/volunteer` (page + footer link deleted). The homepage "Get plugged in" announcements section was also removed (the `AnnouncementCard` component still exists but is unused).

## People / content facts

- **Elders:** Kelly Graham (Associate Pastor), Roger Parker (Chairman), Aaron Barney. *(Greg Smith and John Butz were removed.)*
- **Pastors:** Kelly Graham (Associate Pastor).
- **Staff:** Audrey Yadon, Justin Waycaster (Treasurer). *(Donna Faulk was removed.)*
- **Children's Ministry (Grace Kids):** babies–5th grade; `children@gotachurch.org`. Section order: About → Check-In steps → Ages Served & Departments → When We Meet → Wednesday Night Discipleship → Curriculum → Safety & Security → Contact.
- **Student Ministry:** grades 6–12; leaders **Ben & Audrey Yadon**; `students@gotachurch.org`; tagline "Inviting students to a life of faith in Jesus Christ." Sundays 9:30 am; 1st & 3rd Wednesdays 5:30 pm dinner / 6:30 pm discipleship & games.

## Gotchas

- Content edits to ministry summaries live in **two places**: the `/ministries` listing card (`description` in the array) and the detail page hero subtitle — keep them consistent.
- `src/sanity/client.ts` may hardcode Sanity project config; integrations (YouTube, Planning Center) depend on Vercel env vars and just warn/return empty locally — a clean local build is **not** proof they work end-to-end.
- This is a **live production church site**; every merge to `main` ships. No speculative changes without Josh's sign-off.
