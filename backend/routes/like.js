import express from 'express';
import { addLike, getLikes } from '../controllers/like.js';

const router = express.Router();

router.get('/', getLikes);
router.post('/', addLike)

export default router;