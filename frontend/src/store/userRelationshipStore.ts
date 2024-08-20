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
}

export const userRelationshipsStore = new UserRelationshipsStore();