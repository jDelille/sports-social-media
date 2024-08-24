import React, { useContext, useEffect, useState } from "react";
import { PageHeader } from "../components";
import GroupHeader from "../components/group/GroupHeader";
import { Group } from "../types/GroupTypes";
import { useAxios } from "../hooks";
import { useParams } from "react-router-dom";
import FeedSelector from "../components/feed-selector/FeedSelector";
import { AuthContext } from "../context/AuthContext";
import "./page.scss";

type GroupPageProps = {};
const GroupPage: React.FC<GroupPageProps> = () => {
  const [group, setGroup] = useState<Group>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFeed, setSelectedFeed] = useState("All");
  const [pendingInvites, setPendingInvites] = useState<any[]>([]);
  const [inviteId, setInviteId] = useState<number | null>(null);
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
  
        // Find the pending invite for the current user and group
        const currentInvite = invites.find(
          (invite: any) => invite.user_id === currentUser.id && invite.group_id === groupId
        );
  
        setPendingInvites(invites);
        if (currentInvite) {
          setInviteId(currentInvite.id);
        } else {
          setInviteId(null); // Clear invite ID if no invite is found
        }
      } catch (error) {
        console.error("Error fetching pending invites:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (currentUser) {
      fetchPendingInvites();
    }
  }, [currentUser, groupId]);

  console.log(pendingInvites)

  const isPendingInvite = pendingInvites.some(
    (invite) =>
      invite.user_id === currentUser.id && invite.group_id === group?.id
  );

  const feeds = ["All", "Bets", "Members"];

  console.log(inviteId)

  return (
    <div className="page group-page">
      <PageHeader title="Group name" hasBack />
      <GroupHeader
        group={group}
        currentUserId={currentUser.id}
        isPendingInvite={isPendingInvite}
        inviteId={inviteId}
      />
      <FeedSelector
        feeds={feeds}
        selectedFeed={selectedFeed}
        setSelectedFeed={setSelectedFeed}
      />
    </div>
  );
};

export default GroupPage;
