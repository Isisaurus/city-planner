import { formatDate } from "@/lib/utils";
import { Project } from "@/sanity/types";
import React from "react";
import StatusLabel from "./StatusLabel";
import { PortableText } from "next-sanity";

export const SubmissionsTab = ({
  submissions,
  isCurrentTab,
}: {
  submissions: Project[];
  isCurrentTab: boolean;
}) => {
  return (
    <div className={`${isCurrentTab ? "block" : "hidden"}`}>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <ul className="flex flex-col gap-4 divide-y-2 divide-gray-300">
          {submissions.map((item) => {
            const { _id, title, summary, description, status, _createdAt } =
              item;

            return (
              <li key={_id}>
                <article>
                  <div className="flex flex-col md:flex-row gap-4 md:items-center py-5 items-start">
                    <p className="font-medium text-2xl md:mr-auto">{title}</p>
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
                  </div>
                  <div className="max-w-screen-md">
                    <p>Submitted on {formatDate(_createdAt)}</p>
                    <p className="font-medium tracking-wider leading-7 py-5">
                      {summary}
                    </p>
                    <div className="portabletext p-3">
                      {description && <PortableText value={description} />}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SubmissionsTab;
