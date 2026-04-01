import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllGrammar = async (req: Request, res: Response) => {
  try {
    const { level, textbook, lesson, search } = req.query;

    const where: any = {};
    if (level && typeof level === 'string') where.level = level;
    if (textbook && typeof textbook === 'string') where.textbook = { contains: textbook, mode: 'insensitive' };
    if (lesson) where.lesson = Number(lesson);
    if (search && typeof search === 'string') {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { structure: { contains: search, mode: 'insensitive' } },
        { meaning: { contains: search, mode: 'insensitive' } },
      ];
    }

    const grammar = await prisma.grammarLesson.findMany({
      where,
      orderBy: [{ level: 'asc' }, { order: 'asc' }],
    });

    res.json({ success: true, message: 'Lấy danh sách ngữ pháp thành công', data: grammar });
  } catch (error) {
    console.error('getAllGrammar Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi nội bộ Server', data: null });
  }
};

export const getGrammarById = async (req: Request, res: Response) => {
  try {
    const id = req.params['id'] as string;
    const grammar = await prisma.grammarLesson.findUnique({ where: { id } });

    if (!grammar) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy ngữ pháp', data: null });
    }

    res.json({ success: true, message: 'Lấy dữ liệu ngữ pháp thành công', data: grammar });
  } catch (error) {
    console.error('getGrammarById Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi nội bộ Server', data: null });
  }
};

export const getGrammarLevels = async (req: Request, res: Response) => {
  try {
    const levels = await prisma.grammarLesson.groupBy({
      by: ['level'],
      _count: { id: true },
      orderBy: { level: 'asc' },
    });

    const data = levels.map((l) => ({
      level: l.level,
      count: l._count.id,
    }));

    res.json({ success: true, message: 'Lấy danh sách cấp độ thành công', data });
  } catch (error) {
    console.error('getGrammarLevels Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi nội bộ Server', data: null });
  }
};

export const getGrammarByLevel = async (req: Request, res: Response) => {
  try {
    const level = req.params['level'] as string;
    const lesson = req.query['lesson'];

    const where: any = { level: level.toUpperCase() };
    if (lesson) where.lesson = Number(lesson);

    const grammar = await prisma.grammarLesson.findMany({
      where,
      orderBy: [{ lesson: 'asc' }, { order: 'asc' }],
    });

    // Group by lesson
    const grouped: Record<number, typeof grammar> = {};
    for (const g of grammar) {
      const key = g.lesson ?? 0;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(g);
    }

    res.json({
      success: true,
      message: `Lấy ngữ pháp ${level.toUpperCase()} thành công`,
      data: { items: grammar, byLesson: grouped },
    });
  } catch (error) {
    console.error('getGrammarByLevel Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi nội bộ Server', data: null });
  }
};
