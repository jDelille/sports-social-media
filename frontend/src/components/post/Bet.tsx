import React from "react";
import PostTypes from "../../types/Post";

type BetProps = {
  post: PostTypes;
};

const Bet: React.FC<BetProps> = ({ post }) => {
  if (!post.bet) {
    return null;
  }

  return (
    <div className="bet">
      {post.bet.picks?.map((pick) => (
        <div className="pick" id={pick.id}>
            <div className="matchup">
                <p>{pick.matchup}</p>
            </div>
          <p>{pick.type} <span>{pick.description}</span></p>
          <p className="price">{pick.price}</p>
        
        </div>
      ))}
      <div className="payout">
      <p>Wagered ${post.bet.wager}</p>
      <p>Payout ${parseInt(post.bet.payout).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Bet;
