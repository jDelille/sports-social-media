import React from 'react';
import { DisplayGroup } from '../../types/BovadaMatch';
import './matchCategories.scss';

type MatchCategoriesProps = {
  displayGroups: DisplayGroup[] | undefined;
 }

const MatchCategories: React.FC<MatchCategoriesProps> = ({displayGroups}) => {
  return (
    <div className="match-categories">
        {displayGroups?.map((group) => (
            <p>{group.description}</p>
        ))}
    </div>
  );
};

export default MatchCategories;