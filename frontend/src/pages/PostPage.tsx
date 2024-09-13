import React, { useContext, useEffect, useState } from "react";
import { PageHeader } from "../components";
import { useParams } from "react-router-dom";
import "./page.scss";
import { useAxios, useFetchComments, useFetchLikes } from "../hooks";
import Post from "../components/post/Post";
import PostDetailsFooter from "../components/post/post-details-footer/PostDetailsFooter";
import { AuthContext } from "../context/AuthContext";
import { CommentTypes } from "../types/CommentTypes";
import CommentCard from "../components/comment-card/CommentCard";
import useFetchRepostStatus from "../hooks/post-hooks/useFetchRepostStatus";
import PostSkeleton from "../components/loading-skeletons/PostSkeleton";

type PostPageProps = {};

const PostPage: React.FC<PostPageProps> = () => {
  const { currentUser } = useContext(AuthContext) || {};
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<any>(null); // Adjust type based on your post structure
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await useAxios.get(`posts/${postId}`);
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
  }, [postId]);

  const { comments } = useFetchComments(post?.id, post?.type);
  const { likes } = useFetchLikes(post?.id, post?.type);
  const { repostedStatus } = useFetchRepostStatus(post?.id, post?.type);

  const hasLiked = likes?.includes(currentUser?.id);
  const hasReposted = repostedStatus?.reposted;

  return (
    <div className="post-page page">
      <PageHeader title="Post Details" hasBack />
      {loading && (
        <PostSkeleton />
      )}
      {error && <div>Error</div>}
      <Post post={post} isPostDetailsPage />
      <PostDetailsFooter
        postId={post?.id}
        type={post?.type}
        postUsername={post?.user.username}
        currentUserId={currentUser?.id}
        hasLiked={hasLiked}
        hasReposted={hasReposted}
      />
      {comments?.map((comment: CommentTypes) => (
        <CommentCard key={comment.id} comment={comment} username={post.user.username} />
      ))}
    </div>
  );
};

export default PostPage;
