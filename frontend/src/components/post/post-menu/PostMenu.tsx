import React, { useState } from "react";
import useDynamicMenuPosition from "../../../hooks/post-hooks/useDynamicMenuPosition";
import { useDeletePopup, useFetchMutedPosts } from "../../../hooks";
import { MuteButton } from "../post-controls";
import "./postMenu.scss";

type PostMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  type: string;
  imagePath: string;
  username: string;
};

const PostMenu: React.FC<PostMenuProps> = ({
  isOpen,
  onClose,
  postId,
  type,
  imagePath,
  username
}) => {
  const [error, setError] = useState<string | null>(null);
  const { menuRef, openUpwards } = useDynamicMenuPosition(isOpen, onClose);
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
      {error && (
        <div>error</div>
      )}
      {/* Menu items */}
      <ul>
        <li>Copy link to post</li>
        <div className="divider"></div>
        <li>
          <MuteButton
            postId={postId}
            type={type}
            setError={setError}
            hasMuted={hasMuted}
          />
        </li>
        <li>
          <button onClick={(e) => handleDeletePost(e)}>Delete</button>
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
