import React, { useState } from "react";
import Modal from "../modal/Modal";
import { useAxios, useCreateGroupModal } from "../../hooks";
import ProfileImgUpload from "../profile-img-upload/ProfileImgUpload";
import GroupSettings from "./group-settings/GroupSettings";
import "./createGroupModal.scss";
import GroupInfo from "./group-info/GroupInfo";

type CreateGroupModalProps = {};
const CreateGroupModal: React.FC<CreateGroupModalProps> = () => {
  const createGroupModal = useCreateGroupModal();
  const [step, setStep] = useState(1);
  const [privacy, setPrivacy] = useState("public");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profileHeader, setProfileHeader] = useState<File | null>(null);
  const [groupName, setGroupName] = useState<string>("");
  const [description, setDescription] = useState<string>("");


  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const newGroup = {
        privacy,
        name: groupName,
        description,
        
      }

      const response = await useAxios.post("/group", newGroup);

      console.log(response.data);
      createGroupModal.onClose(); // Close modal after submission
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="create-group-modal">
            <GroupSettings
              privacy={privacy}
              setPrivacy={setPrivacy}
              handleNext={handleNext}
            />
          </div>
        );
      case 2:
        return (
          <div className="create-group-modal">
            <GroupInfo
              handleNext={handleNext}
              setDescription={setDescription}
              description={description}
              setGroupName={setGroupName}
              setProfileHeader={setProfileHeader}
              setProfilePicture={setProfilePicture}
              profilePicture={profilePicture}
              headerImage={profileHeader}
            />
          </div>
        );
      case 3:
        return (
          <div className="create-group-modal">
            <ProfileImgUpload
              profilePicture={profilePicture}
              headerImage={profileHeader}
            />
            <h3>{groupName}</h3>
            <div className="message">
              <h1>You're all set!</h1>
              <ul>
                <li>
                  As the owner of this group, you can assign staff, delete
                  posts, and much more.
                </li>
                <li>
                  Post the group's first post and get the conversation started.
                </li>
                <li>
                  Share your new group with friends, family, and followers to
                  grow its membership.
                </li>
              </ul>
            </div>
            <button className="prev-btn" onClick={handlePrevious}>
              Previous
            </button>
            <button
              className="submit-btn"
              onClick={() => {
                // Handle form submission here
                handleSubmit();
                createGroupModal.onClose(); // Close modal after submission
              }}
            >
              Submit
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const handleClose = () => {
    createGroupModal.onClose();
    setStep(1);
  };

  return (
    <Modal
      body={renderStepContent()}
      title={`Create ${privacy} Group`}
      isOpen={createGroupModal.isOpen}
      onClose={handleClose}
    />
  );
};

export default CreateGroupModal;
