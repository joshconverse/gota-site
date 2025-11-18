import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import queries from "@/sanity/queries";
import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import EventCard from "@/components/EventCard";
import AnnouncementCard from "@/components/AnnouncementCard";
import FlipCard from "@/components/FlipCard";

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const homepage = await client.fetch<SanityDocument | null>(queries.HOMEPAGE_QUERY, {}, options);
  const announcements = await client.fetch<SanityDocument[]>(queries.ANNOUNCEMENTS_QUERY, {}, options);

  const posts = (homepage?.recentPosts as SanityDocument[] | undefined) ?? [];
  const events = (homepage?.upcomingEvents as SanityDocument[] | undefined) ?? [];

  return (
    <main className="min-h-screen bg-brand-4">
      <Hero doc={homepage} />

      {/* Gather with us full section */}
          
      <section className="relative bg-brand-1 -mt-1 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background video */}
        <video
          src="/12579306_3840_2160_24fps.mp4"
          muted
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          aria-hidden="true"
        />
        
        {/* Content overlay */}
        <div className="relative z-10 container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20 mt-8 md:mt-0 pb-16 md:pb-0">
          <h1 className="text-lg sm:text-4xl md:text-5xl font-light text-brand-4 text-center mb-12">
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
              title="We multiply disciples"
              content="God has called the church to be kingdom-oriented. Therefore, at Grace, we aim to be a church that develops leaders, plants churches, and invests in God's larger kingdom purposes."
            />
          </div>
          
          <div className="text-center">
            <a
              href="/visit"
              className="inline-block bg-brand-2 text-slate-900 px-6 py-3 rounded-md font-semibold shadow hover:opacity-95 transition"
            >
              Visit Us
            </a>
          </div>
          
          {/* Service Times */}
          <div className="mt-12 mb-16 md:mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-brand-4 mb-6">Service Times</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <div className="text-brand-4">
                <p className="text-lg font-semibold">Sunday School</p>
                <p className="text-xl">9:30 AM</p>
              </div>
              <div className="hidden sm:block text-brand-4 text-2xl">|</div>
              <div className="text-brand-4">
                <p className="text-lg font-semibold">Main Service</p>
                <p className="text-xl">10:45 AM</p>
              </div>
            </div>
          </div>
        </div>
      </section>


  <section className="bg-brand-4 py-12">
    <div className="container mx-auto max-w-3xl px-8 md:px-12 lg:px-20">
        <h1 className="text-2xl font-light text-black mb-4">Events</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {announcements.length ? announcements.map((a) => <AnnouncementCard key={a._id} announcement={a} />) : <p>No announcements.</p>}
        </div>
      </div>
      </section>
    </main>
  );
}