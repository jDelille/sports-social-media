import React, { useContext, useState } from "react";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
  import { useAxios } from "../hooks/useAxios";
import { AuthContext } from "../context/AuthContext";
import HomeFeed from "../components/feed/HomeFeed";
import useCreatePostModal from "../hooks/useCreatePostModal";

type HomeProps = {};
const Home: React.FC<HomeProps> = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [body, setBody] = useState("Testing fourth post from react");
  const { currentUser } = useContext(AuthContext) || {};
  const createPostModal = useCreatePostModal();

  const postData = {
    body,
  };
  // const createPost = async () => {
  //   return useAxios.post("/posts", postData);
  // };

  const handleCreatePostClick = () => {
    createPostModal.onOpen();
  }

  return (
    <div className="home-page">
      {currentUser ? (
        <>
        <button onClick={handleCreatePostClick}>Create post</button>
        <HomeFeed />
        
        </>
      ) : (
        <>
          <button onClick={loginModal.onOpen}>Login</button>
          <button onClick={registerModal.onOpen}>Register</button>
        </>
      )}
    </div>
  );
};

export default Home;
