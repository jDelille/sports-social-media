import React, { useContext, useState } from "react";
import PostTypes from "../../types/Post";
import { useAxios } from "../../hooks/useAxios";
import { AuthContext } from "../../context/AuthContext";
import useCreateQuoteRepostModal from "../../hooks/useCreateQuoteRepost";
import "./post.scss";
import PostHeader from "./PostHeader";

type PostProps = {
  post: PostTypes;
};

const Post: React.FC<PostProps> = ({ post }) => {
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

  const handleQuoteRepost = async (postId: number, type: string, originalPostUserId: number) => {
    createQuoteRepostModal.onOpen(postId, type, originalPostUserId);
  };

  return (
    <div className="post">
      {post.type === "repost" && <p>(repost icon) reposted by {post.reposter_username}</p>}

      <PostHeader user={post.user} />

      <p className="body">{post.body}</p>

      <button onClick={() => handleRepost(post.id)}>repost</button>
      <button onClick={() => handleQuoteRepost(post.id, post.type, post.user_id)}>
        quote repost
      </button>
    </div>
  );
};

export default Post;
