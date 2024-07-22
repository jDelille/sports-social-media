import React, { useEffect, useState } from "react";
import "./suggestedUsers.scss";
import UserTypes from "../../types/User";
import { useAxios } from "../../hooks";
import Avatar from "../avatar/Avatar";

type SuggestedUsersProps = {};
const SuggestedUsers: React.FC<SuggestedUsersProps> = () => {
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await useAxios.get("/users/suggested"); // Adjust the endpoint as needed
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
    <div className="suggested-users">
      <p className="title">Who to follow</p>
      <div className="users">
        {users.map((user) => (
            <div className="user">
                <div className="img">
                    <Avatar src={user.avatar} username={user.username} />
                </div>
                <div className="text">
                    <p className="name">{user.name}</p>
                    <p className="username">@{user.username}</p>
                </div>
                <button>Follow</button>
                
            </div>
        ))}
      </div>
      <p className="show-more">Show more</p>
    </div>
  );
};

export default SuggestedUsers;
