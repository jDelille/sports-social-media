import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../../../hooks";

type RepostButtonProps = {
  type: string;
  postId: number;
  setError: (error: string | null) => void;
  hasReposted: boolean;
  username: string;
};

const RepostButton: React.FC<RepostButtonProps> = ({
  type,
  postId,
  setError,
  hasReposted,
  username,
}) => {
    const queryClient = useQueryClient();

  const handleRepost = async (postId: number) => {
    try {
      if (!hasReposted) {
        await useAxios.post("/reposts", {
          postId: postId,
          username: username,
          type: type,
        });
      } else {
        await useAxios.delete("/reposts", {
          data: {
            postId: postId,
            type: type,
          },
        });
      }
    } catch (error) {
      setError("error reposting!!");
    }
  };

  const { mutate } = useMutation({
    mutationFn: handleRepost,
    onSettled: async () => {
      queryClient.refetchQueries();
    
    },
    mutationKey: ["addLike"]
  })

  const handleRepostClick = async (postId: number) => {
    try {
      mutate(postId);
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={() => handleRepostClick(postId)}>
    {hasReposted ? "Unrepost" : "Repost"}
  </button>;
};

export default RepostButton;
