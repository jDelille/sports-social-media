import express from 'express';
import { getTotalBetCount } from '../../controllers/bet/betStats.js';

const router = express.Router();

router.get('/total-count', getTotalBetCount);


export default router;