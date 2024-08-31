import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment/moment.js";

dotenv.config();

export const getGroupMembers = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  const page = parseInt(req.query.page) || 1;
  const pageSize = 7;
  const offset = (page - 1) * pageSize;

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const { groupId } = req.params;

    const q = `
      SELECT u.id, u.username, u.name, u.avatar, u.created_at, u.isVerified
      FROM defaultdb.group_members gm
      JOIN users u ON gm.user_id = u.id
      WHERE gm.group_id = ?
      LIMIT ${pageSize} OFFSET ${offset}
    `;

    const values = [groupId];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addGroupMember = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const { groupId, userId, role = "member" } = req.body;
    const joinedAt = moment().format("YYYY-MM-DD HH:mm:ss");

    // SQL query to add a member to a group
    const q = `
          INSERT INTO defaultdb.group_members (group_id, user_id, role, joined_at) VALUES (?, ?, ?, ?)
        `;

    const values = [groupId, userId, role, joinedAt];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Member added successfully");
    });
  });
};

export const removeGroupMember = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const { groupId, userId } = req.body;

    const q = `
        DELETE FROM defaultdb.group_members 
        WHERE group_id = ? AND user_id = ?
      `;

    const values = [groupId, userId];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Member removed successfully");
    });
  });
};