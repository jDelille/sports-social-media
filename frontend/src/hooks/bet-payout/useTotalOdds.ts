import { useState, useEffect } from "react";

// Helper function to convert decimal odds to American odds
const decimalToAmerican = (decimalOdds: number): string => {
    if (decimalOdds >= 2.0) {
      // For positive American odds, add a + sign
      return `+${((decimalOdds - 1) * 100).toFixed(0)}`;
    } else {
      // For negative American odds, no need to add + since it's already negative
      return `-${(-100 / (decimalOdds - 1)).toFixed(0)}`;
    }
  };

const useTotalOdds = (decimalOddsArray: number[], convertToAmerican: boolean): number | string => {
  const [totalOdds, setTotalOdds] = useState<number>(1);

  useEffect(() => {
    if (decimalOddsArray.length > 0) {
      // Calculate the total decimal odds
      const calculatedTotalOdds = decimalOddsArray.reduce((acc, odds) => acc * odds, 1);
      
      // Set the total odds based on whether conversion to American is needed
      if (convertToAmerican) {
        setTotalOdds(parseFloat(decimalToAmerican(calculatedTotalOdds))); // Set American odds
      } else {
        setTotalOdds(calculatedTotalOdds); // Set decimal odds
      }
    } else {
      setTotalOdds(1); // Reset to 1 if no odds are provided
    }
  }, [decimalOddsArray, convertToAmerican]);

  return totalOdds;
};

export default useTotalOdds;