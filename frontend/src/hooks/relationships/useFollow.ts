import { useState, useEffect } from "react";
import useAxios from "../useAxios";

const useFollow = (userId: number, currentUserId: string) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkFollowStatus = async () => {
      setLoading(true);
      try {
        // Fetch the follow status from the backend
        const response = await useAxios.get(`/relationships/${currentUserId}/relationships`);
        const followingIds = response.data.following;
        setIsFollowing(followingIds.includes(userId));
        console.log(isFollowing)
      } catch (error) {
        console.error("Error fetching follow status:", error);
        setError("Error fetching follow status");
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      checkFollowStatus();
    }
  }, [userId, currentUserId]);

  const toggleFollow = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await useAxios.delete(`/relationships/${userId}/unfollow`);
        setIsFollowing(false);
      } else {
        await useAxios.post(`/relationships/${userId}/follow`);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error updating follow status:", error);
      setError("Error updating follow status");
    } finally {
      setLoading(false);
    }
  };

  return { isFollowing, loading, error, toggleFollow };
};

export default useFollow;