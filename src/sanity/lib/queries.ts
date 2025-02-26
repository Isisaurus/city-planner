import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(
  `*[_type=='project' && !defined($search) || title match $search || description match $search || summary match $search] | order(_createdAt desc){_id, title, slug, _createdAt, summary, status, description, votes, _type, _updatedAt, _rev}`,
);
