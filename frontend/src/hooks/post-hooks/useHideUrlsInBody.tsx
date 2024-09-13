import { useCallback } from "react";

type UseHideUrlsAndHashtagsProps = {
  handleHashtagClick: (hashtag: string, event: React.MouseEvent<HTMLSpanElement>) => void;
  isHashtagPage: boolean;
  hashtag: string;
};

const useHideUrlsAndHashtags = ({
  handleHashtagClick,
  isHashtagPage,
  hashtag,
}: UseHideUrlsAndHashtagsProps) => {
  const hideUrlsInBody = useCallback(
    (body: string) => {
      if (!body) return "";

      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const hashtagRegex = /#(\w+)/g;

      // Remove URLs
      let cleanedBody = body.replace(urlRegex, "");

      // Split text by hashtags
      const parts = cleanedBody.split(/(#\w+)/g);

      return parts.map((part, index) => {
        if (hashtagRegex.test(part)) {
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
        } else {
          return <span key={index}>{part}</span>;
        }
      });
    },
    [handleHashtagClick, isHashtagPage, hashtag]
  );

  return hideUrlsInBody;
};

export default useHideUrlsAndHashtags;