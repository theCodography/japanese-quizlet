import { Request, Response } from 'express';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // In real app, filter by req.user.id
    res.json({
      success: true,
      message: 'Lấy thống kê bảng điều khiển thành công',
      data: {
        wordsLearned: 1248,
        streakDays: 14,
        xp: 4850
      }
    });
  } catch (error: any) {
    console.error('Lỗi khi lấy stats:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ',
      data: null
    });
  }
};
