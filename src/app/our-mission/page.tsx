import { PresentationChart } from "@/components/icons";
import { MissionCards } from "@/components/ui";

export default function MissionPage() {
  const satistics: { marker: string; description: string }[] = [
    {
      marker: "12K+",
      description: "votes counted",
    },
    {
      marker: "729",
      description: "submitted ideas",
    },
    {
      marker: "81",
      description: "ongoing projects",
    },
    {
      marker: "20mil",
      description: "€ budget spent",
    },
  ];
  return (
    <>
      <section className="section container bg-gradient-to-br from-gray-100 via-cyan-200 to-gray-100 text-black rounded-4xl">
        <div className="px-10 md:px-20 pb-15">
          <h1 className="text-6xl leading-[70px] md:text-[96px] font-medium md:leading-[104px] py-[1em] animate-fade-up">
            The best ideas <br /> don`t wait
          </h1>
          <div className="flex flex-col md:flex-row gap-5 md:gap-10 md:ml-auto md:max-w-[90%] animate-fade animate-delay-[.3s]">
            <div className="bg-gray-800 border-2 border-gray-800 p-6 rounded-full flex items-center justify-center m-auto md:m-0">
              <span>
                <PresentationChart className="size-15 text-white" />
              </span>
            </div>
            <p className="md:max-w-[280px] text-gray-700 font-medium tracking-wider">
              We believe in open cities, active communities, and the power of
              everyday people to shape the places they live.
            </p>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="grid grid-cols-2 md:flex md:divide-x-2 divide-gray-300 p-5 md:p-10 md:gap-10 items-center justify-center">
          {satistics.map((item) => {
            const { marker, description } = item;
            return (
              <div
                key={marker}
                className="flex flex-col py-10 px-5 sm:px-15 gap-4 divide-y-2 divide-gray-300 md:divide-y-0"
              >
                <p className="text-3xl md:text-5xl font-black text-gray-800 py-3 my:py-0">
                  {marker}
                </p>
                <p className="font-black text-gray-600 text-sm uppercase">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="section container">
        <div className="my-20">
          <MissionCards />
        </div>
      </section>
    </>
  );
}
