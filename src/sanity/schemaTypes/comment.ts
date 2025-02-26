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
      title: "User",
      name: "userRef",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      title: "Project",
      name: "projectRef",
      type: "reference",
      to: [{ type: "project" }],
    }),
  ],
});
