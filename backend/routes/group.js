import express from 'express';
import { createGroup, getGroups, getMyGroups } from '../controllers/group.js';

const router = express.Router();

router.get('/', getGroups);
router.post('/', createGroup);
router.get('/my-groups', getMyGroups);


export default router;