import React, { useState } from "react";
import Modal from "../modal/Modal";
import useCreateCommentModal from "../../hooks/useCreateCommentModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../../hooks";
import PostHeader from "../post/PostHeader";
import UserTypes from "../../types/User";
import PostTypes from "../../types/Post";
import ArticleDisplay from "../article-display/ArticleDisplay";
import MentionsTextarea from "../mentions-textarea/MentionsTextarea";
import "./createComment.scss";
import { Link } from "react-router-dom";

type CreateCommentProps = {};
const CreateComment: React.FC<CreateCommentProps> = () => {
  const queryClient = useQueryClient();

  const [commentBody, setCommentBody] = useState("");
  const [file, setFile] = useState(null);
  const [urlMetadata, setUrlMetadata] = useState<any>(null);

  const createCommentModal = useCreateCommentModal();

  const postId = createCommentModal.postId;
  const type = createCommentModal.type;
  const post = createCommentModal.post;

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

  const handleSubmitClick = async (e: any) => {
    e.preventDefault();

    try {
      mutate(commentBody);
      setCommentBody("");
    } catch (error) {
      console.log(error);
    }
  };

  const hideUrlsInBody = (body: string) => {
    if (!body) return "";

    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Remove URLs
    let cleanedBody = body.replace(urlRegex, "");

    // Split the cleanedBody into parts: text and hashtags
    const parts = cleanedBody.split(/(#\w+)/g);

    // Map over the parts, wrapping hashtags in <a> elements
    const elements = parts.map((part, index) => {
      return <span key={index}>{part}</span>;
    });

    return elements;
  };

  const bodyContent = (
    <div className="create-comment">
      <div className="og-post">
        <PostHeader
          user={post?.user as UserTypes}
          post={post as PostTypes}
          hideMenu
        />
        <p className="body">{hideUrlsInBody(post?.body as string)}</p>
        <Link to={post?.metadata.url as string} target="_blank" className="url-link">{post?.metadata.url}</Link>
      </div>

      <div className="content">
        <MentionsTextarea
          setBody={setCommentBody}
          body={commentBody}
          setFile={setFile}
          file={file}
          handleClick={(e) => handleSubmitClick(e)}
          setUrlMetadata={setUrlMetadata}
          isActive
          isComment
        />
      </div>
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
