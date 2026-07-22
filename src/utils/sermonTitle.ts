/**
 * YouTube sermon titles generally follow "<date> - <topic> - Pastor <name>",
 * but the exact date format has changed over time and the pastor segment is
 * sometimes missing (mission recaps, memorials, guest speakers). This only
 * splits out a date/pastor when it can do so confidently; anything else
 * falls back to treating the whole string as the topic, matching the plain
 * display used before parsing existed.
 */

export interface ParsedSermonTitle {
  date: Date | null;
  topic: string;
  pastor: string | null;
}

// e.g. "07.19.26"
const NUMERIC_DATE = /^(\d{1,2})\.(\d{1,2})\.(\d{2,4})\s*-\s*/;
// e.g. "March 29, 2026" or "July 6, 2025"
const LONG_DATE = /^([A-Z][a-z]+ \d{1,2}),?\s+(\d{4})\s*-\s*/;

const SPEAKER_PREFIX = /^(pastor|preacher|guest preacher|elder)\b/i;

// When a sermon topic is just a bare book name (e.g. a series title used
// before that week's specific passage is known), show "Selected Scriptures"
// instead of the book name alone. Topics that include a chapter/verse
// reference — including alongside the book name — are left untouched.
const BIBLE_BOOKS = new Set([
  'genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 'joshua', 'judges', 'ruth',
  '1 samuel', '2 samuel', '1 kings', '2 kings', '1 chronicles', '2 chronicles', 'ezra', 'nehemiah', 'esther',
  'job', 'psalms', 'psalm', 'proverbs', 'ecclesiastes', 'song of solomon', 'song of songs',
  'isaiah', 'jeremiah', 'lamentations', 'ezekiel', 'daniel', 'hosea', 'joel', 'amos', 'obadiah', 'jonah', 'micah',
  'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah', 'malachi',
  'matthew', 'mark', 'luke', 'john', 'acts', 'romans', '1 corinthians', '2 corinthians', 'galatians', 'ephesians',
  'philippians', 'colossians', '1 thessalonians', '2 thessalonians', '1 timothy', '2 timothy', 'titus', 'philemon',
  'hebrews', 'james', '1 peter', '2 peter', '1 john', '2 john', '3 john', 'jude', 'revelation',
]);

function finalizeTopic(topic: string) {
  return BIBLE_BOOKS.has(topic.trim().toLowerCase()) ? 'Selected Scriptures' : topic;
}

function numericDateToDate(match: RegExpMatchArray): Date | null {
  const [, mm, dd, yy] = match;
  const year = yy.length === 2 ? 2000 + Number(yy) : Number(yy);
  const date = new Date(year, Number(mm) - 1, Number(dd));
  return Number.isNaN(date.getTime()) ? null : date;
}

function longDateToDate(match: RegExpMatchArray): Date | null {
  const [, monthDay, year] = match;
  const date = new Date(`${monthDay}, ${year}`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function parseSermonTitle(raw: string): ParsedSermonTitle {
  const trimmed = raw.trim();

  const numericMatch = trimmed.match(NUMERIC_DATE);
  const longMatch = !numericMatch ? trimmed.match(LONG_DATE) : null;

  const date = numericMatch ? numericDateToDate(numericMatch) : longMatch ? longDateToDate(longMatch) : null;
  const dateMatchLength = numericMatch?.[0].length ?? longMatch?.[0].length ?? 0;

  if (!date) {
    return { date: null, topic: finalizeTopic(trimmed), pastor: null };
  }

  const rest = trimmed.slice(dateMatchLength).trim();

  // Only split off a trailing pastor line when it unambiguously names a
  // speaker, so we don't accidentally chop a scripture reference or topic.
  const lastDashIndex = rest.lastIndexOf(' - ');
  if (lastDashIndex !== -1) {
    const tail = rest.slice(lastDashIndex + 3).trim();
    if (SPEAKER_PREFIX.test(tail)) {
      return { date, topic: finalizeTopic(rest.slice(0, lastDashIndex).trim()), pastor: tail };
    }
  }

  return { date, topic: finalizeTopic(rest), pastor: null };
}

export function formatSermonDate(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default parseSermonTitle;
