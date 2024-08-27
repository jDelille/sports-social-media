import React, { useEffect, useState } from "react";
import { Alert } from "../../pages/Alerts";
import { CommentIcon, LikeIcon, RepostIcon } from "../../icons";
import { useAxios } from "../../hooks";
import Post from "../post/Post";
import { COLOR_CONSTANTS } from "../../constants";
import { CommentTypes } from "../../types/CommentTypes";
import CommentCard from "../comment-card/CommentCard";
import "./alertCard.scss";

type PostAlertCardProps = {
  alert: Alert;
};
const PostAlertCard: React.FC<PostAlertCardProps> = ({ alert }) => {
  const alerter = alert.alerter;
  const [post, setPost] = useState<any>(null);
  const [comment, setComment] = useState<CommentTypes>()
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await useAxios.get(`posts/${alert.post_id}`);
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
      if (alert.msg === "liked your post") {
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

  return (
    <div className="post-alert-card alert-card">
      <div className="alert-type">
        {icon}
        <p className="alerter-username">{alerter.username}</p>
        <span>{alert.msg}</span>
      </div>
      
      <Post post={post} />
      <CommentCard comment={comment} username={alert.alerter.username} />
    </div>
  );
};

export default PostAlertCard;
