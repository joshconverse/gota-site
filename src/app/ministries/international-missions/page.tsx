import Link from 'next/link';
import RandomHeroImage from '@/components/RandomHeroImage';
import { GENERAL_HERO_IMAGES } from '@/lib/heroImages';
import { OG_IMAGES } from '@/lib/seo';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'International Missions',
  description:
    'International Missions at Grace on the Ashley partners with the International Mission Board (IMB) to send and support missionaries making disciples and multiplying churches among the unreached worldwide.',
  alternates: { canonical: '/ministries/international-missions' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'International Missions | Grace on the Ashley',
    description: 'Partnering with the International Mission Board to take the Gospel to the nations.',
    url: '/ministries/international-missions',
    images: OG_IMAGES,
  },
};

export default function InternationalMissionsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        <div className="absolute inset-0">
          <RandomHeroImage
            pool={GENERAL_HERO_IMAGES}
            alt="International Missions background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                International Missions
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
                Taking the Gospel to the nations, partnering with the International Mission Board to reach unreached peoples around the world.
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

      {/* Heart for the nations */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
              A Heart for the Nations
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Jesus sent His church to make disciples of all nations, yet much of the world still has little or no access to the Gospel. We&apos;re committed to being a sending church &mdash; praying, giving, and going &mdash; and our primary partner in that work is the International Mission Board.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMB partnership */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8 text-center">
              Our Partnership with the IMB
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                The{' '}
                <a
                  href="https://www.imb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-1 font-semibold underline hover:opacity-80"
                >
                  International Mission Board (IMB)
                </a>{' '}
                helps churches like ours take the Gospel to the ends of the earth. For over 175 years it has sent and cared for missionaries who live among unreached peoples &mdash; learning their languages, sharing the good news of Jesus, and planting churches that keep multiplying.
              </p>
              <p>
                Through this partnership, we support IMB missionaries with prayer and giving and stay connected to what God is doing among the nations &mdash; a hand in reaching people we may never meet, until believers from every tribe and tongue worship together.
              </p>
            </div>

            <div className="mt-10 bg-brand-4 rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-light text-black mb-4">Explore the work of the IMB</h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                See where IMB missionaries serve, read stories from among the nations, and find ways to pray and give.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.imb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition"
                >
                  Visit the IMB
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
