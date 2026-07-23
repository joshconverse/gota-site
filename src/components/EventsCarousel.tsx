'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { PCEvent } from '@/utils/planningcenter';

type UpcomingEvent = PCEvent & { startsAt: string };

const TIME_ZONE = 'America/New_York';

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const maxTranslateRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const [wrapperHeight, setWrapperHeight] = useState<number | null>(null);
  const minProgressPercent = events.length ? 100 / events.length : 0;

  useLayoutEffect(() => {
    function measure() {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const max = Math.max(trackWidth - viewportWidth, 0);
      maxTranslateRef.current = max;
      setWrapperHeight(max + window.innerHeight);
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [events.length]);

  useEffect(() => {
    function applyScroll() {
      rafIdRef.current = null;
      const maxTranslate = maxTranslateRef.current;
      if (!wrapperRef.current || !trackRef.current || maxTranslate <= 0) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;
      const p = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
      trackRef.current.style.transform = `translate3d(${-p * maxTranslate}px,0,0)`;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.max(p * 100, minProgressPercent)}%`;
      }
    }
    function onScroll() {
      if (rafIdRef.current !== null) return;
      rafIdRef.current = requestAnimationFrame(applyScroll);
    }
    applyScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [minProgressPercent, wrapperHeight]);

  return (
    <div ref={wrapperRef} style={wrapperHeight ? { height: wrapperHeight } : undefined} className="relative">
      <div className="sticky top-0 h-screen flex flex-col items-start justify-center overflow-hidden">
        <div ref={trackRef} className="flex gap-8 px-6 md:px-12 lg:px-20 will-change-transform">
          {events.map((event) => {
            const description = event.description ? stripHtml(event.description) : null;
            const cardClasses =
              'group flex-shrink-0 w-[300px] sm:w-[380px] md:w-[420px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8 border border-gray-100';

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

        <div className="self-center mt-10 w-48 h-1 rounded-full bg-black/10 overflow-hidden">
          <div ref={progressBarRef} className="h-full bg-brand-1 rounded-full" style={{ width: `${minProgressPercent}%` }} />
        </div>
      </div>
    </div>
  );
}
