import type { Metadata } from "next";

// Canonical production host. The apex domain redirects here, so metadata,
// canonical URLs, robots, and the sitemap all point at the www host.
export const SITE_URL = "https://www.graceontheashley.org";
export const SITE_NAME = "Grace on the Ashley";

// Shared Open Graph / Twitter preview image (the branded logo card). Every
// route that defines its own `openGraph` must re-declare `images` — Next.js
// does not inherit the root `openGraph.images` once a route overrides
// `openGraph` — so pages import this instead of duplicating the literal.
export const OG_IMAGE = "/og-image.png";

export const OG_IMAGES: NonNullable<
  NonNullable<Metadata["openGraph"]>["images"]
> = [
  {
    url: OG_IMAGE,
    width: 1200,
    height: 630,
    alt: SITE_NAME,
  },
];
