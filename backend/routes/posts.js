import express from 'express';
import { addPost, deletePost, getAllPosts, getFollowingUsersPosts, getHashtagPosts, getPostsByUsername } from '../controllers/post.js';
import multer from 'multer';

const router = express.Router();


router.post('/', addPost);
router.get('/', getAllPosts);
router.get('/hashtag/:hashtag', getHashtagPosts);
router.get("/user/:username", getPostsByUsername);
router.delete('/', deletePost);
router.get("/following/:userId", getFollowingUsersPosts)

export default router;