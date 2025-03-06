import { writeClient } from "@/sanity/lib/write-client";

export default async function addCommentToProject(
  projectId: string,
  commentText: string,
  userId: string,
) {
  const comment = await writeClient.create({
    _type: "comment",
    text: commentText,
    userId: userId,
    projectRef: {
      _type: "reference",
      _ref: projectId,
    },
  });

  return comment;
}
