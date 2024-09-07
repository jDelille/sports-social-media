import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

const useFetchLikes = (postId: number | undefined, type: string) => {
  const {
    data: likes,
    error
  } = useQuery({
    queryKey: ["likes", postId, type],
    queryFn: async () => {
      if (postId === undefined) {
        throw new Error('Post ID is required');
      }
      const res = await useAxios.get(`/likes?postId=${postId}&type=${type}`);
      return res.data;
    },
  });

  return { likes, error };
};

export default useFetchLikes;
