import express from 'express';
import { addAlert, getAlerts } from '../controllers/alert';

const router = express.Router();

router.get('/', getAlerts);
router.post('/', addAlert );


export default router;