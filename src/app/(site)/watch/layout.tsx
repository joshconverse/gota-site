import { OG_IMAGES } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch",
  description:
    "Watch sermons and worship from Grace on the Ashley. Browse our sermon library and catch up on recent messages from our Baptist church in Charleston, SC.",
  alternates: { canonical: "/watch" },
  openGraph: {
    title: "Watch | Grace on the Ashley",
    description:
      "Sermons and worship from Grace on the Ashley in Charleston, SC.",
    url: "/watch",
    images: OG_IMAGES,
  },
};

export default function WatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
