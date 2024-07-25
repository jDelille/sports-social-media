import React from "react";
import PostTypes from "../../types/Post";

type BetProps = {
  post: PostTypes;
};

const Bet: React.FC<BetProps> = ({ post }) => {
  console.log(post);
  if (!post.bet) {
    return null;
  }

  return (
    <div className="bet">
      {post.bet?.map((pick) => (
        <div className="pick" id={pick.id}>
            <div className="matchup">
                <p>{pick.matchup}</p>
            </div>
          <p>{pick.type} <span>{pick.description}</span></p>
          <p className="price">{pick.price}</p>
        
        </div>
      ))}
      <div className="payout">
      <p>Wagered $100</p>
      <p>Payout $540</p>
      </div>
    </div>
  );
};

export default Bet;
