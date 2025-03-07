import { writeClient } from "@/sanity/lib/write-client";
import { UserActivity } from "@/sanity/types";

export default async function createUserActivity(
  activity: Pick<UserActivity, "userId" | "activityType"> & {
    projectRef: { _ref: string };
  },
) {
  const data: Partial<UserActivity> & { _type: "userActivity" } = {
    _type: "userActivity",
    userId: activity?.userId || "no id found",
    activityType: activity.activityType,
    projectRef: {
      _type: "reference",
      _ref: activity.projectRef?._ref,
    },
  };
  await writeClient.create(data);
}
