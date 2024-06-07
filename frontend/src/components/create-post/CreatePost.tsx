import React, { useContext, useState } from "react";
import useCreatePostModal from "../../hooks/useCreatePostModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../../hooks";
import Avatar from "../avatar/Avatar";
import { AuthContext } from "../../context/AuthContext";
import './createPost.scss';
import MentionsTextarea from "../mentions-textarea/MentionsTextarea";
import { COLOR_CONSTANTS, TEXT_CONSTANTS } from "../../constants";
import { ChevronDownIcon, GlobeIcon } from "../../icons";
import createPostStore from "../../store/createPostStore";

type CreatePostProps = {};
const CreatePost: React.FC<CreatePostProps> = () => {
  const [file, setFile] = useState(null);
  const [body, setBody] = useState("");
  const [openPostMenu, setOpenPostMenu] = useState(false);

  const createPostModal = useCreatePostModal();
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
    },
    mutationKey: ["addPost"],
  });

  const handlePostClick = async (e: any) => {
    e.preventDefault();

    try {
      mutate({ body });
      setBody("");
      createPostModal.onClose();
      createPostStore.setIsInactive;
    } catch (error) {
      console.log(error);
    }
  };
  

  const bodyContent = (
    <div>
      <input
        type="text"
        placeholder="What's on your mind?"
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={handlePostClick}>Post</button>
    </div>
  );

  const handleOpenPostMenu = () => {
    setOpenPostMenu(!openPostMenu)
  };

  const handleClose = () => {
    createPostModal.onClose();
  };

  console.log(currentUser)

  return (
    <div className="create-post-container">
      {/* <Modal
        body={bodyContent}
        isOpen={createPostModal.isOpen}
        title="Create post"
        onClose={handleClose}
      /> */}
      <div className="header">
        <div className="profile-picture">
          <Avatar  
            src={currentUser?.avatar}
            userId={currentUser?.id} />
        </div>
        <div className={openPostMenu ? "active" : "privacy"} onClick={handleOpenPostMenu}>
          <p>{TEXT_CONSTANTS.POST_TO_PUBLIC}</p>
          <ChevronDownIcon size={17} color="black" />

          {openPostMenu && (
            <div className="posting-menu">
              <ul>
                <li>
                  <span>
                    <GlobeIcon size={16} color={COLOR_CONSTANTS.ACCENT} />
                  </span>
                  Public</li>
                  <li className="groups">My Groups
                    <p>Join groups so you can share your thoughts and ideas with more people.</p>
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
        />
      </div>
    </div>
  );
};

export default CreatePost;
