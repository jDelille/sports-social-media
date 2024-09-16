import React, { useEffect, useState } from "react";
import { useAxios } from "../../hooks";
import { WorldIcon } from "../../icons";
import { useNavigate } from "react-router-dom";
import "./widget.scss";

type SuggestedGroupsProps = {};

const SuggestedGroups: React.FC<SuggestedGroupsProps> = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [memberCounts, setMemberCounts] = useState<{ [key: number]: number }>({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestedGroups = async () => {
      try {
        const response = await useAxios.get("/group/suggested");
        setGroups(response.data);
      } catch (error) {
        setError("Failed to load suggested groups");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedGroups();
  }, []);

  const fetchMemberCount = async (groupId: number) => {
    try {
      const response = await useAxios.get(`/group/member-count/${groupId}`);
      setMemberCounts((prevCounts) => ({
        ...prevCounts,
        [groupId]: response.data, // Adjust the response structure if needed
      }));
    } catch (error) {
      console.error("Error fetching member count:", error);
    }
  };

  useEffect(() => {
    // Fetch member count for each group after groups are loaded
    if (groups.length > 0) {
      groups.forEach((group) => {
        fetchMemberCount(group.id);
      });
    }
  }, [groups]);

  const capitalizeFirstLetter = (string: string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleGroupClick = (groupId: number) => {
    navigate(`/group/${groupId}`);
  };

  const handleShowMoreClick = () => {
    navigate("/groups");
  };

  return (
    <div className="widget">
      <p className="title">Suggested Groups</p>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="groups">
            {groups.map((group) => (
              <div
                key={group.id}
                className="group"
                onClick={() => handleGroupClick(group.id)}
              >
                <img src={group.avatar} alt="" />
                <div className="text">
                  <p className="name">{group.name}</p>
                  <div className="info">
                    <p className="privacy">
                      <WorldIcon size={15} color="gray" />
                      {capitalizeFirstLetter(group.privacy)}
                    </p>
                    <p>•</p>
                    <p>
                      {memberCounts[group.id] !== undefined
                        ? `${memberCounts[group.id] + 1} members`
                        : "Loading..."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="show-more" onClick={handleShowMoreClick}>
            Show more
          </p>
        </>
      )}
    </div>
  );
};

export default SuggestedGroups;