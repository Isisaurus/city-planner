import { defineQuery } from "next-sanity";

export const PROJECTS_SEARCH_QUERY = defineQuery(
  `*[
  _type == "project" && status != "evaluation" &&
  (!defined($search) || title match $search || description match $search || summary match $search)
]
| order(_createdAt desc)`,
);
export const PROJECTS_QUERY = defineQuery(
  `*[_type=='project' && status != "evaluation"] | order(_createdAt desc)`,
);

export const PROJECT_QUERY = defineQuery(
  `*[_type=='project' && slug.current == $slug]`,
);

export const PROJECTVOTES_QUERY = defineQuery(
  `*[_type=='project' && _id == $projectId]{_id, votes}`,
);

export const PROJECTCOMMENTS_QUERY = defineQuery(
  `*[_type=='comment' && ($projectId match projectRef._ref)] | order(_createdAt desc)`,
);

export const ACTIVITYPERUSERID_QUERY = defineQuery(`
  *[_type=='userActivity' && ($id match userId)] | order(_createdAt desc){
  ...,
  projectRef -> {
    slug,
    title
  }
}`);

export const PROJECTPERUSERID_QUERY = defineQuery(
  `*[_type=='project' && ($userId match author)] | order(_createdAt desc)`,
);
