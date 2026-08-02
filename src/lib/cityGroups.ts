/**
 * Curated list of City Groups, shown on /ministries/community-groups.
 *
 * Maintained by hand (Church Center is a client-rendered app behind auth, so
 * this can't be pulled automatically). Each group's details come from its
 * Church Center page: Region, Neighborhood, the description, and Leaders.
 *
 * To update a group: open its page in Church Center and copy the values.
 * `region`, `neighborhood`, `description`, `leaders`, and `note` are all
 * optional — the card renders cleanly with whatever is provided.
 */

export type CityGroup = {
  name: string;
  url: string;
  /** Region tag, e.g. "West Ashley". */
  region?: string;
  /** Neighborhood tag, e.g. "Shadowmoss". */
  neighborhood?: string;
  /** One- or two-sentence blurb from the group's Church Center page. */
  description?: string;
  /** Leader names, e.g. "Aaron & Brenna". */
  leaders?: string;
  /** Optional short qualifier shown as a label, e.g. "Young adults". */
  note?: string;
};

const CC = 'https://gotachurch.churchcenter.com/groups/community-groups';

export const CITY_GROUPS: CityGroup[] = [
  {
    name: 'The Barney Group',
    url: `${CC}/barney-community-group`,
    region: 'West Ashley',
    neighborhood: 'Shadowmoss',
    description: 'The Barney Community Group typically meets in the Shadowmoss neighborhood.',
    leaders: 'Aaron & Brenna',
  },
  {
    name: 'The Bostic & Spuur Group',
    url: `${CC}/bostic-spuur-community-group-young-adults`,
    note: 'Young adults',
  },
  { name: 'The Darms Group', url: `${CC}/darms-community-group` },
  { name: 'The Harkness Group', url: `${CC}/harkness-community-group` },
  { name: 'The Vij Group', url: `${CC}/vij-community-group` },
  { name: 'The Zetz Group', url: `${CC}/zetz-community-group` },
];
