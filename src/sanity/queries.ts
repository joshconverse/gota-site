export const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  title,
  heroImage,
  heroText,
  recentPosts[]->{_id, title, slug, publishedAt, excerpt, mainImage},
  upcomingEvents[]->{_id, title, slug, startDate, endDate, location},
}`;

export const POSTS_INDEX_QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, excerpt, mainImage}`;

export const EVENTS_INDEX_QUERY = `*[_type == "event" && defined(slug.current)]|order(startDate asc)[0...12]{_id, title, slug, startDate, endDate, location}`;

export const ANNOUNCEMENTS_QUERY = `*[_type == "announcement"]|order(publishedAt desc)[0...6]{_id, title, content, body, description, message, publishedAt, priority}`;

export const SITE_SETTINGS = `*[_type == "siteSettings"][0]{title, description, logo}`;

const queries = {
  HOMEPAGE_QUERY,
  POSTS_INDEX_QUERY,
  EVENTS_INDEX_QUERY,
  ANNOUNCEMENTS_QUERY,
  SITE_SETTINGS,
};

export default queries;
