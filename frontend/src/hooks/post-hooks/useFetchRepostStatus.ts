import useAxios from "../useAxios";
import { useQuery } from "@tanstack/react-query";

const useFetchRepostStatus = (postId: number, type: string) => {

  const {
    data: repostedStatus,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["reposts", postId],
    queryFn: async () => {
      const res = await useAxios.get(`/reposts?postId=${postId}&type=${type}`);
      return res.data;
    },
  });

  return { repostedStatus, error };

};

export default useFetchRepostStatus;