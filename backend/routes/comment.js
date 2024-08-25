import express from 'express';
import { addComment, getCommentById, getComments } from '../controllers/comment.js';

const router = express.Router();

router.get('/', getComments);
router.post('/', addComment)
router.get('/:commentId', getCommentById);

export default router;