import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const sendInvite = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in.");
  
    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
  
      const { user_id, group_id } = req.body;
  
      if (!user_id || !group_id) {
        return res.status(400).json("Missing required fields");
      }
  
      const q = `
        INSERT INTO defaultdb.invites (user_id, group_id, alerter_id, status)
        VALUES (?, ?, ?, 'pending')
      `;
      const values = [user_id, group_id, userInfo.id];
  
      db.query(q, values, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ success: true, inviteId: result.insertId });
      });
    });
  };

export const getPendingInvites = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in.");
  
    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
  
      const q = `
      SELECT
        i.id,
        i.group_id,
        i.user_id
      FROM defaultdb.invites i
      WHERE i.user_id = ? AND i.status = 'pending'
    `;
      const values = [userInfo.id];
  
      db.query(q, values, (err, invites) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(invites);
      });
    });
  };

  export const updateInviteStatus = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in.");
  
    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
  
      const inviteId = req.params.inviteId;
      const { status } = req.body;
  
      if (!status || !['accepted', 'rejected'].includes(status)) {
        return res.status(400).json("Invalid status");
      }
  
      const q = `
        UPDATE defaultdb.invites
        SET status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND user_id = ?
      `;
      const values = [status, inviteId, userInfo.id];
  
      db.query(q, values, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
          return res.status(404).json("Invite not found or not authorized");
        }
        return res.status(200).json({ success: true });
      });
    });
  };