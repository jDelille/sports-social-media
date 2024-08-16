import express from 'express';
import { followUser, getFollowerUsers, getFollowingUsers, getUserCounts, getUserRelationships, unfollowUser } from '../controllers/relationship.js';

const router = express.Router();

router.post('/:userId/follow', followUser);
router.delete('/:userId/unfollow', unfollowUser);

router.get('/:userId/following', getFollowingUsers);
router.get('/:userId/followers', getFollowerUsers);

router.get('/:userId/relationships', getUserRelationships);

router.get('/:userId/counts', getUserCounts);

export default router;