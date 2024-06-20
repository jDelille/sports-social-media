import React from 'react';
import './matchCategories.scss';

type MatchCategoriesProps = {
    displayGroups: string[];
 }

const MatchCategories: React.FC<MatchCategoriesProps> = ({displayGroups}) => {
  return (
    <div className="match-categories">
        {displayGroups.map((group) => (
            <p>{group.description}</p>
        ))}
    </div>
  );
};

export default MatchCategories;