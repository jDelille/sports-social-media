import { makeAutoObservable } from "mobx";
import useAxios from "../hooks/useAxios";

type UserRelationships = {
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
};

class UserRelationshipsStore {
  userRelationships = {
    followerCount: 0,
    followingCount: 0,
    isFollowing: false,
  };
  loading = false;
  error: string | null = null;
  success = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUserRelationships(data: UserRelationships) {
    this.userRelationships = data;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  setSuccess(success: boolean) {
    this.success = success;
  }

  async followUser(userId: number) {
    this.userRelationships.followerCount++;
    this.userRelationships.isFollowing = true;
    this.setLoading(true);
    this.setError(null);
    this.setSuccess(false);

    try {
      const response = await useAxios.post(`/relationships/follow/${userId}`);
      if (response.status === 200) {
        this.setSuccess(true);
      }
    } catch (error: any) {
      this.userRelationships.followerCount--;
      this.userRelationships.isFollowing = false;
      this.setError(
        error.response?.data?.message ||
          "An error occurred while following the user"
      );
    } finally {
      this.setLoading(false);
    }
  }

  async unfollowUser(userId: number) {
    this.userRelationships.followerCount--;
    this.userRelationships.isFollowing = false;
    this.setLoading(true);
    this.setError(null);
    this.setSuccess(false);

    try {
      const response = await useAxios.delete(
        `/relationships/unfollow/${userId}`
      );
      if (response.status === 200) {
        this.setSuccess(true);
      }
    } catch (error: any) {
      this.userRelationships.followerCount++;
      this.userRelationships.isFollowing = true;
      this.setError(
        error.response?.data?.message ||
          "An error occurred while unfollowing the user"
      );
    } finally {
      this.setLoading(false);
    }
  }
}

const userRelationshipsStore = new UserRelationshipsStore();
export default userRelationshipsStore;
