import React, { useContext, useState } from "react";
import useCreatePostModal from "../../hooks/useCreatePostModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios, useLoginReminder } from "../../hooks";
import Avatar from "../avatar/Avatar";
import { AuthContext } from "../../context/AuthContext";
import MentionsTextarea from "../mentions-textarea/MentionsTextarea";
import { COLOR_CONSTANTS, TEXT_CONSTANTS } from "../../constants";
import { ChevronDownIcon, GlobeIcon, PencilIcon } from "../../icons";
import createPostStore from "../../store/createPostStore";
import "./createPost.scss";

type CreatePostProps = {};
const CreatePost: React.FC<CreatePostProps> = () => {
  const [file, setFile] = useState(null);
  const [body, setBody] = useState("");
  const [openPostMenu, setOpenPostMenu] = useState(false);
  const [urlMetadata, setUrlMetadata] = useState<any>(null);

  const createPostModal = useCreatePostModal();
  const loginReminder = useLoginReminder();
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const handleSubmit = async (newPost: any) => {
    await useAxios.post("/posts", newPost);
  };

  const { mutate } = useMutation({
    mutationFn: (newPost: any) => handleSubmit(newPost),
    onSettled: async () => {
      queryClient.refetchQueries();
      setBody("");
      setUrlMetadata("");
      setFile(null)
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
      "Share your thoughts.",
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
          <p>{TEXT_CONSTANTS.POST_TO_PUBLIC}</p>
          <ChevronDownIcon size={17} color="black" />

          {openPostMenu && (
            <div className="posting-menu">
              <ul>
                <li>
                  <span>
                    <GlobeIcon size={16} color={COLOR_CONSTANTS.ACCENT} />
                  </span>
                  Public
                </li>
                <li className="groups">
                  My Groups
                  <p>
                    Join groups so you can share your thoughts and ideas with
                    more people.
                  </p>
                </li>
              </ul>
            </div>
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
