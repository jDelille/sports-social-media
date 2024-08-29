import { db } from "../../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


// UNION ALL
// SELECT COUNT(*) AS count FROM parlay_bets WHERE user_id = ?
// UNION ALL
// SELECT COUNT(*) AS count FROM teaser_bets WHERE user_id = ?

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

export const getWinCount = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const userId = userInfo.id;

    const q = `
      SELECT COUNT(*) AS winCount
      FROM single_bets
      WHERE user_id = ? AND is_winner = 1
    `;

    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      
      // Extract the winCount from the result
      const winCount = data[0].winCount;
      
      return res.status(200).json({ winCount });
    });
  });
};

export const getLossCount = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const userId = userInfo.id;

    const q = `
      SELECT COUNT(*) AS lossCount
      FROM single_bets
      WHERE user_id = ? AND is_winner = 0 AND status = 'completed'
    `;

    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      
      // Extract the lossCount from the result
      const lossCount = data[0].lossCount;
      
      return res.status(200).json({ lossCount });
    });
  });
};