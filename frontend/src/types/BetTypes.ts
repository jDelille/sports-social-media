export type Bet = {
  id?: number;
  picks: {
    post_id: number;
    user_id: number;
    bet_type: string;
    homeAbbreviation: string;
    awayAbbreviation: string;
    homeLogo: string;
    awayLogo: string;
    event_id: string;
    status: string;
    wager: number;
    payout: number;
    is_winner: boolean;
    is_boosted: boolean;
    created_at: string;
    updated_at: string;
  }[];
};
