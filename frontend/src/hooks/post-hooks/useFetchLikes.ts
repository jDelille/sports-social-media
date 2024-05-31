import { useAxios } from "../useAxios";
import { useQuery } from "@tanstack/react-query";

const useFetchLikes = (postId: number, type: string) => {

  const {
    data: likes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["likes", postId],
    queryFn: async () => {
      const res = await useAxios.get(`/likes?postId=${postId}&type=${type}`);
      return res.data;
    },
  });

  return { likes, error };
};

export default useFetchLikes;
