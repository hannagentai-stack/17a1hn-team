# ĐỘI TUYỂN ĐIỆN TỬ 17A1HN - POSTER MATCHDAY

Trang web tĩnh (1 trang) giới thiệu đội bóng đá **Đội tuyển Điện tử 17A1HN** chuẩn phong cách poster thể thao sân vận động (Matchday Squad Poster).

## 🌟 Tính năng nổi bật
- **Nền SVĐ Bóng đá đêm:** Dàn đèn pha công suất lớn rực sáng, khán đài sương đêm và vệt chém thể thao sắc nét.
- **Lưới 5 cột hiện đại:** Tự động co giãn theo màn hình (5 cột desktop, 4 cột tablet ngang, 3 cột tablet dọc, 2 cột mobile).
- **Tên xoay dọc 90°:** Đọc từ dưới lên trên, căn đáy ảnh, tự động co giãn cỡ chữ (JS Auto-fit) không vượt chiều cao ảnh.
- **Badge số áo thể thao:** Nổi bật trên mọi màu áo đấu.
- **Hỗ trợ ảnh thật:** Dễ dàng bỏ ảnh `.jpg`, `.png`, `.webp` vào `assets/players/` và cập nhật trong `js/players.js`.
- **Dải nhà tài trợ:** Đặt ở đáy trang, có cờ bật/tắt dễ dàng.
- **Không phụ thuộc thư viện ngoài:** 100% HTML5, CSS3, Vanilla JavaScript, chạy được cả khi mở `file://`.

## 📁 Cấu trúc thư mục
```
├── index.html               # Trang chính
├── css/
│   └── style.css            # Toàn bộ giao diện & CSS variables
├── js/
│   ├── players.js           # Dữ liệu đội bóng, cấu hình, ban huấn luyện & cầu thủ
│   └── main.js              # Xử lý render giao diện & hiệu ứng cuộn
├── assets/
│   ├── stadium-bg.svg       # Nền dàn đèn sân vận động ban đêm
│   ├── logo.svg             # Logo đội tuyển 17A1HN
│   ├── placeholder-player.svg
│   ├── placeholder-staff.svg
│   ├── placeholder-silhouette.svg
│   ├── sponsors/            # Thư mục chứa logo tài trợ
│   └── players/             # Thư mục để bỏ ảnh cầu thủ thật (.jpg, .png)
```

## 🚀 Hướng dẫn thay đổi dữ liệu
Mở file `js/players.js` để chỉnh sửa thông tin đội, giải đấu, danh sách cầu thủ hoặc thêm đường dẫn ảnh `.jpg`.
