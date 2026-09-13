# mrfuji UI v3

- Multi-page navigation: index + 7 category pages.
- Admin upload library with categories.
- IndexedDB file storage in the current browser.
- Music playlist at the top of homepage + admin music upload.
- Avatar management, theme switch, search, clock/weather.

## Admin demo
Password: `mrfuji-admin`

## Important
This is still a static frontend. Uploaded files are stored locally in the browser using IndexedDB. To make uploads shared for all visitors and persistent on a server, connect the admin functions to Firebase, Supabase, Cloudflare R2, S3, or a Node/PHP backend.

## V6 additions
- Ticket Center với tạo ticket, mã ticket tự động, hàng chờ theo ưu tiên, trạng thái và lịch sử.
- Admin Ticket Queue: tìm kiếm, lọc trạng thái, đổi trạng thái, xóa ticket và xuất JSON.
- Floating “Tạo ticket” CTA trên mọi trang.
- Image safety layer: lazy loading, decoding async, giới hạn kích thước và fallback khi ảnh lỗi.
- Responsive/mobile polish cho Ticket Center.

### Lưu ý dữ liệu
Project vẫn là static frontend. Ticket, lượt tải, yêu thích và dữ liệu admin demo vẫn lưu ở localStorage/IndexedDB của trình duyệt hiện tại. Muốn ticket dùng chung cho nhiều người truy cập, hãy nối phần Ticket API tới Firebase, Supabase hoặc backend Node/PHP.

## V7 Japanese premium polish
- Japanese landmark line icons: Fuji, Torii, Sakura, Tokyo Tower and Castle.
- Refined navigation/buttons with smaller proportions, softer borders and cleaner hover states.
- Added washi-inspired subtle grid texture and calmer Japanese premium visual language.
- Added floating "Ủng hộ Dev" button + donation modal.
- Added `assets/donate-qr.png` as a clearly labeled demo QR. Replace it with the real payment QR to activate actual donations without changing the UI.
