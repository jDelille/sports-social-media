import React from "react";
import './groups.scss';

type FindGroupsProps = {};
const FindGroups: React.FC<FindGroupsProps> = () => {
  return (
    <div className="find-groups">
      <div className="group-section">
        <div className="title">
          <h1>Trending Now</h1>
          <p>Show More</p>
        </div>
      </div>
      <div className="group-section">
        <div className="title">
          <h1>Suggested For You</h1>
          <p>Show More</p>
        </div>
      </div>
    </div>
  );
};

export default FindGroups;
