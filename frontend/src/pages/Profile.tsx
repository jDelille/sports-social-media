import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../hooks";
import { PageHeader, ProfileHeader } from "../components";
import UserTypes from "../types/User";
import "./page.scss";
import FeedSelector from "../components/feed-selector/FeedSelector";
import PostTypes from "../types/Post";
import ProfileFeed from "../components/feed/ProfileFeed";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  
  const { username } = useParams<{ username: string }>();
  const [selectedFeed, setSelectedFeed] = useState("posts");

  const [userData, setUserData] = useState<UserTypes | null>(null);
  const [posts, setPosts] = useState<PostTypes[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const feeds = ["Posts", "Posts & Replies", "Bets"];


  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Fetch user data
        const response = await useAxios.get(`users/find/${username}`);
        const user = response.data;
        setUserData(user);

        // Fetch posts using the fetched user data
        const postsResponse = await useAxios.get(`posts/user/${username}`);
        setPosts(postsResponse.data);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
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
        feeds={feeds}
      />
      <ProfileFeed username={username as string} />
    </div>
  );
};

export default Profile;