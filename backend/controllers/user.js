import {db} from '../connect.js';
import jwt from 'jsonwebtoken';

export const getUser = (req, res) => {
    const username = req.params.username;   
    const q = "SELECT * FROM defaultdb.users WHERE username=?";

    db.query(q, [username], (err, data) => {
        if(err) return res.status(500).json(err);
        if (!data || !data[0]) {
            return res.status(404).json({ message: 'User not found' });
        }
        const {password, ...info} = data[0];
        return res.json(info);
    })
}

export const getSuggestedUsers = (req, res) => {
    // Update SQL query to sort by follower count and limit the result to 3
    const q = `
        SELECT * 
        FROM defaultdb.users 
        LIMIT 3
    `;

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        // Exclude passwords from user data
        const users = data.map(user => {
            const { password, ...userInfo } = user;
            return userInfo;
        });
        return res.json(users);
    });
};