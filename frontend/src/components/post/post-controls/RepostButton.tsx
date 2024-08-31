import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useAxios,
  useLoginReminder,
} from "../../../hooks";
import { RepostIcon } from "../../../icons";
import { COLOR_CONSTANTS } from "../../../constants";
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
  postUsername: string;
};

const RepostButton: React.FC<RepostButtonProps> = ({
  type,
  postId,
  setError,
  hasReposted,
  username,
  repostCount,
  originalPostUserId,
  currentUserId,
  postUsername
}) => {
  const queryClient = useQueryClient();
  const [openRepostPopup, setOpenRepostPopup] = useState(false);
  const loginReminder = useLoginReminder();

  const handleRepost = async (postId: number) => {
    try {
      if (!hasReposted) {
        await useAxios.post("/reposts", {
          postId: postId,
          username: username,
          type: type,
        });
        await useAxios.post("/alerts", {
          user_id: originalPostUserId,
          type: 'post',
          alerter_id: currentUserId,
          link: `/post/${postId}`,
          msg: "reposted your post",
          post_id: postId,
        })
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

  const handleRepostClick = async (postId: number, e: any) => {
    e.stopPropagation();
    if (!currentUserId) {
      return;
    }
    try {
      mutate(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenRepostPopup = (e?: any) => {
   e.stopPropagation();
    if (!currentUserId) {
      loginReminder.onOpen(
        <RepostIcon size={50} color={COLOR_CONSTANTS.REPOST_COLOR} />,
        "Repost to spread the word.",
        `When you join Huddle, you can share ${postUsername}'s post with your followers`
      );
      return;
    }
    setOpenRepostPopup(!openRepostPopup);
  };

  return (
    <div className="icon-container">
      {hasReposted ? (
        <div className="icon repost-icon" onClick={(e) => handleOpenRepostPopup(e)}>
          <RepostIcon size={18} color={COLOR_CONSTANTS.REPOST_COLOR} />
          <span style={{ color: COLOR_CONSTANTS.REPOST_COLOR }}>
            {repostCount}
          </span>
        </div>
      ) : (
        <div className="icon repost-icon" onClick={(e) => handleOpenRepostPopup(e)}>
          <RepostIcon size={18} color={COLOR_CONSTANTS.LIGHTGRAY} />
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
