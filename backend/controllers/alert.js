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
      "INSERT INTO alerts (`user_id`, `type`, `msg`, `alerter_id`, `link`, `group_id`, `created_at`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      req.body.user_id,   // The ID of the user being invited
      req.body.type,      // The type of alert, e.g., 'group-invite'
      req.body.msg,       // The message for the alert
      userInfo.id,        // The ID of the user sending the invite
      req.body.link,      // The link to the group page
      req.body.group_id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), // The created_at timestamp
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
        a.link,
        JSON_OBJECT(
          'id', u.id,
          'username', u.username,
          'name', u.name,
          'avatar', u.avatar,
          'isVerified', u.isVerified
        ) AS alerter,
        JSON_OBJECT(
          'id', g.id,
          'name', g.name,
          'description', g.description,
          'avatar', g.avatar
        ) AS group_info
      FROM alerts a
      LEFT JOIN users u ON a.alerter_id = u.id
      LEFT JOIN \`groups\` g ON a.group_id = g.id  -- Use backticks to escape the reserved keyword
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

export const checkPendingInvite = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = `
      SELECT * FROM invites
      WHERE user_id = ? AND group_id = ? AND status = 'pending'
    `;
    const values = [userInfo.id, req.params.groupId];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.length > 0);
    });
  });
};