import express from 'express';
import { addUser, getLeaderboardUsers, isParticipant } from '../controllers/leaderboard.js';

const router = express.Router();

router.get('/', getLeaderboardUsers);
router.post('/add/:userId', addUser);
router.get('/participant', isParticipant);
export default router;