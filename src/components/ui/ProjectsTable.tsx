"use client";
import { formatDate } from "@/lib/utils";
import { Project } from "@/sanity/types";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import ChevronDown from "../icons/ChevronDown";
import { Funnel } from "../icons";
import StatusLabel from "./StatusLabel";

type TableHeaderType = {
  title: string;
  KEY: string;
  type: "order" | "checkbox";
};

export const ProjectsTable = ({
  initialProjects,
}: {
  initialProjects: Project[];
}) => {
  const tableHeaders: TableHeaderType[] = [
    { title: "title", KEY: "title", type: "order" },
    { title: "posted at", KEY: "_createdAt", type: "order" },
    { title: "status", KEY: "status", type: "checkbox" },
    { title: "upvotes", KEY: "votes", type: "order" },
  ];

  const [filteredProjects, setFilteredProjects] = useState<Project[] | null>(
    null,
  );
  const [projectsPool, setProjectsPool] = useState<Project[] | null>(null);
  const [sortCriteria, setSortCriteria] = useState({
    keyToSort: "_createdAt",
    direction: "desc",
  });
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set());
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const dropdownRef = useRef<null | HTMLDivElement>(null);

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

  const toggleStatusFilter = (status: string) => {
    setStatusFilter((prev) => {
      const newFilters = new Set(prev);
      if (newFilters.has(status)) {
        newFilters.delete(status); // Remove if already selected
      } else {
        newFilters.add(status); // Add if not selected
      }
      return newFilters;
    });
  };

  const getSortedProjects: (pool: Project[] | null) => Project[] | [] = (
    pool,
  ) => {
    if (!pool) return [];

    return [...pool].sort((a, b) => {
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

  const getStatusOptions = () => {
    return Array.from(
      new Set(initialProjects.map((project) => project.status).filter(Boolean)), // Removes undefined
    ) as string[];
  };

  useEffect(() => {
    if (statusFilter.size === 0) {
      setProjectsPool((prev) =>
        prev?.length === 1 ? prev : getSortedProjects(projectsPool),
      );
    } else {
      setFilteredProjects((prev) =>
        prev?.length === 1 ? prev : getSortedProjects(filteredProjects),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortCriteria]);
  useEffect(() => {
    if (statusFilter && projectsPool) {
      setFilteredProjects(
        projectsPool?.filter((project) =>
          statusFilter.has(project.status || ""),
        ),
      );
    } else {
      setFilteredProjects(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  useEffect(() => {
    setProjectsPool(initialProjects);
    getStatusOptions();
    setStatusFilter(new Set());
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusDropdownOpen(false);
      } else {
        return;
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProjects]);

  return (
    <div className="bg-gradient-to-b from-cyan-50 via-gray-200/15 to-transparent rounded-3xl shadow-md md:px-2 pt-5 pb-10">
      {/* filter navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 px-2 md:px-6 pb-20">
        <p className="text-xl font-bold">Filter available projects</p>
        <div className="flex items-center gap-2 relative">
          {tableHeaders.map((tableHeader) => {
            const { KEY, title, type } = tableHeader;
            if (type === "checkbox") {
              return (
                <div key={KEY} ref={dropdownRef}>
                  <button
                    onClick={() => setIsStatusDropdownOpen((prev) => !prev)}
                    className={`button-filter ${isStatusDropdownOpen ? "!border-black" : ""}`}
                  >
                    <span>{title}</span>
                    <Funnel
                      className={`size-4 stroke-[2.5] ${statusFilter.size === 0 ? "text-gray-500" : "text-black"}`}
                    />
                  </button>
                  <div
                    className={`absolute left-0 right-0 bottom-0 translate-y-[100%] grid transition-all duration-300 ease-in-out overflow-hidden ${
                      isStatusDropdownOpen
                        ? "grid-rows-[1fr] opacity-100 z-50"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="my-2 bg-white flex gap-4 items-center justify-center border-2 border-black rounded-lg divide-x-[1px]">
                        {getStatusOptions().map((status) => (
                          <li key={status} className="w-full border-gray-200">
                            <div className="flex items-center ps-3">
                              <input
                                id={`${status}-checkbox-list`}
                                type="checkbox"
                                checked={statusFilter.has(status)}
                                onChange={() => toggleStatusFilter(status)}
                                className="w-4 h-4 rounded-md accent-black cursor-pointer"
                              />
                              <label
                                htmlFor={`${status}-checkbox-list`}
                                className="w-full py-3 ms-2 text-xs md:text-sm font-light text-black cursor-pointer capitalize"
                              >
                                In {status}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={KEY}>
                  <button
                    className={`button-filter ${KEY === sortCriteria.keyToSort ? "!border-black" : ""}`}
                    onClick={() => handleHeaderClick(tableHeader)}
                  >
                    <span>{title}</span>
                    <ChevronDown
                      className={`size-4 stroke-[2.5] transition-all ease-out ${KEY === sortCriteria.keyToSort && sortCriteria.direction === "asc" ? "rotate-180" : ""} ${KEY !== sortCriteria.keyToSort ? "text-gray-500" : "text-black"}`}
                    />
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* table */}
      <table className="w-full text-sm text-left text-black bg-transparent">
        <thead className="text-xs">
          <tr>
            {tableHeaders.map((tableheader) => {
              const { title, KEY } = tableheader;
              return (
                <th
                  key={KEY}
                  scope="col"
                  className="uppercase font-black text-gray-600 px-2 md:px-6 py-3"
                >
                  <span>{title}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="text-xs md:text-sm">
          {statusFilter.size !== 0 &&
          filteredProjects &&
          filteredProjects.length > 0
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
                    <td className="px-2 md:px-6 py-4 capitalize">
                      <StatusLabel
                        label={
                          status as
                            | "review"
                            | "appeal"
                            | "progress"
                            | "completed"
                        }
                      />
                    </td>
                    <td className="px-2 md:px-6 py-4">{votes}</td>
                  </tr>
                );
              })
            : null}
          {statusFilter.size === 0 && projectsPool && projectsPool.length > 0
            ? projectsPool.map((project) => {
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
                    <td className="px-2 md:px-6 py-4 capitalize">
                      <StatusLabel
                        label={
                          status as
                            | "review"
                            | "appeal"
                            | "progress"
                            | "completed"
                        }
                      />
                    </td>
                    <td className="px-2 md:px-6 py-4">{votes}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
