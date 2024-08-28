import React from "react";
import PostTypes from "../../../types/Post";
import useBetCheck from "../../../hooks/bet-check/useBetCheck";
import { useGamePreview } from "../../../hooks";
import './bet.scss';
import { Pick } from "../../../store/betslipStore";
import { BoostIcon } from "../../../icons";

type BetProps = {
  // post: PostTypes;
  bets: any;
};

const Bet: React.FC<BetProps> = ({ bets }) => {
  if (bets.length === 0) {
    return null;
  }

  const gamePreview = useGamePreview();

  const hasWager = true;
  const isParlay = false

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
        {isParlay && (
          <p className="info-title">{bets.length}-Leg Parlay</p>
        )}
        {!isParlay && (
          <p className="info-title">{bets.length}-Pick Entry</p>
        )}
        {/* <div className="ratio">
          {winCount > 0 && <p>{winCount} wins</p>}
          {lossCount > 0 && <p> {lossCount} loss</p>}
          {inProgressCount > 0 && <p> {inProgressCount} in-progress</p>}
        </div> */}
      </div>

      

      {bets.map((bet: Pick) => {
        // post.bet.picks?.forEach((pick, index) => {
          // const { eventId, type, sport, league, team } = pick;

          // useBetCheck({
          //   sport,
          //   league,
          //   eventId,
          //   team,
          //   type,
          //   postId: post.id,
          //   pickId: index,
          //   isWinner: post.bet.isWinner,
          //   handicap: pick.handicap,
          //   userId: post.user_id
          // });
        // });

        const isWinningBet = bet.is_winner === true;
        const isInProgress = bet.status === 'pending';

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
                  <BoostIcon size={19} color="#055160"/> Boosted
                </div>
              )}
              </p>

              <div className="matchup">
                <div className="team">
                  <p>{bet.away_abbreviation}</p>
                  <img src={bet.away_logo} alt="Away team logo" />
                  {/* <p>{pick.awayScore}</p> */}
                </div>
                -
                <div className="team">
                  {/* <p>{pick.homeScore}</p> */}
                  <img src={bet.home_logo} alt="Home team logo" />
                  <p>{bet.home_abbreviation}</p>
                </div>
              </div>

              <p className="price">{bet.price}</p>
            </div>
          </div>
        );
      })}
      {/* {hasWager && (
        <div className="payout">
          <p>Wagered ${post.bet.wager}</p>
          <p>Payout ${parseInt(post.bet.payout).toFixed(2)}</p>
        </div>
      )} */}
    </div>
  );
};

export default Bet;
