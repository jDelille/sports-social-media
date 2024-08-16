import React, { useEffect } from 'react';
import { useInView } from "react-intersection-observer";
import "./feed.scss";
import { useAxios } from '../../hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import Post from '../post/Post';
import QuoteRepost from '../post/QuoteRepost';

type BetFeedProps = {
 
 }
const BetFeed: React.FC<BetFeedProps> = () => {
    const { ref, inView } = useInView();

    const getBets = async (pageParam: number) => {
        let res;
        res = await useAxios.get(`/posts/bets?page=${pageParam}`);
        return res.data;
      };

      const { isLoading, error, data, fetchNextPage, refetch } = useInfiniteQuery({
        queryKey: ["bet_posts"],
        queryFn: ({ pageParam }) => getBets(pageParam),
        staleTime: 5000,
        initialPageParam: 1 as any,
        getNextPageParam: (lastPage, allPages) => {
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
        <div className="feed bet-feed">
          {!error &&
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

export default BetFeed;