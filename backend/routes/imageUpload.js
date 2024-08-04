import express from 'express';
import { postProfileHeader, postProfilePicture } from '../controllers/imageUpload.js';

const router = express.Router();

router.post('/upload/profilePicture', postProfilePicture);
router.post('/upload/profileHeader', postProfileHeader);

export default router;