import React from "react";
import useBetCheck from "../../../hooks/bet-check/useBetCheck";
import { useGamePreview } from "../../../hooks";
import { Pick } from "../../../store/betslipStore";
import { BoostIcon } from "../../../icons";
import "./bet.scss";

type BetProps = {
  bets: any;
  betId: number;
};

const Bet: React.FC<BetProps> = ({ bets, betId}) => {
  if (bets.length === 0) {
    return null;
  }

  const gamePreview = useGamePreview();

  const hasWager = true;
  const isParlay = false;

  // const winCount =
  //   post.bet.picks?.filter((pick) => pick.isWinner).length || 0;
  // const lossCount =
  //   post.bet.picks?.filter((pick) => !pick.isWinner).length || 0;
  // const inProgressCount =
  //   post.bet.picks?.filter((pick) => pick.isWinner === undefined).length || 0;

  const onGameClick = (e: any, league: string, gameId: string) => {
    e.stopPropagation();
    gamePreview.onOpen(league, gameId);
  };

  return (
    <div className={hasWager ? "wagered-bet" : "bet"}>
      <div className="info">
        {isParlay && <p className="info-title">{bets.length}-Leg Parlay</p>}
        {!isParlay && <p className="info-title">{bets.length}-Pick Entry</p>}
        {/* <div className="ratio">
          {winCount > 0 && <p>{winCount} wins</p>}
          {lossCount > 0 && <p> {lossCount} loss</p>}
          {inProgressCount > 0 && <p> {inProgressCount} in-progress</p>}
        </div> */}
      </div>

      {bets.map((bet: Pick, index: number) => {
        useBetCheck({
          sport: bet.sport,
          league: bet.league,
          eventId: bet.event_id,
          team: bet.chosen_team,
          type: bet.bet_type,
          postId: bet.post_id as number,
          pickId: index,
          isWinner: bet.is_winner,
          handicap: bet.handicap,
          userId: bet.user_id as number,
          betId: betId,
          status: bet.status
        });

        const isWinningBet = bet.is_winner === 1
        const isInProgress = bet.status === "pending";

        return (
          <div className="bet-container">
            <div
              className={
                isWinningBet
                  ? "winning-pick"
                  : isInProgress
                  ? "in-progress"
                  : "losing-pick"
              }
              id={bet.id}
              onClick={(e) => onGameClick(e, bet.league, bet.event_id)}
            >
              <p className="description">
                {bet.bet_type} <p>&#8226;</p>{" "}
                <span>
                  {bet.chosen_team} {bet.handicap}
                </span>
                {bet.is_boosted === 1 && (
                  <div className="boosted">
                    <BoostIcon size={19} color="#055160" /> Boosted
                  </div>
                )}
              </p>

              <div className="matchup">
                <div className="team">
                  <p>{bet.away_abbreviation}</p>
                  <img src={bet.away_logo} alt="Away team logo" />
                  <p>{bet.away_score}</p>
                </div>
                -
                <div className="team">
                  <p>{bet.home_score}</p>
                  <img src={bet.home_logo} alt="Home team logo" />
                  <p>{bet.home_abbreviation}</p>
                </div>
              </div>

              <p className="price">{bet.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Bet;
