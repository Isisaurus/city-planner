import { MagnifyingGlass } from "@/components/icons";
import { ProjectsTable, ResetSearchFormButton } from "@/components/ui";
import { client } from "@/sanity/lib/client";
import { PROJECTS_SEARCH_QUERY } from "@/sanity/lib/queries";
import { Project } from "@/sanity/types";
import Form from "next/form";
import Link from "next/link";

export default async function ProjectsPage({
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
      <section className="container section py-5 rounded-3xl">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl leading-[70px] font-medium">
            Projects Overview
          </h1>
          <p className=" text-gray-700 font-medium tracking-wider">
            All City Projects in One Place - Search, Filter & Stay Updated
          </p>
        </div>
      </section>
      <section className="container section">
        <Form
          action="/projects"
          scroll={false}
          className="bg-white border-2 border-black rounded-full py-2 px-3 flex gap-1 my-4 max-w-screen-md"
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
        <div>
          {allProjects.length > 0 ? (
            <ProjectsTable initialProjects={allProjects} />
          ) : (
            <div className="message">
              <p>No projects found for {`"${query}"`}.</p>
              <Link className="button text-base font-normal" href="/projects">
                Reset Search
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
