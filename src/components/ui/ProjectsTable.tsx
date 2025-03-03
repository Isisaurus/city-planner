"use client";
import { formatDate } from "@/lib/utils";
import { Project } from "@/sanity/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type TableHeaderType = {
  title: string;
  KEY: string;
};

export const ProjectsTable = ({
  initialProjects,
}: {
  initialProjects: Project[];
}) => {
  const tableHeaders: TableHeaderType[] = [
    { title: "title", KEY: "title" },
    { title: "posted at", KEY: "_createdAt" },
    { title: "status", KEY: "status" },
    { title: "upvotes", KEY: "votes" },
  ];
  const [filteredProjects, setFilteredProjects] = useState<Project[] | null>(
    null,
  );
  const [sortCriteria, setSortCriteria] = useState({
    keyToSort: "_createdAt",
    direction: "desc",
  });

  const handleHeaderClick = (header: TableHeaderType) => {
    setSortCriteria((prev) => {
      return {
        keyToSort: header.KEY,
        direction: prev.direction === "desc" ? "asc" : "desc",
      };
    });
    setFilteredProjects((prev) =>
      prev?.length === 1 ? prev : getSortedProjects(),
    );
  };

  const getSortedProjects = () => {
    if (!filteredProjects) return null;

    return [...filteredProjects].sort((a, b) => {
      const key = sortCriteria.keyToSort as keyof Project;
      const valueA = a[key];
      const valueB = b[key];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortCriteria.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return sortCriteria.direction === "asc"
          ? valueA - valueB
          : valueB - valueA;
      } else if (valueA instanceof Date && valueB instanceof Date) {
        return sortCriteria.direction === "asc"
          ? valueA.getTime() - valueB.getTime()
          : valueB.getTime() - valueA.getTime();
      }
      return 0;
    });
  };

  useEffect(() => {
    setFilteredProjects(initialProjects);
  }, [initialProjects]);
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          {tableHeaders.map((tableheader) => (
            <th key={tableheader.KEY} scope="col">
              <button
                className="px-2 md:px-6 py-3"
                onClick={() => handleHeaderClick(tableheader)}
              >
                {tableheader.title}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-xs md:text-sm">
        {filteredProjects && filteredProjects.length > 0
          ? filteredProjects.map((project) => {
              const { _id, title, _createdAt, status, votes, slug } = project;
              return (
                <tr key={_id} className="bg-white border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-2 md:px-6 py-4 font-medium text-gray-900 md:whitespace-nowrap"
                  >
                    <Link
                      href={`projects/${slug?.current}`}
                      className="hover:underline"
                    >
                      {title}
                    </Link>
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
