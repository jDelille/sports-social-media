import { db } from "../connect.js";

export const updateWinLossRecord = (userId, result, pickId, postId, res) => {
  // Determine win/loss increments
  const winIncrement = result ? 1 : 0;
  const lossIncrement = result ? 0 : 1;

  // First, check if the betStatus has already been set
  const getBetStatusQuery = `
    SELECT JSON_EXTRACT(bet, '$.picks[${pickId}].betStatus') AS betStatus 
    FROM posts 
    WHERE id = ?
  `;

  db.query(getBetStatusQuery, [postId], (err, results) => {
    if (err) {
      console.error("Error fetching bet status:", err);
      return res.status(500).json({ error: "Error fetching bet status" });
    }

    const currentBetStatus = results[0]?.betStatus;

    // If betStatus is already set (not null), return without making any updates
    if (currentBetStatus !== null) {
      return res.status(200).json({ message: "Bet already settled." });
    }

    // Update the betStatus in the posts table
    const updateBetQuery = `
      UPDATE posts 
      SET bet = JSON_SET(bet, '$.picks[${pickId}].betStatus', ?) 
      WHERE id = ?
    `;

    db.query(updateBetQuery, [result, postId], (err, data) => {
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

      db.query(
        updateWinLossQuery,
        [winIncrement, lossIncrement, userId],
        (err, result) => {
          if (err) {
            console.error("Error updating win/loss record:", err);
            return res.status(500).json({ error: "Error updating win/loss record" });
          }

          // Send the final result response after updating both the bet status and win/loss record
          return res.status(200).json({ result });
        }
      );
    });
  });
};