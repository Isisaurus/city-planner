"use client";
import { formatDate } from "@/lib/utils";
import { Project } from "@/sanity/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ChevronDown from "../icons/ChevronDown";

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
        direction:
          prev.keyToSort !== header.KEY
            ? "desc"
            : prev.direction === "desc"
              ? "asc"
              : "desc",
      };
    });
  };

  const getSortedProjects = () => {
    if (!filteredProjects) return null;

    return [...filteredProjects].sort((a, b) => {
      const key = sortCriteria.keyToSort as keyof Project;
      const valueA = a[key];
      const valueB = b[key];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortCriteria.direction === "asc"
          ? valueB.localeCompare(valueA)
          : valueA.localeCompare(valueB);
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

  useEffect(() => {
    if (filteredProjects) {
      setFilteredProjects((prev) =>
        prev?.length === 1 ? prev : getSortedProjects(),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortCriteria]);

  return (
    <table className="w-full text-sm text-left text-black bg-transparent">
      <thead className="text-xs">
        <tr>
          {tableHeaders.map((tableheader) => (
            <th key={tableheader.KEY} scope="col">
              <button
                className="px-2 md:px-6 py-3 border-2 border-transparent hover:border-black text-left flex justify-between items-center gap-1 uppercase bg-white rounded-full"
                onClick={() => handleHeaderClick(tableheader)}
              >
                <span>{tableheader.title}</span>
                <ChevronDown
                  className={`size-4 stroke-[2.5] transition-all ease-out ${tableheader.KEY === sortCriteria.keyToSort && sortCriteria.direction === "asc" ? "rotate-180" : ""} ${tableheader.KEY !== sortCriteria.keyToSort ? "text-gray-400" : ""}`}
                />
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
                <tr key={_id} className="border-b border-gray-200 font-light">
                  <th
                    scope="row"
                    className="px-2 md:px-6 py-4 font-medium md:whitespace-nowrap"
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

// status should be checkbox
