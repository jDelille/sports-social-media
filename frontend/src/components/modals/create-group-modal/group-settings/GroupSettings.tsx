import React from "react";
import { COLOR_CONSTANTS } from "../../../../constants";
import { CheckMarkIcon, GroupIcon } from "../../../../icons";
import './groupSettings.scss';

type GroupSettingsProps = {
    privacy: string;
    setPrivacy: (val: string) => void;
    handleNext: () => void;
};
const GroupSettings: React.FC<GroupSettingsProps> = ({privacy, setPrivacy, handleNext}) => {

    const isPublic = privacy === "public";


  return (
    <div className="group-settings">
      <div className="group-header">
        <GroupIcon size={100} color={COLOR_CONSTANTS.ACCENT} />
        <h2>Let's get started!</h2>
        <p>Groups connect you with others based on shared interests.</p>
      </div>
      <div className="settings">
        <p className="title">Privacy settings</p>
        <ul>
          <li>
            <p>
              Public <span>Discoverable. Anyone can join. </span>
            </p>
            <div
              className={isPublic ? "selected-circle" : "select-circle"}
              onClick={() => setPrivacy("public")}
            >
              {isPublic && <CheckMarkIcon size={18} color="white" />}{" "}
            </div>
          </li>
          <li>
            <p>
              Private (Owner approval required)
              <span>
                Discoverable. Users can join after their request is approved.
              </span>
            </p>
            <div
              className={!isPublic ? "selected-circle" : "select-circle"}
              onClick={() => setPrivacy("private")}
            >
              {!isPublic && <CheckMarkIcon size={18} color="white" />}
            </div>
          </li>
        </ul>
      </div>
      <div className="disclaimer">
        <p>These settings cannot be changed later.</p>
      </div>
      <button className="next-btn" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default GroupSettings;
