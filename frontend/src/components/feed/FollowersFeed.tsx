import React, { useEffect } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useAxios } from "../../hooks";
import UserCard from "../user-card/UserCard";
import "./feed.scss";

type FollowersFeedProps = {
    userId: number;
};
const FollowersFeed: React.FC<FollowersFeedProps> = ({userId}) => {
  const { ref, inView } = useInView();

  const fetchFollowerUsers = async (pageParam: number) => {
    const res = await useAxios.get(`/relationships/find/followers/${userId}?page=${pageParam}`);
    return res.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["followers", userId],
    queryFn: ({ pageParam }) => fetchFollowerUsers(pageParam),
    staleTime: 5000,
    initialPageParam: 1 as any,
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
      },
  });

  const followerUsers = data ? data.pages.flatMap((page) => page) : [];

//   useEffect(() => {
//     if (inView && hasNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, fetchNextPage, hasNextPage]);


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching followers.</p>;

  return (
    <div className="followers-feed feed">
      {followerUsers.map((user) => (
        <UserCard key={user.id} user={user} /> 
      ))}
      <div ref={ref}></div> {/* This is the trigger for loading the next page */}
      {/* {!hasNextPage && <p>No more users to load.</p>} */}
    </div>
  );
};

export default FollowersFeed;