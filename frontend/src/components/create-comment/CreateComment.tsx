import React, { useState } from "react";
import Modal from "../modal/Modal";
import useCreateCommentModal from "../../hooks/useCreateCommentModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../../hooks";

type CreateCommentProps = {};
const CreateComment: React.FC<CreateCommentProps> = () => {
  const queryClient = useQueryClient();

  const [body, setBody] = useState("");

  const createCommentModal = useCreateCommentModal();

  const postId = createCommentModal.postId;
  const type = createCommentModal.type;

  const handleSubmit = async (body: string) => {
    try {
      await useAxios.post("/comments", {
        postId: postId,
        body,
        image: null,
        type: type,
      });

      createCommentModal.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation({
    mutationFn: handleSubmit,
    onSettled: async () => {
      queryClient.refetchQueries();
    },
    mutationKey: ["addComment"],
  });
  
  const handleSubmitClick = async () => {
    try {
      mutate(body);
    } catch (error) {
      console.log(error);
    }
  };



  const bodyContent = (
    <div>
      <input
        type="text"
        placeholder="Comment on this post"
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={handleSubmitClick}>Post</button>
    </div>
  );




  const handleClose = () => {
    createCommentModal.onClose();
  };

  return (
    <div className="create-comment">
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
