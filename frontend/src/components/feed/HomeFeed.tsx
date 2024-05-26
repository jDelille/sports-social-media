import React, { useContext, useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { AuthContext } from "../../context/AuthContext";
import useCreateQuoteRepostModal from "../../hooks/useCreateQuoteRepost";
import "./feed.scss";

type HomeFeedProps = {};
const HomeFeed: React.FC<HomeFeedProps> = () => {
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  const { currentUser } = useContext(AuthContext) || {};

  const createQuoteRepostModal = useCreateQuoteRepostModal();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await useAxios.get("/posts");
        setPosts(response.data);
      } catch (error) {
        setError("Error fetching posts.");
      }
    };

    fetchPosts();
  }, []);

  const handleRepost = async (postId: number) => {
    try {
      await useAxios.post("/reposts", {
        postId: postId,
        username: currentUser.username,
      });
    } catch (error) {
      setError("error reposting!!");
    }
  };

  const handleQuoteRepost = async (postId: number, type: string) => {
    createQuoteRepostModal.onOpen(postId, type);
  };

  return (
    <div className="feed home-feed">
      {error && <p>{error}</p>}
      {!error &&
        posts.map((post) => (
          <div
            key={
              post.type === "post" ? `post_id${post.id}` : `repost_id${post.id}`
            }
            className="post"
          >
            {post.type === "quote repost" && <p>{post.body}</p>}

            {post.type === "repost" && (
              <p>reposted by {post.reposter_username}</p>
            )}
            {post.type === "quote repost" ? (
              <p>{post.original_post_body}</p>
            ) : (
              <p>{post.body}</p>
            )}
            <button onClick={() => handleRepost(post.id)}>repost</button>
            <button onClick={() => handleQuoteRepost(post.id, post.type)}>
              quote repost
            </button>
          </div>
        ))}
    </div>
  );
};

export default HomeFeed;
