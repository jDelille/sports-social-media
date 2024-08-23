import React, { useEffect, useState } from "react";
import { useAxios, useCreateGroupModal } from "../../hooks";
import "./groups.scss";
import GroupCard from "../group-card/GroupCard";

type MyGroupsProps = {};
const MyGroups: React.FC<MyGroupsProps> = () => {
  const [myGroups, setMyGroups] = useState([]);

  const createGroupModal = useCreateGroupModal();

  const handleCreateGroupClick = () => {
    createGroupModal.onOpen();
  }

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await useAxios.get("/group/my-groups"); 
        setMyGroups(response.data); 
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };

    fetchGroups();
  }, []);

  console.log(myGroups)

  return (
    <div className="my-groups">
      {myGroups.length === 0 && (
        <div className="no-groups-msg">
          <h1>No Groups yet</h1>
          <p>
            Find or create groups and start building your betting community.
          </p>
          <button onClick={handleCreateGroupClick}>Create Group</button>
        </div>
      )}
      {myGroups.length > 0 && (
        myGroups.map((group) => (
          <GroupCard group={group}/>
        ))
      )}
    </div>
  );
};

export default MyGroups;
