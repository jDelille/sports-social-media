import express from 'express';
import { checkSpread } from '../../controllers/bet-check/spread.js';

const router = express.Router();

router.post('/check', checkSpread);

export default router;