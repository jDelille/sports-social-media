import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment/moment.js";
import {
  originalPostsQuery,
  repostsQuery,
  quoteRepostsRepostsQuery,
  quoteRepostsQuery,
} from "../queries/followingPostQueries.js";
import {
  profilePostsQuery,
  profileQuoteRepostsQuery,
  profileQuoteRepostsRepostsQuery,
  profileRepostsQuery,
} from "../queries/profilePostQueries.js";
import {
  forYouPostsQuery,
  forYouQuoteRepostsQuery,
  forYouQuoteRepostsRepostsQuery,
  forYouRepostsQuery,
} from "../queries/forYouPostQueries.js";

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
      JSON.stringify(req.body.bet),
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

  const q = `
    ${forYouPostsQuery} 
    UNION ${forYouRepostsQuery} 
    UNION ${forYouQuoteRepostsQuery}
    UNION ${forYouQuoteRepostsRepostsQuery}
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

  const q = `
    ${profilePostsQuery}
    UNION ALL
    ${profileRepostsQuery}
    UNION ALL
    ${profileQuoteRepostsQuery}
    UNION ALL
    ${profileQuoteRepostsRepostsQuery}
    ORDER BY COALESCE(reposted_at, created_at) DESC
  `;

  db.query(q, [...Array(4).fill(username), offset, pageSize], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getFollowingUsersPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  const page = parseInt(req.query.page) || 1;
  const pageSize = 7;
  const offset = (page - 1) * pageSize;

  const userId = req.params.userId;

  jwt.verify(token, process.env.SECRET_KEY, (err) => {
    if (err) return res.status(403).json("Token is not valid");

    // Get following user IDs
    const followingIdsQuery = `
      SELECT followed_id 
      FROM relationships 
      WHERE follower_id = ?`;

    db.query(followingIdsQuery, [userId], (err, following) => {
      if (err) {
        console.error("Error fetching following user IDs:", err);
        return res
          .status(500)
          .json({ message: "Error fetching following user IDs" });
      }

      if (following.length === 0) {
        return res.status(200).json([]);
      }
      const followedUserIds = following.map((user) => user.followed_id);

      const combinedQuery = `
        ${originalPostsQuery} 
        UNION ${repostsQuery} 
        UNION ${quoteRepostsQuery} 
        UNION ${quoteRepostsRepostsQuery}
        ORDER BY COALESCE(reposted_at, created_at) DESC
        LIMIT ?, ?
      `;

      db.query(
        combinedQuery,
        [...Array(4).fill(followedUserIds), offset, pageSize],
        (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(data);
        }
      );
    });
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
