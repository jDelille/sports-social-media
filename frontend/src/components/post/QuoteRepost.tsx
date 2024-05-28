import React, { useContext, useEffect, useState } from "react";
import PostTypes from "../../types/Post";
import PostHeader from "./PostHeader";
import { AuthContext } from "../../context/AuthContext";
import useCreateQuoteRepostModal from "../../hooks/useCreateQuoteRepost";
import { useAxios } from "../../hooks/useAxios";
import "./post.scss";
import useCreateCommentModal from "../../hooks/useCreateCommentModal";

type QuoteRepostProps = {
  post: PostTypes;
};

const QuoteRepost: React.FC<QuoteRepostProps> = ({ post }) => {
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState<any>(null);
  const [comments, setComments] = useState<any>(null);
  const [hideMutedPost, setHideMutedPost] = useState(false);

  const [mutedPostIds, setMutedPostIds] = useState<Set<number>>(new Set());
  const [repostedMutedPostIds, setRepostedMutedPostIds] = useState<Set<number>>(
    new Set()
  );

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

  const handleLike = async (postId: number, type: string) => {
    try {
      await useAxios.post("/likes", {
        quoteRepostId: postId,
        type: type, // post type
      });
    } catch (error) {
      setError("error liking post");
    }
  };

 

  const handleComment = async (postId: number, type: string) => {
    createCommentModal.onOpen(postId, type);
  };

  useEffect(() => {
    const fetchLikesAndComments = async () => {
      try {
        const likesResponse = await useAxios.get(
          `/likes?quoteRepostId=${postId}&type=${type}`
        );
        const commentsResponse = await useAxios.get(
          `/comments?quoteRepostId=${postId}&type=${type}`
        );
        setLikes(likesResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Failed to fetch likes or comments:", error);
      }
    };

    const fetchMutedPosts = async () => {
      try {
        const response = await useAxios.get(
          `/muted-posts?quoteRepostId=${post.id}&type=${post.type}`
        );
        const repostedReponse = await useAxios.get(
          `/muted-posts?postId=${post.quote_reposted_post_id}&type=post`
        );

        const mutedPostIds = response.data; // Array of muted post IDs
        const repostedMutedPostIds = repostedReponse.data;

        setMutedPostIds(new Set(mutedPostIds));
        setRepostedMutedPostIds(new Set(repostedMutedPostIds));
      } catch (error) {
        console.error("Error fetching muted posts.");
      }
    };

    fetchLikesAndComments();

    if (currentUserId) {
      fetchMutedPosts();
    }
  }, [postId]);

  const handleHideMutedPost = () => {
    setHideMutedPost(!hideMutedPost);
  };

  const isMuted = mutedPostIds.has(postId);
  const isOriginalPostMuted = repostedMutedPostIds.has(
    post.quote_reposted_post_id
  );


  const handleMutePost = async (postId: number, type: string) => {
    try {
      if(!isMuted) {
        await useAxios.post("/muted-posts", {
          quoteRepostId: postId,
          type: type,
        });
      } else {
        console.log('here')
        await useAxios.delete("/muted-posts", {
          data: {
            quoteRepostId: postId,
            type: type
          }
        })
      }
     
    } catch (error) {
      setError("error muting post");
    }
  };


  return (
    <div className="quote-repost">
      {isMuted && <strong>Post is muted</strong>}

      {post.type === "quote_repost_repost" && (
        <p>(repost icon) reposted by {post.reposter_username}</p>
      )}
      <PostHeader user={post.user} />
      <p className="body">{post.body}</p>
      <div className="original-post">
        <PostHeader user={post.original_post_user} />
        {!hideMutedPost && isOriginalPostMuted ? (
          <>
            <p>You have muted this post</p>
            <button onClick={handleHideMutedPost}>View</button>
          </>
        ) : (
          <>
            <p className="body">{post.original_post_body}</p>
            <button onClick={handleHideMutedPost}>Hide</button>
          </>
        )}
      </div>
      <button onClick={() => handleRepost(post.id)}>repost</button>
      <button
        onClick={() => handleQuoteRepost(post.id, post.type, post.user_id)}
      >
        quote repost
      </button>
      <button onClick={() => handleLike(post.id, post.type)}>
        Like, {likes?.length || 0} likes
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

export default QuoteRepost;
