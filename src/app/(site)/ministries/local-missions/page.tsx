import Link from 'next/link';
import RandomHeroImage from '@/components/RandomHeroImage';
import { GENERAL_HERO_IMAGES } from '@/lib/heroImages';
import { OG_IMAGES } from '@/lib/seo';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Local Missions',
  description:
    'Local Missions at Grace on the Ashley shares the love of Christ with our Lowcountry neighbors through service and partnerships that meet real needs — including CarePortal, which connects us with local children and families in crisis.',
  alternates: { canonical: '/ministries/local-missions' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Local Missions | Grace on the Ashley',
    description: 'Serving our Lowcountry neighbors and caring for local children and families in crisis through CarePortal.',
    url: '/ministries/local-missions',
    images: OG_IMAGES,
  },
};

export default function LocalMissionsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        <div className="absolute inset-0">
          <RandomHeroImage
            pool={GENERAL_HERO_IMAGES}
            alt="Local Missions background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                Local Missions
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
                Sharing the love of Christ with our Lowcountry neighbors &mdash; meeting real needs through partnerships like CarePortal.
              </p>
              <Link
                href="/ministries"
                className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
              >
                Back to Ministries
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Loving our city */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
              On Mission Where We Live
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                The mission field isn&apos;t only overseas &mdash; it&apos;s our own street, school, and city. We&apos;re committed to being good news across the Lowcountry, meeting real needs and building relationships that open the door to the gospel. One of the clearest ways we do that is our partnership with CarePortal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CarePortal */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8 text-center">
              Our Partnership with CarePortal
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                <a
                  href="https://www.careportal.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-1 font-semibold underline hover:opacity-80"
                >
                  CarePortal
                </a>{' '}
                connects the real, urgent needs of local children and families directly to churches. When a caseworker or agency identifies a need &mdash; a bed for a child, groceries, safe housing, help keeping siblings together &mdash; it&apos;s sent to churches nearby who are ready to respond.
              </p>
              <p>
                As a connected church, we step in &mdash; providing an item, giving financially, or showing up in person for a family in crisis. Every response keeps children safe and shows the love of Jesus in a real moment of need.
              </p>
            </div>

            <div className="mt-10 bg-brand-4 rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-light text-black mb-4">Want to help meet a need?</h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                Learn how CarePortal serves local families, or reach out to get involved with our Local Missions team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.careportal.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition"
                >
                  Learn about CarePortal
                </a>
                <a
                  href="mailto:office@gotachurch.org"
                  className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition border border-gray-200"
                >
                  Get involved
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
