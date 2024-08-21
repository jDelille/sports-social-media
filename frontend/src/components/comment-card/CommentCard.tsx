import React from "react";
import "./commentCard.scss";
import { CommentTypes } from "../../types/CommentTypes";
import PostHeader from "../post/PostHeader";
import PostFooter from "../post/PostFooter";
import { Link } from "react-router-dom";

type CommentCardProps = {
  comment: CommentTypes;
  username: string;
};
const CommentCard: React.FC<CommentCardProps> = ({ comment, username }) => {
  console.log(comment);
  return (
    <div className="comment-card">
      <PostHeader post={comment as any} user={comment.user} />
      <div className="replying-to">Replying to <Link to="/">{`@${username}`}</Link> </div>
      <p className="body">{comment.body}</p>
      <PostFooter post={comment as any} type={"post"} />
    </div>
  );
};

export default CommentCard;
