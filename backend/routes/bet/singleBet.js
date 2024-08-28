import express from 'express';
import { addSingleBet, getSingleBet } from '../../controllers/bet/singleBet.js';

const router = express.Router();

router.post('/add', addSingleBet);
router.get("/bet/:postId", getSingleBet);


export default router;