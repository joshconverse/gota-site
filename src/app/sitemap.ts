import type { MetadataRoute } from "next";
import { SITE_URL as BASE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const topLevel: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/watch", changeFrequency: "weekly", priority: 0.9 },
    { path: "/ministries", changeFrequency: "monthly", priority: 0.8 },
    { path: "/next-steps", changeFrequency: "monthly", priority: 0.8 },
  ];

  const ministrySlugs = [
    "children",
    "students",
    "faith-and-practice",
    "married",
  ];

  const ministries: typeof topLevel = ministrySlugs.map((slug) => ({
    path: `/ministries/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...topLevel, ...ministries].map(
    ({ path, changeFrequency, priority }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );
}
