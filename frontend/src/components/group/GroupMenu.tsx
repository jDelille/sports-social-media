import React from "react";
import { useInviteModal } from "../../hooks";

type GroupMenuProps = {};
const GroupMenu: React.FC<GroupMenuProps> = () => {
  const inviteModal = useInviteModal();

  const handleInviteClick = () => {
    inviteModal.onOpen();
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
