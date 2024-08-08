import React, { useContext, useState } from "react";
import UserTypes from "../../types/User";
import Avatar from "../avatar/Avatar";
import useFollowUser from "../../hooks/relationships/followUser";
import { observer } from "mobx-react";
import { AuthContext } from "../../context/AuthContext";
import useUserRelationships from "../../hooks/relationships/userRelationships";
import "./userCard.scss";

type UserCardProps = {
  user: UserTypes;
};
const UserCard: React.FC<UserCardProps> = observer(({ user }) => {
  const {currentUser} = useContext(AuthContext) || {};
  const { data: userRelationships } = useUserRelationships(user?.id);

  if (!user) {
    return null;
  }

  const { followUser, unfollowUser, loading, error, success } = useFollowUser(
    currentUser.id
  );

  const isFollowing = userRelationships?.followers.includes(currentUser.id);

  console.log('is following', isFollowing)

  const { name, username, avatar } = user;

  const handleFollowClick = async () => {
    try {
      if (isFollowing) {
        await unfollowUser();
      } else {
        await followUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-card">
      <Avatar src={avatar} username={username} />
      <div className="text">
        <p className="name">{name}</p>
        <p className="username">@{username}</p>
      </div>
      <button className="follow-btn" onClick={handleFollowClick}>
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
});

export default UserCard;
