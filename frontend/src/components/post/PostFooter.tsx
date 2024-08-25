import React, { useContext, useState } from "react";
import { CommentButton, LikeButton, RepostButton } from "./post-controls";
import { useFetchComments, useFetchLikes } from "../../hooks";
import { AuthContext } from "../../context/AuthContext";
import PostTypes from "../../types/Post";
import useFetchRepostStatus from "../../hooks/post-hooks/useFetchRepostStatus";

type PostFooterProps = {
  post: PostTypes;
  type: string;
};
const PostFooter: React.FC<PostFooterProps> = ({ type, post }) => {
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useContext(AuthContext) || {};

  const currentUserId = currentUser?.id;
  const postId = post?.id;

  const { likes } = useFetchLikes(postId, type);
  const { comments } = useFetchComments(postId, type);
  const { repostedStatus } = useFetchRepostStatus(postId, type);

  const hasLiked = likes?.includes(currentUserId);
  const hasReposted = repostedStatus?.reposted
  const repostCount = repostedStatus?.count;

  return (
    <div className="post-footer">
      <LikeButton
        postId={postId}
        type={type}
        hasLiked={hasLiked}
        likesCount={likes?.length}
        setError={setError}
        currentUserId={currentUser?.id}
        postUsername={post?.user.username}
        userId={post?.user_id}
      />
      <CommentButton
        postId={postId}
        type={type}
        commentsCount={comments?.length}
        currentUserId={currentUser?.id}
        postUsername={post?.user.username}
        post={post}

      />
      <RepostButton
        postId={postId}
        type={type}
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
