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
import { useNavigate } from "react-router-dom";
import { handleCopyLink } from "../../hooks/actions/useHandleCopyLink";

type ProfileMenuProps = {
  isUserProfile: boolean;
  username: string;
};
const ProfileMenu: React.FC<ProfileMenuProps> = ({ isUserProfile, username}) => {
    const navigate = useNavigate();

    const handleCopyLinkToProfile = () => {
        handleCopyLink('profile', username)
      };

  return (
    <div className="profile-menu">
      <ul>
        <li onClick={handleCopyLinkToProfile}>
          <CopyIcon color="gray" size={18} />
          Copy link to profile
        </li>
        <div className="divider"></div>
        {isUserProfile ? (
          <>
            <li onClick={() => navigate("/settings/profile")}>
              <UserIcon color="gray" size={18} /> Edit profile
            </li>
            <li>
              <SettingsIcon color="gray" size={17} />
              Preferences
            </li>
            <div className="divider"></div>
            <li onClick={() => navigate('/mutes')}>
              <MuteIcon color="gray" size={19} />
              Mutes
            </li>
            <li onClick={() => navigate('/blocks')}>
              <BlockIcon color="gray" size={17} />
              Blocks
            </li>
          </>
        ) : (
          <>
            <li>
              <MuteIcon color="gray" size={19} />
              Mute
            </li>
            <li>
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
