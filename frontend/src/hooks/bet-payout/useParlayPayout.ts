import { useCallback } from "react";

const useParlayPayout = () => {
    const calculateParlayPayout = useCallback((decimalOdds: number[], stake: number): number => {
        if (decimalOdds.length === 0 || stake <= 0) return 0;

        const totalOdds = decimalOdds.reduce((acc, odd) => acc * odd, 1);
        const payout = totalOdds * stake;

        return payout;
    }, []);

    return {
        calculateParlayPayout,
    };
}

export default useParlayPayout;