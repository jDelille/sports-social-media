import React, { useContext, useState } from "react";
import { CommentButton, LikeButton, RepostButton } from "./post-controls";
import { useFetchComments, useFetchLikes } from "../../hooks";
import { AuthContext } from "../../context/AuthContext";
import PostTypes from "../../types/Post";
import useFetchRepostStatus from "../../hooks/post-hooks/useFetchRepostStatus";

type PostFooterProps = {
  post: PostTypes;
  type: string;
  commentId?: number;
};
const PostFooter: React.FC<PostFooterProps> = ({ type, post, commentId }) => {
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useContext(AuthContext) || {};

  const currentUserId = currentUser?.id;
  const postId = post?.id;

  const validPostId = commentId ?? postId;
  const validType = type ?? "post";

  const { likes } = useFetchLikes(validPostId, validType);
  const { comments } = useFetchComments(validPostId, validType);
  const { repostedStatus } = useFetchRepostStatus(validPostId, validType);

  const hasLiked = likes?.includes(currentUserId);
  const hasReposted = repostedStatus?.reposted;
  const repostCount = repostedStatus?.count;
  

  return (
    <div className="post-footer">
      {error && <div>{error}</div>}
      <LikeButton
        postId={validPostId}
        type={validType}
        hasLiked={hasLiked}
        likesCount={likes?.length}
        setError={setError}
        currentUserId={currentUser?.id}
        postUsername={post?.user.username}
        userId={post?.user_id}
      />
      <CommentButton
        postId={validPostId}
        type={validType}
        commentsCount={comments?.length}
        currentUserId={currentUser?.id}
        postUsername={post?.user.username}
        post={post}
      />
      <RepostButton
        postId={validPostId}
        type={validType}
        username={currentUser?.username}
        setError={setError}
        hasReposted={hasReposted}
        repostCount={repostCount}
        originalPostUserId={post?.user_id}
        currentUserId={currentUser?.id}
        postUsername={post?.user.username}
      />
    </div>
  );
};

export default PostFooter;
