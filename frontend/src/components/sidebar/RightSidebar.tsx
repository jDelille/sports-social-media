import React from "react";
import useSidebar from "../../hooks/useSidebar";
import SuggestedUsers from "../suggested-users/SuggestedUsers";
import LeaderboardWidget from "../leaderboard-widget/LeaderboardWidget";
import "./sidebar.scss";
import SiteLinks from "../site-links/SiteLinks";

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
        {!currentUser ? (
          <div className="new-to-huddle-sign-up">
            <p className="bold">New to Huddle?</p>
            <p className="description">Sign up now to join the community.</p>
            <button className="sign-up-btn" onClick={handleOpenSignup}>Sign up</button>
          </div>
        ): (
          <>
          <SuggestedUsers />
          <LeaderboardWidget />
          <SiteLinks />
          </>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
