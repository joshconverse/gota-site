import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

// Public marketing pages share the site chrome. Sanity Studio (at /sanity) is a
// full-screen admin tool and deliberately sits OUTSIDE this route group so it
// renders without a Header/Footer.
//
// This grouping replaces an earlier approach where the root layout read the
// request path (via middleware -> `x-pathname` -> `headers()`) to decide whether
// to hide the chrome. Calling `headers()` in the root layout is a dynamic API,
// which opted *every* route on the site out of static generation and forced a
// server render — and a Fluid Active CPU charge — on every request, including
// for pages that are entirely static.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <CookieBanner />
    </>
  );
}
