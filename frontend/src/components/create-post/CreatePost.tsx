import React, { useState } from "react";
import Modal from "../modal/Modal";
import useCreatePostModal from "../../hooks/useCreatePostModal";
import { useAxios } from "../../hooks/useAxios";

type CreatePostProps = {};
const CreatePost: React.FC<CreatePostProps> = () => {
  const [body, setBody] = useState("");
  const createPostModal = useCreatePostModal();

  const postData = {
    body,
  };

  const handleSubmit = async () => {
    await useAxios.post("/posts", postData);
    createPostModal.onClose();
  };

  const bodyContent = (
    <div>
      <input
        type="text"
        placeholder="What's on your mind?"
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={handleSubmit}>Post</button>
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
