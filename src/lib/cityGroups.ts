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
  /** Optional short qualifier shown under the name, e.g. "Young adults". */
  note?: string;
};

const CC = 'https://gotachurch.churchcenter.com/groups/community-groups';

export const CITY_GROUPS: CityGroup[] = [
  { name: 'The Barney Group', url: `${CC}/barney-community-group` },
  { name: 'The Bostic & Spuur Group', url: `${CC}/bostic-spuur-community-group-young-adults`, note: 'Young adults' },
  { name: 'The Darms Group', url: `${CC}/darms-community-group` },
  { name: 'The Harkness Group', url: `${CC}/harkness-community-group` },
  { name: 'The Vij Group', url: `${CC}/vij-community-group` },
  { name: 'The Zetz Group', url: `${CC}/zetz-community-group` },
];
