import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

const useFetchMutedOriginalPost = ( quoteRepostedId: number, quoteRepostedQuoteRepostId: number ) => {

  const {
    data: mutedOriginalPost,
    error
  } = useQuery({
    queryKey: ["muted"],
    queryFn: async () => {
        const res = await useAxios.get(
            `/muted-posts?postId=${
              quoteRepostedId || quoteRepostedQuoteRepostId
            }&type=${quoteRepostedId ? "post" : "quote_repost"}`
          );
      return res.data;
    },
  });

  return { mutedOriginalPost, error };
};

export default useFetchMutedOriginalPost;