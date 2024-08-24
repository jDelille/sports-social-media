import express from "express";
import {
  createGroup,
  getGroups,
  getMyGroups,
  getSuggestedGroups,
  updateGroup,
  getGroupById,
  deleteGroup,
  checkPendingInvite,
  getMemberCount,
  isMember
} from "../controllers/group.js";

const router = express.Router();

router.get("/", getGroups);
router.post("/", createGroup);
router.get("/my-groups", getMyGroups);
router.get("/suggested", getSuggestedGroups);
router.patch("/:groupId", updateGroup);
router.get("/:groupId", getGroupById);
router.delete("/:groupId", deleteGroup);
router.get('/:groupId/pending-invite', checkPendingInvite);
router.get('/member-count/:groupId', getMemberCount);
router.get('/is-member/:groupId/:userId', isMember);

export default router;
