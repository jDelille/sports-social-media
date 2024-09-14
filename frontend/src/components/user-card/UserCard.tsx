import React, { useContext, useEffect, useState } from "react";
import UserTypes from "../../types/User";
import Avatar from "../avatar/Avatar";
import { observer } from "mobx-react";
import { AuthContext } from "../../context/AuthContext";
import { useAxios } from "../../hooks";
import { CheckIcon } from "../../icons";
import { useNavigate } from "react-router-dom";
import { userRelationshipsStore } from "../../store/userRelationshipStore";
import "./userCard.scss";

type UserCardProps = {
  user: UserTypes;
  actionButtonLabel?: string;
  handleClick?: () => void;
  isFollower?: boolean;
};
const UserCard: React.FC<UserCardProps> = observer(
  ({ user, actionButtonLabel, handleClick, isFollower }) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    const { currentUser } = useContext(AuthContext) || {};

    if (!user) {
      return null;
    }

    const { name, username, avatar } = user;

    const isVerified = user.isVerified === 1;

    const navigate = useNavigate();

    const navigateToProfile = (
      e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
      e.stopPropagation();
      // if (disabled) {
      //   return null;
      // }
      navigate(`/profile/${username}`);
    };

    useEffect(() => {
      if (handleClick) {
        return;
      }
      const fetchFollowStatus = async () => {
        if (currentUser) {
          try {
            const response = await useAxios.get(
              `/relationships/${user?.id}/follow-status`
            );
            setIsFollowing(response.data.isFollowing);
          } catch (error) {
            console.error("Error fetching follow status:", error);
          }
        }
      };

      fetchFollowStatus();
    }, [currentUser, user?.id]);

    const handleFollowClick = async (e: any) => {
      e.stopPropagation();
      const newIsFollowing = !isFollowing;

      setIsFollowing(newIsFollowing);

      try {
        if (newIsFollowing) {
          await useAxios.post(`/relationships/${user.id}/follow`);
          userRelationshipsStore.setAddFollowing();
        } else {
          await useAxios.delete(`/relationships/${user.id}/unfollow`);
          userRelationshipsStore.setRemoveFollowing();
        }
      } catch (error) {
        console.error("Error updating follow status:", error);
        setIsFollowing(isFollowing);
      }
    };

    return (
      <div className="user-card" onClick={navigateToProfile}>
        <Avatar src={avatar} username={username} />
        <div className="text">
          <p className="name">
            {name} {isVerified && <CheckIcon color="#ff4775" size={34} />}
          </p>
          <p className="username">@{username} {currentUser.id !== user.id && isFollower && <span className="follows-badge">Follows you</span>}</p>
        </div>
        {!handleClick && currentUser.id !== user.id && (
          <button className="follow-btn" onClick={handleFollowClick}>
            {isFollowing ? "Unfollow" : "Follow back"}
          </button>
        )}
        {handleClick && (
          <button className="follow-btn" onClick={handleClick}>
          {actionButtonLabel}
        </button>
        )}
      </div>
    );
  }
);

export default UserCard;
