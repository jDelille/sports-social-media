import React from "react";
import PostTypes from "../../types/Post";
import useBetCheck from "../../hooks/bet-check/useBetCheck";
import { useGamePreview } from "../../hooks";

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
    post.bet.picks?.filter((pick) => pick.betStatus === 1).length || 0;
  const lossCount =
    post.bet.picks?.filter((pick) => pick.betStatus === 0).length || 0;
  const inProgressCount =
    post.bet.picks?.filter((pick) => pick.betStatus === undefined).length || 0;

  const onGameClick = () => {
    gamePreview.onOpen();
    console.log(gamePreview);
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
        <div className="ratio">
          {winCount > 0 && <p>{winCount} wins</p>}
          {lossCount > 0 && <p> {lossCount} loss</p>}
          {inProgressCount > 0 && <p> {inProgressCount} in-progress</p>}
        </div>
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
            isUpdated: post.bet.betStatus,
            handicap: pick.handicap,
          });
        });

        const isWinningBet = pick.betStatus === 1;
        const isInProgress = pick.betStatus === undefined;

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
              onClick={onGameClick}
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
                </div>
                <div className="team">
                  <img src={pick.teams.home.logo} alt="Home team logo" />
                  <p>{pick.teams.home.abbrv}</p>
                </div>
              </div>

              <p className="price">{pick.price}</p>
              {/* Display status, loading, or error for each pick */}
              {/* 
            {error && <p>Error: {error}</p>}
            {status && <p>Status: {status}</p>} */}
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
