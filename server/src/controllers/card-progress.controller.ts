import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const upsertCardProgress = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Chưa đăng nhập' });
    }

    const cardId = req.params['cardId'] as string;
    const { rating, starred } = req.body;

    // Validate card exists
    const card = await prisma.card.findUnique({ where: { id: cardId } });
    if (!card) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy thẻ', data: null });
    }

    // Build update data — only update fields that are provided
    const data: Record<string, unknown> = {};
    if (rating !== undefined) {
      if (rating !== null && !['hard', 'good', 'easy'].includes(rating)) {
        return res.status(400).json({ success: false, message: 'Rating không hợp lệ', data: null });
      }
      data.rating = rating;
    }
    if (starred !== undefined) {
      data.starred = Boolean(starred);
    }

    const progress = await prisma.cardProgress.upsert({
      where: { userId_cardId: { userId, cardId } },
      create: {
        userId,
        cardId,
        rating: rating ?? null,
        starred: starred ?? false,
      },
      update: data,
    });

    res.json({ success: true, message: 'Cập nhật tiến độ thành công', data: progress });
  } catch (error) {
    console.error('upsertCardProgress Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi nội bộ Server', data: null });
  }
};

export const batchUpsertCardProgress = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Chưa đăng nhập' });
    }

    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Danh sách items không hợp lệ', data: null });
    }

    const results = await Promise.all(
      items.map((item: { cardId: string; rating?: string | null; starred?: boolean }) =>
        prisma.cardProgress.upsert({
          where: { userId_cardId: { userId, cardId: item.cardId } },
          create: {
            userId,
            cardId: item.cardId,
            rating: item.rating ?? null,
            starred: item.starred ?? false,
          },
          update: {
            ...(item.rating !== undefined ? { rating: item.rating } : {}),
            ...(item.starred !== undefined ? { starred: item.starred } : {}),
          },
        })
      )
    );

    res.json({ success: true, message: 'Cập nhật batch thành công', data: results });
  } catch (error) {
    console.error('batchUpsertCardProgress Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi nội bộ Server', data: null });
  }
};
