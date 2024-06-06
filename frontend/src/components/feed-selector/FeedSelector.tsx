import React from "react";
import "./feedSelector.scss";

type FeedSelectorProps = {
  setSelectedFeed: (selected: string) => void;
  selectedFeed: string;
  feeds: string[];
};

const FeedSelector: React.FC<FeedSelectorProps> = ({
  selectedFeed,
  setSelectedFeed,
  feeds,
}) => {

  return (
    <div className="feed-selector">
      {feeds.map((feed) => (
        <div
          className={
            selectedFeed.toLowerCase() === feed.toLowerCase() ? "selector-active" : "selector"
          }
          onClick={() => setSelectedFeed(feed.toLowerCase())}
          key={feed}
        >
          {feed}
        </div>
      ))}
      <div className="bar"></div>
    </div>
  );
};

export default FeedSelector;
