import React, { Dispatch, SetStateAction } from 'react';
import AvatarUpload from '../avatar-upload/AvatarUpload';
import HeaderUpload from '../header-upload/HeaderUpload';
import './profileImgUpload.scss';

type ProfileImgUploadProps = {
  profilePicture: File | null;
  headerImage: File | null;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleHeaderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setProfilePicture: Dispatch<SetStateAction<File | null>>;
  setHeaderImage: Dispatch<SetStateAction<File | null>>;
};

const ProfileImgUpload: React.FC<ProfileImgUploadProps> = ({
  profilePicture,
  headerImage,
  handleAvatarChange,
  handleHeaderChange,
  setProfilePicture,
  setHeaderImage
}) => {
  return (
    <div className="profile-header-upload">
      <HeaderUpload 
        headerImage={headerImage}
        handleFileChange={handleHeaderChange}
        setHeaderImage={setHeaderImage} 
      />
      <AvatarUpload
        profilePicture={profilePicture}
        handleFileChange={handleAvatarChange}
        setProfilePicture={setProfilePicture} 
      />
    </div>
  );
};

export default ProfileImgUpload;