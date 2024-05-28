import express from 'express';
import { getMutedPosts, mutePost } from '../controllers/mutePost.js';

const router = express.Router();

router.post('/', mutePost);
router.get('/', getMutedPosts);

export default router;