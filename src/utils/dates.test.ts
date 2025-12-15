import { describe, it, expect } from 'vitest';
import { formatDateTime, formatEventRange } from './dates';
import type { EventFormatOpts } from './dates';

describe('date formatting utilities', () => {
  it('formats a single start datetime in UTC with en-US locale', () => {
    const s = '2025-01-02T10:00:00Z';
    const out = formatDateTime(s, { locale: 'en-US', timeZone: 'UTC' });
    expect(out).toBe('Jan 2, 10:00 AM');
  });

  it('formats a same-day range as date with time range', () => {
    const s = '2025-01-02T10:00:00Z';
    const e = '2025-01-02T12:30:00Z';
    const out = formatEventRange(s, e, { locale: 'en-US', timeZone: 'UTC' });
    expect(out).toBe('Jan 2, 10:00 AM — 12:30 PM');
  });

  it('formats a multi-day range with full datetimes', () => {
    const s = '2025-01-02T22:30:00Z';
    const e = '2025-01-03T01:15:00Z';
    const out = formatEventRange(s, e, { locale: 'en-US', timeZone: 'UTC' });
    expect(out).toBe('Jan 2, 10:30 PM — Jan 3, 1:15 AM');
  });

  it('formats a same-day range in long style with hour-only times when minutes are zero', () => {
    const s = '2025-12-18T10:00:00Z';
    const e = '2025-12-18T14:00:00Z';
  const out = formatEventRange(s, e, { locale: 'en-US', timeZone: 'UTC', style: 'long' } as EventFormatOpts);
    expect(out).toBe('December 18, 2025 at 10am-2pm');
  });

  it('formats a single start in long style and includes year', () => {
    const s = '2025-12-18T10:00:00Z';
  const out = formatEventRange(s, undefined, { locale: 'en-US', timeZone: 'UTC', style: 'long' } as EventFormatOpts);
    expect(out).toBe('December 18, 2025 at 10am');
  });

  it('formats a multi-day range in long style', () => {
    const s = '2025-12-18T10:00:00Z';
    const e = '2025-12-19T14:30:00Z';
  const out = formatEventRange(s, e, { locale: 'en-US', timeZone: 'UTC', style: 'long' } as EventFormatOpts);
    expect(out).toBe('December 18, 2025 at 10am — December 19, 2025 at 2:30pm');
  });
});
