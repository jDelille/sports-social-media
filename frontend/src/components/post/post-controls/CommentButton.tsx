import React from "react";
import useCreateCommentModal from "../../../hooks/useCreateCommentModal";
import { CommentIcon } from "../../../icons";
import { COLOR_CONSTANTS } from "../../../constants";
import { useLoginReminder } from "../../../hooks";
import PostTypes from "../../../types/Post";

type CommentButtonProps = {
  commentsCount: number;
  postId: number;
  type: string;
  currentUserId: number | undefined;
  postUsername: string;
  post: PostTypes
};
const CommentButton: React.FC<CommentButtonProps> = ({
  commentsCount,
  postId,
  type,
  currentUserId,
  postUsername,
  post
}) => {
  const createCommentModal = useCreateCommentModal();
  const loginReminder = useLoginReminder();

  const handleComment = (e: any) => {
    e.stopPropagation();
    if(!currentUserId) {
      loginReminder.onOpen(
        <CommentIcon size={50} color={COLOR_CONSTANTS.ACCENT} />,
        "Reply to join the conversation.",
        `Once you create an account, you can respond to ${postUsername}'s post.`
      );
      return;
    }
    createCommentModal.onOpen(postId, type, post);
  };

  return (
    <div className="icon comment-icon"  onClick={(e) => handleComment(e)}>
      <CommentIcon
        size={18}
        color={COLOR_CONSTANTS.LIGHTGRAY}
       
      />
      <span style={{ color: COLOR_CONSTANTS.LIGHTGRAY }}>{commentsCount || 0}</span>
    </div>
  );
};

export default CommentButton;
