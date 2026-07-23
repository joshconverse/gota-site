import { defineField, defineType } from "sanity";

export const announcement = defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", type: "blockContent" }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "priority", type: "number" }),
  ],
});

export default announcement;
