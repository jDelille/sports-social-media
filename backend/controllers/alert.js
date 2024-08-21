import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment/moment.js";

dotenv.config();

export const addAlert = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "INSERT INTO alerts (`user_id`, `type`, `alerter_id`, `created_at`, `msg`) VALUES (?, ?, ?, ?)";
    const values = [
      userInfo.id,
      req.body.type,
      req.body.msg,
      req.body.alerter_id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ success: true, alertId: data.insertId });
    });
  });
};

export const getAlerts = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in.");
  
    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
  
      const q = `
        SELECT
          a.id,
          a.type,
          a.msg,
          a.created_at,
          a.post_id,
          JSON_OBJECT(
            'id', u.id,
            'username', u.username,
            'name', u.name,
            'avatar', u.avatar,
            'isVerified', u.isVerified
          ) AS alerter
        FROM alerts a
        LEFT JOIN users u ON a.alerter_id = u.id
        WHERE a.user_id = ?
        ORDER BY a.created_at DESC
      `;
  
      const values = [userInfo.id];
  
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    });
  };