import express from 'express';
import { addUser, getLeaderboardUsers } from '../controllers/leaderboard.js';

const router = express.Router();

router.get('/', getLeaderboardUsers);
router.post('/add/:userId', addUser);

export default router;