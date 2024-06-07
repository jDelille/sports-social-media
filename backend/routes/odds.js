import express from 'express';
import { getOdds } from '../controllers/odds.js';

const router = express.Router();

router.get('/', getOdds);

export default router;