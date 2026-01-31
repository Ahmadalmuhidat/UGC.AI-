import express from 'express';
import { getUserCredits } from '../controllers/user.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.get('/credits', authenticate, getUserCredits);

export default router;