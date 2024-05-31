import React from "react";
import useCreateCommentModal from "../../../hooks/useCreateCommentModal";

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
    <button className="comment button" onClick={handleComment}>
      Comment, {commentsCount} comments
    </button>
  );
};

export default CommentButton;
