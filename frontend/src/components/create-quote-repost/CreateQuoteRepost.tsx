import React, { useState } from "react";
import Modal from "../modal/Modal";
import { useAxios } from "../../hooks/useAxios";
import useCreateQuoteRepostModal from "../../hooks/useCreateQuoteRepost";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateQuoteRepostProps = {};
const CreateQuoteRepost: React.FC<CreateQuoteRepostProps> = () => {
  const [body, setBody] = useState("");

  const createQuoteRepostModal = useCreateQuoteRepostModal();
  const queryClient = useQueryClient()

  const postId = createQuoteRepostModal.postId;
  const type = createQuoteRepostModal.type;
  const originalPostUserId = createQuoteRepostModal.originalPostUserId

  const handleSubmit = async (body: string) => {
    try {
      if (type === "post") {
        await useAxios.post("/quote-reposts", {
          postId: postId,
          quoteRepostedQuoteRepostId: null,
          originalPostUserId,
          body,
          image: null,
        });
        createQuoteRepostModal.onClose();
      } else if (type === "quote_repost") {
        await useAxios.post("/quote-reposts", {
          postId: null,
          quoteRepostedQuoteRepostId: postId,
          originalPostUserId,
          body,
          image: null,
        });
      }
      createQuoteRepostModal.onClose();
    } catch (error) {
        console.log(error)
    }
  };

  const { mutate } = useMutation({
    mutationFn: (body: string) => handleSubmit(body),
    onSettled: async () => {
      queryClient.refetchQueries();
      setBody("");
    },
    mutationKey: ["addQuoteRepost"]
  })

  const handlePostClick = async (e: any) => {
    e.preventDefault();

    try {
      mutate(body);
      setBody("");
      createQuoteRepostModal.onClose();
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
    createQuoteRepostModal.onClose();
  };

  return (
    <div className="create-quote-repost">
      <Modal
        body={bodyContent}
        isOpen={createQuoteRepostModal.isOpen}
        title="Create quote repost"
        onClose={handleClose}
      />
    </div>
  );
};

export default CreateQuoteRepost;
