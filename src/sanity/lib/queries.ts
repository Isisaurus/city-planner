import { defineQuery } from "next-sanity";

export const PROJECTS_SEARCH_QUERY = defineQuery(
  `*[_type=='project' && !defined($search) || title match $search || description match $search || summary match $search] | order(_createdAt desc){_id, title, slug, _createdAt, summary, status, description, votes, _type, _updatedAt, _rev, coverImage}`,
);
export const PROJECTS_QUERY = defineQuery(
  `*[_type=='project'] | order(_createdAt desc)`,
);

export const PROJECT_QUERY = defineQuery(
  `*[_type=='project' && slug.current == $slug]{_id, title, slug, _createdAt, summary, status, description, votes, _type, _updatedAt, _rev}`,
);

export const PROJECTVOTES_QUERY = defineQuery(
  `*[_type=='project' && _id == $projectId]{_id, votes}`,
);
