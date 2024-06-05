import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./avatar.scss";

type AvatarProps = {
  src?: string;
  userId: number;
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  userId,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const navigateToProfile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigate(`/profile/${userId}`);
  };

  const handleMouseEnter = () => {
    if (!isHovered) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isHovered) {
      setIsHovered(false);
    }
  };

  return (
    <div className="profile-picture-container">
      <img
        src={src ? src : "../avatar-placeholder.jpg"}
        className="profile-picture"
        onClick={(e) => navigateToProfile(e)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default Avatar;
