import express from "express";
import { addGroupMember, getGroupMembers, removeGroupMember } from "../controllers/groupMembers.js";

const router = express.Router();

router.get('/:groupId', getGroupMembers);
router.post('/add', addGroupMember);
router.delete('/remove', removeGroupMember);


export default router;
