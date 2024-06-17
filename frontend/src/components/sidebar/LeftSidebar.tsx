import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";

type LeftSidebarProps = {};
const LeftSidebar: React.FC<LeftSidebarProps> = () => {

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const handleOpenLogin = () => {
    loginModal.onOpen();
  }

  const handleOpenSignup = () => {
    registerModal.onOpen();
  }


  return (
    <div className="sidebar left-sidebar">
      <p>left sidebar</p>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/matches">Matches</Link>
        </li>
        <li onClick={handleOpenLogin}>
          Login
        </li>
        <li onClick={handleOpenSignup}>
          Sign up
        </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
