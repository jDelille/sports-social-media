import React, { useState } from "react";
import Modal from "../modal/Modal";
import { useAxios } from "../../hooks/useAxios";
import useCreateQuoteRepostModal from "../../hooks/useCreateQuoteRepost";

type CreateQuoteRepostProps = {};
const CreateQuoteRepost: React.FC<CreateQuoteRepostProps> = () => {
  const [body, setBody] = useState("");

  const createQuoteRepostModal = useCreateQuoteRepostModal();

  const postId = createQuoteRepostModal.postId;
  const type = createQuoteRepostModal.type;

  const handleSubmit = async () => {
    try {
      if (type === "post") {
        await useAxios.post("/quote-reposts", {
          postId: postId,
          quoteRepostedQuoteRepostId: null,
          body,
          image: null,
        });
        createQuoteRepostModal.onClose();
      } else if (type === "quote repost") {
        await useAxios.post("/quote-reposts", {
          postId: null,
          quoteRepostedQuoteRepostId: postId,
          body,
          image: null,
        });
      }
      createQuoteRepostModal.onClose();
    } catch (error) {
        console.log(error)
    }
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
