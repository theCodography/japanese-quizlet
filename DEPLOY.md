# Hướng dẫn Deploy Japan Quizlet

## Tổng quan
- **Backend** → Render (Node.js Web Service)
- **Frontend** → Vercel (Angular static site)
- **Database** → Supabase (đã có sẵn)

---

## Bước 1 — Push code lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
# Tạo repo trên GitHub rồi:
git remote add origin https://github.com/YOUR_USERNAME/japan-quizlet.git
git push -u origin main
```

---

## Bước 2 — Deploy Backend lên Render

1. Vào [render.com](https://render.com) → **New → Web Service**
2. Connect GitHub repo `japan-quizlet`
3. Cấu hình:
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npm run build && npx prisma generate`
   - **Start Command:** `npm start`
   - **Region:** Singapore
4. Thêm **Environment Variables** (tab Environment):

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | *(lấy từ Supabase → Settings → Database → Transaction pooler port 6543)* |
| `DIRECT_URL` | *(lấy từ Supabase → Settings → Database → Direct connection port 5432)* |
| `SUPABASE_URL` | *(lấy từ Supabase → Settings → API)* |
| `SUPABASE_ANON_KEY` | *(lấy từ Supabase → Settings → API)* |
| `JWT_SECRET` | *(tự sinh chuỗi random mạnh, ví dụ dùng `openssl rand -base64 32`)* |
| `ALLOWED_ORIGINS` | *(điền sau khi có URL Vercel, ví dụ: `https://japan-quizlet.vercel.app`)* |

5. **Deploy** → chờ build xong, lấy URL dạng `https://japan-quizlet-api.onrender.com`

---

## Bước 3 — Cập nhật URL Render vào Frontend

Mở file `client/src/environments/environment.prod.ts` và thay `YOUR_RENDER_URL`:

```typescript
apiUrl: 'https://japan-quizlet-api.onrender.com/api'
```

Commit và push lên GitHub.

---

## Bước 4 — Deploy Frontend lên Vercel

1. Vào [vercel.com](https://vercel.com) → **Add New Project**
2. Import GitHub repo `japan-quizlet`
3. Cấu hình:
   - **Root Directory:** `client`
   - **Framework Preset:** Angular (hoặc Other)
   - **Build Command:** `ng build --configuration production`
   - **Output Directory:** `dist/client/browser`
4. Deploy → lấy URL dạng `https://japan-quizlet.vercel.app`

---

## Bước 5 — Cập nhật CORS trên Render

Quay lại Render → Environment Variables → cập nhật `ALLOWED_ORIGINS`:
```
https://japan-quizlet.vercel.app
```

Nếu có nhiều domain (preview deployments của Vercel):
```
https://japan-quizlet.vercel.app,https://japan-quizlet-git-main-yourname.vercel.app
```

Render sẽ tự restart service sau khi save.

---

## Kiểm tra

- Backend health: `GET https://japan-quizlet-api.onrender.com/api/health`
- Frontend: mở URL Vercel, thử login/register

---

## Lưu ý

- **Free tier Render** sẽ spin down sau 15 phút không có request → request đầu tiên chậm ~30s
- **CORS** phải khớp chính xác domain (không có trailing slash)
- **Prisma generate** phải chạy trong build command để generate Prisma Client cho môi trường Linux của Render
