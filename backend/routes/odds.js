import express from 'express';
import { getOdds } from '../controllers/odds.js';

const router = express.Router();

router.get('/:sport/:league', getOdds);

export default router;