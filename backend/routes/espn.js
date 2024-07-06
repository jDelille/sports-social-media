import express from 'express';
import { getESPNData } from '../controllers/espn.js';

const router = express.Router();

router.get('/:sport/:league', getESPNData);

export default router;