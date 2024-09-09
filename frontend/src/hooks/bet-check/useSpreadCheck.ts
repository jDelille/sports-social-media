import { useEffect, useState } from "react";
import useAxios from "../useAxios";

type BetProps = {
  sport: string;
  league: string;
  eventId: string;
  type: string;
  postId: number;
  isWinner: number;
  pickId: number;
  handicap: string; 
  team: string;
  userId: number;
  betId: number;
};

const useSpreadCheck = (bet: BetProps) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bet.isWinner) {
      console.log("Bet already updated, skipping check");
      setLoading(false);
      return;
    }

    const checkSpread = async () => {
      try {
        const response = await useAxios.post(`/spread/check`, {
          sport: bet.sport,
          league: bet.league,
          eventId: bet.eventId,
          type: bet.type,
          postId: bet.postId,
          pickId: bet.pickId,
          handicap: parseFloat(bet.handicap),
          team: bet.team,
          userId: bet.userId,
          betId: bet.betId
        });

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
