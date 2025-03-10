import { formatDate } from "@/lib/utils";
import { ACTIVITYPERUSERID_QUERYResult } from "@/sanity/types";
import React from "react";
import { ChatBubbleLeft, LinkIcon, SaveIcon, ThumbsUp } from "../icons";
import Link from "next/link";

export const ActivitiesTab = ({
  activities,
  isCurrentTab,
}: {
  activities: ACTIVITYPERUSERID_QUERYResult;
  isCurrentTab: boolean;
}) => {
  //  "comment" | "save" | "unvote" | "vote"
  return (
    <div className={`${isCurrentTab ? "block" : "hidden"}`}>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {activities.map((item) => {
            const { _createdAt, activityType, projectRef, _id } = item;

            return (
              <li
                key={_id}
                className="flex flex-col md:flex-row py-5 px-3 border-b border-b-gray-200 md:items-center gap-2"
              >
                <p className="flex items-center gap-2">
                  <span className="bg-white border border-gray-600 rounded-full p-1.5 flex items-center justify-center text-gray-600">
                    {activityType === "comment" && (
                      <ChatBubbleLeft className="size-6" />
                    )}
                    {activityType === "vote" && <ThumbsUp className="size-6" />}
                    {activityType === "unvote" && (
                      <ThumbsUp className="size-6 -scale-y-100" />
                    )}
                    {activityType === "save" && <SaveIcon className="size-6" />}
                  </span>
                  <span>
                    <span className="capitalize">{activityType} </span>on
                    project{" "}
                    <Link
                      className="cursor-pointer hover:underline font-bold text-gray-600 group relative"
                      href={`/projects/${projectRef?.slug?.current}`}
                    >
                      <span>{projectRef?.title}</span>
                      <LinkIcon className="size-4 opacity-0 md:group-hover:opacity-100 absolute -right-5 top-0" />
                    </Link>
                  </span>
                </p>
                <p className="ml-auto text-gray-600">
                  {formatDate(_createdAt)}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ActivitiesTab;
