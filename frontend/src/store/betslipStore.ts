import { makeAutoObservable } from "mobx";

export type Pick = {
  id: string;
  post_id?: number;
  user_id?: number;
  bet_type: string;
  handicap: string;
  sport: string;
  league: string;
  home_abbreviation: string;
  home_logo: string;
  away_abbreviation: string;
  away_logo: string;
  home_score?: number;
  away_score?: number;
  chosen_team: string;
  decimal_odds: string;
  status: string;
  wager: number;
  payout: number;
  price: string;
  is_winner: number;
  is_boosted: number;
  event_id: string;
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
  isParticipant = false;

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

  setIsParticipant(participant: boolean) {
    this.isParticipant = participant
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
