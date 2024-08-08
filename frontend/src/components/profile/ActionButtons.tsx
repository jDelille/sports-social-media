import React from "react";
import { useNavigate } from "react-router-dom";
import useFollowUser from "../../hooks/relationships/followUser";
import { useLoginReminder } from "../../hooks";
import UserTypes from "../../types/User";
import { COLOR_CONSTANTS } from "../../constants";
import UserPlus from "../../icons/UserPlusIcon";
import { observer } from "mobx-react";
import userRelationshipsStore from "../../store/userRelationshipStore";

type ActionButtonsProps = {
  user: UserTypes;
  currentUser: any;
  isUserProfile: boolean;
};
const ActionButtons: React.FC<ActionButtonsProps> = observer(({
  isUserProfile,
  user,
  currentUser,
}) => {
  const navigate = useNavigate();
  const { followUser, unfollowUser, loading, error, success } = useFollowUser(user?.id);
  const loginReminder = useLoginReminder();

  const isFollowing = userRelationshipsStore.userRelationships.isFollowing;

  const navigateToEditProfile = () => {
    navigate("/settings/profile");
  };

  const handleFollowClick = async () => {
    if (!currentUser) {
      loginReminder.onOpen(
        <UserPlus size={50} color={COLOR_CONSTANTS.ACCENT} />,
        `Follow ${user.username} to see what they're posting.`,
        "Join Huddle now to follow accounts and stay in touch."
      );
      return;
    }
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
    <div className="action-buttons">
      {isUserProfile ? (
        <button className="follow-btn" onClick={navigateToEditProfile}>
          Edit profile
        </button>
      ) : isFollowing ? (
        <button className="follow-btn" onClick={handleFollowClick} disabled={loading}>
          Unfollow
        </button>
      ) : (
        <button className="follow-btn" onClick={handleFollowClick} disabled={loading}>
          Follow
        </button>
      )}
      {error && <p>{error}</p>}
    </div>
  );
});

export default ActionButtons;