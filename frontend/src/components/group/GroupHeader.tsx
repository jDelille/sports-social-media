import React from "react";
import { Group } from "../../types/GroupTypes";
import GroupActionButtons from "./GroupActionButtons";
import { WorldIcon } from "../../icons";
import { capitalizeFirstLetter } from "../../utils/capitalize";
import { useAxios } from "../../hooks";
import "./group.scss";

type GroupHeaderProps = {
  group: Group | undefined;
  currentUserId: number;
  isPendingInvite: boolean;
  inviteId: number | null;
  memberCount: number | null;
  isMember: boolean;
};
const GroupHeader: React.FC<GroupHeaderProps> = ({
  group,
  currentUserId,
  isPendingInvite,
  inviteId,
  memberCount,
  isMember
}) => {

  if (!group) {
    return;
  }

  const acceptInvite = async () => {
    try {
      await useAxios.patch(`/invites/${inviteId}`, { status: "accepted" });

      await useAxios.post('/group-members/add', {
        groupId: group.id,
        userId: currentUserId,
        role: "member"
      });
    } catch (error) {
      console.error("Error accepting invite:", error);
    }
  };

  const rejectInvite = async () => {
    try {
      await useAxios.patch(`/invites/${inviteId}`, { status: "rejected" });
    } catch (error) {
      console.error("Error accepting invite:", error);
    }
  };

  return (
    <div className="group-header-container">
      {isPendingInvite && (
        <div className="pending-invite">
          <p>You've been invited to this group</p>
          <div className="btns">
            <button className="btn" onClick={acceptInvite}>Join</button>
            <button className="btn" onClick={rejectInvite}>Ignore</button>
          </div>
        </div>
      )}
      <div className="header-img">
        <img src={group.header_img} alt="" />
        <img src={group.avatar} alt="" className="avatar" />
      </div>
      <div className="group-page-info">
        <p className="name">{group.name}</p>
        <div className="stats">
          <p className="privacy">
            <WorldIcon size={20} color="gray" />
            {capitalizeFirstLetter(group.privacy)}
          </p>
          <p className="members">{memberCount as number + 1} Members</p>
        </div>
        <p className="description">{group.description}</p>
      </div>
      <GroupActionButtons group={group} currentUserId={currentUserId} isMember={isMember} />
    </div>
  );
};

export default GroupHeader;
