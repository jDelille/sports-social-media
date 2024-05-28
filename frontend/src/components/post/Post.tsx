import React, { useContext, useEffect, useState } from "react";
import PostTypes from "../../types/Post";
import { useAxios } from "../../hooks/useAxios";
import { AuthContext } from "../../context/AuthContext";
import useCreateQuoteRepostModal from "../../hooks/useCreateQuoteRepost";
import PostHeader from "./PostHeader";
import "./post.scss";

type PostProps = {
  post: PostTypes;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState<any>(null);
  const { currentUser } = useContext(AuthContext) || {};

  const createQuoteRepostModal = useCreateQuoteRepostModal();

  const postId = post.id;
  const type = post.type;

  const handleRepost = async (postId: number) => {
    try {
      await useAxios.post("/reposts", {
        postId: postId,
        username: currentUser.username,
        type: post.type
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

  const handleLike = async (postId: number, type: string) => {
    try {
      await useAxios.post("/likes", {
        postId: postId,
        type: type // post type
      })
    } catch (error) {
      setError("error liking post")
    }
  };

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await useAxios.get(`/likes?postId=${postId}&type=${type}`);
        setLikes(response.data);
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      }
    };

    fetchLikes();
  }, [postId]);

  console.log(likes)

  return (
    <div className="post">
      {post.type === "repost" && (
        <p>(repost icon) reposted by {post.reposter_username}</p>
      )}

      <PostHeader user={post.user} />

      <p className="body">{post.body}</p>

      <button onClick={() => handleRepost(post.id)}>repost</button>
      <button
        onClick={() => handleQuoteRepost(post.id, post.type, post.user_id)}
      >
        quote repost
      </button>
      <button onClick={() => handleLike(post.id, post.type)}>Like, {likes?.length || 0} likes</button>
    </div>
  );
};

export default Post;
