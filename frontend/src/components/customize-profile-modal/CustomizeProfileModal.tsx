import React, { useContext } from "react";
import Modal from "../modal/Modal";
import { useCustomizeProfile } from "../../hooks";
import "./customizeProfileModal.scss";
import { ImgIcon } from "../../icons";
import Input from "../input/Input";
import { AuthContext } from "../../context/AuthContext";

type CustomizeProfileModalProps = {};

const CustomizeProfileModal: React.FC<CustomizeProfileModalProps> = () => {
  const customizeProfile = useCustomizeProfile();
  const { currentUser } = useContext(AuthContext);

  const bodyContent = (
    <div className="customize-profile-modal">
      <p className="disclaimer">This information can be edited later.</p>

      <div className="upload-header">
        <ImgIcon size={24} color="#5448ee" />
        <p>Upload Image</p>
        <div className="upload-avatar">
          <ImgIcon size={24} color="white" />
        </div>
      </div>

      <div className="profile-info">
        <Input
          placeholder={currentUser?.username}
          type="text"
          label=""
          onChange={(e) => console.log(e.target.value)}
          defaultValue={currentUser?.username}
        />
        <textarea placeholder="Wite a bio..."/>
        <Input
          placeholder='Website'
          type="text"
          label=""
          onChange={(e) => console.log(e.target.value)}
          
        />
        <Input
          placeholder='Location'
          type="text"
          label=""
          onChange={(e) => console.log(e.target.value)}
        />
        <button>Next</button>
        <p className="skip-step" onClick={customizeProfile.onClose}>Skip this step</p>
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
