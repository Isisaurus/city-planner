import { ArrowRight, MagnifyingGlass } from "@/components/icons";
import { ProjectCard, ResetSearchFormButton } from "@/components/ui";
import { client } from "@/sanity/lib/client";
import { PROJECTS_SEARCH_QUERY } from "@/sanity/lib/queries";
import { Project } from "@/sanity/types";
import Form from "next/form";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const allProjects: Project[] = await client.fetch(
    PROJECTS_SEARCH_QUERY,
    params,
  );

  return (
    <>
      <section className="container section min-h-[50vh] bg-gradient-to-r from-gray-200 via-cyan-200 to-gray-200 rounded-3xl flex flex-col gap-4 items-center justify-center text-center text-black">
        <div className="animate-fade-up flex flex-col gap-4">
          <h1 className="text-6xl leading-[70px] font-medium">
            Open Planning. <br /> Active Citizens. Better Cities.
          </h1>
          <p className="text-gray-700 font-medium tracking-wider">
            Stay informed about city projects, submit your ideas, and be part of
            the change.
          </p>
        </div>
        <Form
          action="/"
          scroll={false}
          className="bg-white py-2 px-3 rounded-full flex gap-1 my-4"
          id="search-form"
        >
          <input
            name="query"
            type="text"
            required
            minLength={2}
            placeholder="Search projects..."
            defaultValue={query}
            className="md:w-[400px] flex-1 rounded-full py-1 px-3"
          />
          <div className="flex items-center gap-2">
            {query && <ResetSearchFormButton />}
            <button
              type="submit"
              className="button flex gap-2 items-center justify-center"
            >
              <span>Search</span>
              <span className="bg-white rounded-full p-1">
                <MagnifyingGlass className="size-5 text-black" />
              </span>
            </button>
          </div>
        </Form>
      </section>
      <section className="container section my-8">
        <p className="text-2xl font-bold">
          {query ? `Search results for "${query}"` : `Highlighted projects`}
        </p>

        <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {allProjects.length > 0 ? (
            allProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <div className="message">
              <p>No projects found for {`"${query}"`}.</p>
              <Link className="button--white" href="/projects">
                Reset Search
              </Link>
            </div>
          )}
        </ul>
        <div className="flex my-5">
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
      {/* <section className="container section">
        <p>banner with some statistics</p>
      </section>
      <section className="container section">
        <p>City Card section</p>
      </section> */}
    </>
  );
}
