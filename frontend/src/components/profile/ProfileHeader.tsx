import React, { useContext } from "react";
import UserTypes from "../../types/User";
import { AuthContext } from "../../context/AuthContext";
import AvatarSection from "./AvatarSection";
import UserDetails from "./UserDetails";
import { observer } from "mobx-react";
import ProfileHeaderSkeleton from "../loading-skeletons/ProfileHeaderSkeleton";
import "./profileheader.scss";

type ProfileHeaderProps = {
  user: UserTypes;
  setSelectedFeed: (val: string) => void;
};
const ProfileHeader: React.FC<ProfileHeaderProps> = observer(
  ({ user, setSelectedFeed }) => {
    const { currentUser } = useContext(AuthContext);

    console.log("ProfileHeader props:", { user });


    return (
      <div className="profile-header">
        <AvatarSection user={user} />
        {!user ? (
          <ProfileHeaderSkeleton />
        ) : (
          <UserDetails
            user={user}
            currentUser={currentUser}
            setSelectedFeed={setSelectedFeed}
          />
        )}
      </div>
    );
  }
);

export default ProfileHeader;
