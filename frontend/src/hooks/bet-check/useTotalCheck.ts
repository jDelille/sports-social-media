import { useEffect, useState } from "react";
import useAxios from "../useAxios";

type BetProps = {
  sport: string;
  league: string;
  eventId: string;
  type: string;
  postId: number;
  isUpdated: number;
  pickId: number;
  handicap: string;
  team: string;
};

const useTotalCheck = (bet: BetProps) => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
  
      if (bet.isUpdated === 1) {
        console.log('Bet already updated, skipping check');
        setLoading(false);  // Set loading to false since no request is made
        return;
      }
  
      const checkTotal = async () => {
        try {
          const response = await useAxios.post(
            `/total/check/${bet.sport}/${bet.league}/${bet.eventId}/${bet.type}/${bet.postId}/${bet.pickId}/${bet.team}/${bet.handicap}`
          );
  
          setStatus(response.data.result); // Assuming response data contains the status
        } catch (err: any) {
          console.error("Error checking total:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      if (bet) {
        checkTotal(); // Call the function to perform the check
      }
    }, []);
  
    return { status, loading, error };
  };
  
  export default useTotalCheck;
  