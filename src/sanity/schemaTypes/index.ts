import { type SchemaTypeDefinition } from "sanity";
import { user } from "./user";
import { project } from "./project";
import { comment } from "./comment";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, project, comment],
};
