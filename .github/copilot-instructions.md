# AI coding agent guide for this repo

This is a Next.js App Router site with a small Sanity CMS integration and Tailwind CSS v4. Use these notes to work productively and avoid common pitfalls.

## Big picture
- Framework: Next.js 16 (App Router) + React 19; TypeScript is strict; ESLint uses Next core-web-vitals.
- Rendering model: Server Components by default; mark interactive components with "use client".
- Data: Read-only Sanity client for homepage content, posts, and events. Queries live in `src/sanity/queries.ts` and are fetched in Server Components.
- Styling: Tailwind v4 via PostCSS plugin; no separate Tailwind config file. Global CSS in `src/app/globals.css` also defines CSS variables and a `.container` utility.
- React Compiler: enabled (`next.config.ts` has `reactCompiler: true`). Keep components pure and props serializable to benefit.

## Key files and flow
- Routing/layout: `src/app/layout.tsx` wraps pages with `Header` and `Footer` and wires fonts and global CSS.
- Home page: `src/app/page.tsx` is an async Server Component that:
  - fetches Sanity data with `client.fetch(queries.HOMEPAGE_QUERY, {}, { next: { revalidate: 30 } })`
  - renders hero, recent posts (`PostCard`), and events (`EventCard`)
- Sanity integration:
  - `src/sanity/client.ts`: `createClient({ projectId, dataset, apiVersion, useCdn })`
  - `src/sanity/queries.ts`: GROQ strings for homepage, posts index, events index, site settings
  - `src/sanity/urlFor.ts`: image URL helper. Use for `next/image` sources
- UI components:
  - Server Components by default (e.g., `Hero`, `PostCard`, `EventCard`)
  - Client Components include `Header` (menu state) and `MobileNav` (portal, escape key, body scroll lock)

## Conventions and patterns
- Paths: use `@/*` alias to import from `src` (set in `tsconfig.json`).
- Data fetching: prefer Server Components; pass only the fields needed by a child component.
- ISR: when adding data fetching, mirror the homepage pattern and set `{ next: { revalidate: N } }` as appropriate.
- Images from Sanity: build URLs with `urlFor(image).width(...).height(...).auto('format').url()` and pass to `<Image />` with a `sizes` prop.
- Client UI pattern: if using DOM APIs/portals, guard SSR with a `mounted` flag (see `MobileNav.tsx`).
- Styling: combine Tailwind utility classes with a few project-level utilities from `globals.css` (e.g., `.container`, CSS variables like `--accent`).
 - Header responsive rule: below 1185px width, use hamburger menu; at/above 1185px show desktop nav. Implemented via `.nav-desktop`/`.nav-hamburger` in `globals.css` and used in `Header.tsx`.

## Developer workflows
- Dev server: `npm run dev` (Next.js at http://localhost:3000). Hot reload is enabled.
- Build: `npm run build`, then `npm run start` for a production preview.
- Lint: `npm run lint` (ESLint 9 + `eslint-config-next`). Fix issues before committing when possible.
- Fonts: `next/font` is configured in `layout.tsx` (Geist). Fonts are applied via CSS variables.

## Adding features (examples)
- New data-driven page: create `src/app/your-page/page.tsx`, import `client` and a query (or add one to `src/sanity/queries.ts`), fetch in the Server Component with a sensible `revalidate`.
- New Sanity image: import `urlFor` and construct a URL before rendering with `next/image`.
- Interactive component: add `"use client"` at the top, use hooks normally, and follow the SSR guard/portal approach from `MobileNav` when touching `document`/`window`.

## Gotchas
- If `next/image` complains about remote images, add the Sanity CDN host to `next.config.ts` `images.remotePatterns`.
- Slug-based links exist (`PostCard`, `EventCard` link to `/${slug}`) but routes for detail pages are not implemented yet; add the corresponding app routes before relying on them.

## Reference
- App shell: `src/app/layout.tsx`
- Home route: `src/app/page.tsx`
- Components: `src/components/*`
- Sanity: `src/sanity/{client,queries,urlFor}.ts`
- Config: `package.json` (scripts), `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `src/app/globals.css`