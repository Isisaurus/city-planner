"use client";
import React, { useState } from "react";
import { HomeModern, Users, LightBulb } from "../icons";
type MissionType = {
  id: number;
  title: string;
  subtitle: string;
  summary: string;
  icon: React.ReactElement;
};

export const MissionCards = () => {
  const missions: MissionType[] = [
    {
      id: 0,
      title: "Transparent Cities",
      subtitle: "Building a Future Where Every Voice Matters",
      summary:
        "<p>At the heart of our mission is a commitment to transparency in city development. Too often, urban planning decisions are made behind closed doors, leaving residents in the dark about the future of their communities. We believe that every citizen has the right to know what’s being planned, why it matters, and how they can get involved.</p><ul><li>Real-time project tracking – Stay informed on upcoming infrastructure, public spaces, and development projects.</li><li>Open data access – View detailed planning documents, funding sources, and timelines.</li><li>Community-driven updates – Receive notifications about important milestones and changes in city projects.</li></ul><p>By making government-led initiatives public and accessible, we create a system where decisions are driven by collective knowledge, not bureaucracy.</p>",
      icon: <HomeModern className="size-10" />,
    },
    {
      id: 1,
      title: "Your City, Your Ideas",
      subtitle: "From Citizen Proposals to Real Change",
      summary:
        "<p>We believe that the best ideas for improving a city come from the people who live in it. That’s why we’ve built a collaborative idea submission system where residents can propose new initiatives, from bike lanes to public parks and beyond.</p><ol><li>Submit Your Idea – Share your vision for a better city with details on implementation and benefits.</li><li>Community Support – Other verified residents can vote and comment on proposals.</li><li>Official Review – City planners and local officials receive the most supported ideas for consideration.</li></ol><p>By giving citizens a direct voice in urban development, we ensure that innovation isn’t limited to city officials—it comes from everyone.</p>",
      icon: <LightBulb className="size-10" />,
    },
    {
      id: 3,
      title: "Stronger Communities",
      subtitle: "Empowering People Through Education & Civic Engagement",
      summary:
        "<p>A well-planned city isn’t just built with roads and buildings—it’s built with informed citizens. We believe that understanding urban planning, governance, and civic responsibilities is essential for creating thriving communities.</p><ul><li>Learning Hub – Access articles, videos, and workshops about urban planning, sustainability, and local governance.</li><li>Civic Forums – Participate in live discussions with city officials, urban planners, and community leaders.</li><li>Skill-building Programs – Join initiatives that teach project management, advocacy, and urban design.</li></ul><p>When citizens are equipped with the knowledge to make informed decisions, they can contribute more effectively to the city’s future. We’re here to ensure that learning and engagement go hand in hand with community development.</p>",
      icon: <Users className="size-10" />,
    },
  ];
  const [activeTab, setActiveTab] = useState<number>(missions[0].id);

  return (
    <div className="flex flex-row rounded-[45px] gap-1 bg-white text-white divide-x-4 divide-white shadow-2xl">
      <ul className="flex flex-col justify-between border-r-4" role="tablist">
        {missions.map((item) => {
          const { id } = item;
          return (
            <li
              key={id}
              role="presentation"
              className="font-light tracking-wider text-vertical flex-1 flex border-b-4 border-b-white"
            >
              <button
                id={`tab-controller-${id}`}
                type="button"
                role="tab"
                aria-controls={`tab-content-${id}`}
                aria-selected={activeTab === id}
                className={`p-2 md:p-7 w-full flex-1 text-centerm break-keep text-nowrap ${activeTab === id ? "bg-white text-black hover:bg-gray-300" : "bg-gray-800 text-white hover:bg-gray-800/80"} cursor-pointer ${id === missions[0].id ? "rounded-br-[45px]" : ""} ${id === missions[missions.length - 1].id ? "rounded-tr-[45px]" : ""}`}
                onClick={() => setActiveTab(id)}
              >
                {item.title}
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        {missions.map((item) => {
          const { id, subtitle, summary, title, icon } = item;

          return (
            <div
              key={`tab-content-${id}`}
              id={`tab-content-${id}`}
              role="tabpanel"
              aria-labelledby={`tab-controller-${id}`}
              className={`${activeTab === id ? "visible block bg-white text-black" : "invisible hidden bg-gray-800"} flex-1 h-full px-2 md:px-10 py-5 md:py-15 rounded-r-[45px]`}
            >
              <article
                className={`${activeTab === id ? "animate-fade-right" : ""} flex flex-col gap-4`}
              >
                <h2 className="pt-10 pb-5 text-4xl md:text-6xl leading-15 font-base flex flex-col md:flex-row md:items-center gap-2 md:gap-5">
                  <div className="animate-fade-up p-4 rounded-full bg-gradient-to-r from-gray-200 via-cyan-200 to-gray-200 flex items-center justify-center mr-auto md:mr-0">
                    <span className="text-gray-700">{icon}</span>
                  </div>
                  <span>{title}</span>
                </h2>
                <h3 className="text-xl md:text-2xl py-4 leading-8 font-medium">
                  {subtitle}
                </h3>
                <div
                  className="mt-auto font-base leading-7 mission-text"
                  dangerouslySetInnerHTML={{ __html: summary }}
                ></div>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MissionCards;
