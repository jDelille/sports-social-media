import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios, useLoginReminder } from "../../hooks";
import UserTypes from "../../types/User";
import { COLOR_CONSTANTS } from "../../constants";
import UserPlus from "../../icons/UserPlusIcon";
import { observer } from "mobx-react";
import { userRelationshipsStore } from "../../store/userRelationshipStore";
import { toast } from "react-toastify";

type ActionButtonsProps = {
  user: UserTypes;
  currentUser: any;
  isUserProfile: boolean;
};

const ActionButtons: React.FC<ActionButtonsProps> = observer(({ isUserProfile, user, currentUser }) => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const loginReminder = useLoginReminder();

  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (currentUser) {
        try {
          const response = await useAxios.get(`/relationships/${user?.id}/follow-status`);
          setIsFollowing(response.data.isFollowing);
        } catch (error) {
          console.error("Error fetching follow status:", error);
        }
      }
    };

    fetchFollowStatus();
  }, [currentUser, user?.id]);

  const handleFollowClick = async () => {
    if (!currentUser) {
      loginReminder.onOpen(
        <UserPlus size={50} color={COLOR_CONSTANTS.ACCENT} />,
        `Follow ${user.username} to see what they're posting.`,
        "Join Huddle now to follow accounts and stay in touch."
      );
      return;
    }

    const newIsFollowing = !isFollowing;
    const newFollowerCount = userRelationshipsStore.followerCount + (newIsFollowing ? 1 : -1);

    // Optimistically update UI
    setIsFollowing(newIsFollowing);
    userRelationshipsStore.setFollowerCount(newFollowerCount);

   

    try {
      if (newIsFollowing) {
        await useAxios.post(`/relationships/${user.id}/follow`);
        toast.success(`You are following @${user.username}`);
      } else {
        await useAxios.delete(`/relationships/${user.id}/unfollow`);
        toast.error(`You unfollowed @${user.username}`)
      }
    } catch (error) {
      console.error("Error updating follow status:", error);
      // Revert optimistic update if there's an error
      setIsFollowing(isFollowing);
      userRelationshipsStore.setFollowerCount(userRelationshipsStore.followerCount);
    }
  };

  return (
    <div className="action-buttons">
      {isUserProfile ? (
        <button className="edit-profile-btn" onClick={() => navigate("/settings/profile")}>
          Edit Profile
        </button>
      ) : (
        <button className="follow-btn" onClick={handleFollowClick}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
});

export default ActionButtons;