import { Router } from 'express';
import { getDeckForLearning } from '../controllers/learn.controller';

const router = Router();

// Lấy danh sách card ngẫu nhiên của một Deck để học
router.get('/decks/:id', getDeckForLearning);

export default router;
