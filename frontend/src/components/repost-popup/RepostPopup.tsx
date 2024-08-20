import React from "react";
import { PencilIcon, RepostIcon } from "../../icons";
import { COLOR_CONSTANTS } from "../../constants";
import { useCreateQuoteRepostModal } from "../../hooks";
import "./repostPopup.scss";

type RepostPopupProps = {
  handleRepostClick: (postId: number, e: any) => void;
  postId: number;
  hasReposted: boolean;
  originalPostUserId: number;
  type: string;
  currentUserId: number | undefined;
};
const RepostPopup: React.FC<RepostPopupProps> = ({
  handleRepostClick,
  postId,
  hasReposted,
  originalPostUserId,
  type,
  currentUserId
}) => {
    const createQuoteRepost = useCreateQuoteRepostModal();

    const handleOpenQuoteRepost = (e: any) => {
      e.stopPropagation();
      if(!currentUserId) {
        return;
      }
        createQuoteRepost.onOpen(postId, type, originalPostUserId)
    }

  return (
    <div className="repost-popup">
      <ul className="popup-options">
        <li onClick={(e) => handleRepostClick(postId, e)} className="option">
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
