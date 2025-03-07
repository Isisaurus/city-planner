import { type SchemaTypeDefinition } from "sanity";
import { project } from "./project";
import { comment } from "./comment";
import { userActivity } from "./userActivity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userActivity, project, comment],
};
