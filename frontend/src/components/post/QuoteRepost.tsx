import React, { useContext, useState } from "react";
import PostTypes from "../../types/Post";
import PostHeader from "./PostHeader";
import { AuthContext } from "../../context/AuthContext";
import {
  CommentButton,
  LikeButton,
  MuteButton,
  RepostButton,
} from "./post-controls";
import {
  useCreateQuoteRepostModal,
  useDeletePopup,
  useFetchComments,
  useFetchLikes,
  useFetchMutedOriginalPost,
  useFetchMutedPosts,
} from "../../hooks";
import "./post.scss";


type QuoteRepostProps = {
  post: PostTypes;
};

const QuoteRepost: React.FC<QuoteRepostProps> = ({ post }) => {
  const [error, setError] = useState<string | null>(null);
  const [hideMutedPost, setHideMutedPost] = useState(false);

  const { currentUser } = useContext(AuthContext) || {};
  const createQuoteRepostModal = useCreateQuoteRepostModal();
  const deletePopup = useDeletePopup();

  const currentUserId = currentUser.id;
  const postId = post.id;
  const type = post.type;

  const { likes } = useFetchLikes(postId, type);
  const { comments } = useFetchComments(postId, type);
  const { muted } = useFetchMutedPosts(postId, type);
  const { mutedOriginalPost } = useFetchMutedOriginalPost(
    post.quote_reposted_post_id,
    post.quote_reposted_quote_repost_id
  );


  const hasLiked = likes?.includes(currentUserId);
  const hasMuted = muted?.includes(postId);
  const isOriginalPostMuted = mutedOriginalPost?.includes(
    post.quote_reposted_quote_repost_id || post.quote_reposted_post_id 
  );

  const hasReposted = post.reposter_username === currentUser.username;

  const handleQuoteRepost = async (
    postId: number,
    type: string,
    originalPostUserId: number
  ) => {
    createQuoteRepostModal.onOpen(postId, type, originalPostUserId);
  };

  const handleHideMutedPost = () => {
    setHideMutedPost(!hideMutedPost);
  };

  const handleDeletePost = async (postId: number, type: string) => {
    try {
      deletePopup.onOpen(postId, type);
    } catch (error) {
      setError("error muting post");
    }
  };

  return (
    <div className="quote-repost">
      {post.type === "quote_repost_repost" && (
        <p>(repost icon) reposted by {post.reposter_username}</p>
      )}
      <PostHeader user={post.user} post={post} />
      <p className="body">{post.body}</p>
      <div className={isOriginalPostMuted && !hideMutedPost ? "muted-original-post" : "original-post"}>
        {isOriginalPostMuted && (
           <div className="muted-post">
           <p>You have muted this post.</p>
           <button onClick={handleHideMutedPost}>View</button>
         </div>
        )}
        {!isOriginalPostMuted && (
          <>
            <PostHeader user={post.original_post_user} post={post} />
            <p className="body">{post.original_post_body}</p>
          </>
        )}
        </div>

      <div className="footer">
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


    </div>
  );
};

export default QuoteRepost;
