import { makeAutoObservable } from "mobx";

export type Pick = {
    id: string; // add id property 
    type: string;
    price: string;
    description: string;
    matchup: string;
}

export type Picks = {
    picks: Pick
}

class BetslipStore {
  picks: Pick[] = [];
  wager = 0;
  isParlay = false;

  constructor() {
    makeAutoObservable(this);
  }

  addPick(pick: Pick) {
    this.picks.push(pick);
  }

  getPicks() {
    return this.picks;
  }

  removePick(id: string) {
    this.picks = this.picks.filter(pick => pick.id !== id);
  }

  toggleParlay() {
    this.isParlay = !this.isParlay;
  }
}

const betslipStore = new BetslipStore();
export default betslipStore;