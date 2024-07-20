import {db} from '../connect.js';
import jwt from 'jsonwebtoken';

export const getUser = (req, res) => {
    const username = req.params.username;   
    const q = "SELECT * FROM users WHERE username=?";

    db.query(q, [username], (err, data) => {
        if(err) return res.status(500).json(err);
        if (!data || !data[0]) {
            return res.status(404).json({ message: 'User not found' });
        }
        const {password, ...info} = data[0];
        return res.json(info);
    })
}