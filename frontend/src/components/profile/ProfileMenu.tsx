import React from "react";
import "./profileheader.scss";
import {
  BlockIcon,
  CopyIcon,
  MuteIcon,
  ReportIcon,
  SettingsIcon,
  UserIcon,
} from "../../icons";

type ProfileMenuProps = {
  isUserProfile: boolean;
};
const ProfileMenu: React.FC<ProfileMenuProps> = ({ isUserProfile }) => {
  return (
    <div className="profile-menu">
      <ul>
        <li>
          <CopyIcon color="gray" size={18} />
          Copy link to profile
        </li>
        <div className="divider"></div>
        {isUserProfile ? (
          <>
            <li>
              <UserIcon color="gray" size={18} /> Edit profile
            </li>
            <li>
              <SettingsIcon color="gray" size={17} />
              Preferences
            </li>
            <div className="divider"></div>
            <li>
              <MuteIcon color="gray" size={19} />
              Mutes
            </li>
            <li>
              <BlockIcon color="gray" size={17} />
              Blocks
            </li>
          </>
        ) : (
          <>
            <li>
              {" "}
              <MuteIcon color="gray" size={19} />
              Mute
            </li>
            <li>
              {" "}
              <BlockIcon color="gray" size={17} />
              Block
            </li>
            <li>
              <ReportIcon color="gray" size={18} />
              Report
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default ProfileMenu;
