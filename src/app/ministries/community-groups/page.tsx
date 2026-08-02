import Link from 'next/link';
import RandomHeroImage from '@/components/RandomHeroImage';
import GroupsGrid from '@/components/ministries/GroupsGrid';
import { CITY_GROUPS } from '@/lib/cityGroups';
import { GENERAL_HERO_IMAGES } from '@/lib/heroImages';
import { OG_IMAGES } from '@/lib/seo';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'City Groups',
  description:
    "City Groups at Grace on the Ashley are the ideal place to build real relationships and the church's first point of contact for care. They're also where we invite friends and neighbors who don't yet know Christ into community.",
  alternates: { canonical: '/ministries/community-groups' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'City Groups | Grace on the Ashley',
    description:
      "Build real relationships, be cared for, and invite others into community through the City Groups of Grace on the Ashley.",
    url: '/ministries/community-groups',
    images: OG_IMAGES,
  },
};

export default function CityGroupsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        <div className="absolute inset-0">
          <RandomHeroImage
            pool={GENERAL_HERO_IMAGES}
            alt="City Groups background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                City Groups
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
                The best place to build real relationships, be cared for, and invite others into the family of God.
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

      {/* Why City Groups */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8">
              Life Is Better Together
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                We gather as a church on Sundays, but we become family in City Groups &mdash; smaller groups that meet through the week in homes to share a meal, open the Bible, and pray.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-light text-black mb-4">
                Build real relationships
              </h3>
              <p className="text-gray-700 leading-relaxed">
                This is where you go from being a face in the crowd to being truly known &mdash; growing in God&apos;s Word with people who walk with you through whatever life brings.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-light text-black mb-4">
                Our first place for care
              </h3>
              <p className="text-gray-700 leading-relaxed">
                When a need arises &mdash; a hospital stay, a new baby, a loss &mdash; your group is usually first to know and first to respond. You never carry life&apos;s hardest moments alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inviting others */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-8 text-center">
              A Place to Invite Others
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                City Groups aren&apos;t just for people who already follow Jesus. A living room is often less intimidating than a Sunday service, which makes a group one of the most natural places to introduce a friend, neighbor, or coworker to the gospel. Keep an open chair &mdash; and bring someone with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Find a group */}
      <section className="py-20 bg-brand-4">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-light text-black mb-6">
              Find a City Group
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Browse our groups below and tap &ldquo;Join this group&rdquo; to connect with the leaders through Church Center.
            </p>
          </div>

          <GroupsGrid groups={CITY_GROUPS} />
        </div>
      </section>
    </main>
  );
}
