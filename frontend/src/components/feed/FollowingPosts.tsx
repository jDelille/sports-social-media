import React, { useEffect } from "react";
import Post from "../post/Post";
import QuoteRepost from "../post/QuoteRepost";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxios } from "../../hooks";
import { useInView } from "react-intersection-observer";

import "./feed.scss";

type FollowingPostsProps = {
  userId: number; // Pass the current user's ID as a prop
};

const FollowingPosts: React.FC<FollowingPostsProps> = ({ userId }) => {
  const { ref, inView } = useInView();

  const getFollowingPosts = async (pageParam: number) => {
    const res = await useAxios.get(`/posts/following/${userId}?page=${pageParam}`);
    return res.data;
  };

  const { isLoading, error, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["followingPosts", userId],
    queryFn: ({ pageParam }) => getFollowingPosts(pageParam),
    staleTime: 5000,
    initialPageParam: 1 as any,
    getNextPageParam: (_, allPages) => {
        return allPages.length + 1;
      },
  });

  const followingPosts = data ? data.pages.flatMap((page) => page) : [];

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="feed following-posts">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching following posts.</p>}
      {followingPosts.map((post) => {
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
      })}
      <div ref={ref}></div> {/* This is the trigger for loading the next page */}
    </div>
  );
};

export default FollowingPosts;