import express from 'express';
import { createGroup, getGroups, getMyGroups, getSuggestedGroups } from '../controllers/group.js';

const router = express.Router();

router.get('/', getGroups);
router.post('/', createGroup);
router.get('/my-groups', getMyGroups);
router.get('/suggested', getSuggestedGroups);


export default router;