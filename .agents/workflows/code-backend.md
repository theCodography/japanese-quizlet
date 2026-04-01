---
description: Code tính năng Backend (Node.js/Express/Prisma) theo đúng chuẩn dự án
---

# Workflow: `/code-backend`

Khi người dùng kích hoạt lệnh `/code-backend` kèm theo mô tả, bạn phải tuần tự làm theo các bước sau. Nếu bất kỳ bước nào **thất bại**, hãy tự phân tích lỗi, sửa và chạy lại, **không hỏi người dùng**.

---

## Bước 1 — Đọc tài liệu dự án

Đọc các file sau để nắm context trước khi viết code:
- `README.md` — thư mục dự án, chuẩn API response
- `server/prisma/schema.prisma` — cấu trúc Database hiện tại
- `server/src/lib/prisma.ts` — kiểm tra singleton PrismaClient đã tồn tại chưa

## Bước 2 — Cập nhật Database Schema (nếu cần)

Nếu cần thêm/sửa model trong Prisma:
1. Chỉnh sửa `server/prisma/schema.prisma`
2. Chạy: `cmd /c "npx prisma db push"` trong `server/`
3. Nếu lỗi → đọc output lỗi, sửa schema rồi chạy lại
4. Sau khi push thành công, chạy: `cmd /c "npx prisma generate"` để regenerate client

## Bước 3 — Đảm bảo Prisma Singleton tồn tại

Kiểm tra xem `server/src/lib/prisma.ts` đã tồn tại chưa. Nếu chưa, **tạo mới** với nội dung sau (đây là chuẩn Prisma v7 của dự án):

```typescript
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('❌ DATABASE_URL không được để trống. Kiểm tra file .env');
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaPg({ connectionString: databaseUrl as string });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

**Lưu ý quan trọng về Prisma v7:**
- KHÔNG dùng `new PrismaClient()` trực tiếp trong controller
- KHÔNG khai báo `url` trong `datasource db {}` của `schema.prisma`
- PHẢI dùng `@prisma/adapter-pg` làm driver adapter
- Mọi controller chỉ cần `import prisma from '../lib/prisma'`
- `schema.prisma` phải có `previewFeatures = ["driverAdapters"]` trong generator block

## Bước 4 — Viết Controller

Tạo/Cập nhật file trong `server/src/controllers/`:
- **Bắt buộc** rào toàn bộ logic bằng `try-catch`
- Import prisma từ singleton: `import prisma from '../lib/prisma'`
- Tuân theo chuẩn API Response của dự án (xem README.md)
- Không dùng `new PrismaClient()` trực tiếp

## Bước 5 — Viết Route

Tạo/Cập nhật file trong `server/src/routes/` và đăng ký vào `server/src/index.ts`.

## Bước 6 — Kiểm tra Server chạy được

Sau khi viết xong code, chạy kiểm tra TypeScript compile:

```
cmd /c "npx tsc --noEmit"
```

**Nếu có lỗi TypeScript:**
- Đọc từng lỗi, sửa code tương ứng, rồi chạy lại
- Lặp cho đến khi không còn lỗi

**Các lỗi thường gặp và cách fix:**
| Lỗi | Nguyên nhân | Fix |
|-----|-------------|-----|
| `PrismaClientInitializationError: needs non-empty valid PrismaClientOptions` | Dùng `new PrismaClient()` không có adapter | Dùng singleton từ `lib/prisma.ts` |
| `Module '@prisma/client' has no exported member 'PrismaClient'` | Chưa generate client | Chạy `cmd /c "npx prisma generate"` |
| `Type 'string' is not assignable to type 'never'` | Type mismatch trong PrismaClient options | Kiểm tra cách khởi tạo PrismaClient |
| `Property 'X' does not exist on type` | Query thiếu `include` | Thêm `include: { X: true }` vào query |
| `Type 'string \| string[]' is not assignable to type 'string'` | `req.params.id` cần cast | Dùng `req.params['id'] as string` |

## Bước 7 — Thông báo kết quả

Sau khi hoàn thành, thông báo cho Frontend:
- Danh sách endpoint vừa tạo (Method + Path)
- Request body / Query params (nếu có)
- Response format mẫu
- Lưu ý đặc biệt (auth required, pagination, v.v.)
