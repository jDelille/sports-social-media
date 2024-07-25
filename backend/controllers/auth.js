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
  // Check is user exists
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists");
    // Create a new user
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`username`, `email`, `password`, `name`, `created_at`) VALUES ?";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),

    ];
    db.query(q, [[values]], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User successfully created.");
    });
  });
};

/**
 * Login user
 * @param {*} req
 * @param {*} res
 */

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

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
  const { name, username, location } = req.body;

  let query = "UPDATE users SET ";
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

  query += "updated_at = ? "; 
  values.push(moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"));

  query += "WHERE id = ?";
  values.push(userId);

  db.query(query, values, (err, data) => {
    if (err) return res.status(500).json(err);

    // Fetch the updated user data and return it
    db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result[0]);
    });
  });
};