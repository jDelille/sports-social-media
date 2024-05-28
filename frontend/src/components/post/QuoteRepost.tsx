import React, { useContext, useEffect, useState } from "react";
import PostTypes from "../../types/Post";
import PostHeader from "./PostHeader";
import { AuthContext } from "../../context/AuthContext";
import useCreateQuoteRepostModal from "../../hooks/useCreateQuoteRepost";
import { useAxios } from "../../hooks/useAxios";
import "./post.scss";
import useCreateCommentModal from "../../hooks/useCreateCommentModal";

type QuoteRepostProps = {
  post: PostTypes;
};

const QuoteRepost: React.FC<QuoteRepostProps> = ({ post }) => {
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState<any>(null);
  const [comments, setComments] = useState<any>(null);
  
  const { currentUser } = useContext(AuthContext) || {};
  const createQuoteRepostModal = useCreateQuoteRepostModal();
  const createCommentModal = useCreateCommentModal();

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
        quoteRepostId: postId,
        type: type // post type
      })
    } catch (error) {
      setError("error liking post")
    }
  };

  const handleComment = async (postId: number, type: string) => {
    createCommentModal.onOpen(postId, type)
  }

  

  useEffect(() => {
    const fetchLikesAndComments = async () => {
      try {
        const likesResponse = await useAxios.get(`/likes?quoteRepostId=${postId}&type=${type}`);
        const commentsResponse = await useAxios.get(`/comments?quoteRepostId=${postId}&type=${type}`)
        setLikes(likesResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      }
    };

    fetchLikesAndComments();
  }, [postId]);


  return (
    <div className="quote-repost">
      {post.type === 'quote_repost_repost' && (
        <p>(repost icon) reposted by {post.reposter_username}</p>
      )}
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
      <button onClick={() => handleLike(post.id, post.type)}>Like, {likes?.length || 0} likes</button>
      <button onClick={() => handleComment(post.id, post.type)}>Comment, {comments?.length || 0} comments</button>

    </div>
  );
};

export default QuoteRepost;
