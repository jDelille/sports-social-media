import React, { useContext, useState } from "react";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import { useAxios } from "../hooks/useAxios";
import { AuthContext } from "../context/AuthContext";

type HomeProps = {};
const Home: React.FC<HomeProps> = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [body, setBody] = useState("Testing body from react");
  const { currentUser } = useContext(AuthContext) || {};

  const postData = {
    body,
  };
  const createPost = async () => {
    return useAxios.post("/posts", postData);
  };

  return (
    <div className="home-page">
      {currentUser ? (
        <button onClick={createPost}>Create post</button>
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
