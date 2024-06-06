import React from "react";
import { PencilIcon, RepostIcon } from "../../icons";
import { COLOR_CONSTANTS } from "../../constants";
import { useCreateQuoteRepostModal } from "../../hooks";
import "./repostPopup.scss";

type RepostPopupProps = {
  handleRepostClick: (postId: number) => void;
  postId: number;
  hasReposted: boolean;
  originalPostUserId: number;
  type: string;
};
const RepostPopup: React.FC<RepostPopupProps> = ({
  handleRepostClick,
  postId,
  hasReposted,
  originalPostUserId,
  type
}) => {
    const createQuoteRepost = useCreateQuoteRepostModal();

    const handleOpenQuoteRepost = () => {
        createQuoteRepost.onOpen(postId, type, originalPostUserId)
    }

  return (
    <div className="repost-popup">
      <ul className="popup-options">
        <li onClick={() => handleRepostClick(postId)} className="option">
          <RepostIcon size={18} color={COLOR_CONSTANTS.LIGHTGRAY} />
          {hasReposted ? "Unrepost" : "Repost"}
        </li>
        <li className="option" onClick={handleOpenQuoteRepost}>
          <PencilIcon size={18} color={COLOR_CONSTANTS.LIGHTGRAY} />
          Quote
        </li>
      </ul>
    </div>
  );
};

export default RepostPopup;
