import React from "react";
import useUserRelationships from "../../hooks/relationships/userRelationships";
import UserTypes from "../../types/User";

type RelationshipsProps = {
  user: UserTypes;
};
const Relationships: React.FC<RelationshipsProps> = ({ user }) => {
  const { data: userRelationships } = useUserRelationships(user?.id);

  return (
    <div className="relationships">
      <p>
        <span>{userRelationships?.followerCount || 0} </span>Followers
      </p>
      <p>
        <span>{userRelationships?.followingCount || 0}</span>Following
      </p>
      <p>
        <span>0</span>Bets
      </p>
    </div>
  );
};

export default Relationships;
