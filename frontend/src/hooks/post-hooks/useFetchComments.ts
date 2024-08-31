import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";

const useFetchComments = (postId: number, type: string) => {

  const {
    data: comments,
    error
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