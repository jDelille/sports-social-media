import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { useAxios, useInviteModal } from "../../../hooks";
import { AuthContext } from "../../../context/AuthContext";
import UserTypes from "../../../types/User";
import UserCard from "../../user-card/UserCard";
import './inviteToGroupModal.scss';

type InviteToGroupModalProps = {};
const InviteToGroupModal: React.FC<InviteToGroupModalProps> = () => {
  const inviteModal = useInviteModal();
  const { currentUser } = useContext(AuthContext) || {};

  const groupName = inviteModal.groupName;
  const groupId = inviteModal.groupId;

  const userId = currentUser.id;

  const [combinedUsers, setCombinedUsers] = useState<UserTypes[]>([]);

  const fetchFollowingUsers = async (userId: number, page = 1) => {
    try {
      const response = await useAxios.get(
        `/relationships/${userId}/following`,
        {
          params: { page },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching following users:", error);
      return [];
    }
  };

  const fetchFollowerUsers = async (userId: number, page = 1) => {
    try {
      const response = await useAxios.get(
        `/relationships/${userId}/followers`,
        {
          params: { page },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching follower users:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      const following = await fetchFollowingUsers(userId);
      const followers = await fetchFollowerUsers(userId);

      // Combine the two arrays and remove duplicates
      const combined = [...following, ...followers];

      // Optional: Remove duplicates by filtering out users with the same ID
      const uniqueUsers = combined.filter(
        (user, index, self) => index === self.findIndex((u) => u.id === user.id)
      );

      setCombinedUsers(uniqueUsers);
    };

    loadUsers();
  }, [userId]);

  const handleClick = async (inviteeId: number) => {
    try {
      const response = await useAxios.post('/alerts', {
        user_id: inviteeId,
        type: 'group-invite',
        alerter_id: currentUser.id,
        link: `/group/${groupId}`, 
        msg: `invited to join the group "${groupName}".`,
        group_id: groupId
      });
  
      if (response.data.success) {
        console.log('User invited and alert sent.');
      }
    } catch (error) {
      console.error('Error sending alert:', error);
    }
  };

  const bodyContent = (
    <div className="invite-modal">
      <p>You can only invite people you follow or who follow you.</p>
        <ul>
          {combinedUsers.map((user) => (
            <li key={user.id}>
                <UserCard user={user} actionButtonLabel={'Invite'} handleClick={() => handleClick(user.id)}/>
            </li>
          ))}
        </ul>
    </div>
  );

  const handleOnClose = () => {
    inviteModal.onClose();
  };

  return (
    <Modal
      title="Invite"
      body={bodyContent}
      onClose={handleOnClose}
      isOpen={inviteModal.isOpen}
    />
  );
};

export default InviteToGroupModal;
