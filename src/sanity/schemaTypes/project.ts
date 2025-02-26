import { defineField, defineType } from "sanity";
import { ProjectsIcon } from "@sanity/icons";
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "In Review", value: "review" },
          { title: "In Appeal", value: "appeal" },
          { title: "In Progress", value: "progress" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
      initialValue: "notStarted",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "votes",
      title: "Votes",
      type: "number",
    }),
  ],
});
