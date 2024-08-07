import express from 'express';
import { followUser, getFollowerUsers, getFollowingUsers, getUserRelationships } from '../controllers/relationship.js';

const router = express.Router();

router.post('/follow/:userId', followUser);
router.get('/find/:userId', getUserRelationships);
router.get('/find/following/:userId', getFollowingUsers);
router.get('/find/followers/:userId', getFollowerUsers);
export default router;