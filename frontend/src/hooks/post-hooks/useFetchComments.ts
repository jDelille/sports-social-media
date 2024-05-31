import { useAxios } from "../useAxios";
import { useQuery } from "@tanstack/react-query";

const useFetchComments = (postId: number, type: string) => {

  const {
    data: comments,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await useAxios.get(`/comments?postId=${postId}&type=${type}`);
      return res.data;
    },
  });

  return { comments, error };
};

export default useFetchComments;