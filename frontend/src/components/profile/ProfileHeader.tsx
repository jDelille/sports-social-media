import React, { useContext } from "react";
import UserTypes from "../../types/User";
import { AuthContext } from "../../context/AuthContext";
import AvatarSection from "./AvatarSection";
import UserDetails from "./UserDetails";
import "./profileheader.scss";

type ProfileHeaderProps = {
  user: UserTypes;
  setSelectedFeed: (val: string) => void;
};
const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, setSelectedFeed}) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="profile-header">
      <AvatarSection user={user} />
      <UserDetails user={user} currentUser={currentUser} setSelectedFeed={setSelectedFeed}/>
    </div>
  );
};

export default ProfileHeader;
