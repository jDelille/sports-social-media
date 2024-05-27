import React, { useContext, useState } from "react";
import PostTypes from "../../types/Post";
import PostHeader from "./PostHeader";
import { AuthContext } from "../../context/AuthContext";
import useCreateQuoteRepostModal from "../../hooks/useCreateQuoteRepost";
import { useAxios } from "../../hooks/useAxios";
import "./post.scss";

type QuoteRepostProps = {
  post: PostTypes;
};

const QuoteRepost: React.FC<QuoteRepostProps> = ({ post }) => {
  const [error, setError] = useState<string | null>(null);

  const { currentUser } = useContext(AuthContext) || {};

  const createQuoteRepostModal = useCreateQuoteRepostModal();

  const handleRepost = async (postId: number) => {
    try {
      await useAxios.post("/reposts", {
        postId: postId,
        username: currentUser.username,
      });
    } catch (error) {
      setError("error reposting!!");
    }
  };

  const handleQuoteRepost = async (
    postId: number,
    type: string,
    originalPostUserId: number
  ) => {
    createQuoteRepostModal.onOpen(postId, type, originalPostUserId);
  };

  return (
    <div className="quote-repost">
      <PostHeader user={post.user} />
      <p className="body">{post.body}</p>
      <div className="original-post">
        <PostHeader user={post.original_post_user} />
        <p className="body">{post.original_post_body}</p>
      </div>
      <button onClick={() => handleRepost(post.id)}>repost</button>
      <button
        onClick={() => handleQuoteRepost(post.id, post.type, post.user_id)}
      >
        quote repost
      </button>
    </div>
  );
};

export default QuoteRepost;
