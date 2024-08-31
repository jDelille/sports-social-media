import React, { useEffect, useState } from "react";
import PostTypes from "../../types/Post";
import PostHeader from "./PostHeader";
import {
  useFetchComments,
  useFetchLikes,
  useAxios,
} from "../../hooks";
import { RepostIcon } from "../../icons";
import { useNavigate, useParams } from "react-router-dom";
import { COLOR_CONSTANTS } from "../../constants";
import PostFooter from "./PostFooter";
import ArticleDisplay from "../article-display/ArticleDisplay";
import Bet from "./post-bet/Bet";
import moment from "moment";
import "./post.scss";

type PostProps = {
  post: PostTypes;
  isHashtagPage?: boolean;
  isPostDetailsPage?: boolean;
  isAlertPage?: boolean;
};

const Post: React.FC<PostProps> = ({
  post,
  isHashtagPage,
  isPostDetailsPage,
  isAlertPage
}) => {
  if (!post) {
    return;
  }
  const { hashtag } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [bets, setBets] = useState([]);

  // const createQuoteRepostModal = useCreateQuoteRepostModal();
  const navigate = useNavigate();

  const { likes } = useFetchLikes(post.id, post.type);
  const { comments } = useFetchComments(post.id, post.type);

  // const postId = post?.id;
  const type = post?.type;

  useEffect(() => {
    if (post.bet_id === null) {
      return;
    }

    const fetchBet = async () => {
      try {
        const res = await useAxios.get(`/single-bet/bet/${post.id}`);
        setBets(res.data);
      } catch (err) {
        setError("Failed to fetch bet information");
      }
    };

    if (post.id) {
      fetchBet();
    }
  }, [post.id]);

  // const { muted } = useFetchMutedPosts(postId, type);

  // const hasMuted = muted?.includes(postId);

  const formattedDate = moment(post.created_at).format("MMM D, YYYY, h:mm A");

  // if(hasMuted) {
  //   return null;
  // }

  // const handleQuoteRepost = async (
  //   postId: number,
  //   type: string,
  //   originalPostUserId: number
  // ) => {
  //   createQuoteRepostModal.onOpen(postId, type, originalPostUserId);
  // };

  const navigateToProfile = (e: any) => {
    e.stopPropagation();
    navigate(`/profile/${post.reposter_username}`);
  };

  const navigateToPost = (e: any) => {
    e.stopPropagation();
    navigate(`/post/${post.id}`);
  };

  const handleHashtagClick = (hashtag: string, e: any) => {
    e.stopPropagation();
    navigate(`/discover/hashtag/${hashtag}`);
  };

  const hideUrlsInBody = (body: string) => {
    if (!body) return "";

    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Regular expression to match hashtags
    const hashtagRegex = /#(\w+)/g;

    // Remove URLs
    let cleanedBody = body.replace(urlRegex, "");

    // Split the cleanedBody into parts: text and hashtags
    const parts = cleanedBody.split(/(#\w+)/g);

    // Map over the parts, wrapping hashtags in <a> elements
    const elements = parts.map((part, index) => {
      if (hashtagRegex.test(part)) {
        return (
          <p
            onClick={(e) => handleHashtagClick(part.substring(1), e)}
            className={
              isHashtagPage && part.substring(1) === hashtag
                ? "hashtag-page-hashtag"
                : "hashtag"
            }
            key={index}
          >
            {part}
          </p>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });

    return elements;
  };

  return (
    <div className={isAlertPage ? "alert-post" : "post"} onClick={navigateToPost}>
      {type === "repost" && (
        <div className="reposter">
          <RepostIcon size={15} color={COLOR_CONSTANTS.REPOST_COLOR} />
          Reposted by
          <span onClick={(e) => navigateToProfile(e)}>
            {post.reposter_username}
          </span>
        </div>
      )}

      {error && (
        <div>{'error'}</div>
      )}
      <PostHeader user={post.user} post={post} />

      <p className="body">{hideUrlsInBody(post.body)}</p>

      {post.image && (
        <img src={post.image} className="post-image" loading="lazy" />
      )}

      <ArticleDisplay metadata={post.metadata} />

      <Bet bets={bets} betId={post.bet_id} />

      {!isPostDetailsPage && <PostFooter post={post} type={type} />}

      {isPostDetailsPage && (
        <div className="post-details-info">
          <p>
            <span>{likes?.length | 0}</span> Likes
          </p>
          <p>
            <span>{comments?.length | 0}</span> Comments
          </p>
          <p className="formatted-date">{formattedDate}</p>
        </div>
      )}

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
