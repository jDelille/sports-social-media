import express from 'express';
import { checkTotal } from '../../controllers/bet-check/total.js';

const router = express.Router();

router.post('/check/:sport/:league/:eventId/:type/:postId/:pickId/:total/:handicap', checkTotal);

export default router;