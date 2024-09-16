import React, { useEffect, useState } from "react";
import { GlobeIcon } from "../../icons";
import { COLOR_CONSTANTS } from "../../constants";
import { useAxios } from "../../hooks";
import { Group } from "../../types/GroupTypes";

type PostingMenuProps = {
    setPostingArea: (val: string) => void;
};
const PostingMenu: React.FC<PostingMenuProps> = ({setPostingArea}) => {
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await useAxios.get("/group/my-groups");
        setMyGroups(response.data);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="posting-menu">
      <ul>
        <li onClick={() => setPostingArea("Public")}>
          <span>
            <GlobeIcon size={16} color={COLOR_CONSTANTS.ACCENT} />
          </span>
          Public
        </li>
        <li className="groups">
          My Groups
          {!myGroups && (
            <p>
              Join groups so you can share your thoughts and ideas with more
              people.
            </p>
          )}
          {isLoading ? (
            <p>Loading...</p>
          ): (
            myGroups.map((group) => (
                <div className="group" onClick={() => setPostingArea(group.name)}>
                  <img src={group.avatar} alt="" loading="lazy" />
                  <p>{group.name}</p>
                </div>
              ))
          )}
        
        </li>
      </ul>
    </div>
  );
};

export default PostingMenu;
