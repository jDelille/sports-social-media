import React, { Dispatch, SetStateAction } from "react";
import "./groupSettings.scss";
import Input from "../../../input/Input";
import {
  CheckMarkIcon,
  CloseIcon,
  EmojiIcon,
  ImgIcon,
  UploadIcon,
} from "../../../../icons";

type GroupSettingsProps = {
  privacy: string;
  setPrivacy: (val: string) => void;
  handleNext: () => void;
  setGroupName: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  setProfilePicture: Dispatch<SetStateAction<File | null>>;
  setProfileHeader: Dispatch<SetStateAction<File | null>>;
  profilePicture: File | null;
  headerImage: File | null;
};
const GroupSettings: React.FC<GroupSettingsProps> = ({
  privacy,
  setPrivacy,
  handleNext,
  setGroupName,
  setProfileHeader,
  setProfilePicture,
  profilePicture,
  headerImage,
}) => {
  const isPublic = privacy === "public";

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(event.target.files[0]);
    }
  };

  const handleHeaderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileHeader(event.target.files[0]);
    }
  };

  const clearAvatar = (e: any) => {
    e.stopPropagation();
    setProfilePicture(null)
  }

  const clearHeader = (e: any) => {
    e.stopPropagation();
    setProfileHeader(null);
  }

  return (
    <div className="group-settings">
      <div className="group-header">
        <p className="quote">
          "I love being able to see what my friends are betting. Groups are
          awesome!" - Huddle Player
        </p>
        <p>Make a group • Invite friends • View member bets and posts</p>
      </div>
      <div className="group-info">
        <Input
          placeholder={"Group Name"}
          type="text"
          label="Group name (required)"
          description="This cannot be changed after the group is created."
          onChange={(e) => setGroupName(e.target.value)}
        />
        {/* <div className="description">
          <label>Description</label>
          <span>160 characters remaining</span>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div> */}
        <div className="images">
          <div className="avatar">
            <div
              className="square"
              onClick={() =>
                document.getElementById("avatarFileInput")?.click()
              }
            >
              {profilePicture ? (
                <img
                  src={URL.createObjectURL(profilePicture)}
                  alt="Avatar Preview"
                  className="profile-preview"
                />
              ) : (
                <EmojiIcon
                  size={32}
                  color="gray"
                  onClick={() => console.log("hey")}
                />
              )}
              <div className="upload-icon">
                {profilePicture ? (
                  <div className="delete" onClick={clearAvatar}>
                    <CloseIcon size={14} color="#e2434b" />
                  </div>
                ) : (
                  <div className="upload-icon">
                    <UploadIcon color="gray" size={16} />
                  </div>
                )}
              </div>
              <input
                type="file"
                id="avatarFileInput"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </div>
            <p>Pick group avatar</p>
            <span>(optional)</span>
          </div>
          <div className="header-img">
            <div
              className="square"
              onClick={() =>
                document.getElementById("headerFileInput")?.click()
              }
            >
              {headerImage ? (
                <img
                  src={URL.createObjectURL(headerImage)}
                  alt="Header Preview"
                  className="header-preview"
                />
              ) : (
                <ImgIcon size={32} color="gray" />
              )}
              <div className="upload-icon">
                {headerImage ? (
                  <div className="delete" onClick={clearHeader}>
                    <CloseIcon size={14} color="#e2434b" />
                  </div>
                ) : (
                  <div className="upload-icon">
                    <UploadIcon color="gray" size={16} />
                  </div>
                )}
              </div>
              <input
                type="file"
                id="headerFileInput"
                style={{ display: "none" }}
                onChange={handleHeaderChange}
              />
            </div>
            <p>Pick group header</p>
            <span>(optional)</span>
          </div>
        </div>
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
        <p>Some of these settings can be changed later.</p>
      </div>
      <button className="next-btn" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default GroupSettings;
