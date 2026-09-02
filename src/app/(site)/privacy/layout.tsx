import { OG_IMAGES } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Cookies",
  description:
    "How Grace on the Ashley uses cookies and analytics on our website, and how you can control them.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy & Cookies | Grace on the Ashley",
    description:
      "How Grace on the Ashley uses cookies and analytics on our website, and how you can control them.",
    url: "/privacy",
    images: OG_IMAGES,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
