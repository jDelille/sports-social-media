import React, { useState } from "react";
import HomeFeed from "../components/feed/HomeFeed";
import PageHeader from "../components/page-header/PageHeader";
import CreatePost from "../components/create-post/CreatePost";
import FeedSelector from "../components/feed-selector/FeedSelector";
import './page.scss';

type HomeProps = {};
const Home: React.FC<HomeProps> = () => {
  const [selectedFeed, setSelectedFeed] = useState("for you");

  const feeds = ["For You", "Following", "Bets"];

  return (
    <div className="page">
      <PageHeader title="Home"/>
      <CreatePost />
      <FeedSelector
        setSelectedFeed={setSelectedFeed}
        selectedFeed={selectedFeed}
        feeds={feeds}
      />
      <HomeFeed />
    </div>
  );
};

export default Home;
