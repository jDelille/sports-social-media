import React, { useContext, useState } from "react";
import HomeFeed from "../components/feed/HomeFeed";
import PageHeader from "../components/page-header/PageHeader";
import CreatePost from "../components/create-post/CreatePost";
import FeedSelector from "../components/feed-selector/FeedSelector";
import FollowingPosts from "../components/feed/FollowingPosts";
import "./page.scss";
import { AuthContext } from "../context/AuthContext";
import BetFeed from "../components/feed/BetFeed";

type HomeProps = {};
const Home: React.FC<HomeProps> = () => {
  const [selectedFeed, setSelectedFeed] = useState("for you");
  const { currentUser } = useContext(AuthContext) || {};

  const feeds = ["For You", "Following", "Bets"];
  const noUserFeeds = ["For You", "Bets"];

  return (
    <div className="page">
      <PageHeader title="Home" />
      <CreatePost />
      <FeedSelector
        setSelectedFeed={setSelectedFeed}
        selectedFeed={selectedFeed}
        feeds={!currentUser ? noUserFeeds : feeds}
      />
      {selectedFeed === "for you" && <HomeFeed />}

      {selectedFeed === "following" && (
        <FollowingPosts userId={currentUser?.id} />
      )}

      {selectedFeed === "bets" && (
        <BetFeed username={"jdeli"} />
      )}
    </div>
  );
};

export default Home;
