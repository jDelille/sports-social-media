import React from "react";
import "./groupCard.scss";
import { WorldIcon } from "../../icons";

type GroupCardProps = {
  group: any;
};
const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  return (
    <div className="group-card">
      <div className="avatar">
        <img src={group.avatar} alt="" />
      </div>
      <div className="group-card-info">
        <div className="group-name">
        <p className="name">{group.name}</p>
        <p className="description">{group.description}</p>
        </div>
        <div className="group-stats">
            
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
