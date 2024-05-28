import React, { useState } from "react";
import Modal from "../modal/Modal";
import { useAxios } from "../../hooks/useAxios";
import useCreateCommentModal from "../../hooks/useCreateCommentModal";

type CreateCommentProps = {
 
 }
const CreateComment: React.FC<CreateCommentProps> = () => {
    const [body, setBody] = useState("");

    const createCommentModal = useCreateCommentModal();

    const postId = createCommentModal.postId;
    const type = createCommentModal.type;

    const handleSubmit = async () => {
        try {
            await useAxios.post("/comments", {
                postId: postId,
                body,
                image: null,
                type: type
              });
              
              createCommentModal.onClose();
        } catch (error) {
            console.log(error)
        }
      };

    const bodyContent = (
        <div>
          <input
            type="text"
            placeholder="Comment on this post"
            onChange={(e) => setBody(e.target.value)}
          />
          <button onClick={handleSubmit}>Post</button>
        </div>
      );

    const handleClose = () => {
        createCommentModal.onClose();
      };

  return (
    <div className='create-comment'>
      <Modal
        body={bodyContent}
        isOpen={createCommentModal.isOpen}
        title="Create comment"
        onClose={handleClose}
      />
    </div>
  );
};

export default CreateComment;