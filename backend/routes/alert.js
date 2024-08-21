import express from 'express';
import { addAlert, getAlerts } from '../controllers/alert.js';

const router = express.Router();

router.get('/', getAlerts);
router.post('/', addAlert );


export default router;