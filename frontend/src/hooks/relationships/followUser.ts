import { useState } from "react";
import useAxios from "../useAxios";

const useFollowUser = (followerId: number) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const followUser = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await useAxios.post(`/relationships/follow/${followerId}`, {
                followerId,
            });

            // Assuming a successful response means the user was followed
            if (response.status === 200) {
                setSuccess(true);
                return response.data;
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'An error occurred while following the user');
        } finally {
            setLoading(false);
        }
    };
    return { followUser, loading, error, success };

}
export default useFollowUser;
