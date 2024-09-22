import React, { RefObject, useState } from "react";
import useDynamicMenuPosition from "../../../hooks/post-hooks/useDynamicMenuPosition";
import { useDeletePopup, useFetchMutedPosts } from "../../../hooks";
import { MuteButton } from "../post-controls";
import { handleCopyLink } from "../../../hooks/actions/useHandleCopyLink";
import "./postMenu.scss";

type PostMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  type: string;
  imagePath: string;
  username: string;
  buttonRef: RefObject<HTMLElement>
};

const PostMenu: React.FC<PostMenuProps> = ({
  isOpen,
  onClose,
  postId,
  type,
  imagePath,
  username,
  buttonRef
}) => {
  const [error, setError] = useState<string | null>(null);

  const { menuRef, openUpwards } = useDynamicMenuPosition(isOpen, onClose, buttonRef);
  const deletePopup = useDeletePopup();

  const { muted } = useFetchMutedPosts(postId, type);

  const hasMuted = muted?.includes(postId);

  const handleDeletePost = async (e: any) => {
    e.stopPropagation();
    try {
      deletePopup.onOpen(postId, type, imagePath);
    } catch (error) {
      setError("error muting post");
    }
  };

  const handleCopyPostLink = (e: any) => {
    e.stopPropagation();
    handleCopyLink("post", postId);
  };


  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`post-menu ${isOpen ? "open" : ""} ${
        openUpwards ? "upwards" : "downwards"
      }`}
      ref={menuRef}
    >
      {error && <div>error</div>}
      <ul>
        <li onClick={handleCopyPostLink}>Copy link to post</li>
        <div className="divider"></div>
        <li >
          <MuteButton
            postId={postId}
            type={type}
            setError={setError}
            hasMuted={hasMuted}
          />
        </li>
        <li onClick={(e) => handleDeletePost(e)}>
          Delete
        </li>
        <div className="divider"></div>
        <li>Mute @{username}</li>
        <li>Block @{username}</li>
        <li>Report @{username}</li>
      </ul>
    </div>
  );
};

export default PostMenu;
