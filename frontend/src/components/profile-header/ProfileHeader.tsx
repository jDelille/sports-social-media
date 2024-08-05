import React, { useContext } from "react";
import UserTypes from "../../types/User";
import Avatar from "../avatar/Avatar";
import { CalendarIcon, LocationIcon, MenuDotsIcon } from "../../icons";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./profileheader.scss";

type ProfileHeaderProps = {
  user: UserTypes;
};
const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const joinedDate = moment(user?.created_at).format("MMMM YYYY");
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);

  const isVerified = user?.isVerified === 1;

  const isUserProfile = currentUser?.id === user?.id;

  const navigateToEditProfile = () => {
    navigate("/settings/profile");
  };

  return (
    <div className="profile-header">
      <div
        className="header-img"
        style={{
          backgroundImage: `url(${user?.header_img})`,
          backgroundSize: "cover",
          backgroundPositionY: "-40px",
        }}
      >
        <Avatar src={user?.avatar} username={user?.username as string} isVerified={isVerified} />
      </div>

      <div className="user-content">
        <div className="menu-wrapper">
          <div className="menu-btn">
            <MenuDotsIcon color="black" size={20} />
          </div>
          {isUserProfile ? (
            <button className="follow-btn" onClick={navigateToEditProfile}>
              Edit profile
            </button>
          ) : (
            <button className="follow-btn">Follow</button>
          )}
        </div>
        <p className="name">{user?.name} </p>
        <p className="username">@{user?.username}</p>
        {user?.bio && <p className="bio">{user?.bio}</p>}
        <div className="relationships">
          <p>
            <span>0</span>Followers
          </p>
          <p>
            <span>0</span>Following
          </p>
          <p>
            <span>0</span>Bets
          </p>
        </div>
        <p className="joined">
          <CalendarIcon size={15} color="#868393" /> Joined {joinedDate}
          {user?.location && (
            <div className="location">
              <LocationIcon size={16} color="#868393" />
              <span>{user?.location}</span>
            </div>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
