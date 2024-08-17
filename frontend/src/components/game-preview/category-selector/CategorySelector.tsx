import React, { useState } from "react";
import "./categorySelector.scss";

type CategorySelectorProps = {
  homeTeam: any;
  awayTeam: any;
};
const CategorySelector: React.FC<CategorySelectorProps> = ({
  homeTeam,
  awayTeam,
}) => {
  const categories = ["Box Score", "Plays"];
  const teams = [homeTeam?.displayName, awayTeam?.displayName];

  const [selectedTeam, setSelectedTeam] = useState(homeTeam?.displayName);

  return (
    <div className="category-selector">
      <div className="categories">
        {categories.map((category) => (
          <p className="category">{category}</p>
        ))}
      </div>
      <div className="teams">
        {teams.map((team) => (
          <p
            className={selectedTeam === team ? "active" : "inactive"}
            onClick={() => setSelectedTeam(team)}
          >
            {team}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
