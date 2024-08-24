import React, { useContext, useState } from "react";
import { Group } from "../../types/GroupTypes";
import "./group.scss";
import { AuthContext } from "../../context/AuthContext";
import { BellIcon, MenuDotsIcon } from "../../icons";
import { useNavigate } from "react-router-dom";
import GroupMenu from "./GroupMenu";

type GroupActionButtonsProps = {
  group: Group;
};
const GroupActionButtons: React.FC<GroupActionButtonsProps> = ({ group }) => {
  const { currentUser } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAdmin = currentUser.id === group.admin_id;

  const handleManageGroupClick = () => {
    navigate(`/group/manage/${group.id}`);
  };

  return (
    <div className="action-btns">
      {isAdmin ? (
        // Render buttons for admin
        <>
          <button
            className="small-btn"
            
          >
            <BellIcon size={20} color="black" />
          </button>
          <div className="dropdown-menu">
            <button className="small-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
          <button className="join-group-btn">Join Group</button>
          <button className="leave-group-btn">Leave Group</button>
          <button className="invite-members-btn">Invite Members</button>
        </>
      )}
    </div>
  );
};

export default GroupActionButtons;
