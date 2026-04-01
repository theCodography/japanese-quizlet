import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllDecks = async (req: Request, res: Response) => {
  try {
    const decks = await prisma.deck.findMany({
      include: {
        _count: { select: { cards: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, message: 'Lấy danh sách bộ thẻ thành công', data: decks });
  } catch (error) {
    console.error('getAllDecks Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi nội bộ Server', data: null });
  }
};

export const createDeck = async (req: Request, res: Response) => {
  try {
    const { title, description, isPublic } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Tên bộ thẻ không được để trống', data: null });
    }

    // Lấy user mặc định hoặc tạo mới nếu chưa có (môi trường demo)
    let defaultUser = await prisma.user.findFirst();
    if (!defaultUser) {
      defaultUser = await prisma.user.create({
        data: {
          email: 'demo@japan-quizlet.local',
          name: 'Demo User',
          password: 'hashed_demo_password'
        }
      });
    }

    const deck = await prisma.deck.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        isPublic: Boolean(isPublic),
        creatorId: defaultUser.id
      },
      include: {
        _count: { select: { cards: true } }
      }
    });

    res.status(201).json({ success: true, message: 'Tạo bộ thẻ thành công', data: deck });
  } catch (error) {
    console.error('createDeck Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi nội bộ Server', data: null });
  }
};

export const getDeckById = async (req: Request, res: Response) => {
  try {
    const id = req.params['id'] as string;
    const deck = await prisma.deck.findUnique({
      where: { id },
      include: {
        cards: { orderBy: { createdAt: 'asc' } },
        _count: { select: { cards: true } }
      }
    });
    if (!deck) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bộ thẻ', data: null });
    }
    res.json({ success: true, message: 'Lấy dữ liệu bộ thẻ thành công', data: deck });
  } catch (error) {
    console.error('getDeckById Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi nội bộ Server', data: null });
  }
};
