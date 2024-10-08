import React, { useEffect, useState } from "react";
import { useAxios, useCreateGroupModal } from "../../hooks";
import GroupCard from "../group-card/GroupCard";
import "./groups.scss";

type MyGroupsProps = {};
const MyGroups: React.FC<MyGroupsProps> = () => {
  const [myGroups, setMyGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const createGroupModal = useCreateGroupModal();

  const handleCreateGroupClick = () => {
    createGroupModal.onOpen();
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await useAxios.get("/group/my-groups");
        setMyGroups(response.data);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="my-groups">
      {isLoading ? (
        <div className="loading-msg">
          <p>Loading your groups...</p> 
        </div>
      ) : myGroups.length === 0 ? (
        <div className="no-groups-msg">
          <h1>No Groups yet</h1>
          <p>Find or create groups and start building your betting community.</p>
          <button onClick={handleCreateGroupClick}>Create Group</button>
        </div>
      ) : (
        myGroups.map((group: any) => <GroupCard key={group?.id} group={group} />)
      )}
    </div>
  );
};

export default MyGroups;