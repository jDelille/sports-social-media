import React, { useEffect, useState } from "react";
import PostTypes from "../../types/Post";
import PostHeader from "./PostHeader";
import {
  useFetchComments,
  useFetchLikes,
  useAxios,
  useHideUrlsInBody,
} from "../../hooks";
import { RepostIcon } from "../../icons";
import { useNavigate, useParams } from "react-router-dom";
import { COLOR_CONSTANTS } from "../../constants";
import PostFooter from "./PostFooter";
import ArticleDisplay from "../article-display/ArticleDisplay";
import Bet from "./post-bet/Bet";
import moment from "moment";
import PostSkeleton from "../loading-skeletons/PostSkeleton";
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
    return null; // Ensure null is returned when post is falsy.
  }
  const { hashtag } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const navigate = useNavigate();

  const { likes } = useFetchLikes(post.id, post.type);
  const { comments } = useFetchComments(post.id, post.type);

  useEffect(() => {
    if (post.bet_id === null || post.bet_id === undefined) {
      return;
    }

    const fetchBet = async () => {
      setLoading(true); // Set loading to true when fetching begins
      try {
        const res = await useAxios.get(`/single-bet/bet/${post.id}`);
        setBets(res.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Failed to fetch bet information");
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    if (post.id) {
      fetchBet();
    }
  }, [post.id]);

  const formattedDate = moment(post.created_at).format("MMM D, YYYY, h:mm A");

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

  const hideUrlsInBody = useHideUrlsInBody({
    handleHashtagClick,
    isHashtagPage: isHashtagPage || false,
    hashtag: hashtag || ""
  });

  if(loading) {
    return <PostSkeleton />
  }

  return (
    <div className={isAlertPage ? "alert-post" : "post"} onClick={navigateToPost}>
      {post.type === "repost" && (
        <div className="reposter">
          <RepostIcon size={15} color={COLOR_CONSTANTS.REPOST_COLOR} />
          Reposted by
          <span onClick={(e) => navigateToProfile(e)}>
            {post.reposter_username}
          </span>
        </div>
      )}

      <PostHeader user={post.user} post={post} />

      {/* Display loading state */}
      {loading && <p>Loading...</p>}

      {/* Display error state */}
      {error && <p className="error">{error}</p>}

      <p className="body">{hideUrlsInBody(post.body)}</p>

      {post.image && (
        <img src={post.image} className="post-image" loading="lazy" />
      )}

      <ArticleDisplay metadata={post.metadata} />

      {/* Render Bet component only if not loading */}
      {!loading && <Bet bets={bets} betId={post.bet_id} />}

      {!isPostDetailsPage && <PostFooter post={post} type={post.type} />}

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
    </div>
  );
};

export default Post;