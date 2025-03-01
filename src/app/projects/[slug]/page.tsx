import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY } from "@/sanity/lib/queries";
import { PROJECT_QUERYResult } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import { auth } from "../../../../auth";
import { VoteForm } from "@/components/ui";
import { writeClient } from "@/sanity/lib/write-client";

export const experimental_ppr = true;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const session = await auth();
  const queryParams = { slug: slug || null };
  const projectRes: PROJECT_QUERYResult = await client.fetch(
    PROJECT_QUERY,
    queryParams,
    {
      useCdn: false,
    },
  );

  const [project] = projectRes;
  const { title, _id, summary, _createdAt, description, status, votes } =
    project;
  const handleVote = async () => {
    "use server";
    const res = await writeClient
      .patch(_id)
      .set({ votes: (votes || 0) + 1 })
      .commit({ returnDocuments: true });

    return res.votes;
  };

  const handleUnvote = async () => {
    "use server";
    const res = await writeClient
      .patch(_id)
      .set({ votes: (votes || 0) - 1 })
      .commit({ returnDocuments: true });

    return res.votes;
  };

  return (
    <>
      <section className="section container">
        <h1 className="text-4xl md:text-6xl font-bold my-7">{title}</h1>
        <div className="flex gap-5 items-center py-3">
          <div className="px-2 py-1 rounded-sm bg-cyan-200 text-cyan-800 font-black text-sm capitalize">
            <p>In {status}</p>
          </div>
          <p>{formatDate(_createdAt)}</p>
          {session && session?.user ? (
            <VoteForm
              handleVote={handleVote}
              handleUnvote={handleUnvote}
              projectId={_id}
              initVotes={votes || 0}
            />
          ) : null}
        </div>
        <p className="max-w-screen-sm py-6">{summary}</p>
        <div className="portabletext p-3 md:p-6 max-w-screen-md">
          {description && <PortableText value={description} />}
        </div>
      </section>
    </>
  );
}
