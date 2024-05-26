import express from 'express';
import { addPost, getAllPosts } from '../controllers/post.js';

const router = express.Router();

router.post('/', addPost);
router.get('/', getAllPosts);

export default router;