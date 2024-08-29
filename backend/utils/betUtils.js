import { db } from "../connect.js";

export const updateWinLossRecord = (userId, result, pickId, postId, homeScore, awayScore, res, betId) => {

  // First, check if the isWinner has already been set
  const getBetQuery = `
    SELECT is_winner, wager, payout, price
    FROM single_bets
    WHERE id = ?
  `;

  db.query(getBetQuery, [betId], (err, results) => {
    if (err) {
      console.error("Error fetching bet data:", err);
      return res.status(500).json({ error: "Error fetching bet data" });
    }
    
    const {is_winner} = results[0];

    if(is_winner === null) {
      const updateBetQuery = `
        UPDATE single_bets
        SET is_winner = ?, home_score = ?, away_score = ?, status = 'completed'
        WHERE id = ?
      `;

      db.query(updateBetQuery, [result, homeScore, awayScore, betId], (err, results) => {
        if (err) {
          console.error("Error fetching bet data:", err);
          return res.status(500).json({ error: "Error fetching bet data" });
        }

        return res.status(200).json({ message: "Bet updated successfully." });

      });
        
    } else {
      // If is_winner is already set, send response
      return res.status(200).json({ message: "Bet already settled." });
    }

  });
};