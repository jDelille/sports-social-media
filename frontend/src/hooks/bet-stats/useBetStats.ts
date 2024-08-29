import { useState, useEffect } from 'react';
import useAxios from '../useAxios';

type BetStatsHook = {
  totalCount: number | null;
  winCount: number | null;
  lossCount: number | null;
  loading: boolean;
  error: string | null;
};

const useBetStats = (): BetStatsHook => {
  const [stats, setStats] = useState<{ totalCount: number | null; winCount: number | null; lossCount: number | null }>({
    totalCount: null,
    winCount: null,
    lossCount: null
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBetStats = async () => {
      setLoading(true);
      try {
        // Fetch all required stats in parallel
        const [totalCountResponse, winCountResponse, lossCountResponse] = await Promise.all([
          useAxios.get('/bet-stats/total-count'),
          useAxios.get('/bet-stats/win-count'),
          useAxios.get('/bet-stats/loss-count')
        ]);

        // Update state with fetched data
        setStats({
          totalCount: totalCountResponse.data.totalCount,
          winCount: winCountResponse.data.winCount,
          lossCount: lossCountResponse.data.lossCount
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBetStats();
  }, []);
  return { ...stats, loading, error };
};

export default useBetStats;