import React, { useContext, useEffect, useState } from "react";
import { Group } from "../../types/GroupTypes";
import { AuthContext } from "../../context/AuthContext";
import { BellIcon, MenuDotsIcon } from "../../icons";
import { useNavigate } from "react-router-dom";
import GroupMenu from "./GroupMenu";
import "./group.scss";

type GroupActionButtonsProps = {
  group: Group;
  currentUserId: number;
};
const GroupActionButtons: React.FC<GroupActionButtonsProps> = ({ group, currentUserId}) => {
  const { currentUser } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const isAdmin = currentUserId === group.admin_id;

  const handleManageGroupClick = () => {
    navigate(`/group/manage/${group.id}`);
  };

  const handleJoinGroupClick = () => {};




 

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

          <button className="large-btn" onClick={handleJoinGroupClick}>
            Join Group
          </button>
        </>
      )}
    </div>
  );
};

export default GroupActionButtons;
