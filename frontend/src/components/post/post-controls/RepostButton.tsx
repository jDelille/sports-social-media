import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../../../hooks";
import { RepostIcon } from "../../../icons";
import { APP_CONSTANTS, COLOR_CONSTANTS } from "../../../constants";

type RepostButtonProps = {
  type: string;
  postId: number;
  setError: (error: string | null) => void;
  hasReposted: boolean;
  username: string;
  repostCount: number;
};

const RepostButton: React.FC<RepostButtonProps> = ({
  type,
  postId,
  setError,
  hasReposted,
  username,
  repostCount,
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
    mutationKey: ["addLike"],
  });

  const handleRepostClick = async (postId: number) => {
    try {
      mutate(postId);
    } catch (error) {
      console.log(error);
    }
  };

  return hasReposted ? (
    <div className="icon repost-icon">
      <RepostIcon
        size={18}
        color={COLOR_CONSTANTS.REPOST_COLOR}
        onClick={() => handleRepostClick(postId)}
      />
      <span style={{ color: COLOR_CONSTANTS.REPOST_COLOR }}>{repostCount}</span>
    </div>
  ) : (
    <div className="icon repost-icon">
      <RepostIcon
        size={18}
        color={COLOR_CONSTANTS.LIGHTGRAY}
        onClick={() => handleRepostClick(postId)}
      />
      <span style={{ color: COLOR_CONSTANTS.LIGHTGRAY }}>{repostCount}</span>
    </div>
  );
};

export default RepostButton;
