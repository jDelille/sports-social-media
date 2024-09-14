import { makeAutoObservable } from "mobx";

class UserRelationshipsStore {
  followerCount = 0;
  followingCount = 0;
  betCount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setFollowerCount(count: number) {
    this.followerCount = count;
  }

  setFollowingCount(count: number) {
    this.followingCount = count;
  }

  setBetCount(count: number) {
    this.betCount = count;
  }

  setRemoveFollowing() {
    this.followingCount -= 1;
  }

  setAddFollowing() {
    this.followingCount += 1;
  }
}

export const userRelationshipsStore = new UserRelationshipsStore();