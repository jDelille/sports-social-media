import React, { useContext, useState } from "react";
import { Avatar, PageHeader } from "../components";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/input/Input";
import "./page.scss";
import "./editprofile.scss";
import { uploadHeaderImage, uploadProfilePicture } from "../utils/firebaseUtils";
import { toast } from 'react-toastify';
import { showSuccessToast } from "../utils/toastUtils";

type EditProfileProps = {};

const EditProfile: React.FC<EditProfileProps> = () => {
  const { currentUser, updateProfile } = useContext(AuthContext);
  const [name, setName] = useState(currentUser.name || "");
  const [username, setUsername] = useState(currentUser.username || "");
  const [location, setLocation] = useState(currentUser.location || "");
  const [bio, setBio] = useState(currentUser.bio || "");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [headerImage, setHeaderImage] = useState<File | null>(null);

  const handleSave = async () => {
    const payload: any = {
      id: currentUser.id,
      name,
      username,
      location,
      bio,
    };

    try {
      if (avatarImage) {
        const avatarImageUrl = await uploadProfilePicture(avatarImage, currentUser.id);
        payload.avatar = avatarImageUrl;
      }

      if (headerImage) {
        const headerImageUrl = await uploadHeaderImage(headerImage, currentUser.id);
        payload.header_img = headerImageUrl;
      }

      await updateProfile(payload);
      console.log("Profile successfully updated");
      showSuccessToast("Profile successfully updated");

    } catch (error) {
      console.error("Error editing profile", error);
    }
  };

  return (
    <div className="page edit-profile">
      <PageHeader title="Edit profile" hasBack />
      <div className="user-imgs-wrapper">
        <div className="user-imgs">
          <div className="header">
            <img src={currentUser.header_img} alt="Header" />
          </div>
          <div className="avatar-bar">
            <Avatar src={currentUser.avatar} username={currentUser.username} />
            <div className="text">
              <p className="name">{currentUser.name}</p>
              <p className="username">@{currentUser.username}</p>
            </div>
          </div>
        </div>
        <div className="user-imgs-text">
          <div className="header-input">
            <label htmlFor="header">Choose Background Picture</label>
            <span>20 MB Max</span>
            <div className="btn-wrapper">
              <input
                type="file"
                id="header"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setHeaderImage(e.target.files[0]);
                  }
                }}
              />
              <span>{headerImage ? headerImage.name : "No file chosen"}</span>
            </div>
          </div>
          <div className="avatar-input">
            <label htmlFor="avatar">Choose Profile Picture</label>
            <span>20 MB Max</span>
            <div className="btn-wrapper">
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setAvatarImage(e.target.files[0]);
                  }
                }}
              />
              <span>{avatarImage ? avatarImage.name : "No file chosen"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="info">
        <Input
          label="Name"
          type="text"
          placeholder={currentUser.name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Username"
          type="text"
          placeholder={currentUser.username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Location"
          type="text"
          placeholder={currentUser.location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Input label="Website" type="text" onChange={(e) => console.log(e)} />
        <label htmlFor="bio">Bio</label>
        <textarea
          placeholder="Tell us about yourself."
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div className="action-btns">
        <button>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditProfile;