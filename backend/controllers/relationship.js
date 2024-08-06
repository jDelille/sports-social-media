import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const followUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  const followedUserId = req.params.userId;

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const followerId = userInfo.id;

    // Check if the followed user exists
    const checkUserQuery = "SELECT * FROM users WHERE id = ?";

    const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    const values = [followerId, followedUserId, createdAt];

    db.query(checkUserQuery, [followedUserId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data || !data[0]) {
        return res.status(404).json({ message: "User not found" });
      }

      // Insert the follow relationship into the relationships table
      const followQuery =
        "INSERT INTO relationships (follower_id, followed_id, created_at) VALUES (?, ?, ?)";
      db.query(followQuery, values, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: "User followed successfully" });
      });
    });
  });
};

export const getUserRelationships = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in.");
  
    const userId = req.params.userId;
  
    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");
  
      // Get follower count
      const followerCountQuery =
        "SELECT COUNT(*) AS follower_count FROM relationships WHERE followed_id = ?";
      db.query(followerCountQuery, [userId], (err, followerData) => {
        if (err) {
          console.error('Error fetching follower count:', err); // Log the error for debugging
          return res.status(500).json({ message: 'Error fetching follower count' });
        }
  
        // Get following count
        const followingCountQuery =
          "SELECT COUNT(*) AS following_count FROM relationships WHERE follower_id = ?";
        db.query(followingCountQuery, [userId], (err, followingData) => {
          if (err) {
            console.error('Error fetching following count:', err);
            return res.status(500).json({ message: 'Error fetching following count' });
          }
  
          // Get followers
          const followersQuery = `
            SELECT u.id, u.username, u.avatar 
            FROM relationships r 
            JOIN users u ON r.follower_id = u.id 
            WHERE r.followed_id = ?`;
          db.query(followersQuery, [userId], (err, followers) => {
            if (err) {
              console.error('Error fetching followers:', err);
              return res.status(500).json({ message: 'Error fetching followers' });
            }
  
            // Get following
            const followingQuery = `
              SELECT u.id, u.username, u.avatar 
              FROM relationships r 
              JOIN users u ON r.followed_id = u.id 
              WHERE r.follower_id = ?`;
            db.query(followingQuery, [userId], (err, following) => {
              if (err) {
                console.error('Error fetching following:', err);
                return res.status(500).json({ message: 'Error fetching following' });
              }
  
              return res.status(200).json({
                followerCount: followerData[0].follower_count,
                followingCount: followingData[0].following_count,
                followers,
                following,
              });
            });
          });
        });
      });
    });
  };