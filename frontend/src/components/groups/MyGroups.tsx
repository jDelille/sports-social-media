import React, { useState } from "react";
import "./groups.scss";

type MyGroupsProps = {};
const MyGroups: React.FC<MyGroupsProps> = () => {
  const [myGroups, setMyGroups] = useState([]);
  return (
    <div className="my-groups">
      {myGroups.length === 0 && (
        <div className="no-groups-msg">
          <h1>No Groups yet</h1>
          <p>
            Find or create groups and start building your betting community.
          </p>
          <button>Create Group</button>
        </div>
      )}
    </div>
  );
};

export default MyGroups;
