/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { auth } from "../../../auth";
import Form from "next/form";
import { ACTIVITYPERUSERID_QUERYResult, Project } from "@/sanity/types";
import { client } from "@/sanity/lib/client";
import {
  ACTIVITYPERUSERID_QUERY,
  PROJECTPERUSERID_QUERY,
} from "@/sanity/lib/queries";
import { ActivitiesTab, SavesTab, SubmissionsTab } from "@/components/ui";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const session = await auth();
  const { tab: currentTab } = await searchParams;

  const [activities, submissions]: [ACTIVITYPERUSERID_QUERYResult, Project[]] =
    await Promise.all([
      client.fetch(
        ACTIVITYPERUSERID_QUERY,
        { id: session?.user?.id || "" },
        { useCdn: false },
      ),
      client.fetch(
        PROJECTPERUSERID_QUERY,
        { userId: session?.user?.id },
        { useCdn: false },
      ),
    ]);

  const tabs: { title: string; query: string | undefined; counter: number }[] =
    [
      { title: "activity", query: undefined, counter: activities.length },
      { title: "saves", query: "saves", counter: 0 },
      {
        title: "submissions",
        query: "submissions",
        counter: submissions.length,
      },
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
    <>
      <section className="section container py-8 md:py-10">
        <div className="flex gap-6">
          <img
            src={`${session.user.image}`}
            alt="user image"
            className="rounded-full drop-shadow-lg w-[50px] h-[50px]"
          />
          <div className="flex flex-col gap-2">
            <p className="font-medium text-xl md:text-2xl">
              {session.user.name}
            </p>
            <p className="text-gray-600 text-base md:text-xl">
              {session.user.email}
            </p>
            <Form action={"/"} className="border-t border-t-gray-200 pt-3">
              <button type="submit" className="button--white">
                Log out
              </button>
            </Form>
          </div>
        </div>
      </section>
      <section className="section container py-10">
        <div className="font-medium text-center capitalize text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            {tabs.map((tab) => {
              const { title, query, counter } = tab;
              return (
                <li key={title} className="me-2">
                  <Link
                    href={query ? `/profile?tab=${query}` : "/profile"}
                    className={`p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-800 hover:border-gray-300 block ${currentTab === query ? "text-black !border-black" : ""} flex items-center gap-2`}
                  >
                    <span>{title}</span>
                    <span>{`(${counter})`}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="section container">
        <ActivitiesTab activities={activities} isCurrentTab={!currentTab} />
        <SavesTab
          activities={activities}
          isCurrentTab={currentTab === "saves"}
        />
        <SubmissionsTab
          submissions={submissions}
          isCurrentTab={currentTab === "submissions"}
        />
      </section>
    </>
  );
}
