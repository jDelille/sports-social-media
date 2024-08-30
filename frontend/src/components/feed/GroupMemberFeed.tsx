import React from "react";
import { useInView } from "react-intersection-observer";
import { useAxios } from "../../hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import UserCard from "../user-card/UserCard";

type GroupMemberFeedProps = {
  groupId: number | undefined;
};
const GroupMemberFeed: React.FC<GroupMemberFeedProps> = ({ groupId }) => {
  const { ref } = useInView();

  const fetchGroupMembers = async (pageParam: number) => {
    const res = await useAxios.get(
      `/group-members/${groupId}?page=${pageParam}`
    );
    return res.data;
  };

  const { data } =
    useInfiniteQuery({
      queryKey: ["members", groupId],
      queryFn: ({ pageParam }) => fetchGroupMembers(pageParam),
      staleTime: 5000,
      initialPageParam: 1 as any,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
      },
    });

  const groupMembers = data ? data.pages.flatMap((page) => page) : [];

  return (
    <div className="feed group-member-feed">
      {groupMembers.map((member) => (
        <UserCard key={member.id} user={member} />
      ))}
      <div ref={ref}></div>
    </div>
  );
};

export default GroupMemberFeed;
