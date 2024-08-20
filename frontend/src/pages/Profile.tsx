import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../hooks";
import { PageHeader, ProfileHeader } from "../components";
import UserTypes from "../types/User";
import FeedSelector from "../components/feed-selector/FeedSelector";
import ProfileFeed from "../components/feed/ProfileFeed";
import FollowingFeed from "../components/feed/FollowingFeed";
import FollowersFeed from "../components/feed/FollowersFeed";
import "./page.scss";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  const { username } = useParams<{ username: string }>();
  const [selectedFeed, setSelectedFeed] = useState("posts");

  const [userData, setUserData] = useState<UserTypes | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const feeds = ["posts", "posts & replies", "bets"];

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Fetch user data
        const response = await useAxios.get(`users/find/${username}`);
        setUserData(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  useEffect(() => {
    setSelectedFeed("posts");
  }, [username])

  return (
    <div className="page">
      <PageHeader title={username || "Profile"} hasBack />
      <div className="profile-content">
        <ProfileHeader
          user={userData as UserTypes}
          setSelectedFeed={setSelectedFeed}
        />
      </div>
      <FeedSelector
        setSelectedFeed={setSelectedFeed}
        selectedFeed={selectedFeed}
        feeds={feeds}
      />
      {selectedFeed === "posts" && (
        <ProfileFeed key={selectedFeed} username={username || ""} selectedFeed={selectedFeed}/>
      )}
      {selectedFeed === "following" && (
        <FollowingFeed userId={userData?.id || 0} />
      )}
      {selectedFeed === "followers" && (
        <FollowersFeed userId={userData?.id || 0} />
      )}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Profile;