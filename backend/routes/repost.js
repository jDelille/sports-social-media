import express from 'express';
import { addRepost, removeRepost } from '../controllers/repost.js';

const router = express.Router();

router.post('/', addRepost);
router.delete('/', removeRepost);

export default router;