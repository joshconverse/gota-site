import Link from "next/link";
import type { SanityDocument } from "next-sanity";
import { formatEventRange } from '@/utils/dates';
import type { EventFormatOpts } from '@/utils/dates';

export default function EventCard({ event }: { event: SanityDocument }) {
  const start = event.startDate ?? event.start ?? null;
  const end = event.endDate ?? event.end ?? null;

  const dateText = start || end ? formatEventRange(start, end, { style: 'long' } as EventFormatOpts) : 'No scheduled date';

  return (
    <article className="p-3 border rounded">
      <h4 className="font-semibold text-lg">
        <Link href={`/${event.slug?.current ?? ''}`}>{event.title}</Link>
      </h4>
      <div className="text-sm text-gray-600">{dateText}</div>
      {event.location ? <div className="text-sm mt-1">{event.location}</div> : null}
    </article>
  );
}
