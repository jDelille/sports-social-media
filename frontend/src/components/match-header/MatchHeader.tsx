import React from "react";
import BovadaMatchTypes from "../../types/BovadaMatch";
import moment from "moment";
import "./matchHeader.scss";

type MatchHeaderProps = {
  match: BovadaMatchTypes | null;
};
const MatchHeader: React.FC<MatchHeaderProps> = ({ match }) => {
  if (!match) {
    return;
  }

  const homeTeam = match.espnMatch?.competitions?.[0].competitors?.[0];
  const awayTeam = match.espnMatch?.competitions?.[0].competitors?.[1];

  const status = match.espnMatch?.status;

  // make into reusable hook
  const formattedTime = moment(status.type.detail, "ddd, MMMM Do [at] h:mm A z").format("h:mm A");

  const formattedDate = moment(match.date).format("MMMM D");

  return (
    <div className="match-header">
      <div className="teams">
        <div className="home">
          <img src={homeTeam.team.logo} alt="" className="logo" />
          <div className="name">
            <p>{homeTeam.team.abbreviation} {homeTeam.team.shortDisplayName}</p>
            <span className="record">{homeTeam?.records?.[0].summary}</span>
          </div>
        </div>
        <div className="status">
          <p>{formattedTime} ET</p>
          <p>{formattedDate}</p>
        </div>
        <div className="away">
          <div className="name">
            <p>{awayTeam.team.abbreviation} {awayTeam.team.shortDisplayName}</p>
            <span className="away-record">{awayTeam?.records?.[0].summary}</span>
          </div>
          <img src={awayTeam.team.logo} alt="" className="logo" />
        </div>
      </div>
      {/* <div className="recap">
        <video
          src={
            match.espnMatch.competitions[0].headlines[0].video[0].links.source
              .HD.href
          }
          controls
          className="highlight-video"
        ></video>
      </div> */}
    </div>
  );
};

export default MatchHeader;
