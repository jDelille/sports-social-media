import express from 'express';
import { addQuoteRepost } from '../controllers/quoteRepost.js';

const router = express.Router();

router.post('/', addQuoteRepost);

export default router;