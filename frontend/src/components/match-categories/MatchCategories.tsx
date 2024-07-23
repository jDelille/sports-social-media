import React, { Dispatch, SetStateAction } from "react";
import { DisplayGroup } from "../../types/BovadaMatch";
import "./matchCategories.scss";

type MatchCategoriesProps = {
  displayGroups: DisplayGroup[] | undefined;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
};

const MatchCategories: React.FC<MatchCategoriesProps> = ({
  displayGroups,
  setSelectedCategory,
  selectedCategory
}) => {
  return (
    <div className="match-categories">
      {displayGroups?.map((group) => (
        <button
          className={selectedCategory === group.description ? "active" : "category-button"}
          onClick={() => setSelectedCategory(group.description)}
        >
          {group.description}
        </button>
      ))}
    </div>
  );
};

export default MatchCategories;
