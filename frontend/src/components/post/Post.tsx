import React, { useContext, useState } from "react";
import PostTypes from "../../types/Post";
import { AuthContext } from "../../context/AuthContext";
import PostHeader from "./PostHeader";
import {
  useFetchComments,
  useFetchLikes,
  useDeletePopup,
  useCreateQuoteRepostModal,
  useFetchMutedPosts,
} from "../../hooks";
import { CommentButton, LikeButton, MuteButton, RepostButton } from "./post-controls";
import "./post.scss";

type PostProps = {
  post: PostTypes;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [error, setError] = useState<string | null>(null);

  const { currentUser } = useContext(AuthContext) || {};
  const createQuoteRepostModal = useCreateQuoteRepostModal();
  const deletePopup = useDeletePopup();

  const currentUserId = currentUser.id;
  const postId = post.id;
  const type = post.type;

  const { likes } = useFetchLikes(postId, type);
  const { comments } = useFetchComments(postId, type);
  const { muted } = useFetchMutedPosts(postId, type);

  const hasLiked = likes?.includes(currentUserId);
  const hasReposted = post.reposter_username === currentUser.username;
  const hasMuted = muted?.includes(postId);

  // if(hasMuted) {
  //   return null;
  // }

  const handleDeletePost = async (postId: number, type: string) => {
    try {
      deletePopup.onOpen(postId, type);
    } catch (error) {
      setError("error muting post");
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
    <div className="post">
      {hasMuted && <strong>Post is muted</strong>}
      {post.type === "repost" && (
        <p>(repost icon) reposted by {post.reposter_username}</p>
      )}

      <PostHeader user={post.user} post={post} />

      <p className="body">{post.body}</p>

      <RepostButton
        postId={postId}
        type={type}
        username={currentUser.username}
        setError={setError}
        hasReposted={hasReposted}
      />
      <button
        onClick={() => handleQuoteRepost(post.id, post.type, post.user_id)}
      >
        quote repost
      </button>

      <LikeButton
        postId={postId}
        type={type}
        hasLiked={hasLiked}
        likesCount={likes?.length}
        setError={setError}
      />

      <CommentButton
        postId={postId}
        type={type}
        commentsCount={comments?.length}
      />

      <MuteButton 
        hasMuted={hasMuted}
        type={type}
        postId={postId}
        setError={setError}
      />
      <button onClick={() => handleDeletePost(post.id, post.type)}>
        Delete
      </button>
    </div>
  );
};

export default Post;
