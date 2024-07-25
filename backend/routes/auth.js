import express from 'express';
import { editProfile, login, logout, register } from '../controllers/auth.js'

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.put('/editProfile', editProfile);

export default router;