import React, { useEffect, useState } from "react";
import { Alert } from "../../pages/Alerts";
import { CommentIcon, LikeIcon, RepostIcon } from "../../icons";
import { useAxios } from "../../hooks";
import Post from "../post/Post";
import "./alertCard.scss";
import { COLOR_CONSTANTS } from "../../constants";

type PostAlertCardProps = {
  alert: Alert;
};
const PostAlertCard: React.FC<PostAlertCardProps> = ({ alert }) => {
  const alerter = alert.alerter;
  const [post, setPost] = useState<any>(null); // Adjust type based on your post structure
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await useAxios.get(`posts/${alert.post_id}`);
        if (!response) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.data;
        setPost(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [alert.post_id]);

  console.log(post)

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
    </div>
  );
};

export default PostAlertCard;
