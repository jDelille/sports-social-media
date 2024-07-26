import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment/moment.js";

dotenv.config();

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "INSERT INTO posts (`body`, `image`, `created_at`, `user_id`, `metadata`, `bet`) VALUES (?)";

    const values = [
      req.body.body,
      req.body.image,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      JSON.stringify(req.body.urlMetadata),
      JSON.stringify(req.body.bet)
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};

export const getAllPosts = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 7;
  const offset = (page - 1) * pageSize;

  const originalPostsQuery = `
  SELECT
      p.id,
      p.body,
      p.image,
      p.created_at,
      p.user_id,
      JSON_OBJECT(
        'id', u.id,
        'name', u.name,
        'username', u.username,
        'avatar', u.avatar
      ) AS user,
      p.bet AS bet,
      NULL AS reposter_username,
      NULL AS reposted_at,
      NULL AS original_post_body,
      NULL AS quote_reposted_post_id,
      NULL AS quote_reposted_quote_repost_id,
      NULL AS original_post_user,
      p.metadata,
      'post' AS type
  FROM posts p
  JOIN users u ON p.user_id = u.id
  `;

  const repostsQuery = `
  SELECT
    p.id,
    p.body,
    p.image,
    p.created_at,
    r.reposter_id AS user_id,
    JSON_OBJECT(
      'id', ou.id,
      'name', ou.name,
      'username', ou.username,
      'avatar', ou.avatar
    ) AS user,
    p.bet AS bet,
    r.reposter_username,
    r.created_at AS reposted_at,
    NULL AS original_post_body,
    NULL AS quote_reposted_post_id,
    NULL AS quote_reposted_quote_repost_id,
    NULL AS original_post_user,
    p.metadata,
    'repost' AS type
FROM posts p
JOIN reposts r ON p.id = r.reposted_post_id
JOIN users ur ON r.reposter_id = ur.id
LEFT JOIN posts op ON p.id = op.id
LEFT JOIN users ou ON op.user_id = ou.id

  `;

  const quoteRepostsRepostsQuery = `
  SELECT
      qr.id,
      qr.body,
      qr.image,
      qr.created_at,
      r.reposter_id AS user_id,
      JSON_OBJECT(
        'id', ur.id,
        'name', ur.name,
        'username', ur.username,
        'avatar', ur.avatar
      ) AS user,
      p1.bet AS bet,
      ur.username AS reposter_username,
      r.created_at AS reposted_at,
      CASE
        WHEN qrr.body IS NOT NULL THEN qrr.body
        ELSE p1.body
      END AS original_post_body,
      qr.quote_reposted_post_id,
      qr.quote_reposted_quote_repost_id,
      JSON_OBJECT(
        'id', ou.id,
        'name', ou.name,
        'username', ou.username,
        'avatar', ou.avatar
      ) AS original_post_user,
      p1.metadata,
      'quote_repost_repost' AS type
  FROM quote_reposts qr
  JOIN reposts r ON qr.id = r.reposted_quote_repost_id
  JOIN users ur ON r.reposter_id = ur.id
  LEFT JOIN posts p1 ON qr.quote_reposted_post_id = p1.id
  LEFT JOIN quote_reposts qrr ON qr.quote_reposted_quote_repost_id = qrr.id
  LEFT JOIN users ou ON qr.original_post_user_id = ou.id
  `;

  const quoteRepostsQuery = `
  SELECT 
      qr.id,
      qr.body,
      qr.image,
      qr.created_at,
      qr.quote_reposter_id AS user_id,
      JSON_OBJECT(
        'id', ur.id,
        'name', ur.name,
        'username', ur.username,
        'avatar', ur.avatar
      ) AS user,
      p1.bet AS bet,
      NULL AS reposter_username,
      qr.created_at AS reposted_at,
      CASE
        WHEN qrr.id IS NOT NULL THEN qrr.body
        ELSE p1.body
      END AS original_post_body,
      qr.quote_reposted_post_id,
      qr.quote_reposted_quote_repost_id,
      JSON_OBJECT(
        'id', ou.id,
        'name', ou.name,
        'username', ou.username,
        'avatar', ou.avatar
      ) AS original_post_user,
      p1.metadata,
      'quote_repost' AS type
  FROM quote_reposts qr
  LEFT JOIN posts p1 ON qr.quote_reposted_post_id = p1.id
  LEFT JOIN quote_reposts qrr ON qr.quote_reposted_quote_repost_id = qrr.id
  JOIN users ur ON qr.quote_reposter_id = ur.id
  LEFT JOIN users ou ON qr.original_post_user_id = ou.id
  `;

  const q = `
    ${originalPostsQuery} 
    UNION ${repostsQuery} 
    UNION ${quoteRepostsQuery}
    UNION ${quoteRepostsRepostsQuery}
    ORDER BY COALESCE(reposted_at, created_at) DESC
    LIMIT ?, ?
  `;

  db.query(q, [offset, pageSize], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getPostsByUsername = (req, res) => {
  const username = req.params.username;

  const page = parseInt(req.query.page) || 1;
  const pageSize = 6;
  const offset = (page - 1) * pageSize;

  const originalPostsQuery = `
  SELECT
  p.id,
  p.body,
  p.image,
  p.created_at,
  p.user_id,
  JSON_OBJECT(
    'id', u.id,
    'name', u.name,
    'username', u.username,
    'avatar', u.avatar
  ) AS user,
  NULL AS reposter_username,
  NULL AS reposted_at,
  NULL AS original_post_body,
  NULL AS quote_reposted_post_id,
  NULL AS quote_reposted_quote_repost_id,
  NULL AS original_post_user,
  p.metadata,
  'post' AS type
  FROM posts p
  JOIN users u ON p.user_id = u.id
    WHERE u.username = ?
  `;

  const repostsQuery = `
  SELECT
    p.id,
    p.body,
    p.image,
    p.created_at,
    r.reposter_id AS user_id,
    JSON_OBJECT(
      'id', ou.id,
      'name', ou.name,
      'username', ou.username,
      'avatar', ou.avatar
    ) AS user,
    r.reposter_username,
    r.created_at AS reposted_at,
    NULL AS original_post_body,
    NULL AS quote_reposted_post_id,
    NULL AS quote_reposted_quote_repost_id,
    NULL AS original_post_user,
    p.metadata,
    'repost' AS type
    FROM posts p
    JOIN reposts r ON p.id = r.reposted_post_id
    JOIN users ur ON r.reposter_id = ur.id
    LEFT JOIN posts op ON p.id = op.id
    LEFT JOIN users ou ON op.user_id = ou.id
      WHERE ur.username = ?
  `;

  const quoteRepostsQuery = `
  SELECT 
      qr.id,
      qr.body,
      qr.image,
      qr.created_at,
      qr.quote_reposter_id AS user_id,
      JSON_OBJECT(
        'id', ur.id,
        'name', ur.name,
        'username', ur.username,
        'avatar', ur.avatar
      ) AS user,
      NULL AS reposter_username,
      qr.created_at AS reposted_at,
      CASE
        WHEN qrr.id IS NOT NULL THEN qrr.body
        ELSE p1.body
      END AS original_post_body,
      qr.quote_reposted_post_id,
      qr.quote_reposted_quote_repost_id,
      JSON_OBJECT(
        'id', ou.id,
        'name', ou.name,
        'username', ou.username,
        'avatar', ou.avatar
      ) AS original_post_user,
      p1.metadata,
      'quote_repost' AS type
  FROM quote_reposts qr
  LEFT JOIN posts p1 ON qr.quote_reposted_post_id = p1.id
  LEFT JOIN quote_reposts qrr ON qr.quote_reposted_quote_repost_id = qrr.id
  JOIN users ur ON qr.quote_reposter_id = ur.id
  LEFT JOIN users ou ON qr.original_post_user_id = ou.id
  WHERE ur.username = ?
  `;

  const quoteRepostsRepostsQuery = `
  SELECT
      qr.id,
      qr.body,
      qr.image,
      qr.created_at,
      r.reposter_id AS user_id,
      JSON_OBJECT(
        'id', ur.id,
        'name', ur.name,
        'username', ur.username,
        'avatar', ur.avatar
      ) AS user,
      ur.username AS reposter_username,
      r.created_at AS reposted_at,
      CASE
        WHEN qrr.body IS NOT NULL THEN qrr.body
        ELSE p1.body
      END AS original_post_body,
      qr.quote_reposted_post_id,
      qr.quote_reposted_quote_repost_id,
      JSON_OBJECT(
        'id', ou.id,
        'name', ou.name,
        'username', ou.username,
        'avatar', ou.avatar
      ) AS original_post_user,
      p1.metadata,
      'quote_repost_repost' AS type
  FROM quote_reposts qr
  JOIN reposts r ON qr.id = r.reposted_quote_repost_id
  JOIN users ur ON r.reposter_id = ur.id
  LEFT JOIN posts p1 ON qr.quote_reposted_post_id = p1.id
  LEFT JOIN quote_reposts qrr ON qr.quote_reposted_quote_repost_id = qrr.id
  LEFT JOIN users ou ON qr.original_post_user_id = ou.id
  WHERE ur.username = ?
  `;

  const q = `
    ${originalPostsQuery}
    UNION ALL
    ${repostsQuery}
    UNION ALL
    ${quoteRepostsQuery}
    UNION ALL
    ${quoteRepostsRepostsQuery}
    ORDER BY COALESCE(reposted_at, created_at) DESC
  `;

  

  // 
  // LIMIT ?, ?

  db.query(q, [username, username, username, username, offset, pageSize], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    let q;
    let values;

    if (req.body.type === "post" || req.body.type === "repost") {
      q = "DELETE FROM posts WHERE id = ? AND user_id = ?";
      values = [req.body.postId, userInfo.id];
    } else if (
      req.body.type === "quote_repost" ||
      req.body.type === "quote_repost_repost"
    ) {
      q = "DELETE FROM quote_reposts WHERE id = ? AND quote_reposter_id = ?";
      values = [req.body.postId, userInfo.id];
    } else {
      return res.status(400).json("Invalid post type");
    }

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0) {
        return res
          .status(400)
          .json("Post not found or you don't have permission to delete it.");
      }
      return res.status(200).json("Post has been deleted.");
    });
  });
};
