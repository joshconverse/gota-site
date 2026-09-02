import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Lives at the app root (not inside the `(site)` group) because Next only uses
// `app/not-found.tsx` for unmatched URLs, and the root layout no longer renders
// the site chrome — so pull in Header/Footer explicitly to keep 404s looking
// like the rest of the site.
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-brand-4 flex items-center justify-center py-20">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20 text-center">
          <p className="text-brand-1 font-semibold text-lg mb-4">404</p>
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
            We couldn&apos;t find that page
          </h1>
          <p className="text-slate-700 text-lg mb-10 max-w-xl mx-auto">
            The page you&apos;re looking for may have moved or no longer exists.
          </p>
          <Link
            href="/"
            className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
