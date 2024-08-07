import express from 'express';
import { followUser, getFollowingUsers, getUserRelationships } from '../controllers/relationship.js';

const router = express.Router();

router.post('/follow/:userId', followUser);
router.get('/find/:userId', getUserRelationships);
router.get('/find/following/:userId', getFollowingUsers);

export default router;