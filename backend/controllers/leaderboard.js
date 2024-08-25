import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment/moment.js";

dotenv.config();


export const getLeaderboardUsers = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in.");

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = `
            SELECT lu.*, u.username, u.email 
            FROM leaderboard_users lu
            JOIN users u ON lu.user_id = u.id
            ORDER BY lu.wins DESC;  // Example: Sorting by number of wins
        `;

        db.query(q, (err, data) => {
            if (err) return res.status(500).json({ error: "Database query failed", details: err });
            return res.status(200).json(data);
        });
    });
}

export const addUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in.");

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const userId = req.params.userId;
        const { wins, losses, amount_wagered, amount_won, average_odds } = req.body;

        // SQL query to insert or update user leaderboard data
        const q = `
            INSERT INTO leaderboard_users (user_id, wins, losses, amount_wagered, amount_won, average_odds)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                wins = VALUES(wins),
                losses = VALUES(losses),
                amount_wagered = VALUES(amount_wagered),
                amount_won = VALUES(amount_won),
                average_odds = VALUES(average_odds);
        `;

        const values = [userId, wins, losses, amount_wagered, amount_won, average_odds];

        db.query(q, values, (err, result) => {
            if (err) return res.status(500).json({ error: "Database query failed", details: err });
            return res.status(200).json({ message: "User data added/updated successfully", result });
        });
    });
};