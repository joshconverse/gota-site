import { OG_IMAGES } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Ministries",
    template: "%s | Grace on the Ashley",
  },
  description:
    "Explore the ministries of Grace on the Ashley, from Grace Kids and Student Ministry to Community Groups, Worship, and local and international missions. Find a place to belong and serve.",
  alternates: { canonical: "/ministries" },
  openGraph: {
    title: "Ministries | Grace on the Ashley",
    description:
      "Find a place to belong and serve across the ministries of Grace on the Ashley in Charleston, SC.",
    url: "/ministries",
    images: OG_IMAGES,
  },
};

export default function MinistriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
