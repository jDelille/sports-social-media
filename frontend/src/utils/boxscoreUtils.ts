type Stat = {
    name: string;
    displayValue: string;
    label: string;
  };
  
  type Categories = {
    [key: string]: { home: Stat | undefined; away: Stat | undefined }[];
  };
  
  export const categorizeStats = (
    homeStats: Stat[] | undefined,
    awayStats: Stat[] | undefined
  ): Categories => {
    const categories: Categories = {
      passing: [],
      rushing: [],
      receiving: [],
      fumbles: [],
      defense: [],
      interceptions: [],
      returns: [],
      penalties: [],
      general: [],
    };
  
    const allStatNames = new Set(
      [...(homeStats ?? []), ...(awayStats ?? [])].map((stat) => stat.name)
    );
  
    allStatNames.forEach((statName) => {
      const homeStat = homeStats?.find((stat) => stat.name === statName);
      const awayStat = awayStats?.find((stat) => stat.name === statName);
  
      const categoryKey = getCategoryKey(statName);
      categories[categoryKey].push({ home: homeStat, away: awayStat });
    });
  
    return categories;
  };
  
  const getCategoryKey = (statName: string): string => {
    switch (statName) {
      case "netPassingYards":
      case "completionAttempts":
      case "yardsPerPass":
      case "interceptions":
        return "passing";
      case "rushingYards":
      case "rushingAttempts":
      case "yardsPerRushAttempt":
        return "rushing";
      case "fumblesLost":
        return "fumbles";
      case "totalPenaltiesYards":
        return "penalties";
      case "defensiveTouchdowns":
      case "totalDrives":
      case "sacksYardsLost":
        return "defense";
      case "turnovers":
        return "interceptions";
      case "possessionTime":
      case "totalOffensivePlays":
      case "totalYards":
        return "general";
      default:
        return "general"; // Default category if no specific match
    }
  };