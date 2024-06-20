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
      <div className="title">
        <h3>Huddle</h3>
      </div>
      <ul className="sidebar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/matches">Matches</Link>
        </li>
        <li onClick={handleOpenLogin}>
          <a>Login</a>
        </li>
        <li onClick={handleOpenSignup}>
          <a>Sign up</a>
        </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
