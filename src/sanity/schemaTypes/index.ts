import { blockContent } from "./blockContent";
import { siteSettings } from "./siteSettings";
import { homepage } from "./homepage";
import { post } from "./post";
import { event } from "./event";
import { announcement } from "./announcement";
import { section } from "./section";

export const schemaTypes = [
  blockContent,
  siteSettings,
  homepage,
  post,
  event,
  announcement,
  section,
];

export default schemaTypes;
