import React from "react";
import { ImgIcon } from "../../icons";
import { COLOR_CONSTANTS } from "../../constants";

type FileInputProps = {
  handleChange: (e: any) => void;
};

const FileInput: React.FC<FileInputProps> = ({ handleChange }) => {
  return (
    <>
      <input
        type="file"
        id="file"
        style={{ display: "none" }}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="file">
        <ImgIcon size={20} color={COLOR_CONSTANTS.LIGHTGRAY} />
      </label>
    </>
  );
};

export default FileInput;
