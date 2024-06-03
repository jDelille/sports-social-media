import React from "react";
import useCreateCommentModal from "../../../hooks/useCreateCommentModal";
import { CommentIcon } from "../../../icons";
import { COLOR_CONSTANTS } from "../../../constants";

type CommentButtonProps = {
  commentsCount: number;
  postId: number;
  type: string;
};
const CommentButton: React.FC<CommentButtonProps> = ({
  commentsCount,
  postId,
  type,
}) => {
  const createCommentModal = useCreateCommentModal();

  const handleComment = () => {
    createCommentModal.onOpen(postId, type);
  };

  return (
    <CommentIcon size={18} color={COLOR_CONSTANTS.LIGHTGRAY} onClick={handleComment} />
  );
};

export default CommentButton;
