import { db } from "../../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getTotalBetCount = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const userId = userInfo.id;

    const q = `
      SELECT COUNT(*) AS count FROM single_bets WHERE user_id = ?
    `;

    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      
      // Combine the counts into a single total
      const totalCount = data.reduce((acc, row) => acc + row.count, 0);
      
      return res.status(200).json({ totalCount });
    });
  });
};

// UNION ALL
// SELECT COUNT(*) AS count FROM parlay_bets WHERE user_id = ?
// UNION ALL
// SELECT COUNT(*) AS count FROM teaser_bets WHERE user_id = ?