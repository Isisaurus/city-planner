import { MagnifyingGlass } from "@/components/icons";
import { ResetSearchFormButton } from "@/components/ui";
import Form from "next/form";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  return (
    <>
      <section className="container section min-h-[50vh] bg-gradient-to-r from-gray-200 via-cyan-200 to-gray-200 rounded-3xl flex flex-col gap-4 items-center justify-center text-center text-black">
        <h1 className="text-4xl md:text-6xl font-bold">
          Lorem ipsum dolor <br /> sit amet consectetur.
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          quidem expedita laboriosam ducimus magni!
        </p>
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
      <section className="container section">
        <p>Highlighted projects or search results</p>
        <Link href="/projects">All projects</Link>
      </section>
      <section className="container section">
        <p>banner with some statistics</p>
      </section>
      <section className="container section">
        <p>City Card section</p>
      </section>
    </>
  );
}
