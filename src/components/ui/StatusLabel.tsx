import React from "react";

type StatusLabelProps = {
  label: "review" | "appeal" | "progress" | "completed" | "evaluation";
};

export const StatusLabel = ({ label }: StatusLabelProps) => {
  let customClass = "";

  switch (label) {
    case "progress":
      customClass = "bg-cyan-200 text-cyan-800";
      break;
    case "appeal":
      customClass = "bg-green-200 text-green-800";
      break;
    case "review":
      customClass = "bg-orange-200 text-orange-800";
      break;
    case "completed":
      customClass = "bg-purple-200 text-purple-800";
      break;
    default:
      customClass = "bg-gray-200 text-gray-800";
      break;
  }

  return (
    <p
      className={`px-2 py-1 font-black text-xs md:text-sm capitalize rounded-md ${customClass} text-center max-w-[110px]`}
    >
      <span>
        {label === "completed" ? "" : "in"} {label}
      </span>
    </p>
  );
};

export default StatusLabel;
