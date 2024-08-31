import React, { useContext, useState } from "react";
import { Group } from "../../types/GroupTypes";
import { AuthContext } from "../../context/AuthContext";
import { BellIcon, MenuDotsIcon } from "../../icons";
import { useNavigate, useParams } from "react-router-dom";
import GroupMenu from "./GroupMenu";
import { useAxios } from "../../hooks";
import "./group.scss";

type GroupActionButtonsProps = {
  group: Group;
  currentUserId: number;
  isMember: boolean;
};

const GroupActionButtons: React.FC<GroupActionButtonsProps> = ({
  group,
  currentUserId,
  isMember,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { groupId } = useParams();
  const { currentUser } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const isAdmin = currentUserId === group.admin_id;

  const handleManageGroupClick = () => {
    navigate(`/group/manage/${group.id}`);
  };

  const handleJoinGroupClick = async () => {
    setLoading(true);
    setError(null);

    try {
      await useAxios.post("/group-members/add", {
        groupId: group.id,
        userId: currentUserId,
        role: "member",
      });
      // Optionally update the UI or state here to reflect the user joining the group
    } catch (error) {
      setError("Failed to join the group");
      console.error("Error joining group:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveGroupClick = async () => {
    if (!group.id || !currentUser) return;

    setLoading(true);
    setError(null);

    try {
      await useAxios.delete(`/group-members/remove`, {
        data: {
          groupId,
          userId: currentUser.id,
        },
      });
      console.log("Successfully left the group");
      // Optionally update the UI or state here to reflect the user leaving the group
    } catch (error) {
      setError("Failed to leave the group");
      console.error("Error leaving group:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="action-btns">
      {isAdmin ? (
        <>
          <button className="small-btn" disabled={loading}>
            <BellIcon size={20} color="black" />
          </button>
          <div className="dropdown-menu">
            <button
              className="small-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              disabled={loading}
            >
              <MenuDotsIcon size={20} color="black" />
              {isMenuOpen && (
                <GroupMenu groupId={group.id} groupName={group.name} />
              )}
            </button>
          </div>
          <button
            className="large-btn"
            onClick={handleManageGroupClick}
            disabled={loading}
          >
            {loading ? "Loading..." : "Manage Group"}
          </button>
        </>
      ) : (
        <>
          <button className="small-btn" disabled={loading}>
            <BellIcon size={20} color="black" />
          </button>
          <div className="dropdown-menu">
            <button
              className="small-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              disabled={loading}
            >
              <MenuDotsIcon size={20} color="black" />
              {isMenuOpen && (
                <GroupMenu groupId={group.id} groupName={group.name} />
              )}
            </button>
          </div>

          {isMember ? (
            <button
              className="large-btn"
              onClick={handleLeaveGroupClick}
              disabled={loading}
            >
              {loading ? "Leaving..." : "Leave Group"}
            </button>
          ) : (
            <button
              className="large-btn"
              onClick={handleJoinGroupClick}
              disabled={loading}
            >
              {loading ? "Joining..." : "Join Group"}
            </button>
          )}
        </>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default GroupActionButtons;