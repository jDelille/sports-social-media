import express from 'express';
import { addRepost } from '../controllers/repost.js';

const router = express.Router();

router.post('/', addRepost);

export default router;