import React, { useEffect, useRef, useState } from "react";
import "./postMenu.scss";
import useDynamicMenuPosition from "../../../hooks/post-hooks/useDynamicMenuPosition";
import { useDeletePopup, useFetchMutedPosts } from "../../../hooks";
import { MuteButton } from "../post-controls";

type PostMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  type: string;
  imagePath: string;
};

const PostMenu: React.FC<PostMenuProps> = ({
  isOpen,
  onClose,
  postId,
  type,
  imagePath
}) => {
  const [error, setError] = useState<string | null>(null);
  const { menuRef, openUpwards } = useDynamicMenuPosition(isOpen, onClose);
  const deletePopup = useDeletePopup();

  const { muted } = useFetchMutedPosts(postId, type);

  const hasMuted = muted?.includes(postId);

  const handleDeletePost = async () => {
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
      {/* Menu items */}
      <ul>
        <li>
          <MuteButton
            postId={postId}
            type={type}
            setError={setError}
            hasMuted={hasMuted}
          />
        </li>
        <li>
          <button onClick={handleDeletePost}>Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default PostMenu;
