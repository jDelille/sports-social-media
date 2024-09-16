import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const username = req.params.username;
  const q = "SELECT * FROM defaultdb.users WHERE username=?";

  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data || !data[0]) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const getSuggestedUsers = (req, res) => {
  const userId = req.params.id || null;
  let q = `
    SELECT id, username, name, avatar, isVerified
    FROM defaultdb.users
  `;
  if (userId) {
    q += `WHERE id != ? ORDER BY follower_count DESC LIMIT 3`;
  } else {
    // If no ID is provided, just limit the query
    q += `ORDER BY follower_count DESC LIMIT 3`;
  }

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    // Exclude passwords from user data
    const users = data.map((user) => {
      const { password, ...userInfo } = user;
      return userInfo;
    });
    return res.json(users);
  });
};

export const getMentionUsers = (req, res) => {

  let q = `SELECT username FROM defaultdb.users`

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    if (!data || data.length === 0) {
      return res.status(404).json({message: "No mention users found"});
    }

    const users = data.map((user) => user.username);
    
    res.status(200).json(users);

  })
}
