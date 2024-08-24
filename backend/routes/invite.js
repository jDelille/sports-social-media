import express from "express";
import { getPendingInvites, sendInvite, updateInviteStatus } from "../controllers/invite.js";

const router = express.Router();

router.post('/', sendInvite);
router.patch('/:inviteId', updateInviteStatus);
router.get('/pending', getPendingInvites);

export default router;
