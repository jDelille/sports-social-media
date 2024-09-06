import express from 'express';
import { getUser, getSuggestedUsers } from '../controllers/user.js';

const router = express.Router();

router.get('/find/:username', getUser);
router.get('/suggested/:userId', getSuggestedUsers)

export default router;