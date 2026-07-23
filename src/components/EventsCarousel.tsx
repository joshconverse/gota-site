'use client';

import { useEffect, useRef, useState } from 'react';
import type { PCEvent } from '@/utils/planningcenter';

type UpcomingEvent = PCEvent & { startsAt: string };

const TIME_ZONE = 'America/New_York';
const SCROLL_EDGE_THRESHOLD = 4;

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, '').trim();
}

function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', timeZone: TIME_ZONE }).toUpperCase();
}

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', timeZone: TIME_ZONE });
}

function formatWeekdayAndTime(iso: string) {
  const weekday = new Date(iso).toLocaleDateString('en-US', { weekday: 'long', timeZone: TIME_ZONE });
  const time = new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: TIME_ZONE });
  return `${weekday} at ${time}`;
}

export default function EventsCarousel({ events }: { events: UpcomingEvent[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function updateEdges() {
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > SCROLL_EDGE_THRESHOLD);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - SCROLL_EDGE_THRESHOLD);
    }

    updateEdges();
    el.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      el.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, [events.length]);

  function scrollByAmount(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: 'smooth' });
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth px-6 md:px-12 lg:px-20 py-2 scroll-pl-6 md:scroll-pl-12 lg:scroll-pl-20 scroll-pr-6 md:scroll-pr-12 lg:scroll-pr-20"
      >
        {events.map((event) => {
          const description = event.description ? stripHtml(event.description) : null;
          const cardClasses =
            'group flex-shrink-0 snap-start w-[280px] sm:w-[340px] md:w-[380px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8 border border-gray-100';

          const content = (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-16 rounded-md overflow-hidden border border-brand-1/30">
                  <div className="bg-brand-1 text-white text-xs font-semibold uppercase tracking-wide text-center py-1">
                    {formatMonth(event.startsAt)}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 text-center py-2">
                    {formatDay(event.startsAt)}
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg text-slate-900 group-hover:text-brand-1 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{formatWeekdayAndTime(event.startsAt)}</p>
                </div>
              </div>
              {description && (
                <p className="text-sm text-gray-600 line-clamp-4">{description}</p>
              )}
            </>
          );

          return event.link ? (
            <a
              key={event.id}
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cardClasses}
            >
              {content}
            </a>
          ) : (
            <div key={event.id} className={cardClasses}>
              {content}
            </div>
          );
        })}
      </div>

      {/* Edge fades signal there's more to scroll to */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 w-10 md:w-16 bg-gradient-to-r from-brand-4 to-transparent transition-opacity duration-300 ${
          canScrollLeft ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 w-10 md:w-16 bg-gradient-to-l from-brand-4 to-transparent transition-opacity duration-300 ${
          canScrollRight ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Arrow buttons: a clearer affordance than the fade alone on non-touch devices */}
      <button
        type="button"
        aria-label="Scroll events left"
        onClick={() => scrollByAmount(-1)}
        disabled={!canScrollLeft}
        className={`hidden md:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 items-center justify-center w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 transition-opacity duration-300 hover:opacity-95 disabled:opacity-0 disabled:pointer-events-none`}
      >
        <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Scroll events right"
        onClick={() => scrollByAmount(1)}
        disabled={!canScrollRight}
        className={`hidden md:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 items-center justify-center w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 transition-opacity duration-300 hover:opacity-95 disabled:opacity-0 disabled:pointer-events-none`}
      >
        <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
