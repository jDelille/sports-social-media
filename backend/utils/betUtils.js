import { db } from "../connect.js";

export const updateWinLossRecord = (
  userId,
  result,
  pickId,
  postId,
  homeScore,
  awayScore,
  res,
  betId
) => {
  // First, check if the isWinner has already been set
  const getBetQuery = `
    SELECT *
    FROM defaultdb.single_bets
    WHERE id = ?
  `;


  db.query(getBetQuery, [betId], (err, results) => {
    if (err) {
      console.error("Error fetching bet data:", err);
      return res.status(500).json({ error: "Error fetching bet data" });
    }
    
    const { is_winner, status } = results[0];

    if (status === 'pending') {
      const updateBetQuery = `
        UPDATE defaultdb.single_bets
        SET is_winner = ?, home_score = ?, away_score = ?, status = 'completed'
        WHERE id = ?
      `;

      db.query(
        updateBetQuery,
        [result, homeScore, awayScore, betId],
        (err, results) => {
          if (err) {
            console.error("Error fetching bet data:", err);
            return res.status(500).json({ error: "Error fetching bet data" });
          }

          // Update leaderboard_users table
          let updateLeaderboardQuery;
          if (result === true) {
            updateLeaderboardQuery = `
              UPDATE defaultdb.leaderboard_users
              SET wins = wins + 1
              WHERE user_id = ?
            `;
          } else {
            updateLeaderboardQuery = `
              UPDATE defaultdb.leaderboard_users
              SET losses = losses + 1
              WHERE user_id = ?
            `;
          }

          db.query(updateLeaderboardQuery, [userId], (err, results) => {
            if (err) {
              console.error("Error updating leaderboard data:", err);
              return res
                .status(500)
                .json({ error: "Error updating leaderboard data" });
            }

            return res
              .status(200)
              .json({ message: "Bet and leaderboard updated successfully." });
          });
        }
      );
    } else {
      // If is_winner is already set, send response
      return res.status(200).json({ message: "Bet already settled." });
    }
  });
};
