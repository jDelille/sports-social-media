import { useCallback } from "react";

type UseHideUrlsAndHashtagsProps = {
  handleHashtagClick: (hashtag: string, event: React.MouseEvent<HTMLSpanElement>) => void;
  isHashtagPage: boolean;
  handleMentionClick: (mention: string, event: React.MouseEvent<HTMLSpanElement>) => void; // New handler for mentions
  hashtag: string;
};

const useHideUrlsAndHashtags = ({
  handleHashtagClick,
  isHashtagPage,
  hashtag,
  handleMentionClick
}: UseHideUrlsAndHashtagsProps) => {
  const hideUrlsInBody = useCallback(
    (body: string) => {
      if (!body) return "";

      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const hashtagRegex = /#(\w+)/g;
      const mentionRegex = /@(\w+)/g;

      // Remove URLs
      let cleanedBody = body.replace(urlRegex, "");

      // Split text by hashtags
      const parts = cleanedBody.split(/(#\w+|@\w+)/g);


      return parts.map((part, index) => {
        if (hashtagRegex.test(part)) {
          // If the part is a hashtag, make it clickable
          return (
            <span
              onClick={(e) => handleHashtagClick(part.substring(1), e)}
              className={
                isHashtagPage && part.substring(1) === hashtag
                  ? "hashtag-page-hashtag"
                  : "hashtag"
              }
              key={index}
            >
              {part}
            </span>
          );
        } else if (mentionRegex.test(part)) {
          // If the part is a mention, make it clickable
          return (
            <span
              onClick={(e) => handleMentionClick(part.substring(1), e)}
              className="hashtag"
              key={index}
            >
              {part}
            </span>
          );
        } else {
          // Otherwise, just return the text part
          return <span key={index}>{part}</span>;
        }
      });
    },
    [handleHashtagClick, handleMentionClick, isHashtagPage, hashtag]
  );

  return hideUrlsInBody;
};

export default useHideUrlsAndHashtags;