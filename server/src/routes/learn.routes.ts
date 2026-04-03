import { Router } from 'express';
import { getDeckForLearning } from '../controllers/learn.controller';
import { optionalAuth } from '../middlewares/auth.middleware';

const router = Router();

// Lấy danh sách card ngẫu nhiên của một Deck để học
router.get('/decks/:id', optionalAuth, getDeckForLearning);

export default router;
