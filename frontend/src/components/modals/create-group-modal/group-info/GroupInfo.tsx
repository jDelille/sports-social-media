import React, { Dispatch, SetStateAction } from "react";
import ProfileImgUpload from "../../../profile-img-upload/ProfileImgUpload";
import Input from "../../../input/Input";
import "./groupInfo.scss";


type GroupInfoProps = {
  setProfilePicture: Dispatch<SetStateAction<File | null>>;
  setProfileHeader: Dispatch<SetStateAction<File | null>>;
  profilePicture: File | null;
  headerImage: File | null;
  setGroupName: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  handleNext: () => void;
};
const GroupInfo: React.FC<GroupInfoProps> = ({
  setProfileHeader,
  setProfilePicture,
  profilePicture,
  headerImage,
  setGroupName,
  description, 
  setDescription,
  handleNext
}) => {
    
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

  return (
    <div className="group-info-container">
      <ProfileImgUpload
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
        handleAvatarChange={handleAvatarChange}
        headerImage={headerImage}
        setHeaderImage={setProfileHeader}
        handleHeaderChange={handleHeaderChange}
      />
      <div className="group-info">
        <Input
          placeholder={"Group Name"}
          type="text"
          label="Group name (required)"
          description="This cannot be changed after the group is created."
          onChange={(e) => setGroupName(e.target.value)}
        />
        <div className="description">
          <label>Description</label>
          <span>160 characters remaining</span>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <button className="next-btn" onClick={handleNext}>
        Create Group
      </button>
    </div>
  );
};

export default GroupInfo;
