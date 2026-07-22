import { describe, it, expect } from 'vitest';
import { parseSermonTitle, formatSermonDate } from './sermonTitle';

describe('parseSermonTitle', () => {
  it('splits the current numeric-date format with a pastor', () => {
    const result = parseSermonTitle('07.19.26 - Proverbs 17:27-18:8, 18:20-21 - Pastor Kelly Graham');
    expect(result.date).not.toBeNull();
    expect(formatSermonDate(result.date!)).toBe('July 19, 2026');
    expect(result.topic).toBe('Proverbs 17:27-18:8, 18:20-21');
    expect(result.pastor).toBe('Pastor Kelly Graham');
  });

  it('appends "Selected Scriptures" to a topical title with no scripture reference', () => {
    const result = parseSermonTitle('07.05.26 - Romania Mission 2026 Recap');
    expect(result.date).not.toBeNull();
    expect(result.topic).toBe('Romania Mission 2026 Recap - Selected Scriptures');
    expect(result.pastor).toBeNull();
  });

  it('does not misfire on a "Preacher:" label with no scripture reference', () => {
    const result = parseSermonTitle('06.14.26 - Preacher: George Bednar');
    expect(result.date).not.toBeNull();
    expect(result.topic).toBe('Preacher: George Bednar - Selected Scriptures');
    expect(result.pastor).toBeNull();
  });

  it('splits the older long-date format and appends "Selected Scriptures" when no passage is given', () => {
    const result = parseSermonTitle('March 29, 2026 - PALM SUNDAY - Pastor Greg Smith');
    expect(result.date).not.toBeNull();
    expect(formatSermonDate(result.date!)).toBe('March 29, 2026');
    expect(result.topic).toBe('PALM SUNDAY - Selected Scriptures');
    expect(result.pastor).toBe('Pastor Greg Smith');
  });

  it('recognizes "Guest Preacher" and "Elder" as speaker prefixes', () => {
    const guest = parseSermonTitle('February 15, 2026 - 1 Corinthians 13 - Guest Preacher Curtis Bostic');
    expect(guest.pastor).toBe('Guest Preacher Curtis Bostic');

    const elder = parseSermonTitle('01.01.26 - Topic - Elder Roger Parker');
    expect(elder.pastor).toBe('Elder Roger Parker');
  });

  it('falls back to the raw title when no date prefix is present, appending "Selected Scriptures"', () => {
    const result = parseSermonTitle('Christmas Eve 2025');
    expect(result.date).toBeNull();
    expect(result.topic).toBe('Christmas Eve 2025 - Selected Scriptures');
    expect(result.pastor).toBeNull();
  });

  it('falls back to the raw title for irregular historical formats', () => {
    const result = parseSermonTitle('1 Thessalonians 5:21-22 - Pastor Greg Smith');
    expect(result.date).toBeNull();
    expect(result.topic).toBe('1 Thessalonians 5:21-22 - Pastor Greg Smith');
    expect(result.pastor).toBeNull();
  });

  it('does not split a scripture-reference dash as if it were a pastor segment', () => {
    const result = parseSermonTitle('07.12.26 - Proverbs 9:1-18 - Pastor Greg Smith');
    expect(result.topic).toBe('Proverbs 9:1-18');
    expect(result.pastor).toBe('Pastor Greg Smith');
  });

  it('replaces a bare book name with "Selected Scriptures" when no verse is given', () => {
    const result = parseSermonTitle('07.26.26 - Proverbs - Pastor Kelly Graham');
    expect(result.topic).toBe('Selected Scriptures');
    expect(result.pastor).toBe('Pastor Kelly Graham');
  });

  it('keeps the passage as-is once a verse reference is added', () => {
    const result = parseSermonTitle('07.19.26 - Proverbs 17:27-18:8, 18:20-21 - Pastor Kelly Graham');
    expect(result.topic).toBe('Proverbs 17:27-18:8, 18:20-21');
  });

  it('does not touch topics that merely start with a book name', () => {
    const result = parseSermonTitle('07.01.26 - Proverbs Introduction - Pastor Greg Smith');
    expect(result.topic).toBe('Proverbs Introduction');
  });

  it('shows a chapter-only reference as-is, without appending "Selected Scriptures"', () => {
    const result = parseSermonTitle('05.24.26 - Daniel 6, part 1 - Pastor Greg Smith');
    expect(result.topic).toBe('Daniel 6, part 1');
  });

  it('appends "Selected Scriptures" to a topical title paired with a book name and verse', () => {
    const result = parseSermonTitle('11.10.24 - MOBILIZE - Hebrews 2:14-15 - Pastor Greg Smith');
    expect(result.topic).toBe('MOBILIZE - Hebrews 2:14-15');
  });

  it('appends "Selected Scriptures" to a topical title with no book name at all', () => {
    const result = parseSermonTitle('11.10.24 - MOBILIZE - Pastor Greg Smith');
    expect(result.topic).toBe('MOBILIZE - Selected Scriptures');
  });

  it('does not false-positive match a short book name inside an unrelated word', () => {
    const result = parseSermonTitle('01.01.26 - The Truth of the Gospel - Pastor Greg Smith');
    expect(result.topic).toBe('The Truth of the Gospel - Selected Scriptures');
  });
});
