import React, { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import Post from "../post/Post";
import "./feed.scss";
import QuoteRepost from "../post/QuoteRepost";

type HomeFeedProps = {};
const HomeFeed: React.FC<HomeFeedProps> = () => {
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await useAxios.get("/posts");
        setPosts(response.data);
      } catch (error) {
        setError("Error fetching posts.");
      }
    };

    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <div className="feed home-feed">
      {error && <p>{error}</p>}
      {!error &&
        posts.map((post) => {
          if(post.type === 'post' || post.type === 'repost') {
            return (
              <Post
            post={post}
            key={
              post.type === "post" 
                ? `post_id${post.id}` 
                : `post_id${post.id}${post.reposted_at}`
            }
          />
            )
          } else if(post.type === 'quote_repost' || post.type === 'quote_repost_repost') {
            return (
              <QuoteRepost post={post} key={
              `post_id${post.id}${post.reposted_at}`
              }/>
            )
          }
        })}
    </div>
  );
};

export default HomeFeed;
