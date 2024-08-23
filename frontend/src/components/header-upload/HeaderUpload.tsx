import React, { Dispatch, SetStateAction } from "react";
import { CloseIcon, ImgIcon } from "../../icons";

type HeaderUploadProps = {
  headerImage: File | null;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setHeaderImage?: Dispatch<SetStateAction<File | null>>;
};

const HeaderUpload: React.FC<HeaderUploadProps> = ({
  headerImage,
  handleFileChange,
  setHeaderImage,
}) => {
  return (
    <div className="header-upload">
      <input
        id="headerFileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input"
        style={{ display: 'none' }} // Hide the file input
      />
      <div
        className="upload-area"
        onClick={() => document.getElementById("headerFileInput")?.click()}
      >
        {headerImage ? (
          <img
            src={URL.createObjectURL(headerImage)}
            alt="Header Preview"
            className="header-preview"
          />
        ) : (
          <ImgIcon size={24} color="white" />
        )}
        {headerImage && setHeaderImage && (
          <div className="remove-img" onClick={() => setHeaderImage(null)}>
            <CloseIcon color="white" size={15} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderUpload;