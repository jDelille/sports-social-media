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

export const createGroup = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in.");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const { name, description, avatar, header_img, privacy } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json("Invalid group name.");
    }

    if (description && typeof description !== "string") {
      return res.status(400).json("Invalid description format.");
    }

    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

    const q = `
    INSERT INTO Groups (name, description, avatar, header_img, privacy, admin_id, created_at)
    VALUES (?, ?, ?, ?)
  `;

    const values = [
      name,
      description || null,
      avatar,
      header_img,
      privacy,
      userInfo.id,
      createdAt,
    ];

    db.query(q, values, (err, result) => {
      if (err) return res.status(500).json(err);

      // Return the ID of the newly created group
      return res.status(201).json({
        groupId: result.insertId,
        message: "Group created successfully.",
      });
    });
  });
};
