"use client";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import queries from "@/sanity/queries";
import EventCard from "@/components/EventCard";
import Link from "next/link";
import { useState, useEffect } from 'react';

export default function EventsPage() {
  const [events, setEvents] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await client.fetch<SanityDocument[]>(queries.EVENTS_INDEX_QUERY, {}, { next: { revalidate: 30 } });
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const eventTypes = [
    {
      question: "Worship Services",
      answer: "Join us for our regular Sunday morning worship services featuring expository preaching, congregational singing, and fellowship. Services include Sunday School at 9:30 AM and main service at 10:45 AM."
    },
    {
      question: "Special Events",
      answer: "Throughout the year, we host special events including baptisms, baby dedications, guest speakers, and seasonal celebrations that bring our community together in worship and fellowship."
    },
    {
      question: "Community Outreach",
      answer: "Participate in community service events, mission trips, and outreach programs designed to serve our neighbors and share the love of Christ with those in need."
    },
    {
      question: "Fellowship Gatherings",
      answer: "Connect with fellow believers through potlucks, small group meetings, prayer gatherings, and other fellowship opportunities that strengthen our church family."
    }
  ];

  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? [] : [index]
    );
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        {/* Background Image with Tint */}
        <div className="absolute inset-0">
          <img
            src="/WorshipEdited.jpg"
            alt="Community events background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left column: Heading */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                  Events
                </h1>
              </div>

              {/* Right column: Subtitle and buttons */}
              <div className="text-center lg:text-left">
                <p className="text-xl md:text-2xl text-white mb-6">
                  Stay connected with upcoming events, services, and special gatherings at Grace on the Ashley.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="#upcoming-events"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    Upcoming Events
                  </Link>
                  <Link
                    href="/visit"
                    className="inline-block bg-white text-black px-8 py-4 rounded-md font-semibold shadow hover:opacity-95 transition text-lg border border-gray-200"
                  >
                    Service Times
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="upcoming-events" className="min-h-screen flex items-center py-16" style={{ backgroundColor: '#F0F0F0' }}>
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
              Upcoming Events
            </h2>

            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {loading ? (
                <div className="md:col-span-2 text-center py-12">
                  <p className="text-lg text-gray-600">Loading events...</p>
                </div>
              ) : events.length ? events.map((event) => (
                <EventCard key={event._id} event={event} />
              )) : (
                <div className="md:col-span-2 text-center py-12">
                  <p className="text-lg text-gray-600">No upcoming events at this time.</p>
                  <p className="text-gray-500 mt-2">Check back soon for future events and gatherings.</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Event Types FAQ Section */}
              <div className="space-y-6 h-[700px] overflow-hidden lg:border-r lg:border-gray-300 lg:pr-8">
                {eventTypes.map((item, index) => (
                  <div key={index} className="overflow-hidden">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-0 py-6 text-left flex justify-between items-center transition-colors group"
                    >
                      <h3 className="text-xl font-light text-black pr-4 transition-colors">
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-4 flex items-center justify-center">
                        <svg
                          className={`w-6 h-6 text-brand-1 transition-transform duration-200 ${openItems.includes(index) ? 'rotate-180' : ''}`}
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.5303 20.8839C16.2374 21.1768 15.7626 21.1768 15.4697 20.8839L7.82318 13.2374C7.53029 12.9445 7.53029 12.4697 7.82318 12.1768L8.17674 11.8232C8.46963 11.5303 8.9445 11.5303 9.2374 11.8232L16 18.5858L22.7626 11.8232C23.0555 11.5303 23.5303 11.5303 23.8232 11.8232L24.1768 12.1768C24.4697 12.4697 24.4697 12.9445 24.1768 13.2374L16.5303 20.8839Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-out ${openItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-0 pb-6">
                        <p className="text-gray-600 leading-relaxed text-left">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mission Section */}
              <div className="hidden lg:block">
                <div className="space-y-8">
                  <div className="text-left">
                    <h3 className="text-2xl md:text-3xl font-light text-black mb-6">
                      We exist to make, mature<br />
                      and multiply disciples of Jesus
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <h4 className="text-xl font-semibold text-black mb-3 text-left">Regular Services</h4>
                      <div className="text-gray-600 leading-relaxed text-left">
                        <p className="mb-2"><strong>Sunday School:</strong> 9:30 AM</p>
                        <p><strong>Main Service:</strong> 10:45 AM</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-black mb-3 text-left">Stay Connected</h4>
                      <p className="text-gray-600 leading-relaxed text-left mb-4">
                        Follow us for updates on upcoming events and special gatherings throughout the year.
                      </p>
                      <Link
                        href="/"
                        className="inline-block bg-brand-2 text-slate-900 px-6 py-3 rounded-md font-semibold shadow hover:opacity-95 transition"
                      >
                        Back to Home
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}