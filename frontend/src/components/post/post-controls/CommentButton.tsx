import React from "react";
import useCreateCommentModal from "../../../hooks/useCreateCommentModal";
import { CommentIcon } from "../../../icons";
import { COLOR_CONSTANTS } from "../../../constants";
import { useLoginReminder } from "../../../hooks";

type CommentButtonProps = {
  commentsCount: number;
  postId: number;
  type: string;
  currentUserId: number | undefined;
};
const CommentButton: React.FC<CommentButtonProps> = ({
  commentsCount,
  postId,
  type,
  currentUserId
}) => {
  const createCommentModal = useCreateCommentModal();
  const loginReminder = useLoginReminder();

  const handleComment = () => {
    if(!currentUserId) {
      loginReminder.onOpen(
        <CommentIcon size={50} color={COLOR_CONSTANTS.ACCENT} />,
        "Reply to join the conversation.",
        "Once you create an account, you can respond to (username's) post."
      );
      return;
    }
    createCommentModal.onOpen(postId, type);
  };

  return (
    <div className="icon comment-icon"  onClick={handleComment}>
      <CommentIcon
        size={18}
        color={COLOR_CONSTANTS.LIGHTGRAY}
       
      />
      <span style={{ color: COLOR_CONSTANTS.LIGHTGRAY }}>{commentsCount}</span>
    </div>
  );
};

export default CommentButton;
