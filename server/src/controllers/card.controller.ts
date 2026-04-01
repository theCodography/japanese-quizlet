import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const createCard = async (req: Request, res: Response) => {
  try {
    const deckId = req.params['deckId'] as string;
    const { term, definition, example } = req.body;

    if (!term || typeof term !== 'string' || term.trim() === '') {
      return res.status(400).json({ success: false, message: 'Mặt trước (term) không được để trống', data: null });
    }
    if (!definition || typeof definition !== 'string' || definition.trim() === '') {
      return res.status(400).json({ success: false, message: 'Mặt sau (definition) không được để trống', data: null });
    }

    const deck = await prisma.deck.findUnique({ where: { id: deckId } });
    if (!deck) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bộ thẻ', data: null });
    }

    const card = await prisma.card.create({
      data: {
        deckId,
        term: term.trim(),
        definition: definition.trim(),
        example: example?.trim() || null,
      }
    });

    res.status(201).json({ success: true, message: 'Thêm thẻ thành công', data: card });
  } catch (error) {
    console.error('createCard Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi nội bộ Server', data: null });
  }
};
