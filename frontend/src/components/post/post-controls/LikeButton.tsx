import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios, useLoginReminder } from "../../../hooks";
import { LikeIcon, LikedIcon } from "../../../icons";
import { COLOR_CONSTANTS } from "../../../constants";

type LikeButtonProps = {
  postId: number;
  type: string;
  hasLiked: boolean;
  setError: (error: string | null) => void;
  likesCount: number;
  currentUserId: number | undefined;
  postUsername: string;
  userId: number;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  type,
  hasLiked,
  setError,
  likesCount,
  currentUserId,
  postUsername,
  userId
}) => {
  const queryClient = useQueryClient();
  const loginReminder = useLoginReminder();

  const handleLike = async (postId: number) => {
    try {
      if (!hasLiked) {
        await useAxios.post("/likes", { postId, type }, { withCredentials: true } );
        await useAxios.post("/alerts", {
          user_id: userId,
          type: 'post',
          alerter_id: currentUserId,
          link: `/post/${postId}`,
          msg: "liked your post",
          post_id: postId,
        }, 
        { withCredentials: true } )
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

  const handleLikeClick = async (postId: number, e: any) => {
    e.stopPropagation();

    if (!currentUserId) {
      loginReminder.onOpen(
        <LikedIcon size={50} color={COLOR_CONSTANTS.LIKE_COLOR} />,
        "Like a post to show some props.",
        `Join Huddle now to let ${postUsername} know you like their post.`
      );
      return;
    }
    try {
      mutate(postId);
    } catch (error) {
      console.log(error);
    }
  };

  return hasLiked ? (
    <div className="icon like-icon" onClick={(e) => handleLikeClick(postId, e)}>
      <LikedIcon size={18} color={COLOR_CONSTANTS.LIKE_COLOR} />
      <span style={{ color: COLOR_CONSTANTS.LIKE_COLOR }}>{likesCount}</span>
    </div>
  ) : (
    <div className="icon like-icon" onClick={(e) => handleLikeClick(postId, e)}>
      <LikeIcon size={18} color={COLOR_CONSTANTS.LIGHTGRAY} />
      <span style={{ color: COLOR_CONSTANTS.LIGHTGRAY }}>{likesCount}</span>
    </div>
  );
};

export default LikeButton;
