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
                Sharing the love of Christ with our Lowcountry neighbors through service, generosity, and partnerships that meet real needs &mdash; including CarePortal, which connects us with local children and families in crisis.
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
                The mission field isn&apos;t only overseas &mdash; it&apos;s our own street, school, and city. Grace on the Ashley is committed to being good news to Charleston and the surrounding Lowcountry, meeting practical needs and building relationships that open the door to the gospel. One of the most tangible ways we do that is through our partnership with CarePortal.
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
                is a care-sharing platform that connects the real, urgent needs of vulnerable children and families directly to local churches. When a caseworker, social worker, or agency in our area identifies a need &mdash; a bed for a child, groceries for a struggling family, safe housing, or help keeping siblings together &mdash; that need is entered into CarePortal and sent straight to churches nearby who are ready to respond.
              </p>
              <p>
                As a connected church, Grace on the Ashley receives those requests and steps in to help. Sometimes that means providing a physical item, sometimes it means giving financially, and often it means showing up in person to walk alongside a family in crisis. Every response is a chance to strengthen families, keep children safe, and demonstrate the love of Jesus in a moment of genuine need.
              </p>
              <p>
                It&apos;s a simple but powerful picture of the local church doing what it was made to do &mdash; loving our neighbors right where they are.
              </p>
            </div>

            <div className="mt-10 bg-brand-4 rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-black mb-4">Want to help meet a need?</h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                Learn more about how CarePortal serves local children and families, or reach out to get involved with our Local Missions team.
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
