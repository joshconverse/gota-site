import type { PCEvent } from "@/utils/planningcenter";
import EventsCarousel from "@/components/EventsCarousel";

const EXCLUDED_FROM_HOMEPAGE = ["sunday worship service"];
const WINDOW_DAYS = 14;
const WINDOW_MS = WINDOW_DAYS * 24 * 60 * 60 * 1000;

export default function UpcomingEvents({ events }: { events: PCEvent[] }) {
  const now = new Date().getTime();
  const cutoff = now + WINDOW_MS;

  const upcoming = events
    .filter((event): event is PCEvent & { startsAt: string } => {
      if (!event.startsAt) return false;
      const title = (event.title ?? "").toLowerCase().trim();
      if (EXCLUDED_FROM_HOMEPAGE.includes(title)) return false;
      const startTime = new Date(event.startsAt).getTime();
      return startTime >= now && startTime <= cutoff;
    })
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());

  if (upcoming.length === 0) return null;

  return (
    <section className="relative bg-brand-4 py-20">
      <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20 mb-12">
        <h2 className="text-2xl md:text-3xl font-light text-center text-slate-900 mb-4">
          Upcoming Events
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          A few things happening around Grace on the Ashley in the next two weeks.
        </p>
      </div>
      <EventsCarousel events={upcoming} />
    </section>
  );
}
