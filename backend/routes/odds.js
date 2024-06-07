import express from 'express';

const router = express.Router();

router.get('/', getOdds);

export default router;