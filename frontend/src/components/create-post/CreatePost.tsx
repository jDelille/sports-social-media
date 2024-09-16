import React, { useContext, useState } from "react";
import useCreatePostModal from "../../hooks/useCreatePostModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios, useLoginReminder } from "../../hooks";
import Avatar from "../avatar/Avatar";
import { AuthContext } from "../../context/AuthContext";
import MentionsTextarea from "../mentions-textarea/MentionsTextarea";
import { COLOR_CONSTANTS } from "../../constants";
import { ChevronDownIcon, PencilIcon } from "../../icons";
import createPostStore from "../../store/createPostStore";
import {uploadImage} from '../../utils/firebaseUtils';
import "./createPost.scss";
import PostingMenu from "./PostingMenu";

type CreatePostProps = {};
const CreatePost: React.FC<CreatePostProps> = () => {
  const [file, setFile] = useState(null);
  const [body, setBody] = useState("");
  const [openPostMenu, setOpenPostMenu] = useState(false);
  const [urlMetadata, setUrlMetadata] = useState<any>(null);
  const [postingArea, setPostingArea] = useState<string>("Public")

  const createPostModal = useCreatePostModal();
  const loginReminder = useLoginReminder();
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const handleSubmit = async (newPost: any) => {
    await useAxios.post("/posts", newPost);
  };

  const { mutate } = useMutation({
    mutationFn: async (newPost: any) => {
      // Handle image upload if file is provided
      if (file) {
        try {
          const imageUrl = await uploadImage(file);
          newPost.image = imageUrl; 
        } catch (error) {
          console.error('Failed to upload image:', error);
        }
      }
      await handleSubmit(newPost);
    },
    onSettled: async () => {
      queryClient.refetchQueries();
      setBody("");
      setUrlMetadata("");
      setFile(null)
      createPostStore.setIsInactive();
    },
    mutationKey: ["addPost"],
  });

  const handlePostClick = async (e: any) => {
    e.preventDefault();

    try {
      mutate({ body, urlMetadata, file });
      setBody("");
      createPostModal.onClose();
      createPostStore.setIsInactive;
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenPostMenu = () => {
    if (!currentUser) {
      return;
    }
    setOpenPostMenu(!openPostMenu);
  };

  const handleContainerClick = () => {
    if (currentUser) {
      return;
    }
    loginReminder.onOpen(
      <PencilIcon color={COLOR_CONSTANTS.LIGHTGRAY} size={50} />,
      "Got something to say?",
      "Create an account to share your thoughts with the community."
    );
  };

  return (
    <div className="create-post-container" onClick={handleContainerClick}>
      <div className="header">
        <div className="profile-picture">
          <Avatar src={currentUser?.avatar} username={currentUser?.username} disabled={!currentUser} />
        </div>
        <div
          className={openPostMenu ? "active" : "privacy"}
          onClick={handleOpenPostMenu}
        >
          <p>Post to {postingArea}</p>
          <ChevronDownIcon size={17} color="black" />

          {openPostMenu && (
           <PostingMenu setPostingArea={setPostingArea} />
          )}
        </div>
      </div>
      <div className="content">
        <MentionsTextarea
          setBody={setBody}
          body={body}
          setFile={setFile}
          file={file}
          handleClick={(e) => handlePostClick(e)}
          setUrlMetadata={setUrlMetadata}
        />
      </div>
    </div>
  );
};

export default CreatePost;
