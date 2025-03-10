"use client";
import Form from "next/form";
import React, { useState } from "react";
import { SaveIcon, SaveIconFill } from "../icons";

export const SaveForm = ({ handleSave }: { handleSave: () => void }) => {
  const [isSaved, setIsSaved] = useState<boolean | null>();
  return (
    <Form
      action={handleSave}
      onSubmit={() => {
        setIsSaved(true);
      }}
    >
      <button type="submit" className="!p-3 rounded-full button--white">
        <SaveIcon className={`size-6 ${isSaved ? "hidden" : "animate-fade"}`} />
        <SaveIconFill
          className={`size-6 ${!isSaved ? "hidden" : "animate-fade"}`}
        />
        <span className="sr-only">Save project</span>
      </button>
    </Form>
  );
};

export default SaveForm;
