import React, { useContext, useEffect, useState } from "react";
import { PageHeader } from "../components";
import GroupHeader from "../components/group/GroupHeader";
import { Group } from "../types/GroupTypes";
import { useAxios } from "../hooks";
import { useParams } from "react-router-dom";
import FeedSelector from "../components/feed-selector/FeedSelector";
import { AuthContext } from "../context/AuthContext";
import "./page.scss";
import GroupMemberFeed from "../components/feed/GroupMemberFeed";

type GroupPageProps = {};
const GroupPage: React.FC<GroupPageProps> = () => {
  const [group, setGroup] = useState<Group>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFeed, setSelectedFeed] = useState("All");
  const [pendingInvites, setPendingInvites] = useState<any[]>([]);
  const [inviteId, setInviteId] = useState<number | null>(null);
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [isMember, setIsMember] = useState<boolean>(false);

  const { currentUser } = useContext(AuthContext) || {};

  const { groupId } = useParams();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await useAxios.get(`/group/${groupId}`);
        setGroup(response.data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);

  useEffect(() => {
    const fetchPendingInvites = async () => {
      try {
        const response = await useAxios.get("/invites/pending");
        const invites = response.data;
        setPendingInvites(response.data);
        const currentInvite = invites.find(
          (invite: any) =>
            invite.user_id === currentUser.id &&
            Number(invite.group_id) === Number(groupId)
        );

        setInviteId(currentInvite.id);
      } catch (error) {
        console.error("Error fetching pending invites:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMemberCount = async () => {
      try {
        const response = await useAxios.get(`/group/member-count/${groupId}`);
        setMemberCount(response.data);
      } catch (error) {
        console.error("Error fetching member count:", error);
      }
    };

    const fetchIsMember = async () => {
      try {
        const response = await useAxios.get(`/group/is-member/${groupId}/${currentUser.id}`);
        setIsMember(response.data.isMember);
      } catch (error) {
        console.error("Error checking membership:", error);
      }
    };

    if (currentUser && groupId) {
      fetchPendingInvites();
      fetchIsMember();
    }

    fetchMemberCount();
  }, [currentUser, groupId]);

  const isPendingInvite = pendingInvites.some(
    (invite) =>
      invite.user_id === currentUser.id && Number(invite.group_id) === Number(group?.id)
  );
  

  const feeds = ["All", "Bets", "Members"];

  return (
    <div className="page group-page">
      <PageHeader title="Group name" hasBack />
      <GroupHeader
        group={group}
        currentUserId={currentUser.id}
        isPendingInvite={isPendingInvite}
        inviteId={inviteId}
        memberCount={memberCount}
        isMember={isMember}
      />
      <FeedSelector
        feeds={feeds}
        selectedFeed={selectedFeed}
        setSelectedFeed={setSelectedFeed}
      />
      {selectedFeed === "members" && (
        <GroupMemberFeed groupId={group?.id}/>
      )}
    </div>
  );
};

export default GroupPage;
