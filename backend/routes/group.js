import express from 'express';
import { createGroup, getGroups } from '../controllers/group.js';

const router = express.Router();

router.get('/', getGroups);
router.post('/', createGroup);


export default router;