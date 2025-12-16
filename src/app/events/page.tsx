"use client";
// Sanity events removed: using Planning Center events via server proxy
import Link from "next/link";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { PCEvent, PCEventTime } from '@/utils/planningcenter';
import { formatEventRange, formatDateTime } from '@/utils/dates';
import type { EventFormatOpts } from '@/utils/dates';

export default function EventsPage() {
  // NOTE: Sanity-backed events were intentionally removed here.
  // This page now sources events from Planning Center via `/api/planning-center/events`.
  // Use `.env.local` to provide `PLANNING_CENTER_PAT` or client credentials for local testing.
  const [pcoEvents, setPcoEvents] = useState<PCEvent[] | null>(null);
  const [pcoLoading, setPcoLoading] = useState(true);
  const [pcoError, setPcoError] = useState<string | null>(null);
  const [pcoErrorStatus, setPcoErrorStatus] = useState<number | null>(null);

  useEffect(() => {
    // fetch planning center events from server-side proxy (if configured)
    const fetchPco = async () => {
      // Helper to retry server errors a few times (dev HMR can cause transient 500s)
      const fetchWithRetry = async (url: string, retries = 2, backoff = 300) => {
        for (let attempt = 0; attempt <= retries; attempt++) {
          try {
            if (process.env.NODE_ENV !== 'production' && attempt > 0) console.debug('[EventsPage] retry attempt', attempt, url);
            const res = await fetch(url);
            if (res.ok) return res;
            // Retry on server errors (5xx)
            if (res.status >= 500 && attempt < retries) {
              await new Promise((r) => setTimeout(r, backoff * (attempt + 1)));
              continue;
            }
            return res;
          } catch (err) {
            if (attempt < retries) {
              await new Promise((r) => setTimeout(r, backoff * (attempt + 1)));
              continue;
            }
            throw err;
          }
        }
        throw new Error('Failed to fetch after retries');
      };

      try {
        const res = await fetchWithRetry('/api/planning-center/events');
  const json = (await res.json().catch(() => null)) as Record<string, unknown> | null;
          if (!res.ok) {
          // Surface server-provided error details when available, including
          // small env hints and stack traces in development.
          const errBody = (json && (json.body ?? json.error)) ?? 'Planning Center request failed';
          const envHint = json?.env ? ` env:${JSON.stringify(json.env)}` : '';
          const stack = json?.stack ? ` Stack: ${Array.isArray(json.stack) ? (json.stack as string[]).slice(0, 5).join(' | ') : String(json.stack)}` : '';
          setPcoError(`${res.status}: ${errBody}${envHint}${stack}`);
          setPcoErrorStatus(res.status);
          setPcoEvents(null);
        } else {
          const eventsVal = json?.events;
          const evs: PCEvent[] = Array.isArray(eventsVal) ? (eventsVal as unknown as PCEvent[]) : [];

          // Client-side filtering: remove events that contain prohibited keywords
          // ("election(s)" or "vertical") in the title or description.
          const forbiddenRegex = /\b(?:election|elections|rehearsal|rehearsals|vertical)\b/i;
          const filtered = evs.filter((ev) => {
            const title = (ev.title ?? '') as string;
            const desc = (ev.description ?? '') as string;
            return !forbiddenRegex.test(`${title} ${desc}`);
          });

          if (process.env.NODE_ENV !== 'production' && filtered.length !== evs.length) {
            console.debug('[EventsPage] filtered Planning Center events', { total: evs.length, shown: filtered.length });
          }

          // Sort by upcoming date (events with no date go last)
          filtered.sort((a, b) => {
            const at = a.startsAt ? new Date(a.startsAt).getTime() : Number.POSITIVE_INFINITY;
            const bt = b.startsAt ? new Date(b.startsAt).getTime() : Number.POSITIVE_INFINITY;
            return at - bt;
          });

          setPcoEvents(filtered);
        }
      } catch (err) {
        console.error('Error fetching PCO events:', err);
        setPcoError(String(err));
        setPcoEvents(null);
      } finally {
        setPcoLoading(false);
      }
    };

    void fetchPco();
  }, []);

  // Use shared formatting util to display start/end times nicely

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
      <section className="relative h-screen flex items-center" style={{ backgroundColor: '#B6CEB4' }}>
        {/* Background Image with Tint */}
        <div className="absolute inset-0">
          <img
            src="/WorshipEdited.jpg"
            alt="Community events background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
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

            {/* Event list (Planning Center) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {pcoLoading ? (
                <div className="md:col-span-2 text-center py-12">
                  <p className="text-lg text-gray-600">Checking external calendar...</p>
                </div>
              ) : pcoError ? (
                <div className="md:col-span-2 text-center py-12">
                      <p className="text-lg text-red-600">Planning Center error: {pcoError}</p>
                      {pcoErrorStatus && pcoErrorStatus >= 500 ? (
                        <p className="text-sm text-gray-500 mt-2">It looks like our external calendar service is temporarily unavailable. Try again in a few minutes. If this persists, contact Planning Center support.</p>
                      ) : null}
                  <p className="text-sm text-gray-500 mt-2">Check `.env.local` and your PAT or client credentials.</p>
                </div>
              ) : pcoEvents && pcoEvents.length ? (
                pcoEvents.map((evt) => (
                  <div key={evt.id} className="border-b border-gray-200 py-6 first:pt-0 last:border-b-0">
                    <div className="flex gap-4">
                      {evt.image ? (
                        <div className="w-48 relative flex-shrink-0 aspect-video bg-gray-100">
                          <Image src={evt.image} alt={evt.title ?? 'Event image'} fill className="object-contain rounded" sizes="(max-width: 640px) 100vw, 192px" />
                        </div>
                      ) : null}

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-black">{evt.title}</h3>
                        {evt.description ? <p className="text-sm text-gray-700 mt-2">{evt.description}</p> : null}
                      {(() => {
                        // Prefer next instance start, then explicit starts/ends,
                        // then any single instance, then fall back to raw attr dates
                        if (evt.nextInstanceStartsAt) {
                          // If we have instances, prefer to show the matching instance
                          // (which may include an end time) instead of just the start.
                          const match = evt.instances?.find((it) => it.startAt === evt.nextInstanceStartsAt);
                          if (match) return <p className="text-sm text-gray-600 mt-1"><strong>Next:</strong> {formatEventRange(match.startAt, match.endAt, { style: 'long' } as EventFormatOpts)}</p>;
                          return <p className="text-sm text-gray-600 mt-1"><strong>Next:</strong> {formatEventRange(evt.nextInstanceStartsAt, undefined, { style: 'long' } as EventFormatOpts)}</p>;
                        }

                        if (evt.startsAt || evt.endsAt) {
                          return <p className="text-sm text-gray-600 mt-1">{formatEventRange(evt.startsAt, evt.endsAt, { style: 'long' } as EventFormatOpts)}</p>;
                        }

                        if (evt.instances && evt.instances.length > 0) {
                          // single-instance events: show the first/next instance
                          const first = evt.instances[0];
                          return <p className="text-sm text-gray-600 mt-1"><strong>Next:</strong> {formatEventRange(first.startAt, first.endAt, { style: 'long' } as EventFormatOpts)}</p>;
                        }

                        // Last-resort: inspect raw attributes for any timestamp-like field
                        try {
                          const raw = evt.raw as unknown;
                          let attrs: Record<string, unknown> | undefined;
                          if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
                            attrs = (raw as Record<string, unknown>)['attributes'] as Record<string, unknown> | undefined;
                          }

                          const toStr = (v: unknown) => (typeof v === 'string' ? v : null);
                          const rawStart = toStr(attrs?.['start_at'] ?? attrs?.['starts_at'] ?? attrs?.['end_at'] ?? attrs?.['ends_at']);
                          if (rawStart) return <p className="text-sm text-gray-600 mt-1">{formatEventRange(rawStart)}</p>;

                          // Do not display created/updated timestamps or direct
                          // links to Planning Center on the public site. If there
                          // is no scheduled date available, render nothing here.
                        } catch {
                          // ignore and fall through
                        }

                          return null;
                      })()}
                      {/* Display location if available */}
                      {evt.location ? (
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Location:</strong> {evt.location}
                        </p>
                      ) : null}
                      {/* Display event_times if available */}
                      {evt.eventTimes && evt.eventTimes.length > 0 ? (
                        <div className="mt-2 text-sm text-gray-600">
                          <strong>Schedule:</strong>
                          <ul className="ml-4 mt-1 space-y-1">
                            {evt.eventTimes.map((et, idx) => (
                              <li key={et.id ?? idx}>
                                {et.name && <span className="font-medium">{et.name}: </span>}
                                {et.startsAt && et.endsAt 
                                  ? formatEventRange(et.startsAt, et.endsAt, { style: 'long' } as EventFormatOpts)
                                  : et.startsAt 
                                    ? formatDateTime(et.startsAt)
                                    : 'Time TBD'}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      {/* Intentionally omit direct "View in Planning Center" links on the public site */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
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