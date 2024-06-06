import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios, useCreateQuoteRepostModal } from "../../../hooks";
import { RepostIcon } from "../../../icons";
import { APP_CONSTANTS, COLOR_CONSTANTS } from "../../../constants";
import RepostPopup from "../../repost-popup/RepostPopup";

type RepostButtonProps = {
  type: string;
  postId: number;
  setError: (error: string | null) => void;
  hasReposted: boolean;
  username: string;
  repostCount: number;
  originalPostUserId: number;
  currentUserId: number | undefined;
};

const RepostButton: React.FC<RepostButtonProps> = ({
  type,
  postId,
  setError,
  hasReposted,
  username,
  repostCount,
  originalPostUserId,
  currentUserId
}) => {
  const queryClient = useQueryClient();
  const [openRepostPopup, setOpenRepostPopup] = useState(false);

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
      handleOpenRepostPopup();
    },
    mutationKey: ["addLike"],
  });

  const handleRepostClick = async (postId: number) => {
    if(!currentUserId) {
      return;
    }
    try {
      mutate(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenRepostPopup = () => {
    
    setOpenRepostPopup(!openRepostPopup);
  };

  return (
    <div className="icon-container">
      {hasReposted ? (
        <div className="icon repost-icon" onClick={handleOpenRepostPopup}>
          <RepostIcon
            size={18}
            color={COLOR_CONSTANTS.REPOST_COLOR}
            
          />
          <span style={{ color: COLOR_CONSTANTS.REPOST_COLOR }}>
            {repostCount}
          </span>
        </div>
      ) : (
        <div className="icon repost-icon"  onClick={handleOpenRepostPopup}>
          <RepostIcon
            size={18}
            color={COLOR_CONSTANTS.LIGHTGRAY}
           
          />
          <span style={{ color: COLOR_CONSTANTS.LIGHTGRAY }}>
            {repostCount}
          </span>
        </div>
      )}
      {openRepostPopup && (
        <RepostPopup
          handleRepostClick={handleRepostClick}
          postId={postId}
          hasReposted={hasReposted}
          originalPostUserId={originalPostUserId}
          type={type}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
};

export default RepostButton;
