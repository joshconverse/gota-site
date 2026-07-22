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

// We normally preach verse-by-verse, so a scripture reference should always
// be shown when the title provides one — whether that's a bare passage
// ("Proverbs 17:27-18:8") or a topical title paired with one ("MOBILIZE -
// Hebrews 2:14-15"). Only when a title gives no scripture reference at all
// do we fall back to "Selected Scriptures": appended to a topical title, or
// standing alone when the topic is just a bare book name (a placeholder
// used before that week's specific passage is set).
const BIBLE_BOOKS = [
  'genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 'joshua', 'judges', 'ruth',
  '1 samuel', '2 samuel', '1 kings', '2 kings', '1 chronicles', '2 chronicles', 'ezra', 'nehemiah', 'esther',
  'job', 'psalms', 'psalm', 'proverbs', 'ecclesiastes', 'song of solomon', 'song of songs',
  'isaiah', 'jeremiah', 'lamentations', 'ezekiel', 'daniel', 'hosea', 'joel', 'amos', 'obadiah', 'jonah', 'micah',
  'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah', 'malachi',
  'matthew', 'mark', 'luke', 'john', 'acts', 'romans', '1 corinthians', '2 corinthians', 'galatians', 'ephesians',
  'philippians', 'colossians', '1 thessalonians', '2 thessalonians', '1 timothy', '2 timothy', 'titus', 'philemon',
  'hebrews', 'james', '1 peter', '2 peter', '1 john', '2 john', '3 john', 'jude', 'revelation',
];
const BIBLE_BOOK_SET = new Set(BIBLE_BOOKS);
// Word-boundary match so short book names (e.g. "ruth", "mark", "acts")
// don't false-positive inside unrelated words like "truth" or "Denmark".
const BOOK_NAME_PATTERN = new RegExp(`\\b(${BIBLE_BOOKS.join('|')})\\b`, 'i');
// A chapter:verse reference, e.g. "17:27" — a fallback signal for the rare
// case a passage is cited without spelling out the book name.
const VERSE_REFERENCE = /\d+:\d+/;

function finalizeTopic(topic: string) {
  const trimmed = topic.trim();
  if (!trimmed) return 'Selected Scriptures';

  if (BIBLE_BOOK_SET.has(trimmed.toLowerCase())) return 'Selected Scriptures';

  if (BOOK_NAME_PATTERN.test(trimmed) || VERSE_REFERENCE.test(trimmed)) return trimmed;

  return `${trimmed} - Selected Scriptures`;
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
