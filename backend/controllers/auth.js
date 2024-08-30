import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment/moment.js";

dotenv.config();

/**
 * Register user
 * @param {*} req
 * @param {*} res
 */

export const register = (req, res) => {
  // Extract user details from request body
  const { username, email, password, name } = req.body;

  // Check if user already exists
  const checkUserQuery = "SELECT * FROM defaultdb.users WHERE username = ?";
  db.query(checkUserQuery, [username], (err, data) => {
    if (err) return res.status(500).json({ error: 'Database query error', details: err });

    if (data.length) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user
    const insertUserQuery = `
      INSERT INTO defaultdb.users (username, email, password, name, created_at)
      VALUES (?, ?, ?, ?, ?)
    `;
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    const values = [username, email, hashedPassword, name, createdAt];

    db.query(insertUserQuery, values, (err) => {
      if (err) return res.status(500).json({ error: 'Database query error', details: err });

      return res.status(201).json({ message: 'User successfully created' });
    });
  });
};

/**
 * Login user
 * @param {*} req
 * @param {*} res
 */

export const login = (req, res) => {
  const q = "SELECT * FROM defaultdb.users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User does not exist.");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Invalid username or password.");

    const token = jwt.sign({ id: data[0].id }, process.env.SECRET_KEY);

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      })
      .status(200)
      .json(others);
  });
};

/**
 * Logout user
 * @param {*} req
 * @param {*} res
 */

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User successfully logged out.");
};


/**
 * Edit profile
 */

export const editProfile = (req, res) => {
  const userId = req.body.id;
  const { name, username, location, bio, avatar, header_img, website} = req.body;

  let query = "UPDATE defaultdb.users SET ";
  const values = [];

  if (name) {
    query += "name = ?, ";
    values.push(name);
  }

  if (username) {
    query += "username = ?, ";
    values.push(username);
  }

  if (location) {
    query += "location = ?, ";
    values.push(location);
  }

  if (bio) {
    query += "bio = ?, ";
    values.push(bio);
  }

  if(avatar) {
    query += "avatar = ?, ";
    values.push(avatar);
  }

  if(header_img) {
    query += "header_img = ?, ";
    values.push(header_img);
  }

  if(website) {
    query += "website = ?, ";
    values.push(website);
  }

  query += "updated_at = ? "; 
  values.push(moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"));

  query += "WHERE id = ?";
  values.push(userId);

  db.query(query, values, (err, data) => {
    if (err) return res.status(500).json(err);

    // Fetch the updated user data and return it
    db.query("SELECT * FROM defaultdb.users WHERE id = ?", [userId], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result[0]);
    });
  });
};