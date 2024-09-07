import React from "react";
import "./postDetailsFooter.scss";
import {
  CommentIcon,
  LikedIcon,
  LikeIcon,
  MenuDotsIcon,
  RepostIcon,
} from "../../../icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios, useLoginReminder } from "../../../hooks";
import { COLOR_CONSTANTS } from "../../../constants";

type PostDetailsFooterProps = {
  hasLiked: boolean;
  hasReposted: boolean;
  type: string;
  postId: number;
  currentUserId: number | undefined;
  postUsername: string;
};

const PostDetailsFooter: React.FC<PostDetailsFooterProps> = ({
  hasLiked,
  type,
  postId,
  currentUserId,
  postUsername,
  hasReposted
}) => {
  const queryClient = useQueryClient();
  const loginReminder = useLoginReminder();

  const handleLike = async (postId: number) => {
    try {
      if (!hasLiked) {
        await useAxios.post("/likes", { postId, type });
      } else {
        await useAxios.delete("/likes", { data: { postId, type } });
      }
    } catch (error) {
      //   setError("error liking post");
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

  return (
    <div className="post-details-footer">
      <div className="icon">
        <CommentIcon size={20} color="#737d8f" />
        Reply
      </div>
      {hasReposted ? (
        <div className="icon" >
          <RepostIcon size={20} color={COLOR_CONSTANTS.REPOST_COLOR} />
          Unrepost
        </div>
      ): (
        <div className="icon" >
        <RepostIcon size={20} color={COLOR_CONSTANTS.LIGHTGRAY} />
        Repost
      </div>
      )}
      {hasLiked ? (
        <div className="icon" onClick={() => handleLikeClick(postId)}>
          <LikeIcon size={20} color={COLOR_CONSTANTS.LIKE_COLOR} />
          Unlike
        </div>
      ) : (
        <div className="icon" onClick={() => handleLikeClick(postId)}>
          <LikeIcon size={20} color="#737d8f" />
          Like
        </div>
      )}

      <div className="icon">
        <MenuDotsIcon size={20} color="#737d8f" />
      </div>
    </div>
  );
};

export default PostDetailsFooter;
