import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const userActivity = defineType({
  name: "userActivity",
  title: "User Activity",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "userId",
      title: "User Id",
      type: "string",
    }),
    defineField({
      name: "activityType",
      title: "Activity Type",
      type: "string",
      options: {
        list: [
          { title: "Save", value: "save" },
          { title: "Vote", value: "vote" },
          { title: "Unvote", value: "unvote" },
          { title: "Comment", value: "comment" },
        ],
      },
    }),
    defineField({
      name: "projectRef",
      title: "Project Reference",
      type: "reference",
      to: { type: "project" },
    }),
  ],
});
