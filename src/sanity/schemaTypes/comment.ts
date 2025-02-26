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
  ],
});
