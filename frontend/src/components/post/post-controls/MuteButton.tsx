import React from "react";
import { useAxios } from "../../../hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type MuteButtonProps = {
  postId: number;
  type: string;
  setError: (error: string | null) => void;
  hasMuted: boolean;
};

const MuteButton: React.FC<MuteButtonProps> = ({
  type,
  postId,
  setError,
  hasMuted,
}) => {
  const queryClient = useQueryClient();

  const handleMutePost = async (postId: number) => {
    try {
      if (!hasMuted) {
        await useAxios.post("/muted-posts", {
          postId: postId,
          type: type,
        });
        toast.success("You have muted this post.");
      } else {
        await useAxios.delete("/muted-posts", {
          data: {
            postId: postId,
            type: type,
          },
        });
        toast.success("You have unmuted this post.");
      }
    } catch (error) {
      setError("error muting post");
    }
  };

  const { mutate } = useMutation({
    mutationFn: handleMutePost,
    onSettled: async () => {
      queryClient.refetchQueries();
    },
    mutationKey: ["addMute"],
  });

  const handleMuteClick = async (postId: number, e: any) => {
    e.stopPropagation();

    try {
      mutate(postId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={(e) => handleMuteClick(postId, e)}>
      {hasMuted ? "Unmute post" : "Mute post"}
    </button>
  );
};

export default MuteButton;
