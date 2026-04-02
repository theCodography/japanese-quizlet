import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

const SALT_ROUNDS = 10;

function signToken(userId: string, email: string): string {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign({ userId, email }, secret, { expiresIn: '7d' });
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email và mật khẩu là bắt buộc' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, message: 'Email không hợp lệ' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' });
      return;
    }

    // Check existing user
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ success: false, message: 'Email đã được sử dụng' });
      return;
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name: name || null },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    const token = signToken(user.id, user.email);

    res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản thành công',
      data: { token, user },
    });
  } catch (error: any) {
    console.error('[registerUser] Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email và mật khẩu là bắt buộc' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
      return;
    }

    const token = signToken(user.id, user.email);
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: { token, user: userWithoutPassword },
    });
  } catch (error: any) {
    console.error('[loginUser] Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
  }
};
