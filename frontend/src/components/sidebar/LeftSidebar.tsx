import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import { LogoIcon } from "../../icons";
import SearchBar from "../search-bar/SearchBar";

type LeftSidebarProps = {};
const LeftSidebar: React.FC<LeftSidebarProps> = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();


  const handleOpenLogin = () => {
    loginModal.onOpen();
  };

  const handleOpenSignup = () => {
    registerModal.onOpen();
  };


  return (
    <div className="sidebar-container">
      <div className="sidebar left-sidebar">
        <div className="title">
          <LogoIcon size={100} color="black" />
        </div>
        <SearchBar />
        <ul className="sidebar-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/matches">Discover</Link>
          </li>
          <li>
            <Link to="/matches">Alerts</Link>
          </li>
          <li>
            <Link to="/matches">Matches</Link>
          </li>
          <li>
            <Link to="/matches">Groups</Link>
          </li>
          <li>
            <Link to="/matches">Profile</Link>
          </li>
          <li>
            <Link to="/matches">Settings</Link>
          </li>
          <li onClick={handleOpenLogin}>
            <a>Login</a>
          </li>
          <li onClick={handleOpenSignup}>
            <a>Sign up</a>
          </li>
        </ul>
        <button className="post-btn">Compose</button>
      </div>
    </div>
  );
};

export default LeftSidebar;
