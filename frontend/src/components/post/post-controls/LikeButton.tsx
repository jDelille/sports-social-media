import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../../../hooks";
import { LikeIcon, LikedIcon } from "../../../icons";
import { COLOR_CONSTANTS } from "../../../constants";

type LikeButtonProps = {
  postId: number;
  type: string;
  hasLiked: boolean;
  setError: (error: string | null) => void;
  likesCount: number;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  type,
  hasLiked,
  setError,
  likesCount,
}) => {
  const queryClient = useQueryClient();

  const handleLike = async (postId: number) => {
    try {
      if (!hasLiked) {
        await useAxios.post("/likes", { postId, type });
      } else {
        await useAxios.delete("/likes", { data: { postId, type } });
      }
    } catch (error) {
      setError("error liking post");
    }
  };

  const { mutate } = useMutation({
    mutationFn: handleLike,
    onSettled: async () => {
      queryClient.refetchQueries();
    },
    mutationKey: ["addLike"],
  });

  const handleLikeClick = async (postId: number) => {
    try {
      mutate(postId);
    } catch (error) {
      console.log(error);
    }
  };

  return hasLiked ? (
    <div className="icon like-icon">
      <LikedIcon
        size={18}
        color={COLOR_CONSTANTS.LIKE_COLOR}
        onClick={() => handleLikeClick(postId)}
      />
      <span style={{ color: COLOR_CONSTANTS.LIKE_COLOR }}>{likesCount}</span>
    </div>
  ) : (
    <div className="icon like-icon">
      <LikeIcon
        size={18}
        color={COLOR_CONSTANTS.LIGHTGRAY}
        onClick={() => handleLikeClick(postId)}
      />
      <span style={{ color: COLOR_CONSTANTS.LIGHTGRAY }}>{likesCount}</span>
    </div>
  );
};

export default LikeButton;
