import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuDotsIcon } from "../../icons";
import { useAxios, useInviteModal } from "../../hooks";
import "./groupCard.scss";

type GroupCardProps = {
  group: any;
};
const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const [memberCount, setMemberCount] = useState<number>(1);

  const navigate = useNavigate();
  const inviteModal = useInviteModal();

  const handleInviteClick = (e: any) => {
    e.stopPropagation();
    inviteModal.onOpen(group.name, group.id);
  };

  const handleGroupClick = () => {
    navigate(`/group/${group.id}`);
  };

  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        const response = await useAxios.get(`/group/member-count/${group.id}`);
        
        setMemberCount(response.data);
      } catch (error) {
        console.error("Error fetching member count:", error);
      }
    };
    fetchMemberCount();
  }, [])


  return (
    <div className="group-card" onClick={handleGroupClick}>
      <div className="avatar">
        <img src={group.avatar} alt="" />
      </div>
      <div className="group-card-info">
        <div className="group-name">
          <div className="name">
            {group.name}{" "}
            {group.is_promoted === 1 && (
              <div className="promoted">Promoted</div>
            )}
          </div>

          {/* <p className="description">{group.description}</p> */}
          <p className="members">{memberCount + 1}  members</p>
          <p className="invite" onClick={(e) => handleInviteClick(e)}>
            invite
          </p>
        </div>
        <div className="group-stats">
          <MenuDotsIcon size={20} color="gray" />
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
