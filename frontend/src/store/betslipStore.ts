import { makeAutoObservable } from "mobx";

export type Pick = {
  id: string;
  type: string;
  price: string;
  decimal: string;
  description: string;
  matchup: string;
  eventId: string;
  sport: string;
  league: string;
  teams: {
    home: {
      logo: string | undefined;
      abbrv: string | undefined;
    },
    away: {
      logo: string | undefined;
      abbrv: string | undefined;
    }
  };
}

export type Picks = {
    picks: Pick
}

class BetslipStore {
  picks: Pick[] = [];
  wager = 0;
  payout = 0;
  isParlay = false;
  decimalOdds = false;

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

  setWager(wager: number) {
    this.wager = wager;
  }

  setPayout(payout: number) {
    this.payout = payout;
  }

  toggleParlay() {
    this.isParlay = !this.isParlay;
  }

  toggleDecimalOdds() {
    this.decimalOdds = !this.decimalOdds
  }
}

const betslipStore = new BetslipStore();
export default betslipStore;
