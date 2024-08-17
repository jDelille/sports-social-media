import React from "react";
import "./linescores.scss";

type LinescoresProps = {
  homeScores: any;
  awayScores: any;
};
const Linescores: React.FC<LinescoresProps> = ({ homeScores, awayScores }) => {
  const lineCount = homeScores?.length;

  return (
    <div className="linescores">
      <div className="line-indices">
        {Array.from({ length: lineCount }, (_, index) => (
          <p key={index} className="index">{index + 1}</p>
        ))}
      </div>
      <div className="scores">
        {homeScores?.map((score: any) => (
          <p className="score">{score.displayValue}</p>
        ))}
      </div>
      <div className="scores">
        {awayScores?.map((score: any) => (
          <p className="score">{score.displayValue}</p>
        ))}
      </div>
    </div>
  );
};

export default Linescores;
