import { useState, useEffect } from 'react';
import useAxios from '../useAxios';

type TotalBetCountHook = {
  totalCount: number | null;
  loading: boolean;
  error: string | null;
};

const useTotalBetCount = (): TotalBetCountHook => {
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalBetCount = async () => {
      try {
        const response = await useAxios.get('/bet-stats/total-count');
        setTotalCount(response.data.totalCount);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTotalBetCount();
  }, []);

  return { totalCount, loading, error };
};

export default useTotalBetCount;