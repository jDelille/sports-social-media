import express from 'express';
import { addPost, deletePost, getAllPosts } from '../controllers/post.js';

const router = express.Router();

router.post('/', addPost);
router.get('/', getAllPosts);
router.delete('/', deletePost);

export default router;