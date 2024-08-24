import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment/moment.js";

dotenv.config();

export const getGroups = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = `
        SELECT * FROM Groups
      `;

    const values = [userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getSuggestedGroups = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = `
    SELECT g.id, g.name, g.description, g.avatar, g.header_img, g.privacy, g.admin_id, g.created_at, COUNT(gm.user_id) AS member_count
    FROM \`Groups\` g
    LEFT JOIN group_members gm ON g.id = gm.group_id
    LEFT JOIN group_members  user_gm ON g.id = user_gm.group_id AND user_gm.user_id = ?
    WHERE user_gm.user_id IS NULL
    GROUP BY g.id
    ORDER BY member_count DESC;
  `;

    const values = [userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const createGroup = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    // if (description && typeof description !== "string") {
    //   return res.status(400).json("Invalid description format.");
    // }

    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

    const q =
      "INSERT INTO `groups` (`name`, `description`, `avatar`, `header_img`, `privacy`, `admin_id`, `created_at`) VALUES (?)";

    const values = [
      req.body.name,
      req.body.description,
      null,
      null,
      // avatar,
      // header_img,
      req.body.privacy,
      userInfo.id,
      createdAt,
    ];

    db.query(q, [values], (err, result) => {
      if (err) return res.status(500).json(err);

      // Return the ID of the newly created group
      return res.status(201).json({
        groupId: result.insertId,
        message: "Group created successfully.",
      });
    });
  });
};

export const getMyGroups = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "SELECT * FROM `groups` WHERE admin_id = ?";

    const values = [userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getGroupById = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const { groupId } = req.params;

    const q = `SELECT * FROM \`groups\` WHERE \`id\` = ?`;

    const values = [groupId];

    db.query(q, values, (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json("Group not found.");
      }

      // Assuming result is an array with one object (since `id` is unique)
      return res.status(200).json(result[0]);
    });
  });
};

export const updateGroup = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const { groupId } = req.params;
    const { name, description, avatar, header_img, privacy } = req.body;

    // Validate input if necessary
    // if (description && typeof description !== "string") {
    //   return res.status(400).json("Invalid description format.");
    // }

    const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");

    // Build the SQL query dynamically based on provided fields
    let setClause = [];
    let values = [];

    if (name) {
      setClause.push("`name` = ?");
      values.push(name);
    }
    if (description) {
      setClause.push("`description` = ?");
      values.push(description);
    }
    if (avatar) {
      setClause.push("`avatar` = ?");
      values.push(avatar);
    }
    if (header_img) {
      setClause.push("`header_img` = ?");
      values.push(header_img);
    }
    if (privacy) {
      setClause.push("`privacy` = ?");
      values.push(privacy);
    }

    // Ensure there is something to update
    if (setClause.length === 0) {
      return res.status(400).json("No fields to update.");
    }

    // Add the updated timestamp and group ID to the values
    setClause.push("`updated_at` = ?");
    values.push(updatedAt);
    values.push(groupId);

    const q = `UPDATE \`groups\` SET ${setClause.join(", ")} WHERE \`id\` = ?`;

    db.query(q, values, (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json("Group not found.");
      }

      return res.status(200).json({
        message: "Group updated successfully.",
      });
    });
  });
};

export const deleteGroup = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    let q;
    let values;

    q = "DELETE FROM `groups` WHERE id = ? AND admin_id = ?";
    values = [req.body.groupId, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0) {
        return res
          .status(400)
          .json("Group not found or you don't have permission to delete it.");
      }
      return res.status(200).json("Group has been deleted.");
    });
  });
};

// Function to check pending invites
export const checkPendingInvite = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = `
      SELECT * FROM invites
      WHERE user_id = ? AND group_id = ? AND status = 'pending'
    `;
    const values = [userInfo.id, req.params.groupId];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.length > 0);
    });
  });
};

export const getMemberCount = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const groupId = req.params.groupId; // Get groupId from URL parameters

    // SQL query to count members in the specified group
    const q = `
      SELECT COUNT(*) AS memberCount
      FROM group_members
      WHERE group_id = ?
    `;

    db.query(q, [groupId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0].memberCount); // Return the count of members
    });
  });
};

export const isMember = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const { userId, groupId } = req.params;

    const q = `
        SELECT 1 FROM group_members 
        WHERE group_id = ? AND user_id = ?
      `;

    const values = [groupId, userId];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      // If a record is found, data will be an array with at least one element
      return res.status(200).json({ isMember: data.length > 0 });
    });
  });
};