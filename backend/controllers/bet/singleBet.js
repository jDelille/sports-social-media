import { db } from "../../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment/moment.js";

dotenv.config();

export const addSingleBet = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const {
      post_id,
      user_id, // Assuming this is being passed in the request body
      bet_type,
      home_abbreviation,
      away_abbreviation,
      home_logo,
      away_logo,
      match_id,
      status = "pending", // Default status to 'pending' if not provided
      wager,
      payout,
      price,
      is_winner = null, // Default to null if not provided
      is_boosted = false, // Default to false if not provided
    } = req.body;

    const q = `
      INSERT INTO single_bets (
        post_id,
        user_id,
        bet_type,
        home_abbreviation,
        away_abbreviation,
        home_logo,
        away_logo,
        match_id,
        status,
        wager,
        payout,
        price,
        is_winner,
        is_boosted,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        post_id,
        user_id,
        bet_type,
        home_abbreviation,
        away_abbreviation,
        home_logo,
        away_logo,
        match_id,
        status,
        wager,
        payout,
        price,
        is_winner,
        is_boosted,
        moment().format('YYYY-MM-DD HH:mm:ss'), 
        moment().format('YYYY-MM-DD HH:mm:ss') 
      ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ success: true, alertId: data.insertId });
    });
  });
};
