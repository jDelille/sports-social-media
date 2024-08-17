import React from "react";
import "./boxscore.scss";
import { categorizeStats } from "../../../utils/boxscoreUtils";

type BoxScoreProps = {
  boxscore: any;
};

const BoxScore: React.FC<BoxScoreProps> = ({ boxscore }) => {
  const homeBoxscore = boxscore?.teams[1];
  const awayBoxscore = boxscore?.teams[0];

  const categorizedStats = categorizeStats(
    homeBoxscore?.statistics,
    awayBoxscore?.statistics
  );
  const homeLogo = homeBoxscore?.team.logo;
  const homeAbbrev = homeBoxscore?.team.abbreviation;
  const awayLogo = awayBoxscore?.team.logo;
  const awayAbbrev = awayBoxscore?.team.abbreviation;

  const renderCategory = (categoryName: string, stats: any[]) => (
    <div className={`box-score-category ${categoryName}`} key={categoryName}>
      <h3>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h3>
      {stats.map((stat, index) => (
        <div key={index} className="stat-pair">
          <div className="stat home-stat">
            <span className="stat-label">{stat.home?.label || "N/A"}:</span>
            <span className="stat-value">{stat.home?.displayValue || "-"}</span>
          </div>
          <div className="stat away-stat">
            <span className="stat-label">{stat.away?.label || "N/A"}:</span>
            <span className="stat-value">{stat.away?.displayValue || "-"}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="box-score">
      {Object.keys(categorizedStats).map((category) =>
        renderCategory(category, categorizedStats[category])
      )}
    </div>
  );
};

export default BoxScore;
