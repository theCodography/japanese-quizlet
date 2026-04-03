import { Router } from 'express';
import { getAllDecks, getDeckById, createDeck } from '../controllers/deck.controller';
import { createCard } from '../controllers/card.controller';
import { optionalAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getAllDecks);
router.post('/', createDeck);
router.get('/:id', optionalAuth, getDeckById);
router.post('/:deckId/cards', createCard);

export default router;
