import Link from 'next/link';
import RandomHeroImage from '@/components/RandomHeroImage';
import { KID_TEEN_HERO_IMAGES } from '@/lib/heroImages';
import { OG_IMAGES } from '@/lib/seo';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Ministry',
  description: 'Grace on the Ashley Student Ministry invites students in grades 6-12 to a life of faith in Jesus Christ through Sunday and Wednesday gatherings in Charleston, SC.',
  alternates: { canonical: '/ministries/students' },
  openGraph: {
    title: 'Student Ministry | Grace on the Ashley',
    description: 'Inviting students in grades 6-12 to a life of faith in Jesus Christ.',
    url: '/ministries/students',
    images: OG_IMAGES,
  },
};

export default function StudentMinistryPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        <div className="absolute inset-0">
          <RandomHeroImage
            pool={KID_TEEN_HERO_IMAGES}
            alt="Student Ministry background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                Student Ministry
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
                Inviting students to a life of faith in Jesus Christ
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

      {/* About Student Ministry */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
              About Student Ministry
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Today&apos;s youth are tomorrow&apos;s church. At Grace, our goal is to disciple the next generation of believers toward confident faith in Christ. We prioritize teaching Scripture, gathering with the church, cultivating biblical literacy and a Christian worldview, and fostering meaningful friendships. We also like to have fun!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ages Served */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-5xl font-light text-black mb-12 text-center">
            Ages Served
          </h2>
          <div className="max-w-md mx-auto">
            <div className="bg-brand-4 rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-light text-black mb-2">Grades 6&ndash;12</h3>
              <p className="text-sm font-semibold text-brand-1">Middle &amp; High School</p>
            </div>
          </div>
        </div>
      </section>

      {/* When We Meet */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-5xl font-light text-black mb-12 text-center">
            When We Meet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-light text-black mb-4">Sundays</h3>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-black">9:30 am</span>
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-light text-black mb-4">1st &amp; 3rd Wednesdays</h3>
              <ul className="space-y-2 text-gray-700 leading-relaxed">
                <li>
                  <span className="font-semibold text-black">5:30 pm</span> &mdash; Dinner
                </li>
                <li>
                  <span className="font-semibold text-black">6:30 pm</span> &mdash; Discipleship &amp; Games
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-700 leading-relaxed mt-8">
            We meet in the <span className="font-semibold text-black">Library</span>.
          </p>
        </div>
      </section>

      {/* Ministry Leaders */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6">
              Ministry Leaders
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Ben &amp; Audrey Yadon
            </p>
            <a
              href="mailto:students@gotachurch.org"
              className="inline-block bg-brand-2 text-slate-900 px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition"
            >
              students@gotachurch.org
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
