# Tổng Quan Dự Án: Japan Quizlet (Website Học Tiếng Nhật)

Tài liệu này đóng vai trò là kim chỉ nam cho sự phát triển của dự án, quy định rõ kiến trúc sử dụng, luồng làm việc (workflow) và các bộ quy tắc lập trình (coding rules) cơ bản.

## 1. Tổng quan Kiến trúc Hệ thống (Architecture)

Dự án được phân chia thành 2 phần rõ rệt: Frontend (`/client`) và Backend (`/server`).

*   **Tầng Giao Diện (Frontend - Client):**
    *   **Framework:** Angular 19 (Sử dụng 100% Standalone Components).
    *   **State Management:** Ưu tiên sử dụng hệ thống **Signals** mới của Angular thay vì dùng rườm rà BehaviorSubjects/NgRx (ngoại trừ các context lớn).
    *   **Styling:** Tailwind CSS v4 (Nhanh, gọn, native syntax).
    *   **Giao thức truy xuất:** HTTP Client cơ bản kết nối đến Server NodeJS.

*   **Tầng Xử Lý (Backend - Server):**
    *   **Runtime & Framework:** Node.js với Express và TypeScript.
    *   **ORM:** Prisma v7 - Quản lý schema dữ liệu.
    *   **Cơ sở dữ liệu:** PostgreSQL (Lưu trữ và chạy trên hạ tầng Supabase Cloud thông qua Connection Pooling).
    *   **Lưu trữ File (Storage):** Dùng bucket storage của Supabase cho file hình ảnh/âm thanh thông qua `@supabase/supabase-js`.

---

## 2. Cấu trúc Thư mục Dự án (Project Structure)

```text
japan-quizlet/
├── client/                     # Nhánh Frontend Angular 19
│   ├── src/app/
│   │   ├── components/         # Các UI component nhỏ, tái sử dụng (Header, Sidebar, Flashcard...)
│   │   ├── layouts/            # Khung dàn trang chính (MainLayout, AuthLayout)
│   │   ├── pages/              # Các component hoạt động như Page thật sự chứa View
│   │   ├── services/           # Lớp gọi REST API từ Backend
│   │   ├── models/             # Các Interface TypeScript (Deck, Card...)
│   │   └── shared/             # Pipes, Directives, Utilities dùng chung
├── server/                     # Nhánh Backend NodeJS Express
│   ├── src/
│   │   ├── controllers/        # Nơi tiếp nhận Request và trả về Response (auth, decks...)
│   │   ├── routes/             # Định tuyến đường dẫn API
│   │   ├── services/           # Lớp chứa Logic cốt lõi (Query DB, thao tác dữ liệu)
│   │   ├── utils/              # Các hàm phụ trợ (vd: supabase.ts upload file)
│   │   └── middlewares/        # Lớp check quyền JWT, log sự kiện
│   ├── prisma/
│   │   └── schema.prisma       # Chứa khai báo cơ sở dữ liệu
│   └── .env                    # Thông tin bảo mật (Supabase URI)
└── README.md
```

---

## 3. Luồng làm việc chuẩn (Workflow)

Để triển khai một tính năng từ móng lên ngọn (Ví dụ: Chức năng **Thêm Flashcard mới**), luồng làm việc sẽ đi theo thứ tự sau:

1.  **Cập nhật DB (Nếu có):** Chỉnh sửa file `server/prisma/schema.prisma` -> Chạy `npx prisma db push` để đẩy lên Supabase.
2.  **Làm Backend Service/Router:**
    *   Tạo function logic ở `src/services`.
    *   Gắn function đó vào `src/controllers`.
    *   Khai báo API endpoint ở thư mục `src/routes`.
    *   *(Test thử API bằng Postman/VSCode REST Client)*.
3.  **Làm Frontend Model/Service:**
    *   Đồng bộ Interface (Model) giống hệt DB xuống thư mục `client/src/app/models`.
    *   Viết hàm Request API tương ứng trên `client/src/app/services`.
4.  **Tích hợp UI (Components):** Tạo UI trong màn hình (`pages`), gọi Service bằng Angular Inject() và gán dữ liệu vào **Signals** để vẽ lên HTML.

---

## 4. Các Quy tắc Coding Chung (Coding Rules)

### 4.1 Quy tắc Đặt tên (Naming Convention)
*   **File và folder:** Viết thường có gạch ngang - **kebab-case** (vd: `flashcard-deck.component.ts`).
*   **Tên Class/Interface:** Chữ cái đầu viết hoa - **PascalCase** (vd: `class AuthService`).
*   **Tên biến và hàm:** Kiểu con lạc đà - **camelCase** (vd: `userList`, `fetchDecks()`).
*   **Hằng số (Constants):** Viết hoa tất cả gạch dưới - **UPPER_SNAKE_CASE** (vd: `MAX_PAGINATION_SIZE`).

### 4.2 Lập trình phía Backend (API & NodeJS)
*   Luôn luôn trả về Response theo cấu trúc chuẩn (Standard Response Format) để Frontend dễ xử lý:
    ```json
    {
      "success": true, // hoặc false
      "message": "Chi tiết kết quả thực hiện",
      "data": {} // Các dữ liệu, mảng object nếu thành công
    }
    ```
*   Bắt buộc phải dùng `try-catch` trong Controllers để bắt lỗi thay vì làm sập (crash) ứng dụng NodeJS.

### 4.3 Lập trình phía Frontend (Angular)
*   Hiệu ứng UI/UX phải lấy cái đẹp làm ưu tiên, tận dụng triệt để Tailwind CSS, trạng thái `:hover`, `:focus`, `transition`.
*   Tín hiệu quản lý State: Sử dụng `signal()`, `computed()`, `effect()` của Angular 19 thay thế cho luồng RxJS nhàm chán khi tương tác với UI cục bộ.
*   Tránh "code rác" (inline styles) ngay trong file HTML. Thay vào đó cấu trúc class Tailwind dài ra thành biểu thức cho dễ nhìn hoặc dùng `@apply`.
*   Luôn thiết kế theo **Mobile-First** (Giao diện đáp ứng từ điện thoại đến Desktop).
