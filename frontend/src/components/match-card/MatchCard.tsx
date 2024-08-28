import React from "react";
import BovadaMatchTypes from "../../types/BovadaMatch";
import moment from "moment";
import "./matchCard.scss";
import { RightArrowSkinny } from "../../icons";

type MatchCardProps = {
  match: BovadaMatchTypes;
  onClick: (match: BovadaMatchTypes) => void;
};

const MatchCard: React.FC<MatchCardProps> = ({ match, onClick }) => {
  const homeTeam = match.espnMatch?.competitions?.[0].competitors?.[0];
  const awayTeam = match.espnMatch?.competitions?.[0].competitors?.[1];

  const odds = match.displayGroups?.[0].markets;

  const status = match.espnMatch?.status;

  // make into reusable hook
  const dateString = status?.type.shortDetail;
  const timePart =
    dateString?.split(" - ")[1]?.split(" ")[0] +
    " " +
    dateString?.split(" - ")[1]?.split(" ")[1];
  const formattedTime = moment(timePart, "h:mm A").format("h:mm A");

  if (!match) {
    return null;
  }

  const isCompleted = status.type.completed;

  return (
    <div className="match-card" onClick={() => onClick(match)}>
      <div className="match-content">
        <div className="teams">
          <div className="home">
            <div className="team">
              <img src={homeTeam?.team.logo} alt="" className="team-logo" />
              <p className="name">
                {homeTeam?.team.displayName}{" "}
                <span className="record">{homeTeam?.records?.[0].summary}</span>
              </p>
            </div>
            {!isCompleted ? (
              <div className="odds">
                {odds.map((odd) => {
                  if (odd.period.description === "Game") {
                    return (
                      <div className="odd">
                        <p>{odd.outcomes[1].price.handicap}</p>
                        <p className="price">
                          {odd.outcomes[1].price.american}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            ) : (
              <div className="scores">
                <div className="score">{homeTeam.score}</div>
              </div>
            )}
          </div>
          <div className="away">
            <div className="team">
              <img src={awayTeam?.team.logo} alt="" className="team-logo" />
              <p className="name">
                {awayTeam?.team.displayName}{" "}
                <span className="record">{awayTeam?.records?.[0].summary}</span>
              </p>
            </div>
            {!isCompleted ? (
              <div className="odds">
                {odds.map((odd) => {
                  if (odd.period.description === "Game") {
                    return (
                      <div className="odd">
                        <p>{odd.outcomes[0].price.handicap}</p>
                        <p className="price">
                          {odd.outcomes[0].price.american}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            ) : (
              <div className="scores">
                <div className="score">{awayTeam.score}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="status">
        <p>{status.type.shortDetail}</p>
        <div className="more">
          {isCompleted ? <p>Recap</p> : <p>More wagers</p>}
          <RightArrowSkinny size={20} color="black" />
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
