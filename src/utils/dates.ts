export type FormatOpts = { locale?: string; timeZone?: string };
export type EventFormatOpts = FormatOpts & { style?: 'compact' | 'long' };

function isValidDate(d: Date) {
  return !Number.isNaN(d.getTime());
}

export function formatDateTime(iso?: string | null, opts?: FormatOpts) {
  if (!iso) return '';
  const d = new Date(iso);
  if (!isValidDate(d)) return String(iso);

  const { locale, timeZone } = opts ?? {};
  return d.toLocaleString(locale ?? undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timeZone ?? undefined,
  });
}

export function formatEventRange(startIso?: string | null, endIso?: string | null, opts?: FormatOpts) {
  if (!startIso) return '';
  const s = new Date(startIso);
  if (!isValidDate(s)) return String(startIso);
  const { locale, timeZone } = opts ?? {};

  // Long (human-friendly) style: `December 18, 2025 at 10am-2pm`
  const style = (opts as EventFormatOpts | undefined)?.style ?? 'compact';
  if (style === 'long') {
    const formatTimeShort = (d: Date) => {
      // show minutes only when non-zero
      const minute = d.getUTCMinutes();
      const timeStr = minute === 0
        ? d.toLocaleTimeString(locale ?? undefined, { hour: 'numeric', timeZone: timeZone ?? undefined })
        : d.toLocaleTimeString(locale ?? undefined, { hour: 'numeric', minute: '2-digit', timeZone: timeZone ?? undefined });
      // normalize to `10am` / `10:30am` style (no spaces, lowercased am/pm)
      return timeStr.replace(/\s+/g, '').toLowerCase();
    };

    const formatDateLong = (d: Date) => d.toLocaleDateString(locale ?? undefined, { month: 'long', day: 'numeric', year: 'numeric', timeZone: timeZone ?? undefined });

    if (!endIso) {
      const time = formatTimeShort(s);
      return `${formatDateLong(s)} at ${time}`;
    }

    const e = new Date(endIso);
    if (!isValidDate(e)) return `${formatDateTime(startIso, opts)} — ${String(endIso)}`;

    const sameDay = s.getUTCFullYear() === e.getUTCFullYear()
      && s.getUTCMonth() === e.getUTCMonth()
      && s.getUTCDate() === e.getUTCDate();

    if (sameDay) {
      const datePart = formatDateLong(s);
      const startTime = formatTimeShort(s);
      const endTime = formatTimeShort(e);
      return `${datePart} at ${startTime}-${endTime}`;
    }

    return `${formatDateLong(s)} at ${formatTimeShort(s)} — ${formatDateLong(e)} at ${formatTimeShort(e)}`;
  }

  if (!endIso) return formatDateTime(startIso, opts);

  const e = new Date(endIso);
  if (!isValidDate(e)) return `${formatDateTime(startIso, opts)} — ${String(endIso)}`;

  // If start and end are the same calendar day, show date once and times as a range
  const sameDay = s.getUTCFullYear() === e.getUTCFullYear()
    && s.getUTCMonth() === e.getUTCMonth()
    && s.getUTCDate() === e.getUTCDate();

  if (sameDay) {
    const datePart = s.toLocaleDateString(locale ?? undefined, { month: 'short', day: 'numeric', timeZone: timeZone ?? undefined });
    const startTime = s.toLocaleTimeString(locale ?? undefined, { hour: 'numeric', minute: '2-digit', timeZone: timeZone ?? undefined });
    const endTime = e.toLocaleTimeString(locale ?? undefined, { hour: 'numeric', minute: '2-digit', timeZone: timeZone ?? undefined });
    return `${datePart}, ${startTime} — ${endTime}`;
  }

  return `${formatDateTime(startIso, opts)} — ${formatDateTime(endIso, opts)}`;
}

export default formatDateTime;
