import { makeAutoObservable } from "mobx";

class UserRelationshipsStore {
  followerCount = 0;
  followingCount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setFollowerCount(count: number) {
    this.followerCount = count;
  }

  setFollowingCount(count: number) {
    this.followingCount = count;
  }
}

export const userRelationshipsStore = new UserRelationshipsStore();