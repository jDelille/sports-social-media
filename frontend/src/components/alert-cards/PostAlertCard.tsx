import React, { useEffect, useState } from "react";
import { Alert } from "../../pages/Alerts";
import { CommentIcon, LikeIcon, RepostIcon } from "../../icons";
import { useAxios } from "../../hooks";
import { COLOR_CONSTANTS } from "../../constants";
import { CommentTypes } from "../../types/CommentTypes";
import "./alertCard.scss";
import { useNavigate } from "react-router-dom";

type PostAlertCardProps = {
  alert: Alert;
};
const PostAlertCard: React.FC<PostAlertCardProps> = ({ alert }) => {
  const alerter = alert.alerter;
  const [post, setPost] = useState<any>(null);
  const [comment, setComment] = useState<CommentTypes>()
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await useAxios.get(`posts/${alert?.post_id}`);
        if (!response || response.status !== 200) {
          throw new Error("Failed to fetch post");
        }
        const data = response.data;  // No need for `await` here
        setPost(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    const fetchComment = async () => {
      try {
        const response = await useAxios.get(`comments/${alert?.comment_id}`);
        if (!response || response.status !== 200) {
          throw new Error("Failed to fetch comment");
        }
        const data = response.data;  // No need for `await` here
        setComment(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    // Check if alert is defined before accessing its properties
    if (alert) {
      if (alert.msg === "liked your post" || alert.msg === "reposted your post") {
        fetchPost();
      } else if (alert.msg === "commented on your post") {
        fetchComment();
      }
    }
  }, [alert]);


  const getIcon = (message: string) => {
    switch (message) {
      case "liked your post":
        return <LikeIcon size={16} color={COLOR_CONSTANTS.LIKE_COLOR} />;
      case "commented on your post":
        return <CommentIcon size={16} color={COLOR_CONSTANTS.ACCENT} />;
      //   case 'shared your post':
      //     return <ShareIcon size={16} color="green" />;
      case "reposted your post":
        return <RepostIcon size={16} color={COLOR_CONSTANTS.REPOST_COLOR} />;
      default:
        return null;
    }
  };

  const icon = getIcon(alert.msg);

  const moveTextInFrontOfLink = (body: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
  
    const parts = body.split(urlRegex);
  
    const textParts = parts.filter(part => !urlRegex.test(part) && part.trim() !== "");
    const urlParts = parts.filter(part => urlRegex.test(part));
  
    return (
      <>
        {textParts.join(" ")}
        {urlParts.length > 0 && (
          <>
            <br />
            <a href={urlParts[0]} target="_blank" rel="noopener noreferrer">
              {urlParts[0]}
            </a>
          </>
        )}
      </>
    );
  };

  const handleNavigateToProfile = (username: string) => {
    navigate(`/profile/${username}`)
  }

  return (
    <div className="post-alert-card alert-card">
      <div className="alert-type">
        {icon}
        <p className="alerter-username" onClick={() => handleNavigateToProfile(alerter.username)}>{alerter.username}</p>
        <span>{alert.msg}</span>
      </div>
      
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          {/* {post && <Post post={post} isAlertPage />}
          {comment && <CommentCard comment={comment} username={alert.alerter.username} />} */}
          {post && <p className="post-body">{post.metadata ? moveTextInFrontOfLink(post.body) : post.body}</p>}
          {comment && <p className="comment-body">{comment.body}</p>}
        </>
      )}
    </div>
  );
};

export default PostAlertCard;
