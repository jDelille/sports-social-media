import React, { useContext, useEffect, useState } from "react";
import PostTypes from "../../types/Post";
import { useAxios } from "../../hooks/useAxios";
import { AuthContext } from "../../context/AuthContext";
import useCreateQuoteRepostModal from "../../hooks/useCreateQuoteRepost";
import PostHeader from "./PostHeader";
import "./post.scss";
import useCreateCommentModal from "../../hooks/useCreateCommentModal";

type PostProps = {
  post: PostTypes;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState<any>(null);
  const [comments, setComments] = useState<any>(null);
  const [mutedPostIds, setMutedPostIds] = useState<Set<number>>(new Set());

  const { currentUser } = useContext(AuthContext) || {};
  const createQuoteRepostModal = useCreateQuoteRepostModal();
  const createCommentModal = useCreateCommentModal();

  const currentUserId = currentUser.id;

  const postId = post.id;
  const type = post.type;

  const handleRepost = async (postId: number) => {
    try {
      await useAxios.post("/reposts", {
        postId: postId,
        username: currentUser.username,
        type: post.type,
      });
    } catch (error) {
      setError("error reposting!!");
    }
  };

  const handleQuoteRepost = async (
    postId: number,
    type: string,
    originalPostUserId: number
  ) => {
    createQuoteRepostModal.onOpen(postId, type, originalPostUserId);
  };





  const handleComment = (postId: number, type: string) => {
    createCommentModal.onOpen(postId, type);
  };

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesResponse = await useAxios.get(
          `/likes?postId=${postId}&type=${type}`
        );
        const commentsResponse = await useAxios.get(
          `/comments?postId=${postId}&type=${type}`
        );
        setLikes(likesResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      }
    };

    const fetchMutedPosts = async () => {
      try {
        const response = await useAxios.get(
          `/muted-posts?postId=${post.id}&type=${post.type}`
        );
        const mutedPostIds = response.data; // Array of muted post IDs
        setMutedPostIds(new Set(mutedPostIds));
      } catch (error) {
        console.error("Error fetching muted posts.");
      }
    };

    fetchLikes();

    if (currentUserId) {
      fetchMutedPosts();
    }
  }, [postId]);

  console.log(likes)

  const hasLiked = likes?.includes(currentUserId)

  const handleLike = async (postId: number, type: string) => {
    try {
      if(!hasLiked) {
        await useAxios.post("/likes", {
          postId: postId,
          type: type,
        });
      } else {
        await useAxios.delete("/likes", {
          data: {
            postId: postId,
            type: type,
          }
        });
      }
     
    } catch (error) {
      setError("error liking post");
    }
  };

  const isMuted = mutedPostIds.has(postId);

  const handleMutePost = async (postId: number, type: string) => {
  
    try {
      if(!isMuted) {
        await useAxios.post("/muted-posts", {
          postId: postId,
          type: type,
        });
      } else {
        await useAxios.delete("/muted-posts", {
          data: {
            postId: postId,
            type: type
          }
        })
      }
      
    } catch (error) {
      setError("error muting post");
    }
  };

  // if(isMuted) {
  //   return null;
  // }


  return (
    <div className="post">
      {isMuted && <strong>Post is muted</strong>}
      {post.type === "repost" && (
        <p>(repost icon) reposted by {post.reposter_username}</p>
      )}

      <PostHeader user={post.user} />

      <p className="body">{post.body}</p>

      <button onClick={() => handleRepost(post.id)}>repost</button>
      <button
        onClick={() => handleQuoteRepost(post.id, post.type, post.user_id)}
      >
        quote repost
      </button>
      <button onClick={() => handleLike(post.id, post.type)}>
        {hasLiked ? 'Unlike' : 'Like'}, {likes?.length || 0} likes
      </button>
      <button onClick={() => handleComment(post.id, post.type)}>
        Comment, {comments?.length || 0} comments
      </button>
      <button onClick={() => handleMutePost(post.id, post.type)}>
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
};

export default Post;
