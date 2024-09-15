import React, { useContext, useEffect, useState } from "react";
import UserTypes from "../../types/User";
import { useAxios } from "../../hooks";
import Avatar from "../avatar/Avatar";
import { AuthContext } from "../../context/AuthContext";
import "./widget.scss";
import { CheckIcon } from "../../icons";

type SuggestedUsersProps = {};

const SuggestedUsers: React.FC<SuggestedUsersProps> = () => {
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { currentUser } = useContext(AuthContext) || {};

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await useAxios.get(
          `/users/suggested/${currentUser?.id}`
        ); // Adjust the endpoint as needed
        setUsers(response.data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="widget">
      <p className="title">Who to follow</p>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="users">
            {users.map((user) => (
              <div className="user" key={user.id}>
                <div className="img">
                  <Avatar src={user.avatar} username={user.username} />
                </div>
                <div className="text">
                  <div className="name">
                    <p className="user-name">{user.name}</p>
                    {user?.isVerified === 1 && (
                      <CheckIcon color="#ff4775" size={17} />
                    )}
                  </div>
                  <p className="username">@{user.username}</p>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            ))}
          </div>
          <p className="show-more">Show more</p>
        </>
      )}
    </div>
  );
};

export default SuggestedUsers;
