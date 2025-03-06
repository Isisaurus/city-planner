import { defineType, defineField } from "sanity";
import { CommentIcon } from "@sanity/icons";

export const comment = defineType({
  title: "Comment",
  name: "comment",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      title: "Comment text",
      name: "text",
      type: "string",
    }),
    defineField({
      title: "User ID",
      name: "userid",
      type: "string",
    }),
    defineField({
      name: "projectRef",
      title: "Project Reference",
      type: "reference",
      to: [{ type: "project" }],
    }),
  ],
});
