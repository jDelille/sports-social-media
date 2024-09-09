import React from "react";
import SiteLinks from "../site-links/SiteLinks";
import {
  CreateGroupWidget,
  LeaderboardWidget,
  SuggestedGroupsWidget,
  SuggestedUsersWidget,
} from "../widgets";
import SignUpWidget from "../widgets/SignUpWidget";
import "./sidebar.scss";


type RightSidebarProps = {
  currentUser: any | null;
};
const RightSidebar: React.FC<RightSidebarProps> = ({ currentUser }) => {

  const isGroupsPage = window.location.pathname.includes("/groups");

  return (
    <div className="sidebar-container right-sidebar-container">
      <div className="sidebar right-sidebar">
        {!currentUser ? (
          <SignUpWidget />
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
            <SuggestedGroupsWidget />
            <SiteLinks />
          </>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
