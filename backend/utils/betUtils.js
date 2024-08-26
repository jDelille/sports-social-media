import { db } from "../connect.js";

export const updateWinLossRecord = (userId, result, pickId, postId, homeScore, awayScore, res) => {
  // Determine win/loss increments
  const winIncrement = result ? 1 : 0;
  const lossIncrement = result ? 0 : 1;

  // First, check if the isWinner has already been set
  const getBetQuery = `
    SELECT JSON_EXTRACT(bet, '$.picks[${pickId}].isWinner') AS isWinner,
           JSON_EXTRACT(bet, '$.picks[${pickId}].amountWagered') AS amountWagered,
           JSON_EXTRACT(bet, '$.picks[${pickId}].amountWon') AS amountWon,
           JSON_EXTRACT(bet, '$.picks[${pickId}].averageOdds') AS averageOdds
    FROM posts 
    WHERE id = ?
  `;

  db.query(getBetQuery, [postId], (err, results) => {
    if (err) {
      console.error("Error fetching bet data:", err);
      return res.status(500).json({ error: "Error fetching bet data" });
    }

    const { isWinner, amountWagered, amountWon, averageOdds } = results[0];

    console.log(results[0])

    // If isWinner is already set (not null), return without making any updates
    if (isWinner !== null) {
      return res.status(200).json({ message: "Bet already settled." });
    }

    // Update the isWinner in the posts table
    const updateBetQuery = `
      UPDATE posts 
      SET bet = JSON_SET(
        bet, 
        '$.picks[${pickId}].isWinner', ?, 
        '$.picks[${pickId}].homeScore', ?, 
        '$.picks[${pickId}].awayScore', ?
      ) 
      WHERE id = ?
    `;

    db.query(updateBetQuery, [result, homeScore, awayScore, postId], (err, data) => {
      if (err) {
        console.error("Error updating bet status:", err);
        return res.status(500).json({ error: "Error updating bet status" });
      }

      // Update user's wins/losses in the users table
      const updateWinLossQuery = `
        UPDATE users 
        SET wins = wins + ?, losses = losses + ? 
        WHERE id = ?
      `;

      db.query(updateWinLossQuery, [winIncrement, lossIncrement, userId], (err, result) => {
        if (err) {
          console.error("Error updating win/loss record:", err);
          return res.status(500).json({ error: "Error updating win/loss record" });
        }

        // Update the leaderboard
        const leaderboardQuery = `
          INSERT INTO leaderboard_users (user_id, wins, losses, amount_wagered, amount_won, average_odds)
          VALUES (?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            wins = VALUES(wins),
            losses = VALUES(losses),
            amount_wagered = VALUES(amount_wagered),
            amount_won = VALUES(amount_won),
            average_odds = VALUES(average_odds);
        `;

        // Use extracted values for leaderboard update
        db.query(leaderboardQuery, [userId, winIncrement, lossIncrement, amountWagered, amountWon, averageOdds], (err, result) => {
          if (err) {
            console.error("Error updating leaderboard:", err);
            return res.status(500).json({ error: "Error updating leaderboard" });
          }

          // Send the final result response after updating both the bet status, win/loss record, and leaderboard
          return res.status(200).json({ result });
        });
      });
    });
  });
};