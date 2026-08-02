/**
 * Curated list of City Groups, shown on /ministries/community-groups.
 *
 * These are maintained by hand (rather than pulled live from the Planning
 * Center Groups API) so the page always works regardless of API credentials.
 * Each `url` is the group's public Church Center page — verified to return 200
 * — and is where the "Join this group" button sends people.
 *
 * To add/remove a group: copy its share link from Church Center
 * (Groups → open the group → Share) and add an entry below. Keep names in the
 * same style as the others.
 */

export type CityGroup = {
  name: string;
  url: string;
  /** Optional short qualifier shown as a label, e.g. "Young adults". */
  note?: string;
  /** Optional when/where line, e.g. "Sundays · West Ashley". */
  meets?: string;
  /** Optional one- or two-sentence blurb shown on the card. */
  description?: string;
};

const CC = 'https://gotachurch.churchcenter.com/groups/community-groups';

// NOTE: Church Center is a client-rendered app behind auth, so per-group
// details (blurb, meeting day/place) can't be pulled automatically. Fill in
// `meets` / `description` below to make a card richer; both are optional and
// the card renders cleanly without them.
export const CITY_GROUPS: CityGroup[] = [
  { name: 'The Barney Group', url: `${CC}/barney-community-group` },
  { name: 'The Bostic & Spuur Group', url: `${CC}/bostic-spuur-community-group-young-adults`, note: 'Young adults' },
  { name: 'The Darms Group', url: `${CC}/darms-community-group` },
  { name: 'The Harkness Group', url: `${CC}/harkness-community-group` },
  { name: 'The Vij Group', url: `${CC}/vij-community-group` },
  { name: 'The Zetz Group', url: `${CC}/zetz-community-group` },
];
