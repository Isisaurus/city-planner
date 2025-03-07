import { formatDate } from "@/lib/utils";
import { Project } from "@/sanity/types";
import Link from "next/link";
import React from "react";
import StatusLabel from "./StatusLabel";
import { LinkIcon } from "../icons";

const ProjectsTableRow = ({ project }: { project: Project }) => {
  const { _id, title, _createdAt, status, votes, slug } = project;
  return (
    <tr key={_id} className="border-b border-gray-200 font-light animate-fade">
      <th
        scope="row"
        className="px-2 md:px-6 py-4 font-medium md:whitespace-nowrap"
      >
        <Link
          href={`projects/${slug?.current}`}
          className="hover:underline group relative"
        >
          <LinkIcon className="size-4 opacity-0 md:group-hover:opacity-100 absolute -left-5 top-0" />
          <span>{title}</span>
        </Link>
      </th>
      <td className="px-2 md:px-6 py-4">{formatDate(_createdAt)}</td>
      <td className="px-2 md:px-6 py-4 capitalize">
        <StatusLabel
          label={
            status as
              | "review"
              | "appeal"
              | "progress"
              | "completed"
              | "evaluation"
          }
        />
      </td>
      <td className="px-2 md:px-6 py-4">{votes}</td>
    </tr>
  );
};

export default ProjectsTableRow;
