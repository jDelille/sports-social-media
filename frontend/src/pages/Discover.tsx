import React from "react";
import { PageHeader } from "../components";
import { useParams } from "react-router-dom";
import HashtagPosts from "../components/feed/HashtagPosts";

type DiscoverProps = {};
const Discover: React.FC<DiscoverProps> = () => {
  const { hashtag } = useParams<{ hashtag: string }>();

  

  return (
    <div className="page discover-page">
      <PageHeader hasBack title={`#${hashtag}`} />

      <HashtagPosts hashtag={hashtag}/>
    </div>
  );
};

export default Discover;
