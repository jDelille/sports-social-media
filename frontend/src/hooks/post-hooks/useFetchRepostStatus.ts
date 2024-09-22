import useAxios from "../useAxios";
import { useQuery } from "@tanstack/react-query";

const useFetchRepostStatus = (postId: number, type: string) => {

  const {
    data: repostedStatus,
    error
  } = useQuery({
    queryKey: ["reposts", postId, type],
    queryFn: async () => {
      const res = await useAxios.get(`/reposts?postId=${postId}&type=${type}`);
      console.log(res)
      return res.data;
    },
  });
  

  return { repostedStatus, error };

};

export default useFetchRepostStatus;