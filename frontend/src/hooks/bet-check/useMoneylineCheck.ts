import { useEffect, useState } from "react";
import useAxios from "../useAxios";

type BetProps = {
  sport: string;
  league: string;
  eventId: string;
  type: string;
};

const useMoneylineCheck = (bet: BetProps) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkMoneyline = async () => {
      try {
        const response = await useAxios.post(
          `/moneyline/check/${bet.sport}/${bet.league}/${bet.eventId}/${bet.type}`
        );

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
