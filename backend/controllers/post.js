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
import {
  betPostsQuery,
  betQuoteRepostsQuery,
  betQuoteRepostsRepostsQuery,
  betRepostsQuery,
} from "../queries/betPostQueries.js";
import { postDetailsQuery } from "../queries/postDetailsQuery.js";

dotenv.config();

export const addPost = (req, res) => {
  
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "INSERT INTO defaultdb.posts (`body`, `image`, `created_at`, `user_id`, `metadata`) VALUES (?)";

    const values = [
      req.body.body,
      req.body.image,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.urlMetadata ? JSON.stringify(req.body.urlMetadata) : null,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ message: "Post has been created.", postId: data.insertId });
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
    UNION ${profileRepostsQuery}
    UNION ${profileQuoteRepostsQuery}
    UNION ${profileQuoteRepostsRepostsQuery}
    ORDER BY COALESCE(reposted_at, created_at) DESC
  `;

  db.query(q, [...Array(4).fill(username), offset, pageSize], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getPostByPostId = (req, res) => {
  const postId = req.params.postId;

  const q = `
  ${postDetailsQuery}
  `;

  db.query(q, [postId], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(data[0]);
  });
};

export const getHashtagPosts = (req, res) => {
  const searchTerm = req.params.hashtag.toLowerCase(); // Convert to lowercase for case-insensitivity
  const page = parseInt(req.query.page) || 1;
  const pageSize = 7;
  const offset = (page - 1) * pageSize;

  const q = `
    SELECT * FROM (${forYouPostsQuery}) AS posts WHERE LOWER(posts.body) LIKE ? OR LOWER(posts.body) LIKE ?
    UNION 
    SELECT * FROM (${forYouRepostsQuery}) AS reposts WHERE LOWER(reposts.body) LIKE ? OR LOWER(reposts.body) LIKE ?
    UNION 
    SELECT * FROM (${forYouQuoteRepostsQuery}) AS quotes WHERE LOWER(quotes.body) LIKE ? OR LOWER(quotes.body) LIKE ?
    UNION 
    SELECT * FROM (${forYouQuoteRepostsRepostsQuery}) AS quoteReposts WHERE LOWER(quoteReposts.body) LIKE ? OR LOWER(quoteReposts.body) LIKE ?
    ORDER BY COALESCE(reposted_at, created_at) DESC
    LIMIT ?, ?
  `;

  const hashtagPattern = `%#${searchTerm}%`;
  const wordPattern = `%${searchTerm}%`;

  db.query(
    q,
    [
      hashtagPattern,
      wordPattern,
      hashtagPattern,
      wordPattern,
      hashtagPattern,
      wordPattern,
      hashtagPattern,
      wordPattern,
      offset,
      pageSize,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
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

export const getBetPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  const page = parseInt(req.query.page) || 1;
  const pageSize = 7;
  const offset = (page - 1) * pageSize;

  jwt.verify(token, process.env.SECRET_KEY, (err) => {
    if (err) return res.status(403).json("Token is not valid");

    // Query to get posts with non-empty bet field
    const combinedQuery = `
    ${betPostsQuery} 
    UNION ${betRepostsQuery} 
    UNION ${betQuoteRepostsQuery} 
    UNION ${betQuoteRepostsRepostsQuery}
    ORDER BY COALESCE(reposted_at, created_at) DESC
    LIMIT ?, ?
  `;

    db.query(combinedQuery, [offset, pageSize], (err, data) => {
      if (err) {
        console.error("Error fetching posts with bets:", err);
        return res
          .status(500)
          .json({ message: "Error fetching posts with bets" });
      }
      return res.status(200).json(data);
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
