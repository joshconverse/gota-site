import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn what Grace on the Ashley believes and meet our leadership. We are a Baptist church in Charleston, SC that exists to make, mature and mobilize disciples of Jesus.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Grace on the Ashley",
    description:
      "Our beliefs and leadership at Grace on the Ashley, a Baptist church in Charleston, SC.",
    url: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
