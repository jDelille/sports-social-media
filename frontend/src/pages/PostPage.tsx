import React, { useContext, useEffect, useState } from "react";
import { PageHeader } from "../components";
import { useParams } from "react-router-dom";
import "./page.scss";
import { useAxios, useFetchLikes } from "../hooks";
import Post from "../components/post/Post";
import PostDetailsFooter from "../components/post/post-details-footer/PostDetailsFooter";
import { AuthContext } from "../context/AuthContext";

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

  const { likes } = useFetchLikes(post?.id, post?.type);

  const hasLiked = likes?.includes(currentUser?.id);

  console.log(post);

  return (
    <div className="post-page page">
      <PageHeader title="Post Details" hasBack />
      <Post post={post} isPostDetailsPage />
      <PostDetailsFooter
        postId={post?.id}
        type={post?.type}
        postUsername={post?.user.username}
        currentUserId={currentUser?.id}
        hasLiked={hasLiked}
      />
    </div>
  );
};

export default PostPage;
