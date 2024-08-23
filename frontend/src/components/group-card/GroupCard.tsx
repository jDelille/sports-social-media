import React from "react";
import { useNavigate } from "react-router-dom";
import "./groupCard.scss";

type GroupCardProps = {
  group: any;
};
const GroupCard: React.FC<GroupCardProps> = ({ group }) => {

  const navigate = useNavigate();

  const handleGroupClick = () => {
    navigate(`/group/${group.id}`)
  }


  return (
    <div className="group-card" onClick={handleGroupClick}>
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
