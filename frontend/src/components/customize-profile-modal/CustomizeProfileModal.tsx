import React, { useContext, useState } from "react";
import Modal from "../modal/Modal";
import { useAxios, useCustomizeProfile } from "../../hooks";
import Input from "../input/Input";
import { AuthContext } from "../../context/AuthContext";
import ProfileImgUpload from "../profile-img-upload/ProfileImgUpload";
import "./customizeProfileModal.scss";

type CustomizeProfileModalProps = {};

const CustomizeProfileModal: React.FC<CustomizeProfileModalProps> = () => {
  const customizeProfile = useCustomizeProfile();
  const { currentUser, updateProfile } = useContext(AuthContext);

  const [name, setName] = useState(currentUser.name || "");
  const [username, setUsername] = useState(currentUser.username || "");
  const [location, setLocation] = useState(currentUser.location || "");
  const [bio, setBio] = useState(currentUser.bio || "");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profileHeader, setProfileHeader] = useState<File | null>(null);

  const handleSave = async () => {
    const payload = {
      id: currentUser.id,
      name,
      username,
      location,
      bio,
    };

    try {
      await updateProfile(payload);
      console.log("Profile successfully updated");

      const uploadImage = async (file: File | null, type: string) => {
        if (file) {
          const formData = new FormData();
          formData.append(type, file);
          formData.append("id", currentUser.id);

          await useAxios.post(`/image-upload/upload/${type}`, formData);
          console.log(`${type} uploaded successfully`);
        }
      };

      await uploadImage(profilePicture, "profilePicture");
      await uploadImage(profileHeader, "profileHeader");
    } catch (error) {
      console.error("Error editing profile", error);
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(event.target.files[0]);
    }
  };

  const handleHeaderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('here')
    if (event.target.files && event.target.files[0]) {
      setProfileHeader(event.target.files[0]);
    }
  };

  const bodyContent = (
    <div className="customize-profile-modal">
      <p className="disclaimer">This information can be edited later.</p>

      <ProfileImgUpload
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
        handleAvatarChange={handleAvatarChange}
        headerImage={profileHeader}
        setHeaderImage={setProfileHeader}
        handleHeaderChange={handleHeaderChange}
      />

      <div className="profile-info">
        <Input
          placeholder={currentUser?.name}
          type="text"
          label=""
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder={currentUser?.username}
          type="text"
          label=""
          onChange={(e) => setUsername(e.target.value)}
          defaultValue={currentUser?.username}
        />
        <textarea placeholder="Write a bio..." value={bio} onChange={(e) => setBio(e.target.value)} />
        <Input
          placeholder="Location"
          type="text"
          label=""
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSave}>Next</button>
        <p className="skip-step" onClick={customizeProfile.onClose}>
          Skip this step
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={customizeProfile.isOpen}
      onClose={customizeProfile.onClose}
      body={bodyContent}
      title="Create your profile"
    />
  );
};

export default CustomizeProfileModal;