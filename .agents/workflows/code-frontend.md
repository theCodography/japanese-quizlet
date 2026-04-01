---
description: Code một tính năng Frontend mới theo đúng chuẩn của dự án (Angular 19 + Tailwind v4)
---

Khi người dùng kích hoạt workflow này (bằng cách gõ `/code-frontend` kèm theo mô tả tính năng cần làm), bạn **BẮT BUỘC** phải thực hiện tuần tự các bước sau trước khi viết bất kỳ dòng lệnh nào:

1. Sử dụng tool đọc file để nạp toàn bộ nội dung của file `README.md` tại thư mục gốc vào bộ nhớ. Nếu không đọc được, báo lại người dùng.
2. Hiểu rõ rằng kiến trúc dự án sử dụng **Angular 19 Standalone Components**, **Signals** cho State Management và **TailwindCSS v4** cho UI.
3. Phân tích yêu cầu của người dùng và thiết kế cấu trúc Component/HTML.
4. Nếu cần tạo Component mới, hãy chạy script qua Terminal (`ng generate component ... --directory client/...`) để cấu trúc thư mục chính xác.
5. Triển khai code theo đúng hướng dẫn thiết kế. Tuyệt đối không tự ý viết thêm file CSS phụ nếu TailwindCSS có thể gánh vác việc đó trực tiếp trên thuộc tính HTML class.
6. Sau cùng, viết tóm tắt (Walkthrough) gửi người dùng những File đã chỉnh sửa và thay đổi gì so với rule.
