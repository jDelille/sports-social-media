import express from 'express';
import { checkMoneyline } from '../../controllers/bet-check/moneyline.js';

const router = express.Router();

router.post('/check/:sport/:league/:eventId/:type', checkMoneyline);

export default router;