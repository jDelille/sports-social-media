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
import "./post.scss";
import { RepostIcon } from "../../icons";
import { useNavigate } from "react-router-dom";
import { COLOR_CONSTANTS } from "../../constants";
import PostFooter from "./PostFooter";
import ArticleDisplay from "../article-display/ArticleDisplay";
import Bet from "./Bet";
import useMoneylineCheck from "../../hooks/bet-check/useMoneylineCheck";

type PostProps = {
  post: PostTypes;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [error, setError] = useState<string | null>(null);

  const { currentUser } = useContext(AuthContext) || {};
  const createQuoteRepostModal = useCreateQuoteRepostModal();
  const deletePopup = useDeletePopup();
  const navigate = useNavigate();

  const postId = post.id;
  const type = post.type;

  const { muted } = useFetchMutedPosts(postId, type);

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

  console.log(post)

  const handleQuoteRepost = async (
    postId: number,
    type: string,
    originalPostUserId: number
  ) => {
    createQuoteRepostModal.onOpen(postId, type, originalPostUserId);
  };

  const navigateToProfile = (e: any) => {
    e.stopPropagation();
    navigate(`/profile/${post.user_id}`);
  };
  

  const hideUrlsInBody = (body: string) => {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
  
    // Remove URLs
    let cleanedBody = body?.replace(urlRegex, "");
  
    return cleanedBody;
  };

  return (
    <div className="post">
      {(type === "repost") && (
        <p className="reposter">
          <RepostIcon size={15} color={COLOR_CONSTANTS.REPOST_COLOR} />
          Reposted by{" "}
          <span onClick={(e) => navigateToProfile(e)}>
            @{post.reposter_username}
          </span>
        </p>
      )}

      <PostHeader user={post.user} post={post} />

      <p className="body">{hideUrlsInBody(post.body)}</p>
      {post.image && <img src={post.image} className="post-image" />}
      <ArticleDisplay metadata={post.metadata} />
      
      <Bet post={post} />

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

export default Post;
