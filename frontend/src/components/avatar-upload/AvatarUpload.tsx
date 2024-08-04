import React, { Dispatch, SetStateAction } from "react";
import { CloseIcon, ImgIcon } from "../../icons";

type AvatarUploadProps = {
  profilePicture: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setProfilePicture: Dispatch<SetStateAction<File | null>>;
};

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  profilePicture,
  handleFileChange,
  setProfilePicture,
}) => {
  return (
    <div
      className="avatar-upload"
      onClick={() => document.getElementById("avatarFileInput")?.click()}
    >
      {profilePicture ? (
        <img
          src={URL.createObjectURL(profilePicture)}
          alt="Profile Preview"
          className="profile-preview"
        />
      ) : (
        <ImgIcon size={24} color="white" />
      )}
      <input
        id="avatarFileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input"
      />
      {profilePicture && (
        <div className="remove-img" onClick={() => setProfilePicture(null)}>
          <CloseIcon color="white" size={15} />
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;