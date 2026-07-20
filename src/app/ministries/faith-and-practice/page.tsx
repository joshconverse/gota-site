import Link from 'next/link';
import RandomHeroImage from '@/components/RandomHeroImage';
import { GENERAL_HERO_IMAGES } from '@/lib/heroImages';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Faith & Practice',
  description: 'Faith & Practice is a weekly Sunday school class at Grace on the Ashley where we grow together in the Christian faith and learn how to live it out.',
  alternates: { canonical: '/ministries/faith-and-practice' },
  openGraph: {
    title: 'Faith & Practice | Grace on the Ashley',
    description: 'A weekly Sunday school class where we grow together in the Christian faith and learn to live it out.',
    url: '/ministries/faith-and-practice',
  },
};

export default function FaithAndPracticePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        <div className="absolute inset-0">
          <RandomHeroImage
            pool={GENERAL_HERO_IMAGES}
            alt="Faith & Practice background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                Faith &amp; Practice
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
                A weekly Sunday school class where we grow together in the Christian faith and learn how to live it out.
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

      {/* About Faith & Practice */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
              About Faith &amp; Practice
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Faith &amp; Practice is a weekly Sunday school class centered on growing together in the Christian faith and learning how to live it out day by day. We gather to open the Scriptures, encourage one another, and consider how the truths we believe shape the way we live.
              </p>
              <p>
                Whether you have followed Jesus for many years or are just beginning to explore the faith, you are welcome to join us. Come as you are, bring your questions, and grow alongside others who want to know God more deeply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When We Meet */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-5xl font-light text-black mb-12 text-center">
            When We Meet
          </h2>
          <div className="max-w-md mx-auto">
            <div className="bg-brand-4 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-light text-black mb-4">Sundays</h3>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-black">9:30 am</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
