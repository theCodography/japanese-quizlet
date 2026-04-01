---
description: Code trọn vẹn 1 tính năng Fullstack từ Database đến UI
---

Trình tự bắt buộc thiết kế và thi công khi bạn nhận lệnh `/code-feature` kèm theo tên tính năng:

1. Đọc nội dung file `README.md` để nắm bao quát quy tắc Coding của cả dự án Frontend lẫn Backend.
2. Thiết kế logic Data: Thêm bảng hoặc thuộc tính vào `server/prisma/schema.prisma`. Chạy `npx prisma db push` cho Supabase nhận bảng mới.
3. Kịch bản API (Backend): Viết code cho Controller -> Route với Validation rõ ràng. Standard format bắt buộc: `{ success: boolean, message: string, data: any }`.
4. Viết Frontend Model: Chuyển Type của Prisma API sang interface ở `client/src/app/models/...`.
5. Tạo HTTP Service ở Angular (`client/src/app/services/...`) để liên kết cái Endpoint vừa viết.
6. Thiết kế Layout Component UI sử dụng TailwindCSS v4 và Signals.
7. Đánh giá chất lượng và báo cáo người dùng.
