import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";

type LeftSidebarProps = {};
const LeftSidebar: React.FC<LeftSidebarProps> = () => {
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
      </ul>
    </div>
  );
};

export default LeftSidebar;
