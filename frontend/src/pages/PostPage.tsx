import React, { useEffect, useState } from "react";
import { PageHeader } from "../components";
import { useParams } from "react-router-dom";
import "./page.scss";
import { useAxios } from "../hooks";
import Post from "../components/post/Post";

type PostPageProps = {};

const PostPage: React.FC<PostPageProps> = () => {
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

      console.log(post)

  return (
    <div className="post-page page">
      <PageHeader title="Post Details" hasBack />
      {post && (
        <Post post={post}/>
      )}
      
    </div>
  );
};

export default PostPage;
