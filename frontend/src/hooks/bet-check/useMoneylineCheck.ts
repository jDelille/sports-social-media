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
  team: string;
  userId: number;
  betId: number;
  status: string;
};

const useMoneylineCheck = (bet: BetProps) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (bet.status === 'completed') {
      console.log("Bet result already determined, skipping check");
      setLoading(false); // Set loading to false since no request is made
      return;
    }

    const checkMoneyline = async () => {
      try {
        const response = await useAxios.post('/moneyline/check', {
          sport: bet.sport,
          league: bet.league,
          eventId: bet.eventId,
          type: bet.type,
          postId: bet.postId,
          pickId: bet.pickId,
          team: bet.team,
          userId: bet.userId,
          betId: bet.betId
        });

        setStatus(response.data.result); // Assuming response data contains the status
      } catch (err: any) {
        console.error("Error checking moneyline:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (bet) {
      checkMoneyline(); // Call the function to perform the check
    }
  }, []);

  return { status, loading, error };
};

export default useMoneylineCheck;
