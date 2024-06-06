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
import PostFooter from "./PostFooter";
import { RepostIcon } from "../../icons";
import { COLOR_CONSTANTS } from "../../constants";
import { useNavigate } from "react-router-dom";

type QuoteRepostProps = {
  post: PostTypes;
};

const QuoteRepost: React.FC<QuoteRepostProps> = ({ post }) => {
  const [error, setError] = useState<string | null>(null);
  const [hideMutedPost, setHideMutedPost] = useState(false);

  const { currentUser } = useContext(AuthContext) || {};
  const createQuoteRepostModal = useCreateQuoteRepostModal();
  const deletePopup = useDeletePopup();
  const navigate = useNavigate();

  const currentUserId = currentUser?.id;
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

  const hasReposted = post.reposter_username === currentUser?.username;

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

  const navigateToProfile = (e: any) => {
    e.stopPropagation();
    navigate(`/profile/${post.user_id}`);
  };


  return (
    <div className="quote-repost">
      {(type === "quote_repost_repost") && (
        <p className="reposter">
          <RepostIcon size={15} color={COLOR_CONSTANTS.REPOST_COLOR} />
          Reposted by{" "}
          <span onClick={(e) => navigateToProfile(e)}>
            @{post.reposter_username}
          </span>
        </p>
      )}
      <PostHeader user={post.user} post={post} />
      <p className="body">{post.body}</p>
      <div
        className={
          isOriginalPostMuted && !hideMutedPost
            ? "muted-original-post"
            : "original-post"
        }
      >
        {isOriginalPostMuted && (
          <div className="muted-post">
            <p>You have muted this post</p>
            <MuteButton postId={post.quote_reposted_post_id} type={type} hasMuted={hasMuted} setError={setError}/>
          </div>
        )}
        
        {(!isOriginalPostMuted || hideMutedPost) && (
          <>
            <PostHeader user={post.original_post_user} post={post} quoteReposted />
            <p className="qr_body">{post.original_post_body}</p>
          </>
        )}
      </div>

      <PostFooter post={post} type={type} />

      {/* <button
        onClick={() => handleQuoteRepost(post.id, post.type, post.user_id)}
      >
        quote repost
      </button>


      <MuteButton
        hasMuted={hasMuted}
        type={type}
        postId={postId}
        setError={setError}
      />
      <button onClick={() => handleDeletePost(post.id, post.type)}>
        Delete
      </button> */}
    </div>
  );
};

export default QuoteRepost;
