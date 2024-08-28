import express from 'express';
import { addSingleBet } from '../../controllers/bet/singleBet.js';

const router = express.Router();

router.post('/add', addSingleBet);

export default router;