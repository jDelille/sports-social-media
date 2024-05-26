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
      "INSERT INTO posts (`body`, `image`, `created_at`, `user_id`) VALUES (?)";

    const values = [
      req.body.body,
      req.body.image,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};

export const getAllPosts = (req, res) => {
  const originalPostsQuery = `
  SELECT
      p.id,
      p.body,
      p.image,
      p.created_at,
      p.user_id,
      NULL AS reposter_username,
      NULL AS reposted_at,
      NULL AS original_post_body,
      NULL AS quote_reposted_post_id,
      NULL AS quote_reposted_quote_repost_id,
      'post' AS type
  FROM posts p
`;

  const repostsQuery = `
  SELECT
      p.id,
      p.body,
      p.image,
      p.created_at,
      r.reposter_id AS user_id,
      r.reposter_username,
      r.created_at AS reposted_at,
      NULL AS original_post_body,
      NULL AS quote_reposted_post_id,
      NULL AS quote_reposted_quote_repost_id,
      'repost' AS type
  FROM posts p
  JOIN reposts r ON p.id = r.reposted_post_id
`;

  const quoteRepostsQuery = `
  SELECT 
      qr.id,
      qr.body,
      qr.image,
      NULL AS created_at,
      qr.quote_reposter_id AS user_id,
      NULL AS reposter_username,
      qr.created_at AS reposted_at,
    CASE
      WHEN qrr.id IS NOT NULL THEN qrr.body
      ELSE p1.body
      END AS original_post_body,
      qr.quote_reposted_post_id,
      qr.quote_reposted_quote_repost_id,
      'quote repost' AS type
  FROM quote_reposts qr
  LEFT JOIN posts p1 ON qr.quote_reposted_post_id = p1.id
  LEFT JOIN quote_reposts qrr ON qr.quote_reposted_quote_repost_id = qrr.id
`;

  const q = `
    ${originalPostsQuery} 
    UNION ${repostsQuery} 
    UNION ${quoteRepostsQuery}
    ORDER BY COALESCE(reposted_at, created_at) DESC
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
