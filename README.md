# Habitat_ — 1:1 Website Source

Project này được tổ chức lại từ mã nguồn website Habitat_ đã cung cấp, giữ nguyên bố cục, phong cách visual và tương tác chính.

## Cấu trúc

- `index.html` — trang chính
- `css/style.css` — toàn bộ style/theme/responsive
- `js/script.js` — animation, particles, menu, theme, server status, music player
- `assets/images/avatar.gif` — avatar
- `assets/audio/` — đặt `music.mp3`, `music2.mp3`, `music3.mp3` nếu muốn dùng playlist nhạc

## Chạy local

Mở bằng một static server (khuyến nghị):

```bash
python -m http.server 8080
```

Sau đó truy cập `http://localhost:8080`.

Không cần Node.js hay build step.
