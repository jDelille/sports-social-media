import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../hooks";
import { PageHeader, ProfileHeader } from "../components";
import UserTypes from "../types/User";
import "./page.scss";
import FeedSelector from "../components/feed-selector/FeedSelector";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  
  const { username } = useParams<{ username: string }>();
  const [selectedFeed, setSelectedFeed] = useState("posts");

  const [userData, setUserData] = useState<UserTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const feeds = ["Posts", "Posts & Replies", "Bets"];


  useEffect(() => {
    if (username) {
      const fetchUserData = async () => {
        try {
          const response = await useAxios.get(`users/find/${username}`);
          setUserData(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch user data');
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [username]);


  return (
    <div className="page">
      <PageHeader title={username as string} hasBack />
      <div className="profile-content">
        <ProfileHeader user={userData as UserTypes}/>
      </div>
      <FeedSelector 
        setSelectedFeed={setSelectedFeed}
        selectedFeed={selectedFeed}
        feeds={feeds}/>
    </div>
  );
};

export default Profile;
