import Link from "next/link";
import type { SanityDocument } from "next-sanity";

export default function EventCard({ event }: { event: SanityDocument }) {
  const start = event.startDate ? new Date(event.startDate) : null;
  const end = event.endDate ? new Date(event.endDate) : null;

  return (
    <article className="p-3 border rounded">
      <h4 className="font-semibold text-lg">
        <Link href={`/${event.slug?.current ?? ''}`}>{event.title}</Link>
      </h4>
      <div className="text-sm text-gray-600">
        {start ? start.toLocaleDateString() : ''}
        {end ? ` — ${end.toLocaleDateString()}` : ''}
      </div>
      {event.location ? <div className="text-sm mt-1">{event.location}</div> : null}
    </article>
  );
}
