import type { Metadata, Viewport } from "next";
import Script from 'next/script';
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME, OG_IMAGE, OG_IMAGES } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_DESCRIPTION =
  "Grace on the Ashley is a Baptist church in Charleston, SC that exists to make, mature and mobilize disciples of Jesus. Join us Sundays for Sunday School at 9:30 AM and our Main Service at 10:45 AM.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  publisher: SITE_NAME,
  keywords: [
    "Grace on the Ashley",
    "Baptist church",
    "Charleston SC church",
    "West Ashley church",
    "church near me",
    "Sunday service",
    "disciples of Jesus",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: "en_US",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const churchJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: SITE_NAME,
  description:
    "A Baptist church in Charleston, SC that exists to make, mature and mobilize disciples of Jesus.",
  url: SITE_URL,
  logo: `${SITE_URL}/GOTAblack.png`,
  image: `${SITE_URL}${OG_IMAGE}`,
  telephone: "+1-843-556-6802",
  email: "office@gotachurch.org",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2025 Bees Ferry Road",
    addressLocality: "Charleston",
    addressRegion: "SC",
    postalCode: "29414",
    addressCountry: "US",
  },
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=Grace+on+the+Ashley+2025+Bees+Ferry+Road+Charleston+SC+29414",
  sameAs: [
    "https://www.facebook.com/graceontheashley.org/",
    "https://www.instagram.com/graceontheashley/",
    "https://www.youtube.com/@GraceontheashleyOrg",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "09:30",
      closes: "12:00",
      description: "Sunday School 9:30 AM, Main Service 10:45 AM",
    },
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  // Sanity Studio (embedded at /sanity) is a full-screen admin tool, not part
  // of the public site chrome — skip the marketing Header/Footer there.
  const isStudio = (headersList.get("x-pathname") ?? "").startsWith("/sanity");

  return (
    <html lang="en">
      <head>
        {/* Structured data: Church / PlaceOfWorship for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }}
        />
        {/* Load Church Center modal script after hydration so it doesn't block SSR */}
        <Script src="https://js.churchcenter.com/modal/v1" strategy="afterInteractive" />
        {/* Google Analytics - load library and init after hydration */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-YH4F5MJV83" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-YH4F5MJV83');`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!isStudio && <Header />}
        {children}
        {!isStudio && <Footer />}
      </body>
    </html>
  );
}
