import { useCallback } from "react";

const useSinglePayout = () => {
    const calculatePayout = useCallback((decimalOdd: number, stake: number): number => {
        if (decimalOdd <= 0 || stake <= 0) return 0;

        return decimalOdd * stake;
    }, []);

    return {
        calculatePayout,
    };
}

export default useSinglePayout;