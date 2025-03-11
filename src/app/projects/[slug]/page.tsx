import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY, PROJECTCOMMENTS_QUERY } from "@/sanity/lib/queries";
import { Comment, Project } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import { auth } from "../../../../auth";
import { SaveForm, VoteForm } from "@/components/ui";
import { writeClient } from "@/sanity/lib/write-client";
import { ArrowRight, Bolt, ChatBubbleLeft } from "@/components/icons";
import Link from "next/link";
import Form from "next/form";
import addCommentToProject from "@/lib/addCommentToProject";
import { revalidatePath } from "next/cache";
import createUserActivity from "@/lib/createUserActivity";

export const experimental_ppr = true;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const session = await auth();
  const queryParams = { slug: slug || null };
  const projectRes: Project[] = await client.fetch(PROJECT_QUERY, queryParams, {
    useCdn: false,
  });
  const [project] = projectRes;
  const {
    title,
    _id,
    summary,
    _createdAt,
    description,
    status,
    votes,
    coverImage,
  } = project;

  const comments: Comment[] = await client.fetch(
    PROJECTCOMMENTS_QUERY,
    {
      projectId: _id,
    },
    {
      useCdn: false,
    },
  );

  const handleVote = async () => {
    "use server";
    const session = await auth();
    if (!session?.user?.id) {
      return;
    }
    const [res] = await Promise.all([
      writeClient
        .patch(_id)
        .set({ votes: (votes || 0) + 1 })
        .commit({ returnDocuments: true }),
      createUserActivity({
        userId: session.user.id,
        activityType: "vote",
        projectRef: {
          _ref: _id,
        },
      }),
    ]);

    return res.votes;
  };

  const handleUnvote = async () => {
    "use server";
    const session = await auth();
    if (!session?.user?.id) {
      return;
    }
    const [res] = await Promise.all([
      writeClient
        .patch(_id)
        .set({ votes: (votes || 0) - 1 })
        .commit({ returnDocuments: true }),
      createUserActivity({
        userId: session.user.id,
        activityType: "unvote",
        projectRef: {
          _ref: _id,
        },
      }),
    ]);

    return res.votes;
  };

  const handleSave = async () => {
    "use server";
    const session = await auth();
    if (!session?.user?.id) {
      return;
    } else {
      createUserActivity({
        userId: session.user.id,
        activityType: "save",
        projectRef: {
          _ref: _id,
        },
      });
    }
  };

  return (
    <>
      <section className="section container p-10">
        <h1 className="text-5xl leading-14 font-medium animate-fade-up">
          {title}
        </h1>
        <div className="flex gap-5 items-center py-3">
          <div className="px-2 py-1 rounded-sm bg-cyan-200 text-cyan-800 font-black text-sm capitalize">
            <p>In {status}</p>
          </div>
          <p>{formatDate(_createdAt)}</p>
          {session && session?.user ? (
            <div className="ml-auto flex gap-6 items-center">
              <VoteForm
                handleVote={handleVote}
                handleUnvote={handleUnvote}
                projectId={_id}
                initVotes={votes || 0}
              />
              <SaveForm handleSave={handleSave} />
            </div>
          ) : null}
        </div>
      </section>
      <section
        className="flex items-center p-8 bg-center bg-no-repeat bg-cover w-full h-[200px] relative before:absolute before:inset-0 before:block before:opacity-75 before:bg-gradient-to-br before:from-gray-200 before:via-cyan-400 before:to-gray-200"
        style={{ backgroundImage: `url(${coverImage})` }}
      ></section>
      <section className="section container">
        <div className="py-10 px-3 flex gap-5 text-gray-700">
          <span className="p-3 bg-gray-100 rounded-full mb-auto animate-pulse">
            <Bolt className="size-6" />
          </span>
          <p className="font-medium tracking-wider max-w-screen-sm leading-7">
            {summary}
          </p>
        </div>
        <div className="portabletext p-3 md:p-6 max-w-screen-md">
          {description && <PortableText value={description} />}
        </div>
      </section>
      <section>{/* gallery of images */}</section>
      <section className="section container mb-10">
        <div className="px-5 py-5 md:py-10 animate-fade">
          <h1 className="text-3xl font-medium">Comments ({comments.length})</h1>
          {session?.user ? (
            <Form
              action={async (formData) => {
                "use server";
                const commentText = formData.get("comment") as string;
                if (!commentText || !session.user?.id) {
                  return;
                }
                await Promise.all([
                  addCommentToProject(_id, commentText, session?.user?.id),
                  createUserActivity({
                    userId: session.user.id,
                    activityType: "comment",
                    projectRef: {
                      _ref: _id,
                    },
                  }),
                ]);
                revalidatePath(`/projects/${slug}`);
              }}
              className="my-5 flex flex-col gap-5 max-w-screen-md"
            >
              <div>
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  required
                  id="comment"
                  name="comment"
                  rows={3}
                  className="px-5 py-3 w-full text-sm text-black border border-gray-700 bg-transparent rounded-md"
                  placeholder="Leave a comment..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="button ml-auto flex items-center justify-center gap-1.5"
              >
                <span>Post comment</span>
                <span className="bg-white rounded-full p-1 text-black">
                  <ChatBubbleLeft className="size-6" />
                </span>
              </button>
            </Form>
          ) : null}
          <div>
            {comments.length > 0 ? (
              <div className="flex flex-col gap-5 divide-y divide-gray-100 max-w-screen-md py-5">
                {comments.map((item) => {
                  const { _id, _createdAt, text } = item;

                  return (
                    <article
                      key={_id}
                      className="flex flex-col gap-5 py-5 px-3 animate-fade-up"
                    >
                      <p className="text-gray-800">{text}</p>

                      <p className="ml-auto text-gray-600 font-light">
                        {formatDate(_createdAt)}
                      </p>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p>No comments on this project yet.</p>
            )}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="flex my-10">
          <Link
            href="/projects"
            className="button--white flex items-center justify-center gap-2 ml-auto hover:gap-2.5"
          >
            To All Projects
            <span className="bg-black rounded-full p-1">
              <ArrowRight className="size-5 text-white" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
