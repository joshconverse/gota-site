import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-[900px] px-6 md:px-12 lg:px-20">
          <h1 className="text-4xl md:text-5xl font-light text-black mb-4">
            Privacy &amp; Cookies
          </h1>
          <p className="text-sm text-slate-600 mb-10">Last updated: July 2026</p>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Grace on the Ashley (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects
              your privacy. This page explains what information our website
              collects, the cookies we use, and the choices you have.
            </p>

            <h2 className="text-2xl md:text-3xl font-light text-black pt-6">
              What are cookies?
            </h2>
            <p>
              Cookies are small text files that a website stores in your browser.
              They are widely used to make websites work, to remember your
              preferences, and to help site owners understand how their site is
              used.
            </p>

            <h2 className="text-2xl md:text-3xl font-light text-black pt-6">
              Cookies we use
            </h2>
            <p>
              <strong>Google Analytics.</strong> We use Google Analytics to
              understand how visitors find and use our site &mdash; for example,
              which pages are most visited &mdash; so we can improve it. Google
              Analytics sets cookies (such as <code>_ga</code>) that collect
              information in an anonymized, aggregated form, including your
              approximate location, device and browser type, and the pages you
              view. We do not use this information to personally identify you.
              You can read how Google uses this data at{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brand-1 transition-colors"
              >
                policies.google.com/technologies/partner-sites
              </a>
              .
            </p>
            <p>
              <strong>Giving &amp; sign-ups (Planning Center / Church Center).</strong>{" "}
              When you give or register through our Church Center giving links and
              modal, that service is provided by Planning Center. If you open or
              use it, Planning Center may set its own cookies to operate its
              tools. Your use of Church Center is subject to Planning Center&apos;s
              own privacy policy at{" "}
              <a
                href="https://www.planningcenter.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brand-1 transition-colors"
              >
                planningcenter.com/privacy
              </a>
              .
            </p>

            <h2 className="text-2xl md:text-3xl font-light text-black pt-6">
              Your choices
            </h2>
            <p>
              You can accept or refuse cookies through your browser settings, and
              most browsers let you delete cookies that have already been stored.
              To opt out of Google Analytics across all websites, you can install
              Google&apos;s{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brand-1 transition-colors"
              >
                Analytics Opt-out Browser Add-on
              </a>
              . Blocking cookies may affect how some parts of the site work.
            </p>

            <h2 className="text-2xl md:text-3xl font-light text-black pt-6">
              Contact us
            </h2>
            <p>
              If you have questions about this notice or how we handle your
              information, contact us at{" "}
              <a
                href="mailto:office@gotachurch.org"
                className="underline hover:text-brand-1 transition-colors"
              >
                office@gotachurch.org
              </a>{" "}
              or 2025 Bees Ferry Road, Charleston, SC 29414.
            </p>

            <p className="pt-6">
              <Link
                href="/"
                className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition"
              >
                Back to Home
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
