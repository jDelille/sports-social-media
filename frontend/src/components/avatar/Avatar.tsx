import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIcon } from "../../icons";
import "./avatar.scss";

type AvatarProps = {
  src?: string;
  username?: string | number;
  isVerified?: boolean;
  disabled?: boolean;
  isGroup?: boolean;
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  username,
  isVerified,
  disabled,
  isGroup
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const navigateToProfile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (disabled) {
      return null;
    }
    if(isGroup) {
      navigate(`/group/${username}`);

    } else {
      navigate(`/profile/${username}`);

    }
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
      {isVerified && <CheckIcon color="#ff4775" size={28} />}
    </div>
  );
};

export default Avatar;
