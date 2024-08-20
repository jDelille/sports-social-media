import express from 'express';
import { checkSpread } from '../../controllers/bet-check/spread.js';

const router = express.Router();

router.post('/check/:sport/:league/:eventId/:type/:postId/:pickId/:handicap/:team/:userId', checkSpread);

export default router;