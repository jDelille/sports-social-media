import express from 'express';
import { createGroup, getGroups, getMyGroups, getSuggestedGroups, updateGroup } from '../controllers/group.js';

const router = express.Router();

router.get('/', getGroups);
router.post('/', createGroup);
router.get('/my-groups', getMyGroups);
router.get('/suggested', getSuggestedGroups);
router.patch('/:groupId', updateGroup);


export default router;