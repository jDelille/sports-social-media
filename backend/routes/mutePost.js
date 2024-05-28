import express from 'express';
import { getMutedPosts, mutePost, unmutePost } from '../controllers/mutePost.js';

const router = express.Router();

router.post('/', mutePost);
router.get('/', getMutedPosts);
router.delete('/', unmutePost)

export default router;