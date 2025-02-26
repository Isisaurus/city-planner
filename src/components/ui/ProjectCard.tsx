/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ThumbsUp } from "../icons";
import Link from "next/link";

interface TPost {
  _createdAt: string;
  _id: number;
  title: string;
  votes: number;
  author: { _id: number; name: string };
  description: string;
  category: string;
  status: string;
  image: string;
}

export const ProjectCard = ({ post }: { post: TPost }) => {
  const { _createdAt, _id, author, description, image, status, title, votes } =
    post;

  return (
    <li>
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
            <p>{description}</p>
          </div>
          <img src={image} alt="project image" className="rounded-lg" />

          <div className="text-sm flex items-center justify-between my-2">
            <p>{_createdAt}</p>
            <p>by {author.name}</p>
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-5">
          <Link href={`/projects/${_id}`} className="button">
            Project Details
          </Link>
        </div>
      </div>
    </li>
  );
};

export default ProjectCard;
