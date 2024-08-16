import express from 'express';
import { getUserBetRecord } from '../../controllers/bet-check/record.js';

const router = express.Router();

router.get('/:userId/betRecord', getUserBetRecord);

export default router;