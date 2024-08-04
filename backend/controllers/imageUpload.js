import multer from "multer";
import path from "path";
import { db } from "../connect.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

/**
 * Upload profile picture
 */

export const postProfilePicture = (req, res) => {
  const userId = req.body.id;

  upload.single("profilePicture")(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: "Image upload failed." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = `/uploads/${req.file.filename}`;

    const query =
      "UPDATE users SET avatar = ?, updated_at = ? WHERE id = ?";
    const values = [filePath, new Date(), userId];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Database update error:", err);
        return res.status(500).json({ error: "Failed to update user profile" });
      }

      // Fetch the updated user data and return it
      db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
        if (err) {
          console.error("Database fetch error:", err);
          return res
            .status(500)
            .json({ error: "Failed to fetch updated user data" });
        }
        return res.status(200).json(result[0]);
      });
    });
  });
};

/**
 * Upload profile header
 */

export const postProfileHeader = (req, res) => {
  const userId = req.body.id;

  upload.single("profileHeader")(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: "Image upload failed." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = `/uploads/${req.file.filename}`;

    const query =
      "UPDATE users SET header_img = ?, updated_at = ? WHERE id = ?";
    const values = [filePath, new Date(), userId];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Database update error:", err);
        return res.status(500).json({ error: "Failed to update user profile" });
      }

      // Fetch the updated user data and return it
      db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
        if (err) {
          console.error("Database fetch error:", err);
          return res
            .status(500)
            .json({ error: "Failed to fetch updated user data" });
        }
        return res.status(200).json(result[0]);
      });
    });
  });
};
