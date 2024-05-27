import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment/moment.js";

dotenv.config();

export const addQuoteRepost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in.");
  
    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");      
  
      const q = "INSERT INTO quote_reposts (`quote_reposted_post_id`, `quote_reposted_quote_repost_id`, `quote_reposter_id`, `original_post_user_id`, `body`, `image`, `created_at`) VALUES (?)";

      const values = [
        req.body.postId,
        req.body.quoteRepostedQuoteRepostId,
        userInfo.id,
        req.body.originalPostUserId,
        req.body.body,
        req.body.image,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Quote repost has been created.");
      });
    });
  };
