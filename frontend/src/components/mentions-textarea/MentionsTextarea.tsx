import React, { useEffect, useRef, useState } from "react";
import { MentionsInput, Mention, OnChangeHandlerFunc } from "react-mentions";
import createPostStore from "../../store/createPostStore";
import { observer } from "mobx-react";
// import CreatePoll from "../create-poll/CreatePoll";
import ImagePreview from "./ImagePreview";
import PostFooter from "./PostFooter";
import { useClickOutside, useHashTagData, useUrlMetadata } from "../../hooks";
import "./mentionsTextarea.scss";

type MentionsTextareaProps = {
  setBody: (body: string) => void;
  body: string;
  setFile: (file: any) => void;
  handleClick: (e: any) => void;
  file: any;
  isComment?: boolean;
  setUrlMetadata?: any;
  placeholder?: string;
  isActive?: boolean;
};

const MentionsTextarea: React.FC<MentionsTextareaProps> = observer(
  ({
    setBody,
    setFile,
    handleClick,
    body,
    file,
    isComment,
    setUrlMetadata,
    isActive,
    placeholder = "What's on your mind?",
  }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [openPoll, setOpenPoll] = useState(false);
    const hashTagData = useHashTagData();
    useClickOutside(
      textareaRef,
      () => createPostStore.setIsInactive(),
      !isComment
    );
    const urlMetadata = useUrlMetadata(body);

    useEffect(() => {
      if (setUrlMetadata) {
        setUrlMetadata(urlMetadata);
      }
    }, [urlMetadata, setUrlMetadata]);

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

    // Hard coded for now, in future get top accounts
    const mentionedUserData = [{ id: "justin", display: "@jdeli" }];

    const activatedTextarea = () => {
      if (isActive) {
        return true;
      } else {
        return createPostStore.isActive;
      }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFile(file);
      }
    };

    const isOverTextLimit = () => {
      return body.length > 500;
    };

    const handleOpenPoll = () => {
      setOpenPoll(!openPoll);
    };

    return (
      <div
        className={
          activatedTextarea() || isComment
            ? "mentions-textarea-container-active"
            : "mentions-textarea-container"
        }
        onClick={() => createPostStore.setIsActive()}
        ref={textareaRef as any}
      >
        <MentionsInput
          value={body}
          onChange={onChange}
          placeholder={placeholder}
          className="mentions-textarea"
        >
          <Mention trigger="#" data={hashTagData} />
          <Mention trigger="@" data={mentionedUserData} />
        </MentionsInput>

        {file && <ImagePreview setFile={setFile} file={file} />}

        {/* 
        {openPoll && (
          <CreatePoll close={handleOpenPoll} />
        )} */}

        {!isComment && activatedTextarea() && (
          <PostFooter
            handleOpenPoll={handleOpenPoll}
            handleImageChange={handleImageChange}
            bodyLength={body.length}
            isOverTextLimit={isOverTextLimit()}
            handleClick={handleClick}
          />
        )}

        {isComment && (
          <PostFooter
            handleOpenPoll={handleOpenPoll}
            handleImageChange={handleImageChange}
            bodyLength={body.length}
            isOverTextLimit={isOverTextLimit()}
            handleClick={handleClick}
          />
        )}
      </div>
    );
  }
);

export default MentionsTextarea;
