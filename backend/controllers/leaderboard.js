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
        FROM \`defaultdb.leaderboard_users\` lu
        JOIN \`defaultdb.users\` u ON lu.user_id = u.id
        ORDER BY lu.wins DESC;
    `;

        db.query(q, (err, data) => {
            if (err) return res.status(500).json({ error: "Database query failed", details: err });
            return res.status(200).json(data);
        });
    });
}

export const isParticipant = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in.");

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const { id: userId } = userInfo;

        const q = `
            SELECT 1 
            FROM defaultdb.leaderboard_users lu
            WHERE lu.user_id = ?
        `;

        db.query(q, [userId], (err, data) => {
            if (err) return res.status(500).json({ error: "Database query failed", details: err });
            
            // If data is returned, the user is a participant
            if (data.length > 0) {
                return res.status(200).json({ isParticipant: true });
            } else {
                return res.status(200).json({ isParticipant: false });
            }
        });
    });
};

export const addUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in.");

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const userId = req.params.userId;
        const { wins, losses, amount_wagered, amount_won, average_odds } = req.body;

        // SQL query to insert or update user leaderboard data
        const leaderboardQuery = `
            INSERT INTO defaultdb.leaderboard_users (user_id, wins, losses, amount_wagered, amount_won, average_odds)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                wins = VALUES(wins),
                losses = VALUES(losses),
                amount_wagered = VALUES(amount_wagered),
                amount_won = VALUES(amount_won),
                average_odds = VALUES(average_odds);
        `;

        const leaderboardValues = [userId, wins, losses, amount_wagered, amount_won, average_odds];

        // Query to add funds for the user
        const fundsQuery = `
            UPDATE defaultdb.users
            SET funds = IFNULL(funds, 0) + 500
            WHERE id = ?;
        `;

        const fundsValues = [userId];

        db.query(leaderboardQuery, leaderboardValues, (err, result) => {
            if (err) return res.status(500).json({ error: "Database query failed", details: err });

            // Update the funds field in the users table
            db.query(fundsQuery, fundsValues, (err, result) => {
                if (err) return res.status(500).json({ error: "Database query failed", details: err });
                return res.status(200).json({ message: "User data and funds updated successfully", result });
            });
        });
    });
};