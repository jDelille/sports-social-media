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
      "INSERT INTO alerts (`user_id`, `type`, `msg`, `alerter_id`, `link`, `post_id`, `group_id`, `comment_id`, `created_at`, `is_read`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      req.body.user_id, 
      req.body.type, 
      req.body.msg,
      userInfo.id, 
      req.body.link, 
      req.body.post_id,
      req.body.group_id,
      req.body.comment_id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      0
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
        a.comment_id,
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

export const getAlertCount = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = `
      SELECT COUNT(*) AS alertCount
      FROM alerts
      WHERE user_id = ? AND is_read = 0 
    `;

    const values = [userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]);  // data[0] will contain the alertCount
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

export const markAlertsAsRead = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = `
      UPDATE alerts
      SET is_read = 1 
      WHERE user_id = ? AND is_read = 0
    `;

    const values = [userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Alerts marked as read");
    });
  });
};


