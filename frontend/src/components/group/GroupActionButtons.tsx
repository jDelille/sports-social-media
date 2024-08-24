import React, { useContext } from 'react';
import { Group } from '../../types/GroupTypes';
import './group.scss';
import { AuthContext } from '../../context/AuthContext';
import { BellIcon, MenuDotsIcon } from '../../icons';

type GroupActionButtonsProps = {
    group: Group;
 }
const GroupActionButtons: React.FC<GroupActionButtonsProps> = ({group}) => {

    const {currentUser} = useContext(AuthContext) || {};

    const isAdmin = currentUser.id === group.admin_id;


  return (
    <div className="action-btns">
         {isAdmin ? (
        // Render buttons for admin
        <>
          <button className="small-btn">
            <BellIcon size={20} color='black'/>
          </button>
          <button className="small-btn">
            <MenuDotsIcon size={20} color='black'/>
          </button>
          <button className="large-btn">Manage Group</button>
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