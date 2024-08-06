import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import RelationshipTypes from '../../types/Relationship';

const useUserRelationships = (userId: number) => {
    const [data, setData] = useState<RelationshipTypes | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserRelationships = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await useAxios.get(`/relationships/find/${userId}`);
                
                setData(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchUserRelationships();
    }, [userId]);

    return { data, loading, error };
};

export default useUserRelationships;
