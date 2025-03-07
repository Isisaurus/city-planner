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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "author",
      type: "string",
      initialValue: "City Hall",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      validation: (Rule) => Rule.required(),
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
          { title: "Under Evaluation", value: "evaluation" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "votes",
      title: "Votes",
      type: "number",
      initialValue: () => 0,
    }),
    defineField({
      name: "comments",
      title: "Comments",
      type: "array",
      of: [{ type: "reference", to: { type: "comment" } }],
    }),
  ],
});
