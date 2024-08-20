import { useEffect, useState } from "react";
import useAxios from "../useAxios";

type BetProps = {
  sport: string;
  league: string;
  eventId: string;
  type: string;
  postId: number;
  isUpdated: boolean;
  pickId: number;
  handicap: string; 
  team: string;
  userId: number;
};

const useSpreadCheck = (bet: BetProps) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bet.isUpdated) {
      console.log("Bet already updated, skipping check");
      setLoading(false);
      return;
    }

    const checkSpread = async () => {
      try {
        const response = await useAxios.post(
          `/spread/check/${bet.sport}/${bet.league}/${bet.eventId}/${bet.type}/${bet.postId}/${bet.pickId}/${parseFloat(bet.handicap)}/${bet.team}/${bet.userId}`
        );

        setStatus(response.data.result); // Assuming response data contains the status
      } catch (err: any) {
        console.error("Error checking spread:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (bet) {
      checkSpread();
    }
  }, []);

  return { status, loading, error };
};

export default useSpreadCheck;
