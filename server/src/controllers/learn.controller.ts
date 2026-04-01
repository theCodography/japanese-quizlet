import { Request, Response } from 'express';
import prisma from '../lib/prisma';


export const getDeckForLearning = async (req: Request, res: Response) => {
  try {
    const id = req.params['id'] as string;
    
    // Support mock ID for frontend development
    if (id === 'demo') {
      return res.json({
        success: true,
        message: 'Lấy dữ liệu mock thành công',
        data: {
          id: 'demo',
          title: 'JLPT N5 - Thẻ từ vựng cơ bản',
          description: 'Bộ thẻ demo giúp bạn ôn tập Kanji N5.',
          cards: [
            { id: '1', term: '食べる', definition: 'Ăn', example: 'りんごを食べる (Ăn táo)' },
            { id: '2', term: '飲む', definition: 'Uống', example: '水を飲む (Uống nước)' },
            { id: '3', term: '見る', definition: 'Nhìn, xem', example: 'テレビを見る (Xem TV)' },
            { id: '4', term: '行く', definition: 'Đi', example: '学校へ行く (Đi học)' }
          ]
        }
      });
    }

    const deck = await prisma.deck.findUnique({
      where: { id },
      include: {
        cards: true
      }
    });

    if (!deck) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bộ thẻ', data: null });
    }

    // Đảo ngẫu nhiên vị trí các thẻ (Shuffle)
    const shuffledCards = [...deck.cards].sort(() => 0.5 - Math.random());
    const responseData = { ...deck, cards: shuffledCards };

    res.json({ success: true, message: 'Lấy dữ liệu thẻ học thành công', data: responseData });
  } catch (error) {
    console.error('getDeckForLearning Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi nội bộ Server', data: null });
  }
};
