import React from "react";
import Post from "../post/Post";
import QuoteRepost from "../post/QuoteRepost";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxios } from "../../hooks";
import "./feed.scss";

type HomeFeedProps = {};
const HomeFeed: React.FC<HomeFeedProps> = () => {

  const getPosts = async (pageParam: number) => {
    let res;
    res = await useAxios.get(`/posts?page=${pageParam}`)
    return res.data;
  }

  const {isLoading, error, data, fetchNextPage, refetch} = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({pageParam}) => getPosts(pageParam),
    staleTime: 5000,
    initialPageParam: 1 as any,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    }
  })

  const posts = data ? data.pages.flatMap((page) => page) : [];

  console.log(posts)


  return (
    <div className="feed home-feed">
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
