import express from 'express';
import { getTotalBetCount, getWinCount, getLossCount } from '../../controllers/bet/betStats.js';

const router = express.Router();

router.get('/total-count', getTotalBetCount);
router.get('/win-count', getWinCount);
router.get('/loss-count', getLossCount);


export default router;