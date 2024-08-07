import userRelationshipsStore from "../../store/userRelationshipStore";

const useFollowUser = (followerId: number) => {
  const followUser = async () => {
    await userRelationshipsStore.followUser(followerId);
  };

  const unfollowUser = async () => {
    await userRelationshipsStore.unfollowUser(followerId);
  };

  return {
    followUser,
    unfollowUser,
    loading: userRelationshipsStore.loading,
    error: userRelationshipsStore.error,
    success: userRelationshipsStore.success,
  };
};

export default useFollowUser;