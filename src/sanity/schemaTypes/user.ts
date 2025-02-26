import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const user = defineType({
  name: "user",
  title: "User",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      type: "number",
    }),
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "username",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "avatar",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
