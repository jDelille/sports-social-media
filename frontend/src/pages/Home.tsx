import React, { useContext, useState } from "react";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import { AuthContext } from "../context/AuthContext";
import HomeFeed from "../components/feed/HomeFeed";
import useCreatePostModal from "../hooks/useCreatePostModal";
import PageHeader from "../components/page-header/PageHeader";
import './page.scss';
import CreatePost from "../components/create-post/CreatePost";

type HomeProps = {};
const Home: React.FC<HomeProps> = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const { currentUser } = useContext(AuthContext) || {};
  const createPostModal = useCreatePostModal();

  const [selectedFeed, setSelectedFeed] = useState("for you");

  const feeds = ["For You", "Following", "Bets"];


  const handleCreatePostClick = () => {
    createPostModal.onOpen();
  }

  return (
    <div className="page">
      <PageHeader title="Home"/>
      <CreatePost />
      <HomeFeed />
    </div>
  );
};

export default Home;
