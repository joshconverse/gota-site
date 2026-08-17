/**
 * Curated list of City Groups, shown on /ministries/community-groups.
 *
 * Maintained by hand (Church Center is a client-rendered app behind auth, so
 * this can't be pulled automatically). Each group's details come from its
 * Church Center page: Region(s), Neighborhood(s), the description, and Leaders.
 *
 * To update a group: open its page in Church Center and copy the values.
 * Every field except `name`/`url` is optional — the card renders cleanly with
 * whatever is provided.
 */

export type CityGroup = {
  name: string;
  url: string;
  /** Region tags, e.g. ["West Ashley"]. */
  regions?: string[];
  /** Neighborhood tags, e.g. ["Shadowmoss"]. */
  neighborhoods?: string[];
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
    regions: ['West Ashley'],
    neighborhoods: ['Shadowmoss'],
    description: 'The Barney Community Group typically meets in the Shadowmoss neighborhood.',
    leaders: 'Aaron & Brenna',
  },
  {
    name: 'The Bostic & Spuur Group',
    url: `${CC}/bostic-spuur-community-group-young-adults`,
    note: 'Young adults',
    regions: ['Ravenel / Hollywood'],
    description: "The Bostic Community Group is made up of our church's young adult community (i.e., college & career).",
    leaders: 'Curtis, Dani, Danielle & Zach',
  },
  {
    name: 'The Darms Group',
    url: `${CC}/darms-community-group`,
    regions: ['West Ashley'],
    neighborhoods: ['Church Creek', 'Forest Lakes'],
    description: 'The Darms Community Group typically meets on the 2nd & 4th Mondays of the month in the Church Creek / Forest Lakes neighborhood.',
    leaders: 'Madisson & Tim',
  },
  {
    name: 'The Harkness Group',
    url: `${CC}/harkness-community-group`,
    regions: ['West Ashley'],
    neighborhoods: ['Stono Ferry'],
    description: 'The Harkness Community Group typically meets in the Stono Ferry neighborhood.',
    leaders: 'Angie & Shawn',
  },
  {
    name: 'The Vij Group',
    url: `${CC}/vij-community-group`,
    regions: ['Hanahan', 'North Charleston'],
    description: "The Vij group typically meets in the North Area, so it's a great choice of group if you happen to live up that way!",
    leaders: 'Pank & Rachel',
  },
  {
    name: 'The Zetz Group',
    url: `${CC}/zetz-community-group`,
    regions: ['West Ashley'],
    neighborhoods: ['Middleton Oaks'],
    description: 'The Zetz Community Group typically meets in the Middleton Oaks neighborhood.',
    leaders: 'Michael & Sarah',
  },
];
