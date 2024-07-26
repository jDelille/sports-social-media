import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./avatar.scss";
import { CheckIcon } from "../../icons";

type AvatarProps = {
  src?: string;
  username: string;
  isVerified?: boolean;
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  username,
  isVerified
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const navigateToProfile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigate(`/profile/${username}`);
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
            {isVerified && <CheckIcon color="#5448ee" size={28} />}

    </div>
  );
};

export default Avatar;
