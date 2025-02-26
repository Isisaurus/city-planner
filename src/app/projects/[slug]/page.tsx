import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY } from "@/sanity/lib/queries";
import { Project } from "@/sanity/types";
import { PortableText } from "@portabletext/react";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const queryParams = { slug: slug || null };
  const projectRes: Project[] = await client.fetch(PROJECT_QUERY, queryParams);

  const [project] = projectRes;
  const { title, summary, _createdAt, description } = project;

  return (
    <section className="section container">
      <h1>{title}</h1>
      <p>{summary}</p>
      <p>{formatDate(_createdAt)}</p>
      <div className="portabletext">
        {description && <PortableText value={description} />}
      </div>
    </section>
  );
}
