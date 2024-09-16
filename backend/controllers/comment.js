import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment/moment.js";

dotenv.config();

export const getComments = (req, res) => {
  let q;
  let values;

  if (req.query.type === "post" || req.query.type === "repost") {
    q = `
      SELECT
        c.id,
        c.user_id,
        c.body,
        c.image,
        c.created_at,
        c.updated_at,
        JSON_OBJECT(
          'id', u.id,
          'name', u.name,
          'username', u.username,
          'avatar', u.avatar,
          'isVerified', u.isVerified
        ) AS user
      FROM defaultdb.comments c
      JOIN defaultdb.users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at DESC
    `;
    values = [req.query.postId];
  } else if (
    req.query.type === "quote_repost" ||
    req.query.type === "quote_repost_repost"
  ) {
    q = `
      SELECT
        c.id,
        c.user_id,
        c.body,
        c.image,
        c.created_at,
        c.updated_at,
        JSON_OBJECT(
          'id', u.id,
          'name', u.name,
          'username', u.username,
          'avatar', u.avatar,
          'isVerified', u.isVerified
        ) AS user
      FROM defaultdb.comments c
      JOIN defaultdb.users u ON c.user_id = u.id
      WHERE c.quote_repost_id = ?
      ORDER BY c.created_at DESC
    `;
    values = [req.query.postId];
  } else if (req.query.type === "comment") {
    q = `
      SELECT
        c.id,
        c.user_id,
        c.body,
        c.image,
        c.created_at,
        c.updated_at,
        JSON_OBJECT(
          'id', u.id,
          'name', u.name,
          'username', u.username,
          'avatar', u.avatar,
          'isVerified', u.isVerified
        ) AS user
      FROM defaultdb.comments c
      JOIN defaultdb.users u ON c.user_id = u.id
      WHERE c.id = ?
      ORDER BY c.created_at DESC
    `;
    values = [req.query.commentId]; // Use appropriate query parameter for comments
  } else {
    return res.status(400).json("Invalid type");
  }

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    let q;
    let values;

    if (req.body.type === "post" || req.body.type === "repost") {
      q = `
        INSERT INTO defaultdb.comments (user_id, post_id, body, image, created_at)
        VALUES (?, ?, ?, ?, ?);
      `;
      values = [
        userInfo.id,
        req.body.postId,
        req.body.body,
        req.body.image || null,
        now
      ];
    } else if (
      req.body.type === "quote_repost" ||
      req.body.type === "quote_repost_repost"
    ) {
      q = `
        INSERT INTO defaultdb.comments (user_id, quote_repost_id, body, image, created_at)
        VALUES (?, ?, ?, ?, ?);
      `;
      values = [
        userInfo.id,
        req.body.postId,
        req.body.body,
        req.body.image || null,
        now
      ];
    } else {
      return res.status(400).json("Invalid comment type");
    }

    // Insert the comment and get the last inserted ID
    db.query(q, values, (err) => {
      if (err) return res.status(500).json(err);

      // Query to get the last inserted ID
      db.query('SELECT LAST_INSERT_ID() AS id', (err, result) => {
        if (err) return res.status(500).json(err);

        const commentId = result[0].id;
        return res.status(200).json({ id: commentId });
      });
    });
  });
};

export const getCommentById = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    // Get the comment ID from the query parameters
    const commentId = req.params.commentId;
    if (!commentId) return res.status(400).json("Comment ID is required.");

    // Query to only get the comment body
    const q = `
      SELECT
        c.body
      FROM defaultdb.comments c
      WHERE c.id = ?
      LIMIT 1;
    `;

    db.query(q, [commentId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("Comment not found.");
      
      // Return only the body
      return res.status(200).json(data[0].body);
    });
  });
};