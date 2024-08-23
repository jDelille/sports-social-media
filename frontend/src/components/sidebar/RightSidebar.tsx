import React from "react";
import useSidebar from "../../hooks/useSidebar";
import SiteLinks from "../site-links/SiteLinks";
import SuggestedGroups from "../suggested-groups/SuggestedGroups";
import {
  CreateGroupWidget,
  LeaderboardWidget,
  SuggestedUsersWidget,
} from "../widgets";
import "./sidebar.scss";


type RightSidebarProps = {
  currentUser: any | null;
};
const RightSidebar: React.FC<RightSidebarProps> = ({ currentUser }) => {
  const { handleOpenSignup } = useSidebar();

  const isGroupsPage = window.location.pathname.includes("/groups");

  return (
    <div className="sidebar-container right-sidebar-container">
      <div className="sidebar right-sidebar">
        {!currentUser ? (
          <div className="new-to-huddle-sign-up">
            <p className="bold">New to Huddle?</p>
            <p className="description">Sign up now to join the community.</p>
            <button className="sign-up-btn" onClick={handleOpenSignup}>
              Sign up
            </button>
          </div>
        ) : (
          <>
            {isGroupsPage ? (
              <CreateGroupWidget />
            ) : (
              <>
                <SuggestedUsersWidget />
                <LeaderboardWidget />
              </>
            )}
            <SuggestedGroups />
            <SiteLinks />
          </>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
