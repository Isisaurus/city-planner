import { ACTIVITYPERUSERID_QUERYResult } from "@/sanity/types";
import Link from "next/link";
import React from "react";

export const SavesTab = ({
  activities,
  isCurrentTab,
}: {
  activities: ACTIVITYPERUSERID_QUERYResult;
  isCurrentTab: boolean;
}) => {
  const filteredActivities = activities.filter(
    (item) => item.activityType === "save",
  );
  return (
    <div className={`${isCurrentTab ? "block" : "hidden"}`}>
      {filteredActivities.length === 0 ? (
        <p>No saves found.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {filteredActivities.map((item) => {
            const { _id, projectRef } = item;
            const { title, slug } = projectRef || {};
            if ((slug?.current, title)) {
              return (
                <li key={_id}>
                  <Link href={`/projects/${slug?.current}`}>{title}</Link>
                </li>
              );
            } else return null;
          })}
        </ul>
      )}
    </div>
  );
};

export default SavesTab;
