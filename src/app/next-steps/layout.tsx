import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Steps",
  description:
    "New to Grace on the Ashley? Discover your next steps to get connected, grow in faith, and belong at our Baptist church in Charleston, SC.",
  alternates: { canonical: "/next-steps" },
  openGraph: {
    title: "Next Steps | Grace on the Ashley",
    description:
      "Take your next step to get connected at Grace on the Ashley in Charleston, SC.",
    url: "/next-steps",
  },
};

export default function NextStepsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
