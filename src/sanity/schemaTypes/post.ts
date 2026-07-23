import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "excerpt", type: "text" }),
    defineField({ name: "mainImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", type: "blockContent" }),
  ],
});

export default post;
