import React, { RefObject, useEffect, useRef, useState } from "react";
import { MentionsInput, Mention, OnChangeHandlerFunc } from "react-mentions";
import { EmojiIcon, ImgIcon, PollIcon, ProgressIndicator } from "../../icons";
import createPostStore from "../../store/createPostStore";
import { observer } from "mobx-react";
import FileInput from "./FileInput";
import { COLOR_CONSTANTS } from "../../constants";
// import CreatePoll from "../create-poll/CreatePoll";
import "./mentionsTextarea.scss";

type MentionsTextareaProps = {
  setBody: (body: string) => void;
  body: string;
  setFile: (file: any) => void;
  handleClick: (e: any) => void;
  file: any;
  isComment?: boolean;
};

const MentionsTextarea: React.FC<MentionsTextareaProps> = observer(
  ({ setBody, setFile, handleClick, body, file, isComment }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [openPoll, setOpenPoll] = useState(false);

    const onChange: OnChangeHandlerFunc = (
      _,
      newValue,
      newPlainTextValue,
      mentions
    ) => {
      let updatedValue = newPlainTextValue;

      mentions.forEach((mention) => {
        const mentionText = `@${mention.display}`;
        updatedValue = updatedValue.replace(
          `@[#${mention.id}](worldseries)`,
          mentionText
        );
      });

      setBody(updatedValue);
    };

    // Hard coded for now, in future get trending hashtags from db

    const hashTagData = [
      { id: "nfltrades", display: "#NFLtrades" },
      { id: "mlbseason", display: "#MLBseason" },
      { id: "nhlplayoffs", display: "#NHLplayoffs" },
      { id: "nbafinals", display: "#NBAfinals" },
      { id: "worldseries", display: "#WorldSeries" },
      { id: "superbowl", display: "#SuperBowl" },
      { id: "olympics", display: "#Olympics" },
      { id: "paralympics", display: "#Paralympics" },
      { id: "usopen", display: "#USOpen" },
      { id: "wimbledon", display: "#Wimbledon" },
    ];

    // Hard coded for now, in future get top accounts
    const mentionedUserData = [{ id: "justin", display: "@jdeli" }];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFile(file);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        textareaRef.current &&
        !textareaRef.current.contains(e.target as Node)
      ) {
        createPostStore.setIsInactive();
      }
    };

    useEffect(() => {
      if (!isComment) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, []);

    const isOverTextLimit = () => {
      return body.length > 500;
    };

    const handleOpenPoll = () => {
      setOpenPoll(!openPoll)
    }

    return (
      <div
        className={
          createPostStore.isActive || isComment
            ? "mentions-textarea-container-active"
            : "mentions-textarea-container"
        }
        onClick={() => createPostStore.setIsActive()}
        ref={textareaRef as any}
      >
        <MentionsInput
          value={body}
          onChange={onChange}
          placeholder="What's on your mind?"
          className="mentions-textarea"
        >
          <Mention trigger="#" data={hashTagData} />
          <Mention trigger="@" data={mentionedUserData} />
        </MentionsInput>

        {file && (
          <div className="image-preview">
            <div className="remove-img" onClick={() => setFile(null)}>
              x
            </div>
            <img src={URL.createObjectURL(file as any)} alt="" />
          </div>
        )}
{/* 
        {openPoll && (
          <CreatePoll close={handleOpenPoll} />
        )} */}

        {!isComment && createPostStore.isActive && (
          <div className="footer">
            <div className="icons">
              <FileInput handleChange={handleChange} />
              <PollIcon size={20} color={COLOR_CONSTANTS.LIGHTGRAY} onClick={handleOpenPoll} />
              <EmojiIcon size={20} color={COLOR_CONSTANTS.LIGHTGRAY} />
            </div>
            <div className="controls">
              <p className={isOverTextLimit() ? "error" : ""}>
                {500 - body.length}
              </p>
              <ProgressIndicator
                textCount={body.length}
                className={isOverTextLimit() ? "progress-error" : ""}
              />
              <button onClick={handleClick} disabled={body.length === 0}>
                Post
              </button>
            </div>
          </div>
        )}

        {isComment && (
          <div className="footer">
            <div className="icons">
              <FileInput handleChange={handleChange} />
              <PollIcon size={20} color={COLOR_CONSTANTS.LIGHTGRAY} onClick={handleOpenPoll}  />
              <EmojiIcon size={20} color={COLOR_CONSTANTS.LIGHTGRAY} />
            </div>
            <div className="controls">
              <p className={isOverTextLimit() ? "error" : ""}>
                {500 - body.length}
              </p>
              <ProgressIndicator
                textCount={body.length}
                className={isOverTextLimit() ? "progress-error" : ""}
              />
              <button onClick={handleClick} disabled={body.length === 0}>
                Post
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default MentionsTextarea;
