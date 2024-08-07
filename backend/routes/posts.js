import express from 'express';
import { addPost, deletePost, getAllPosts, getFollowingUsersPosts, getPostsByUsername } from '../controllers/post.js';

const router = express.Router();

router.post('/', addPost);
router.get('/', getAllPosts);
router.get("/user/:username", getPostsByUsername);
router.delete('/', deletePost);
router.get("/following/:userId", getFollowingUsersPosts)

export default router;