import React from "react";
import { useInviteModal } from "../../hooks";

type GroupMenuProps = {
  groupName: string;
  groupId: number;

};
const GroupMenu: React.FC<GroupMenuProps> = ({groupId, groupName}) => {
  const inviteModal = useInviteModal();

  const handleInviteClick = () => {
    inviteModal.onOpen(groupName, groupId);
  }

  return (
    <div className="group-menu">
      <ul>
        <li onClick={handleInviteClick}>Invite</li>
      </ul>
    </div>
  );
};

export default GroupMenu;
