import React from "react";
import UserTypes from "../../types/User";
import "./userCard.scss";
import Avatar from "../avatar/Avatar";

type UserCardProps = {
  user: UserTypes;
};
const UserCard: React.FC<UserCardProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  const { name, username, avatar } = user;

  return (
    <div className="user-card">
      <Avatar src={avatar} username={username} />
      <div className="text">
        <p className="name">{name}</p>
        <p className="username">@{username}</p>
      </div>
      <button className="follow-btn">Follow</button>
    </div>
  );
};

export default UserCard;
