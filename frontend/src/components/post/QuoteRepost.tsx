import React, { useContext, useEffect, useState } from "react";
import PostTypes from "../../types/Post";
import PostHeader from "./PostHeader";
import { AuthContext } from "../../context/AuthContext";
import useCreateQuoteRepostModal from "../../hooks/useCreateQuoteRepost";
import { useAxios } from "../../hooks/useAxios";
import "./post.scss";
import useCreateCommentModal from "../../hooks/useCreateCommentModal";
import useDeletePopup from "../../hooks/useDeletePopup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LikeButton from "./post-controls/LikeButton";
import useFetchLikes from "../../hooks/post-hooks/useFetchLikes";
import useFetchComments from "../../hooks/post-hooks/useFetchComments";
import CommentButton from "./post-controls/CommentButton";

type QuoteRepostProps = {
  post: PostTypes;
};

const QuoteRepost: React.FC<QuoteRepostProps> = ({ post }) => {
  const [error, setError] = useState<string | null>(null);
  const [hideMutedPost, setHideMutedPost] = useState(false);

  const [mutedPostIds, setMutedPostIds] = useState<Set<number>>(new Set());
  const [repostedMutedPostIds, setRepostedMutedPostIds] = useState<Set<number>>(
    new Set()
  );

  const { currentUser } = useContext(AuthContext) || {};
  const createQuoteRepostModal = useCreateQuoteRepostModal();
  const createCommentModal = useCreateCommentModal();
  const deletePopup = useDeletePopup();
  const queryClient = useQueryClient();

  const currentUserId = currentUser.id;

  const postId = post.id;
  const type = post.type;

  const { likes } = useFetchLikes(postId, type);
  const { comments } = useFetchComments(postId, type);


  const hasReposted = post.reposter_username === currentUser.username;

  const handleRepost = async (postId: number) => {
    try {
      if (!hasReposted) {
        await useAxios.post("/reposts", {
          postId: postId,
          username: currentUser.username,
          type: post.type,
        });
      } else {
        await useAxios.delete("/reposts", {
          data: {
            postId: postId,
            type: post.type,
          },
        });
      }
    } catch (error) {
      setError("error reposting!!");
    }
  };

  const { mutate } = useMutation({
    mutationFn: handleRepost,
    onSettled: async () => {
      queryClient.refetchQueries();
    },
    mutationKey: ["addRepost"],
  });

  const handleRepostClick = async (postId: number) => {
    try {
      mutate(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuoteRepost = async (
    postId: number,
    type: string,
    originalPostUserId: number
  ) => {
    createQuoteRepostModal.onOpen(postId, type, originalPostUserId);
  };


  useEffect(() => {
    const fetchMutedPosts = async () => {
      try {
        const response = await useAxios.get(
          `/muted-posts?postId=${post.id}&type=${post.type}`
        );
        const repostedReponse = await useAxios.get(
          `/muted-posts?postId=${
            post.quote_reposted_post_id || post.quote_reposted_quote_repost_id
          }&type=${post.quote_reposted_post_id ? "post" : "quote_repost"}`
        );

        const mutedPostIds = response.data; // Array of muted post IDs
        const repostedMutedPostIds = repostedReponse.data;

        setMutedPostIds(new Set(mutedPostIds));
        setRepostedMutedPostIds(new Set(repostedMutedPostIds));
      } catch (error) {
        console.error("Error fetching muted posts.");
      }
    };

    if (currentUserId) {
      fetchMutedPosts();
    }
  }, [postId]);

  const handleHideMutedPost = () => {
    setHideMutedPost(!hideMutedPost);
  };

  const isMuted = mutedPostIds.has(postId);
  const isOriginalPostMuted = repostedMutedPostIds.has(
    post.quote_reposted_post_id || post.quote_reposted_quote_repost_id
  );
  const hasLiked = likes?.includes(currentUserId);


  const handleMutePost = async (postId: number, type: string) => {
    try {
      if (!isMuted) {
        await useAxios.post("/muted-posts", {
          quoteRepostId: postId,
          type: type,
        });
      } else {
        console.log("here");
        await useAxios.delete("/muted-posts", {
          data: {
            quoteRepostId: postId,
            type: type,
          },
        });
      }
    } catch (error) {
      setError("error muting post");
    }
  };

  const handleDeletePost = async (postId: number, type: string) => {
    try {
      deletePopup.onOpen(postId, type);
    } catch (error) {
      setError("error muting post");
    }
  };

  console.log(likes)

  return (
    <div className="quote-repost">
      {isMuted && <strong>Post is muted</strong>}

      {post.type === "quote_repost_repost" && (
        <p>(repost icon) reposted by {post.reposter_username}</p>
      )}
      <PostHeader user={post.user} post={post}/>
      <p className="body">{post.body}</p>
      <div className="original-post">
        <PostHeader user={post.original_post_user} post={post} />
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
      <button onClick={() => handleRepostClick(post.id)}>
        {hasReposted ? "unrepost" : "repost"}
      </button>
      <button
        onClick={() => handleQuoteRepost(post.id, post.type, post.user_id)}
      >
        quote repost
      </button>

      <LikeButton
        postId={postId}
        type={type}
        hasLiked={hasLiked}
        likesCount={likes?.length}
        setError={setError}
      />

      <CommentButton 
        postId={postId}
        type={type}
        commentsCount={comments?.length}
      />
      <button onClick={() => handleMutePost(post.id, post.type)}>
        {isMuted ? "Unmute" : "Mute"}
      </button>
      <button onClick={() => handleDeletePost(post.id, post.type)}>
        Delete
      </button>
    </div>
  );
};

export default QuoteRepost;
