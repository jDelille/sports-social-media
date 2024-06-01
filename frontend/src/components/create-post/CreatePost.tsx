import React, { useState } from "react";
import Modal from "../modal/Modal";
import useCreatePostModal from "../../hooks/useCreatePostModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../../hooks";

type CreatePostProps = {};
const CreatePost: React.FC<CreatePostProps> = () => {
  const [body, setBody] = useState("");
  const createPostModal = useCreatePostModal();

  const queryClient = useQueryClient()

  const handleSubmit = async (newPost: any) => {
    await useAxios.post("/posts", newPost);
  };

  const { mutate } = useMutation({
    mutationFn: (newPost: any) => handleSubmit(newPost),
    onSettled: async () => {
      queryClient.refetchQueries();
      setBody("");
    },
    mutationKey: ["addPost"]
  })

  const handlePostClick = async (e: any) => {
    e.preventDefault();

    try {
      mutate({body});
      setBody("");
      createPostModal.onClose();
    } catch (error) {
      console.log(error)
    }
  }

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

  const handleClose = () => {
    createPostModal.onClose();
  };

  return (
    <div className="create-post">
      <Modal
        body={bodyContent}
        isOpen={createPostModal.isOpen}
        title="Create post"
        onClose={handleClose}
      />
    </div>
  );
};

export default CreatePost;
