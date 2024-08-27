import express from 'express';
import { addAlert, getAlertCount, getAlerts, markAlertsAsRead } from '../controllers/alert.js';

const router = express.Router();

router.get('/', getAlerts);
router.post('/', addAlert);
router.get('/count', getAlertCount);
router.put('/mark-as-read', markAlertsAsRead);


export default router;