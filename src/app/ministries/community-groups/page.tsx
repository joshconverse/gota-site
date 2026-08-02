import Link from 'next/link';
import RandomHeroImage from '@/components/RandomHeroImage';
import GroupsGrid from '@/components/ministries/GroupsGrid';
import { GENERAL_HERO_IMAGES } from '@/lib/heroImages';
import { OG_IMAGES } from '@/lib/seo';
import getPlanningCenterGroups from '@/utils/planningcenterGroups';

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

// Regenerate periodically so the Planning Center group list stays reasonably
// fresh without making the page fully dynamic.
export const revalidate = 1800; // 30 minutes

export default async function CityGroupsPage() {
  // Fetch published groups from Planning Center; fall back to an empty list
  // (which renders a "browse in Church Center" CTA) if it's unavailable or
  // credentials aren't configured in this environment.
  const groups = (await getPlanningCenterGroups({ perPage: 100 }).catch(() => null)) ?? [];

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
                City Groups are the ideal place to build real relationships and our church&apos;s first point of contact for care. They&apos;re also where we invite friends and neighbors who don&apos;t yet know Christ into community.
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
                On Sunday mornings we gather as one church family, but it&apos;s in City Groups that we truly come to know one another. These smaller groups meet throughout the week in homes across the Lowcountry to share a meal, open the Scriptures, pray, and do everyday life together. It&apos;s where the person next to you on Sunday becomes a friend who knows your name, your story, and your needs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-black mb-4">
                The ideal place to build relationships
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We were never meant to follow Jesus alone. City Groups are the best place at Grace on the Ashley to move from being a face in the crowd to being deeply known. Around the same table week after week, you&apos;ll grow in the Word alongside people who encourage you, challenge you, celebrate with you, and walk with you through whatever life brings. Real relationships take time and consistency &mdash; a City Group gives you both.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-black mb-4">
                Our first point of contact for care
              </h3>
              <p className="text-gray-700 leading-relaxed">
                When a member faces a hospital stay, a new baby, a job loss, or a season of grief, their City Group is usually the first to know and the first to respond. This is by design. Your group is the front line of care at Grace on the Ashley &mdash; the people bringing meals, praying over you, and standing with you long before a need ever reaches the church office. Being part of a group means you never have to carry life&apos;s hardest moments by yourself.
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
                City Groups aren&apos;t just for people who already follow Jesus. For many, a living room feels far more approachable than a Sunday service &mdash; and that makes a group one of the most natural places to introduce someone to the gospel and to the family of God.
              </p>
              <p>
                We want every group to keep an open chair. Invite the neighbor you&apos;ve been getting to know, the coworker asking questions about faith, or the friend who wouldn&apos;t set foot in a church building but would happily come to dinner. As they&apos;re welcomed, cared for, and included in honest conversation, many people encounter the love of Christ in a group long before they ever call the church home. Inviting the unbeliever isn&apos;t a program &mdash; it&apos;s simply what happens when a community shaped by grace makes room for one more.
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
              Browse our current groups below. When you find one that fits, tap
              &ldquo;Join this group&rdquo; to connect with the leaders and request to
              join through the Church Center app.
            </p>
          </div>

          <GroupsGrid groups={groups} />
        </div>
      </section>
    </main>
  );
}
