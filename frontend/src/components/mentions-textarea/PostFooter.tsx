import React, { useState } from "react";
import { COLOR_CONSTANTS } from "../../constants";
import { EmojiIcon, PollIcon, ProgressIndicator } from "../../icons";
import FileInput from "./FileInput";

type PostFooterProps = {
  bodyLength: number;
  handleOpenPoll: () => void;
  isOverTextLimit: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (e: any) => void;
};
const PostFooter: React.FC<PostFooterProps> = ({
  bodyLength,
  isOverTextLimit,
  handleOpenPoll,
  handleImageChange,
  handleClick
}) => {

  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const handleEmojiClick = () => {
    setOpenEmojiPicker(!openEmojiPicker);
  }

  return (
    <div className="footer">
      <div className="icons">
        <FileInput handleChange={handleImageChange} />
        <PollIcon
          size={20}
          color={COLOR_CONSTANTS.LIGHTGRAY}
          onClick={handleOpenPoll}
        />
        <EmojiIcon size={20} color={COLOR_CONSTANTS.LIGHTGRAY} onClick={handleEmojiClick}/>
      </div>
      <div className="controls">
        <p className={isOverTextLimit ? "error" : ""}>{500 - bodyLength}</p>
        <ProgressIndicator
          textCount={bodyLength}
          className={isOverTextLimit ? "progress-error" : ""}
        />
        <button onClick={handleClick} disabled={bodyLength === 0} className="create-post-btn">
          Post
        </button>

        {/* {openEmojiPicker && (
         
        )} */}
      </div>
    </div>
  );
};

export default PostFooter;
