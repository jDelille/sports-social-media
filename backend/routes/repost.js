import express from 'express';
import { addRepost, isPostReposted, removeRepost } from '../controllers/repost.js';

const router = express.Router();

router.post('/', addRepost);
router.delete('/', removeRepost);
router.get('/', isPostReposted);

export default router;