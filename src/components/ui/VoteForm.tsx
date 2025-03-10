"use client";
import Form from "next/form";
import React, { useState } from "react";
import { ThumbsUp } from "../icons";

export const VoteForm = ({
  handleVote,
  initVotes,
}: {
  handleVote: () => Promise<number>;
  handleUnvote: () => void;
  projectId: string;
  initVotes: number;
}) => {
  const [voteCount, setVoteCount] = useState<number>(initVotes);
  const [isLoading, setIsLoading] = useState<boolean>();

  const handleVoteAction = async () => {
    setIsLoading(true);
    const newVote = await handleVote();
    setVoteCount(newVote);
    setIsLoading(false);
  };

  return (
    <div className="flex gap-3 items-center">
      <p className="font-bold text-neutral-500">
        {isLoading ? "..." : voteCount}
      </p>
      <Form action={handleVoteAction} id="vote-form">
        <button
          type="submit"
          className="button flex items-center justify-center gap-1.5"
        >
          Upvote
          <span className="bg-white rounded-full p-1">
            <ThumbsUp className="size-6 text-black" />
          </span>
        </button>
      </Form>
    </div>
  );
};

export default VoteForm;

// handle state for which form is visible, add animation, implement unvote;
// implement patching votes array for a user upon submit;
// if project is upvoted, render only unvote form; default render should show form based on user data from page, otherwise handle by state;
