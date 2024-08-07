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
        console.error('Error fetching follower count:', err);
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

        // Get followers IDs
        const followersIdsQuery = `
          SELECT follower_id 
          FROM relationships 
          WHERE followed_id = ?`;
        db.query(followersIdsQuery, [userId], (err, followers) => {
          if (err) {
            console.error('Error fetching followers IDs:', err);
            return res.status(500).json({ message: 'Error fetching followers IDs' });
          }

          // Get following IDs
          const followingIdsQuery = `
            SELECT followed_id 
            FROM relationships 
            WHERE follower_id = ?`;
          db.query(followingIdsQuery, [userId], (err, following) => {
            if (err) {
              console.error('Error fetching following IDs:', err);
              return res.status(500).json({ message: 'Error fetching following IDs' });
            }

            // Map results to arrays of IDs
            const followerIdsArray = followers.map(follower => follower.follower_id);
            const followingIdsArray = following.map(followed => followed.followed_id);

            return res.status(200).json({
              followerCount: followerData[0].follower_count,
              followingCount: followingData[0].following_count,
              followers: followerIdsArray,
              following: followingIdsArray,
            });
          });
        });
      });
    });
  });
};

export const getFollowingUsers = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  const page = parseInt(req.query.page) || 1;
  const pageSize = 7;
  const offset = (page - 1) * pageSize;

  const userId = req.params.userId;

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    // Get following user IDs
    const followingIdsQuery = `
      SELECT followed_id 
      FROM relationships 
      WHERE follower_id = ?`;
    db.query(followingIdsQuery, [userId], (err, following) => {
      if (err) {
        console.error('Error fetching following user IDs:', err);
        return res.status(500).json({ message: 'Error fetching following user IDs' });
      }

      // If no users are followed
      if (following.length === 0) {
        return res.status(200).json([]);
      }

      // Prepare an array of user IDs
      const followedUserIds = following.map(user => user.followed_id);

      // Get details of followed users
      const followedUsersQuery = `
        SELECT u.id, u.username, u.name, u.avatar, u.created_at, 
               (SELECT COUNT(*) FROM posts WHERE user_id = u.id) AS post_count,
               (SELECT COUNT(*) FROM relationships WHERE followed_id = u.id) AS follower_count
        FROM users u
        WHERE u.id IN (?)`;
      db.query(followedUsersQuery, [followedUserIds, offset, pageSize], (err, followedUsers) => {
        if (err) {
          console.error('Error fetching followed user details:', err);
          return res.status(500).json({ message: 'Error fetching followed user details' });
        }

        return res.status(200).json(followedUsers);
      });
    });
  });
};

export const getFollowerUsers = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  const page = parseInt(req.query.page) || 1;
  const pageSize = 7;
  const offset = (page - 1) * pageSize;

  const userId = req.params.userId;

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    // Get follower user IDs
    const followerIdsQuery = `
      SELECT follower_id 
      FROM relationships 
      WHERE followed_id = ?`;
    db.query(followerIdsQuery, [userId], (err, followers) => {
      if (err) {
        console.error('Error fetching follower user IDs:', err);
        return res.status(500).json({ message: 'Error fetching follower user IDs' });
      }

      // If no users are followers
      if (followers.length === 0) {
        return res.status(200).json([]);
      }

      // Prepare an array of user IDs
      const followerUserIds = followers.map(user => user.follower_id);

      // Get details of followers with pagination
      const followersQuery = `
        SELECT u.id, u.username, u.name, u.avatar, u.created_at, 
               (SELECT COUNT(*) FROM posts WHERE user_id = u.id) AS post_count,
               (SELECT COUNT(*) FROM relationships WHERE followed_id = u.id) AS follower_count
        FROM users u
        WHERE u.id IN (?)
        LIMIT ?, ?`;
      db.query(followersQuery, [followerUserIds, offset, pageSize], (err, followerUsers) => {
        if (err) {
          console.error('Error fetching follower user details:', err);
          return res.status(500).json({ message: 'Error fetching follower user details' });
        }

        return res.status(200).json(followerUsers);
      });
    });
  });
};