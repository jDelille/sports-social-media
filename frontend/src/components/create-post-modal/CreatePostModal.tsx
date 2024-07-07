import React, { useState } from "react";
import useCreatePostModal from "../../hooks/useCreatePostModal";
import Modal from "../modal/Modal";
import { useAxios } from "../../hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./createPostModal.scss";

type CreatePostModalProps = {};
const CreatePostModal: React.FC<CreatePostModalProps> = () => {
  const [body, setBody] = useState("");

  const createPostModal = useCreatePostModal();
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
      //   createPostStore.setIsInactive;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    createPostModal.onClose();
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

  return (
    <div className="create-post-modal">
      <Modal
        body={bodyContent}
        isOpen={createPostModal.isOpen}
        title="Compose"
        onClose={handleClose}
      />
    </div>
  );
};

export default CreatePostModal;
