import React, { useContext } from "react";
import UserTypes from "../../types/User";
import Avatar from "../avatar/Avatar";
import { observer } from "mobx-react";
import { AuthContext } from "../../context/AuthContext";
import "./userCard.scss";

type UserCardProps = {
  user: UserTypes;
};
const UserCard: React.FC<UserCardProps> = observer(({ user }) => {
  const { currentUser } = useContext(AuthContext) || {};

  if (!user) {
    return null;
  }

  const { name, username, avatar } = user;

  const handleFollowClick = async () => {};

  return (
    <div className="user-card">
      <Avatar src={avatar} username={username} />
      <div className="text">
        <p className="name">{name}</p>
        <p className="username">@{username}</p>
      </div>
      <button className="follow-btn" onClick={handleFollowClick}>
        {/* {isFollowing ? "Unfollow" : "Follow"} */}
      </button>
    </div>
  );
});

export default UserCard;
