import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

const useFetchMutedPosts = (postId: number, type: string) => {

  const {
    data: muted,
    error
  } = useQuery({
    queryKey: ["muted", postId],
    queryFn: async () => {
      const res = await useAxios.get(`/muted-posts?postId=${postId}&type=${type}`);
      return res.data;
    },
  });

  return { muted, error };
};

export default useFetchMutedPosts;
