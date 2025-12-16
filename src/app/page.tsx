import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import queries from "@/sanity/queries";
import Image from "next/image";
import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import EventCard from "@/components/EventCard";
import AnnouncementCard from "@/components/AnnouncementCard";
import FlipCard from "@/components/FlipCard";
import { getLatestYouTubeStream } from "@/utils/youtube";
import MissionBackground from "@/components/MissionBackground";

const options = { next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 30 } };

export default async function IndexPage() {
  const homepage = await client.fetch<SanityDocument | null>(queries.HOMEPAGE_QUERY, {}, options);
  const announcements = await client.fetch<SanityDocument[]>(queries.ANNOUNCEMENTS_QUERY, {}, options);
  const latestStream = await getLatestYouTubeStream();

  const posts = (homepage?.recentPosts as SanityDocument[] | undefined) ?? [];
  const events = (homepage?.upcomingEvents as SanityDocument[] | undefined) ?? [];

  return (
    <main className="min-h-screen bg-brand-4">

      <Hero doc={homepage} thumbnailUrl={latestStream?.thumbnailUrl} streamTitle={latestStream?.title} streamUrl={latestStream?.videoUrl} />

      {/* Gather with us section */}
      <section className="relative bg-brand-1 -mt-1 min-h-[60vh] flex items-center justify-center overflow-hidden">
      
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#96A78D]/40" />
        
        {/* Content overlay */}
        <div className="relative z-10 container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20 mt-8 md:mt-0 pb-16 md:pb-0">
          {/* Service Times and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Service Times */}
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-light text-brand-4 mb-6">Service Times</h2>
              <div className="bg-brand-4/10 rounded-lg p-6 border border-brand-4/20 min-h-[200px] flex flex-col justify-center">
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="text-brand-4 text-center">
                    <div className="flex justify-center mb-2">
                      <svg className="w-6 h-6 text-brand-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 16,14"></polyline>
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">Sunday School</p>
                    <p className="text-xl">9:30 AM</p>
                  </div>
                  <div className="text-brand-4 text-center">
                    <p className="text-lg font-semibold">Main Service</p>
                    <p className="text-xl">10:45 AM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location */}
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-light text-brand-4 mb-6">Location</h2>
              <div className="bg-brand-4/10 rounded-lg p-6 border border-brand-4/20 min-h-[200px] flex flex-col justify-center">
                <div className="flex justify-center mb-4">
                  <svg className="w-8 h-8 text-brand-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=2025+BEES+FERRY+ROAD+CHARLESTON+SC+29414"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-brand-4 font-medium hover:underline block"
                >
                  2025 BEES FERRY ROAD<br />
                  CHARLESTON, SC 29414
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section className="relative bg-brand-1 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image from latest YouTube stream or fallback */}
        <MissionBackground />

        {/* Content overlay */}
        <div className="relative z-10 container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <h1 className="text-sm sm:text-4xl md:text-5xl font-light text-brand-4 text-center mb-12">
            We exist to make, mature<br />and multiply disciples of Jesus
          </h1>
          
          {/* Three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
            <FlipCard
              title="We make disciples"
              content="At Grace, we aim to live as sent people for purposes of reaching those without the hope of the Gospel. The Great Commission is a central feature of our vision and mission as a local church."
            />
            <FlipCard
              title="We mature disciples"
              content="As a church, we believe in the importance of maturing disciples in their knowledge and practice of Scripture. We take seriously the truths of God's Word and aim to equip believers to vigorously live out a robust Christian faith."
            />
            <FlipCard
              title="We mobilize disciples"
              content="God has called the church to be kingdom-oriented. Therefore, at Grace, we aim to be a church that develops leaders, plants churches, and invests in God's larger kingdom purposes."
            />
          </div>
          
          <div className="text-center mb-8 md:mb-4">
            <a
              href="/visit"
              className="inline-block bg-brand-2 text-slate-900 px-6 py-3 rounded-md font-semibold shadow hover:opacity-95 transition"
            >
              Visit Us
            </a>
          </div>
        </div>
      </section>


  <section className="bg-brand-4 min-h-screen flex items-center justify-center">
    <div className="container mx-auto max-w-3xl px-8 md:px-12 lg:px-20">
        <h1 className="text-2xl font-light text-black mb-4">Get plugged in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {announcements.length ? announcements.map((a) => <AnnouncementCard key={a._id} announcement={a} />) : <p>No announcements.</p>}
        </div>
      </div>
      </section>
    </main>
  );
}