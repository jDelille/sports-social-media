import React, { useState } from "react";
import { PageHeader } from "../components";
import FeedSelector from "../components/feed-selector/FeedSelector";
import FindGroups from "../components/groups/FindGroups";
import MyGroups from "../components/groups/MyGroups";
import "./page.scss";

type GroupsPageProps = {};
const GroupsPage: React.FC<GroupsPageProps> = () => {
  const [selectedFeed, setSelectedFeed] = useState("find groups");

  const feeds = ["my groups", "find groups"];

  return (
    <div className="groups-page page">
      <PageHeader title="Groups" hasBack />
      <FeedSelector
        feeds={feeds}
        selectedFeed={selectedFeed}
        setSelectedFeed={setSelectedFeed}
      />
      {selectedFeed === "find groups" && <FindGroups />}
      {selectedFeed === "my groups" && <MyGroups />}
    </div>
  );
};

export default GroupsPage;
