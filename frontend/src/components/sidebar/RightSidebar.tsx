import React from "react";
import "./sidebar.scss";
import useSidebar from "../../hooks/useSidebar";

type RightSidebarProps = {
  currentUser: any | null;
};
const RightSidebar: React.FC<RightSidebarProps> = ({currentUser}) => {

  const {
    handleOpenSignup,
  } = useSidebar();

  return (
    <div className="sidebar-container right-sidebar-container">
      <div className="sidebar right-sidebar">
        {!currentUser && (
          <div className="new-to-huddle-sign-up">
            <p className="bold">New to Huddle?</p>
            <p className="description">Sign up now to join the community.</p>
            <button className="sign-up-btn" onClick={handleOpenSignup}>Sign up</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
