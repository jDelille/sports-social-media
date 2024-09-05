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

          // Only update the store when data is valid
          if (countsResponse.data) {
            console.log("Fetched counts:", countsResponse.data);

            // Update MobX store here
            userRelationshipsStore.setFollowerCount(
              countsResponse.data.followerCount
            );
            userRelationshipsStore.setFollowingCount(
              countsResponse.data.followingCount
            );
            userRelationshipsStore.setBetCount(0); // Assuming betCount is always 0
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, [userId, useAxios, currentUserId]);

    return (
      <div className="relationships">
        <p onClick={() => setSelectedFeed("followers")}>
          <span>{userRelationshipsStore.followerCount} </span>Followers
        </p>
        <p onClick={() => setSelectedFeed("following")}>
          <span>{userRelationshipsStore.followingCount}</span>Following
        </p>
        <p>
          <span>{0}</span>Bets
        </p>
      </div>
    );
  }
);

export default Relationships;
