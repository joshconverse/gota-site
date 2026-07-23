import { defineField, defineType } from "sanity";

// Legacy type from an earlier Studio setup — kept so existing documents
// remain visible/editable in Studio. Candidate for cleanup once content is
// reorganized.
export const section = defineType({
  name: "section",
  title: "Section (legacy)",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({ name: "layout", type: "string" }),
  ],
});

export default section;
