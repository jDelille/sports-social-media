import { db } from "../../connect.js";

export const getUserBetRecord = (req, res) => {
  const userId = req.params.userId;

  // Query to count wins and losses
  const betRecordQuery = `
        SELECT 
            SUM(CASE WHEN JSON_EXTRACT(p.bet, '$.picks[*].betStatus') = 1 THEN 1 ELSE 0 END) AS wins,
            SUM(CASE WHEN JSON_EXTRACT(p.bet, '$.picks[*].betStatus') = 0 THEN 1 ELSE 0 END) AS losses
        FROM defaultdb.posts p
        WHERE p.user_id = ?;
    `;

  db.query(betRecordQuery, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching bet record:", err);
      return res.status(500).json({ error: "Error fetching bet record" });
    }

    const { wins = 0, losses = 0 } = results[0] || {};
    return res.status(200).json({ wins, losses });
  });
};
