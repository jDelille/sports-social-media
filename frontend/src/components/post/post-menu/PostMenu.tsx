import React, { useEffect, useRef, useState } from "react";
import "./postMenu.scss";
import useDynamicMenuPosition from "../../../hooks/post-hooks/useDynamicMenuPosition";
import { useDeletePopup } from "../../../hooks";

type PostMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  type: string;
};

const PostMenu: React.FC<PostMenuProps> = ({ isOpen, onClose, postId, type }) => {
  const [error, setError] = useState<string | null>(null);
  const { menuRef, openUpwards } = useDynamicMenuPosition(isOpen, onClose);
  const deletePopup = useDeletePopup();

  const handleDeletePost = async () => {
    try {
      deletePopup.onOpen(postId, type);
    } catch (error) {
      setError("error muting post");
    }
  };

  return (
    <div
      className={`post-menu ${isOpen ? "open" : ""} ${
        openUpwards ? "upwards" : "downwards"
      }`}
      ref={menuRef}
    >
      {/* Menu items */}
      <ul>
        <li>Mute post</li>
        <li onClick={handleDeletePost}>Delete</li>
      </ul>
    </div>
  );
};

export default PostMenu;
