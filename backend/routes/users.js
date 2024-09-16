import express from 'express';
import { getUser, getSuggestedUsers, getMentionUsers } from '../controllers/user.js';

const router = express.Router();

router.get('/find/:username', getUser);
router.get('/suggested/:userId', getSuggestedUsers)
router.get('/mentioned', getMentionUsers);

export default router;