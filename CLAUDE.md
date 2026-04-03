# CLAUDE.md — japan-quizlet

## Project Overview

Monorepo: Angular 19 (client) + Express/Prisma (server)
Deploy: Vercel (client) + Render (server)
Repo: https://github.com/theCodography/japanese-quizlet

## Ticket Workflow

Khi user đưa issue/yêu cầu tính năng/bug fix, **bắt buộc** tuân thủ quy trình sau:

### Step 1: Phân tích & Plan
- Đọc và phân tích yêu cầu
- Xác định scope: files cần thay đổi, tính năng cần thêm/sửa
- Trình bày plan ngắn gọn cho user

### Step 2: Tạo branch
- Checkout từ `main`
- Naming: `feature/<tên>` | `fix/<tên>` | `docs/<tên>`

### Step 3: Code & Commit
- Implement theo plan
- Commit theo conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, etc.
- Có thể tạo nhiều commit nhỏ nếu cần

### Step 4: Xác nhận (BẮT BUỘC)
- Tóm tắt changes cho user (files changed, logic chính)
- **PHẢI HỎI USER XÁC NHẬN trước khi push** — không được bỏ qua bước này

### Step 5: Push & Tạo PR
- Push branch lên origin
- Tạo Pull Request với title và description rõ ràng
- Trả link PR cho user

## Conventions

- Commit message: conventional commits (feat, fix, docs, refactor, chore)
- Branch naming: feature/*, fix/*, docs/*
- PR description: Summary + Test plan
- Language: Vietnamese cho giao tiếp, English cho code/commit/PR
