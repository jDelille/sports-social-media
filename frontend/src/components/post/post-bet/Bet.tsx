import React from "react";
import PostTypes from "../../../types/Post";
import useBetCheck from "../../../hooks/bet-check/useBetCheck";
import { useGamePreview } from "../../../hooks";
import './bet.scss';
import { SyncIcon } from "../../../icons";

type BetProps = {
  post: PostTypes;
};

const Bet: React.FC<BetProps> = ({ post }) => {
  if (!post.bet) {
    return null;
  }

  const gamePreview = useGamePreview();

  const hasWager = parseInt(post.bet.wager) > 0;
  const isParlay = post.bet.isParlay;

  const winCount =
    post.bet.picks?.filter((pick) => pick.isWinner).length || 0;
  const lossCount =
    post.bet.picks?.filter((pick) => !pick.isWinner).length || 0;
  const inProgressCount =
    post.bet.picks?.filter((pick) => pick.isWinner === undefined).length || 0;

  const onGameClick = (e: any, league: string, gameId: string) => {
    e.stopPropagation();
    gamePreview.onOpen(league, gameId);
    
  };

  return (
    <div className={hasWager ? "wagered-bet" : "bet"}>
      <div className="info">
        {isParlay && (
          <p className="info-title">{post.bet.picks.length}-Leg Parlay</p>
        )}
        {!isParlay && (
          <p className="info-title">{post.bet.picks.length}-Pick Entry</p>
        )}
        {/* <div className="ratio">
          {winCount > 0 && <p>{winCount} wins</p>}
          {lossCount > 0 && <p> {lossCount} loss</p>}
          {inProgressCount > 0 && <p> {inProgressCount} in-progress</p>}
        </div> */}
      </div>

      

      {post.bet.picks?.map((pick) => {
        post.bet.picks?.forEach((pick, index) => {
          const { eventId, type, sport, league, team } = pick;

          useBetCheck({
            sport,
            league,
            eventId,
            team,
            type,
            postId: post.id,
            pickId: index,
            isUpdated: post.bet.isWinner,
            handicap: pick.handicap,
            userId: post.user_id
          });
        });

        const isWinningBet = pick.isWinner === true;
        const isInProgress = pick.isWinner === undefined;

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
              id={pick.id}
              onClick={(e) => onGameClick(e, pick.league, pick.eventId)}
            >
              <p className="description">
                {pick.type} <p>&#8226;</p>{" "}
                <span>
                  {pick.team} {pick.handicap}
                </span>
              </p>

              <div className="matchup">
                <div className="team">
                  <p>{pick.teams.away.abbrv}</p>
                  <img src={pick.teams.away.logo} alt="Away team logo" />
                  <p>{pick.awayScore}</p>
                </div>
                -
                <div className="team">
                  <p>{pick.homeScore}</p>
                  <img src={pick.teams.home.logo} alt="Home team logo" />
                  <p>{pick.teams.home.abbrv}</p>
                </div>
              </div>

              <p className="price">{pick.price}</p>
            </div>
          </div>
        );
      })}
      {hasWager && (
        <div className="payout">
          <p>Wagered ${post.bet.wager}</p>
          <p>Payout ${parseInt(post.bet.payout).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Bet;
