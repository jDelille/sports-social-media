import React, { useContext, useEffect, useState } from "react";
import { Group } from "../../types/GroupTypes";
import { AuthContext } from "../../context/AuthContext";
import { BellIcon, MenuDotsIcon } from "../../icons";
import { useNavigate, useParams } from "react-router-dom";
import GroupMenu from "./GroupMenu";
import "./group.scss";
import { useAxios } from "../../hooks";

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
    try {
      await useAxios.post("/group-members/add", {
        groupId: group.id,
        userId: currentUserId,
        role: "member",
      });
    } catch (error) {
      console.error("Error joining group:", error);
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
        // Render buttons for admin
        <>
          <button className="small-btn">
            <BellIcon size={20} color="black" />
          </button>
          <div className="dropdown-menu">
            <button
              className="small-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuDotsIcon size={20} color="black" />
              {isMenuOpen && (
                <GroupMenu groupId={group.id} groupName={group.name} />
              )}
            </button>
          </div>

          <button className="large-btn" onClick={handleManageGroupClick}>
            Manage Group
          </button>
        </>
      ) : (
        // Render buttons for regular members
        <>
          <button className="small-btn">
            <BellIcon size={20} color="black" />
          </button>
          <div className="dropdown-menu">
            <button
              className="small-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuDotsIcon size={20} color="black" />
              {isMenuOpen && (
                <GroupMenu groupId={group.id} groupName={group.name} />
              )}
            </button>
          </div>

          {isMember ? (
            <button className="large-btn" onClick={handleLeaveGroupClick}>
              Leave Group
            </button>
          ) : (
            <button className="large-btn" onClick={handleJoinGroupClick}>
              Join Group
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default GroupActionButtons;
