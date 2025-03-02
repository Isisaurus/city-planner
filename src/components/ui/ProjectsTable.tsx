"use client";
import { formatDate } from "@/lib/utils";
import { Project } from "@/sanity/types";
import React, { useEffect, useState } from "react";

export const ProjectsTable = ({
  initialProjects,
}: {
  initialProjects: Project[];
}) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[] | null>(
    null,
  );

  useEffect(() => {
    setFilteredProjects(initialProjects);
  }, [initialProjects]);

  const tableHeaders = ["title", "posted at", "status", "upvotes"];

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          {tableHeaders.map((tableheader) => (
            <th key={tableheader} scope="col" className="px-2 md:px-6 py-3">
              {tableheader}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-xs md:text-sm">
        {filteredProjects && filteredProjects.length > 0
          ? filteredProjects.map((project) => {
              const { _id, title, _createdAt, status, votes } = project;
              return (
                <tr key={_id} className="bg-white border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-2 md:px-6 py-4 font-medium text-gray-900 md:whitespace-nowrap"
                  >
                    {title}
                  </th>
                  <td className="px-2 md:px-6 py-4">
                    {formatDate(_createdAt)}
                  </td>
                  <td className="px-2 md:px-6 py-4 capitalize">{`In ${status}`}</td>
                  <td className="px-2 md:px-6 py-4">{votes}</td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
};

export default ProjectsTable;
