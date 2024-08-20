import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useAxios } from "../../hooks";
import { userRelationshipsStore } from "../../store/userRelationshipStore";

type RelationshipsProps = {
  userId: number;
  setSelectedFeed: (val: string) => void;
  currentUserId: number;
};
const Relationships: React.FC<RelationshipsProps> = observer(
  ({ userId, setSelectedFeed, currentUserId }) => {

    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const countsResponse = await useAxios.get(
            `/relationships/${userId}/counts`
          );
          const betCountResponse = await useAxios.get(
            `/relationships/${userId}/bet-post-count`
          )
          userRelationshipsStore.setFollowerCount(
            countsResponse.data.followerCount
          );
          userRelationshipsStore.setFollowingCount(
            countsResponse.data.followingCount
          );
          userRelationshipsStore.setBetCount(
            betCountResponse.data.betPostCount
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, [userId, currentUserId]);

    return (
      <div className="relationships">
        <p onClick={() => setSelectedFeed("followers")}>
          <span>{userRelationshipsStore.followerCount} </span>Followers
        </p>
        <p onClick={() => setSelectedFeed("following")}>
          <span>{userRelationshipsStore.followingCount}</span>Following
        </p>
        <p>
          <span>{userRelationshipsStore.betCount}</span>Bets
        </p>
      </div>
    );
  }
);

export default Relationships;
