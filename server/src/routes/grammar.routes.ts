import { Router } from 'express';
import { getAllGrammar, getGrammarById, getGrammarLevels, getGrammarByLevel } from '../controllers/grammar.controller';

const router = Router();

router.get('/', getAllGrammar);
router.get('/levels', getGrammarLevels);
router.get('/level/:level', getGrammarByLevel);
router.get('/:id', getGrammarById);

export default router;
