
/**
 * Hard coded for now, in future get data from db.
 * @returns 
 */

const useHashTagData = () => {

  const hashTagData = [
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
  ]


  return hashTagData;
};

export default useHashTagData;