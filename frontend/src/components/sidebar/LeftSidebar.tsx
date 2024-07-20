import React from "react";
import { NavLink } from "react-router-dom";
import { LogoIcon } from "../../icons";
import SearchBar from "../search-bar/SearchBar";
import useSidebar from "../../hooks/useSidebar";
import "./sidebar.scss";

type LeftSidebarProps = {
  currentUser: any | null;
};
const LeftSidebar: React.FC<LeftSidebarProps> = ({ currentUser }) => {
  const {
    handleOpenLogin,
    handleOpenSignup,
    handleOpenCreatePost,
    handleLogout,
  } = useSidebar();

  const MenuItem: React.FC<{ to: string; label: string }> = ({ to, label }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        {label}
      </NavLink>
    </li>
  );

  return (
    <div className="sidebar-container">
      <div className="sidebar left-sidebar">
        <div className="title">
          <LogoIcon size={100} color="black" />
        </div>
        <SearchBar />
        <ul className="sidebar-links">
          <MenuItem to="/home" label="Home" />
          <MenuItem to="/matches" label="Discover" />
          <MenuItem to="/alerts" label="Alerts" />
          <MenuItem to="/matches" label="Matches" />
          <MenuItem to="/groups" label="Groups" />
          <MenuItem to="/profile" label="Profile" />
          <MenuItem to="/settings" label="Settings" />

          {currentUser ? (
            <li onClick={handleLogout}>
              <a>Logout</a>
            </li>
          ) : (
            <>
              <li onClick={handleOpenLogin}>
                <a>Login</a>
              </li>
              <li onClick={handleOpenSignup}>
                <a>Sign up</a>
              </li>
            </>
          )}
        </ul>
        <button className="post-btn" onClick={handleOpenCreatePost}>
          Compose
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
