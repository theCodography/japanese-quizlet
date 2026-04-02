import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, avatar: true, createdAt: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { name, avatar } = req.body;
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined && { name }),
        ...(avatar !== undefined && { avatar })
      },
      select: { id: true, name: true, email: true, avatar: true, createdAt: true }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
