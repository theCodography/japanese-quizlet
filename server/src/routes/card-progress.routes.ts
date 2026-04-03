import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { upsertCardProgress, batchUpsertCardProgress } from '../controllers/card-progress.controller';

const router = Router();

router.put('/:cardId/progress', authenticate, upsertCardProgress);
router.post('/progress/batch', authenticate, batchUpsertCardProgress);

export default router;
