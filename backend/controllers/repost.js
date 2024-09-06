import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment/moment.js";

dotenv.config();

export const addRepost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in.");
  
    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");

      let q;

      if(req.body.type === 'post' || req.body.type === "repost") {
        q = "INSERT INTO defaultdb.reposts (`reposted_post_id`, `reposter_id`, `reposter_username`, `created_at`) VALUES (?)";
      } else if (req.body.type === "quote_repost" || req.body.type === "quote_repost_repost") {
        q = "INSERT INTO defaultdb.reposts (`reposted_quote_repost_id`, `reposter_id`, `reposter_username`, `created_at`) VALUES (?)";
      }
  

      const values = [
        req.body.postId,
        userInfo.id,
        req.body.username,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Repost has been created.");
      });
    });
  };

  
export const removeRepost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    let q;

    if(req.body.type === 'post' || req.body.type === "repost") {
      q = "DELETE FROM defaultdb.reposts WHERE reposted_post_id = ? AND reposter_id = ?";
    } else if (req.body.type === "quote_repost" || req.body.type === "quote_repost_repost") {
      q = "DELETE FROM defaultdb.reposts WHERE reposted_quote_repost_id = ? AND reposter_id = ?";
    }


    const values = [
      req.body.postId,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Repost has been created.");
    });
  });
};

export const isPostReposted = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    let q;

    if (req.query.type === 'post' || req.query.type === "repost") {
      q = "SELECT * FROM defaultdb.reposts WHERE reposted_post_id = ? AND reposter_id = ?";
    } else if (req.query.type === "quote_repost" || req.query.type === "quote_repost_repost") {
      q = "SELECT * FROM defaultdb.reposts WHERE reposted_quote_repost_id = ? AND reposter_id = ?";
    }
    const values = [
      req.query.postId,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length > 0) {
        return res.status(200).json({ reposted: true, count: data.length });
      } else {
        return res.status(200).json({ reposted: false, count: data.length });
      }
    });
  });
}

