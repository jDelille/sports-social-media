import React, { useEffect, useState } from "react";
import GroupCard from "../group-card/GroupCard";
import { useAxios } from "../../hooks";
import "./groups.scss";

type FindGroupsProps = {};
const FindGroups: React.FC<FindGroupsProps> = () => {
  const [myGroups, setMyGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="find-groups">
      <div className="group-section">
        <div className="title">
          <h1>Promoted Groups</h1>
          <p>Show More</p>
        </div>
        <div className="section-content">
          {isLoading ? (
            <div className="loading-msg">
              <p>Loading your groups...</p>
            </div>
          ) : (
            myGroups.map((group: any) => (
              <GroupCard key={group?.id} group={group} />
            ))
          )}
        </div>
      </div>
      <div className="group-section">
        <div className="title">
          <h1>Suggested For You</h1>
          <p>Show More</p>
        </div>
        <div className="section-content"></div>
      </div>
    </div>
  );
};

export default FindGroups;
