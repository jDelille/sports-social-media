import React from "react";
import { Group } from "../../types/GroupTypes";

type GroupHeaderProps = {
  group: Group | undefined;
};
const GroupHeader: React.FC<GroupHeaderProps> = ({ group }) => {
  if (!group) {
    return;
  }
  return (
    <div className="group-header">
      <img src={group.header_img} alt="" />
    </div>
  );
};

export default GroupHeader;
