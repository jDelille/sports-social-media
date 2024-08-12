import { useState, useEffect } from "react";

/**
 * Hard coded for now, in future get data from db.
 * @returns 
 */

const useHashTagData = () => {
  const [hashTagData, setHashTagData] = useState([
    { id: "nfltrades", display: "#NFLtrades" },
    { id: "mlbseason", display: "#MLBseason" },
    { id: "nhlplayoffs", display: "#NHLplayoffs" },
    { id: "nbafinals", display: "#NBAfinals" },
    { id: "worldseries", display: "#WorldSeries" },
    { id: "superbowl", display: "#SuperBowl" },
    { id: "olympics", display: "#Olympics" },
    { id: "paralympics", display: "#Paralympics" },
    { id: "usopen", display: "#USOpen" },
    { id: "wimbledon", display: "#Wimbledon" },
  ]);

  // You can add a useEffect here if you want to fetch the hashtag data from an API in the future.
  useEffect(() => {
    // Example: fetchHashtagData(); // A function to fetch data from an API
  }, []);

  return hashTagData;
};

export default useHashTagData;