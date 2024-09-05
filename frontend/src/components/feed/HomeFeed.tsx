import React, { useEffect } from "react";
import Post from "../post/Post";
import QuoteRepost from "../post/QuoteRepost";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxios } from "../../hooks";
import { useInView } from "react-intersection-observer";
import PostSkeleton from "../loading-skeletons/PostSkeleton";

import "./feed.scss";

type HomeFeedProps = {};
const HomeFeed: React.FC<HomeFeedProps> = () => {
  const { ref, inView } = useInView();

  const getPosts = async (pageParam: number) => {
    let res;
    res = await useAxios.get(`/posts?page=${pageParam}`);
    return res.data;
  };

  const { error, data, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts(pageParam),
    staleTime: 5000,
    initialPageParam: 1 as any,
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
  });

  const posts = data ? data.pages.flatMap((page) => page) : [];

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="feed home-feed">
      {isLoading && (
       <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
       </>
      )}

      {!isLoading &&
        !error &&
        posts.map((post) => {
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

      <div ref={ref}></div>
    </div>
  );
};

export default HomeFeed;