import React from "react";
import { Group } from "../../types/GroupTypes";
import "./group.scss";
import GroupActionButtons from "./GroupActionButtons";
import { WorldIcon } from "../../icons";
import { capitalizeFirstLetter } from "../../utils/capitalize";

type GroupHeaderProps = {
  group: Group | undefined;
};
const GroupHeader: React.FC<GroupHeaderProps> = ({ group }) => {
  if (!group) {
    return;
  }
  return (
    <div className="group-header-container">
      <div className="header-img">
        <img src={group.header_img} alt="" />
        <img src={group.avatar} alt="" className="avatar" />
      </div>
      <div className="group-info">
        <p className="name">{group.name}</p>
        <div className="stats">
          <p className="privacy">
            <WorldIcon size={20} color="gray" />
            {capitalizeFirstLetter(group.privacy)}
          </p>
          <p className="members">208k Members</p>
        </div>
        <p className="description">{group.description}</p>
      </div>
      <GroupActionButtons group={group} />
    </div>
  );
};

export default GroupHeader;
