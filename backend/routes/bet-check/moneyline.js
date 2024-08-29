import express from 'express';
import { checkMoneyline } from '../../controllers/bet-check/moneyline.js';

const router = express.Router();

router.post('/check', checkMoneyline);

export default router;