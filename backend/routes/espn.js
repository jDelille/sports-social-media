import express from 'express';
import { getESPNData, getGameData } from '../controllers/espn.js';

const router = express.Router();

router.get('/:sport/:league', getESPNData);
router.get('/game/:league/:gameId', getGameData);

export default router;