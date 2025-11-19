import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import queries from "@/sanity/queries";
import EventCard from "@/components/EventCard";
import Link from "next/link";

export default async function EventsPage() {
  const events = await client.fetch<SanityDocument[]>(queries.EVENTS_INDEX_QUERY, {}, { next: { revalidate: 30 } });

  return (
    <main className="min-h-screen bg-brand-4">
      <div className="container mx-auto max-w-4xl px-6 md:px-12 lg:px-20 py-16">
        <h1 className="text-4xl md:text-5xl font-light text-black mb-8">Events</h1>
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700">
            Stay connected with upcoming events, services, and special gatherings at Grace on the Ashley.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.length ? events.map((event) => (
            <EventCard key={event._id} event={event} />
          )) : (
            <div className="md:col-span-2 text-center py-12">
              <p className="text-lg text-gray-600">No upcoming events at this time.</p>
              <p className="text-gray-500 mt-2">Check back soon for future events and gatherings.</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-brand-2 text-slate-900 px-6 py-3 rounded-md font-semibold shadow hover:opacity-95 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}