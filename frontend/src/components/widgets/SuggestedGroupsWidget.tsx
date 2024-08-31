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
                    <p>2.2k members</p>
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