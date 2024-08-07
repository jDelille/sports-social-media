import express from 'express';
import { followUser, getFollowerUsers, getFollowingUsers, getUserRelationships, unfollowUser } from '../controllers/relationship.js';

const router = express.Router();

router.post('/follow/:userId', followUser);
router.get('/find/:userId', getUserRelationships);
router.get('/find/following/:userId', getFollowingUsers);
router.get('/find/followers/:userId', getFollowerUsers);
router.delete('/unfollow/:userId', unfollowUser);
export default router;