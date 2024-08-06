import express from 'express';
import { followUser, getUserRelationships } from '../controllers/relationship.js';

const router = express.Router();

router.post('/follow/:userId', followUser);
router.get('/find/:userId', getUserRelationships);

export default router;