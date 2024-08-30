import React from "react";
import { useAxios } from "../../hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import Post from "../post/Post";
import QuoteRepost from "../post/QuoteRepost";
import "./feed.scss";

type BetFeedProps = {
  username: string;
};
const BetFeed: React.FC<BetFeedProps> = ({ username }) => {
  const getUserPosts = async (pageParam: number) => {
    let res;
    res = await useAxios.get(`posts/user/${username}?page=${pageParam}`);
    return res.data;
  };

  const { error, data} = useInfiniteQuery({
    queryKey: ["user_posts", username],
    queryFn: ({ pageParam }) => getUserPosts(pageParam),
    staleTime: 5000,
    initialPageParam: 1 as any,
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
  });

  const posts = data ? data.pages.flatMap((page) => page) : [];

  return (
    <div className="feed bet-feed">
      {!error &&
        posts.map((post) => {
          if (post.bet_id !== null) {
            if (post.type === "post" || post.type === "repost") {
              return (
                <Post
                  post={post}
                  key={
                    post.type === "post"
                      ? `post_id${post.id}`
                      : `post_id${post.id}${post.reposted_at}`
                  }
                />
              );
            } else if (
              post.type === "quote_repost" ||
              post.type === "quote_repost_repost"
            ) {
              return (
                <QuoteRepost
                  post={post}
                  key={`post_id${post.id}${post.reposted_at}`}
                />
              );
            }
          }
        })}
    </div>
  );
};

export default BetFeed;
