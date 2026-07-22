import type { PCEvent } from "@/utils/planningcenter";

const EXCLUDED_FROM_HOMEPAGE = ["sunday worship service"];
const MAX_EVENTS = 3;
const TIME_ZONE = "America/New_York";

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").trim();
}

function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", timeZone: TIME_ZONE }).toUpperCase();
}

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { day: "numeric", timeZone: TIME_ZONE });
}

function formatWeekdayAndTime(iso: string) {
  const weekday = new Date(iso).toLocaleDateString("en-US", { weekday: "long", timeZone: TIME_ZONE });
  const time = new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: TIME_ZONE });
  return `${weekday} at ${time}`;
}

export default function UpcomingEvents({ events }: { events: PCEvent[] }) {
  const upcoming = events
    .filter((event): event is PCEvent & { startsAt: string } => {
      if (!event.startsAt) return false;
      const title = (event.title ?? "").toLowerCase().trim();
      return !EXCLUDED_FROM_HOMEPAGE.includes(title);
    })
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
    .slice(0, MAX_EVENTS);

  if (upcoming.length === 0) return null;

  return (
    <section className="relative bg-brand-4 py-20">
      <div className="container mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
        <h2 className="text-2xl md:text-3xl font-light text-center text-slate-900 mb-4">
          Upcoming Events
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          A few things happening around Grace on the Ashley.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcoming.map((event) => {
            const description = event.description ? stripHtml(event.description) : null;
            const content = (
              <>
                <div className="flex-shrink-0 w-16 rounded-md overflow-hidden border border-brand-1/30">
                  <div className="bg-brand-1 text-white text-xs font-semibold uppercase tracking-wide text-center py-1">
                    {formatMonth(event.startsAt)}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 text-center py-2">
                    {formatDay(event.startsAt)}
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-lg text-slate-900 group-hover:text-brand-1 transition">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{formatWeekdayAndTime(event.startsAt)}</p>
                  {description && (
                    <p className="text-sm text-gray-600 mt-3 line-clamp-3">{description}</p>
                  )}
                </div>
              </>
            );

            const cardClasses = "group flex gap-4 bg-white rounded-lg shadow-lg p-6 transition";

            return event.link ? (
              <a
                key={event.id}
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClasses} hover:shadow-xl`}
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
      </div>
    </section>
  );
}
