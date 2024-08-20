import { useState } from "react";
import useBetCheck from "./useBetCheck"; // Your existing useBetCheck hook

const useBetCheckWithSync = () => {
  const [syncingPickId, setSyncingPickId] = useState<number | null>(null);

  const betCheck = (params: {
    sport: string;
    league: string;
    eventId: string;
    team: string;
    type: string;
    postId: number;
    pickId: number;
    isUpdated: boolean;
    handicap: string;
    userId: number;
  }) => {
    setSyncingPickId(params.pickId);
    useBetCheck(params);

    // Simulate a delay for syncing operation
    setTimeout(() => {
      setSyncingPickId(null); // Reset syncing state after operation
    }, 1000); // Adjust the timeout as needed
  };

  return { syncingPickId, betCheck };
};

export default useBetCheckWithSync;