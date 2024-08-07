import React from "react";
import useUserRelationships from "../../hooks/relationships/userRelationships";
import UserTypes from "../../types/User";
import { observer } from "mobx-react";

type RelationshipsProps = {
  user: UserTypes;
  setSelectedFeed: (val: string) => void;
};
const Relationships: React.FC<RelationshipsProps> = observer(({ user, setSelectedFeed }) => {
  const { data: userRelationships, count } = useUserRelationships(user?.id);
 


  return (
    <div className="relationships">
      <p onClick={() => setSelectedFeed("followers")}>
        <span>{count.followerCount} </span>Followers
      </p>
      <p onClick={() => setSelectedFeed("following")}>
        <span>{userRelationships?.followingCount || 0}</span>Following
      </p>
      <p>
        <span>0</span>Bets
      </p>
    </div>
  );
});

export default Relationships;
