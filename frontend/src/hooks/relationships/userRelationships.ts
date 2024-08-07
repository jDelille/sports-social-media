import { useContext, useEffect, useState } from 'react';
import useAxios from '../useAxios';
import RelationshipTypes from '../../types/Relationship';
import userRelationshipsStore from '../../store/userRelationshipStore';
import { AuthContext } from '../../context/AuthContext';

const useUserRelationships = (userId: number) => {
    const [data, setData] = useState<RelationshipTypes | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {currentUser} = useContext(AuthContext) || {};

    useEffect(() => {
        const fetchUserRelationships = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await useAxios.get(`/relationships/find/${userId}`);

                const isFollowing = response.data.followers.includes(currentUser.id)

                const data = {
                    followerCount: response.data.followerCount,
                    followingCount: response.data.followingCount,
                    isFollowing: isFollowing
                };
                userRelationshipsStore.setUserRelationships(data);
                setData(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchUserRelationships();
    }, [userId]);

    return { count: userRelationshipsStore.userRelationships, data, loading, error };
};

export default useUserRelationships;