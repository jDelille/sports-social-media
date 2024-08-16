import express from 'express';
import { addPost, deletePost, getAllPosts, getBetPosts, getFollowingUsersPosts, getHashtagPosts, getPostsByUsername } from '../controllers/post.js';
import multer from 'multer';

const router = express.Router();


router.post('/', addPost);
router.get('/', getAllPosts);
router.get('/hashtag/:hashtag', getHashtagPosts);
router.get("/user/:username", getPostsByUsername);
router.get("/following/:userId", getFollowingUsersPosts)
router.get('/bets', getBetPosts);

router.delete('/', deletePost);

export default router;