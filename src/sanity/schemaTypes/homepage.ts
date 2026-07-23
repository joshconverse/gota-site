import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroText", type: "string" }),
    defineField({
      name: "recentPosts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
    }),
    defineField({
      name: "upcomingEvents",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
    }),
  ],
});

export default homepage;
