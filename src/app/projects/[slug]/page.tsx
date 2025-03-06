import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY } from "@/sanity/lib/queries";
import { Project } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import { auth } from "../../../../auth";
import { VoteForm } from "@/components/ui";
import { writeClient } from "@/sanity/lib/write-client";
import { ArrowRight, Bolt } from "@/components/icons";
import Link from "next/link";

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
            <VoteForm
              handleVote={handleVote}
              handleUnvote={handleUnvote}
              projectId={_id}
              initVotes={votes || 0}
            />
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
      <section>{/* gallery of images */}</section>
      <section>{/* comment section */}</section>
    </>
  );
}
