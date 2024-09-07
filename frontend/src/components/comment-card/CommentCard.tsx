import React from "react";
import { CommentTypes } from "../../types/CommentTypes";
import PostHeader from "../post/PostHeader";
import PostFooter from "../post/PostFooter";
import { Link } from "react-router-dom";
import "./commentCard.scss";

type CommentCardProps = {
  comment: CommentTypes | undefined;
  username: string;
};
const CommentCard: React.FC<CommentCardProps> = ({ comment, username }) => {
  if (!comment) {
    return null;
  }
  

  return (
    <div className="comment-card">
      <PostHeader post={comment as any} user={comment?.user} hideMenu/>
      <div className="replying-to">
        Replying to <Link to="/">{`@${username}`}</Link>{" "}
      </div>
      <p className="body">{comment?.body}</p>
      <PostFooter
        post={comment as any}
        type={"comment"}
        commentId={comment?.id}
      />
    </div>
  );
};

export default CommentCard;
