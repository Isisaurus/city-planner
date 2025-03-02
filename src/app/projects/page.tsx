import { MagnifyingGlass } from "@/components/icons";
import { ResetSearchFormButton } from "@/components/ui";
import { client } from "@/sanity/lib/client";
import { PROJECTS_SEARCH_QUERY } from "@/sanity/lib/queries";
import { Project } from "@/sanity/types";
import Form from "next/form";

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
      <section className="container section bg-gradient-to-r from-gray-200 via-cyan-200 to-gray-200 py-10 rounded-3xl">
        <div className="min-h-[20vh] flex flex-col gap-4 justify-center items-center text-center">
          <h1 className="text-4xl md:text-4xl font-bold">Projects Overview</h1>
          <p>
            Browse all projects submitted, Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Quia, rem.
          </p>
        </div>
      </section>
      <section className="container section">
        <Form
          action="/projects"
          scroll={false}
          className="bg-gray-200 py-5 px-5 flex gap-1 my-4"
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
      <section className="container section">
        <div>
          {allProjects.length > 0 ? (
            allProjects.map((project) => (
              <p key={project._id}>{project.title}</p>
            ))
          ) : (
            <p>No projects found for `{query}`</p>
          )}
        </div>
      </section>
    </>
  );
}

// overview dashboard of ongoing projects and progress;
// project organization table: title, publish date, votes, status;
// search bar: results should also be able to be organized;
// reuse Search functionality, set that as the query => result will be initialProjects;
// initialProjects will be passed down to ProjectsTable as a default state;
// client-side filters will apply;
// should apply pagination?
