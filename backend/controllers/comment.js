import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment/moment.js";

dotenv.config();

export const getComments = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    let q;
    let values;

    if (req.query.type === "post" || req.query.type === "repost") {
      q = "SELECT user_id FROM comments WHERE post_id = ?";
      values = [req.query.postId];
    } else if (
      req.query.type === "quote_repost" ||
      req.query.type === "quote_repost_repost"
    ) {
      q = "SELECT user_id FROM comments WHERE quote_repost_id = ?";
      values = [req.query.postId];
    } else {
      return res.status(400).json("Invalid like type");
    }

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map((like) => like.user_id));
    });
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    let q;
    let values;

    if (req.body.type === "post" || req.body.type === "repost") {
      q =
        "INSERT INTO comments (`user_id`, `post_id`, `body`, `image`) VALUES (?, ?, ?, ?)";
      values = [userInfo.id, req.body.postId, req.body.body, req.body.image];
    } else if (
      req.body.type === "quote_repost" ||
      req.body.type === "quote_repost_repost"
    ) {
      q =
        "INSERT INTO comments (`user_id`, `quote_repost_id`, `body`, `image`) VALUES (?, ?, ?, ?)";
      values = [
        userInfo.id,
        req.body.postId,
        req.body.body,
        req.body.image,
      ];
    } else {
      return res.status(400).json("Invalid like type");
    }

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment successful.");
    });
  });
};
