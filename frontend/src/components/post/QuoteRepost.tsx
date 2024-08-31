import React, { useState } from "react";
import PostTypes from "../../types/Post";
import PostHeader from "./PostHeader";
import { MuteButton } from "./post-controls";
import { useFetchMutedOriginalPost, useFetchMutedPosts } from "../../hooks";
import PostFooter from "./PostFooter";
import { RepostIcon } from "../../icons";
import { COLOR_CONSTANTS } from "../../constants";
import { useNavigate } from "react-router-dom";
import ArticleDisplay from "../article-display/ArticleDisplay";
import "./post.scss";

type QuoteRepostProps = {
  post: PostTypes;
};

const QuoteRepost: React.FC<QuoteRepostProps> = ({ post }) => {
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const postId = post.id;
  const type = post.type;

  const { muted } = useFetchMutedPosts(postId, type);
  const { mutedOriginalPost } = useFetchMutedOriginalPost(
    post.quote_reposted_post_id,
    post.quote_reposted_quote_repost_id
  );

  const hasMuted = muted?.includes(postId);
  const isOriginalPostMuted = mutedOriginalPost?.includes(
    post.quote_reposted_quote_repost_id || post.quote_reposted_post_id
  );

  const navigateToProfile = (e: any) => {
    e.stopPropagation();
    navigate(`/profile/${post.user_id}`);
  };

  const hideUrlsInBody = (body: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return body.replace(urlRegex, "");
  };

  return (
    <div className="quote-repost">
      {error && (
        <div>error</div>
      )}
      {type === "quote_repost_repost" && (
        <p className="reposter">
          <RepostIcon size={15} color={COLOR_CONSTANTS.REPOST_COLOR} />
          Reposted by{" "}
          <span onClick={(e) => navigateToProfile(e)}>
            @{post.reposter_username}
          </span>
        </p>
      )}
      <PostHeader user={post.user} post={post} />
      <p className="body">{post.body}</p>

      <div
        className={
          isOriginalPostMuted
            ? "muted-original-post"
            : "original-post"
        }
      >
        {isOriginalPostMuted && (
          <div className="muted-post">
            <p>You have muted this post</p>
            <MuteButton
              postId={post.quote_reposted_post_id}
              type={type}
              hasMuted={hasMuted}
              setError={setError}
            />
          </div>
        )}

        {(!isOriginalPostMuted) && (
          <>
            {/* <PostHeader
              user={post.original_post_user}
              post={post}
              quoteReposted
            /> */}
            <p className="qr_body">{hideUrlsInBody(post.original_post_body)}</p>

            <ArticleDisplay metadata={post.metadata} />
          </>
        )}
      </div>

      <PostFooter post={post} type={type} />
    </div>
  );
};

export default QuoteRepost;
