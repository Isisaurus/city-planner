/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ThumbsUp } from "../icons";
import Link from "next/link";
import { Project } from "@/sanity/types";
import { formatDate } from "@/lib/utils";

export const ProjectCard = ({ project }: { project: Project }) => {
  const { _createdAt, slug, _id, summary, status, title, votes } = project;

  return (
    <li id={_id}>
      <div className="flex flex-col max-w-sm bg-white rounded-xl shadow-md divide-y divide-gray-100">
        <div className="px-4 py-2">
          <div className="flex justify-between items-center mb-4">
            <div className="px-2 py-1 rounded-sm bg-cyan-200 text-cyan-800 font-black text-sm">
              <p>In {status}</p>
            </div>
            <div className="flex gap-1.5 font-black text-neutral-500">
              <ThumbsUp className="size-6" />
              <span>{votes}</span>
            </div>
          </div>

          <div className="my-5">
            <h3 className="font-bold text-2xl">{title}</h3>
          </div>

          <div className="my-3">
            <p>{summary}</p>
          </div>
          {/* <img src={image} alt="project image" className="rounded-lg" /> */}

          <div className="text-sm flex items-center justify-between my-2">
            <p>{formatDate(_createdAt)}</p>
            <p>by City Hall</p>
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-5">
          <Link href={`/projects/${slug?.current}`} className="button">
            Project Details
          </Link>
        </div>
      </div>
    </li>
  );
};

export default ProjectCard;
