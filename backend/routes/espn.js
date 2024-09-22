import express from 'express';
import { getESPNData, getESPNNFLNews, getGameData } from '../controllers/espn.js';

const router = express.Router();

router.get('/:sport/:league', getESPNData);
router.get('/game/:league/:gameId', getGameData);
router.get('/news', getESPNNFLNews);
export default router;