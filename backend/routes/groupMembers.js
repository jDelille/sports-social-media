import express from "express";
import { addGroupMember, getGroupMembers } from "../controllers/groupMembers.js";

const router = express.Router();

router.get('/:groupId', getGroupMembers);
router.post('/add', addGroupMember);


export default router;
