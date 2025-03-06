import Link from "next/link";
import { auth } from "../../../auth";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const session = await auth();
  const { tab: currentTab } = await searchParams;

  const tabs: { title: string; query: string | undefined }[] = [
    { title: "profile", query: undefined },
    { title: "votes", query: "votes" },
    { title: "submissions", query: "submissions" },
  ];

  if (!session?.user) {
    return (
      <section className="section, container flex flex-col items-center justify-center gap-8 py-10">
        <h1 className="text-4xl font-medium">You seem to be logged out.</h1>
        <Link href="/login" className="button">
          Sign in
        </Link>
      </section>
    );
  }

  return (
    <section className="section container py-10">
      <div className="font-medium text-center capitalize text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => {
            const { title, query } = tab;
            return (
              <li key={title} className="me-2">
                <Link
                  href={query ? `/profile?tab=${query}` : `/profile`}
                  className={`p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-800 hover:border-gray-300 block ${currentTab === query ? "text-black !border-black" : ""}`}
                >
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>{"content"}</div>
    </section>
  );
}
