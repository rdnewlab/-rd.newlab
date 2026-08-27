/* =====================================================================
   CONFIG — CHỖ DUY NHẤT CẦN SỬA BẰNG TAY
   ---------------------------------------------------------------------
   Toàn bộ NỘI DUNG của web nằm trên Google Sheet, không nằm trong code.
   File này chỉ khai báo "web nói chuyện với Google Sheet ở đâu".

   ⚠️ KHÔNG ghi tên công ty, địa chỉ nhà máy hay dữ liệu nội bộ vào đây.
   ===================================================================== */

const CONFIG = {

  /* --- 1. LINK APPS SCRIPT (quan trọng nhất) ------------------------
     Dán link .../exec sau khi Triển khai file apps-script/Code.gs.
     MỘT link này lo cả ba việc: lấy nội dung, nhận form liên hệ,
     và ghi nhận lượt truy cập.

     Để TRỐNG "" → web vẫn chạy bình thường bằng nội dung dự phòng
     trong js/fallback.js (dùng để xem thử trước khi dựng Sheet).       */
  API_URL: 'https://script.google.com/macros/s/AKfycbz0vaACL5du4Jv7I-tGlQRuI-tz5JmsweKdD50F8hkRsp0AxF1RLXN2X6C6xpOGgI5g/exec',

  /* --- 2. Link gửi mail riêng (không bắt buộc) ----------------------
     Để TRỐNG thì form liên hệ dùng chung API_URL ở trên — nên để trống.
     Chỉ điền nếu anh muốn giữ nguyên script gửi mail cũ đang chạy.     */
  FORM_API_URL: '',

  /* --- 3. Thống kê truy cập ----------------------------------------
     true  = đếm lượt xem trang, lượt đọc bài, lượt bấm tải (ẩn danh)
     false = tắt hoàn toàn, không gửi gì về Google

     Ghi chú: web KHÔNG thu thập tên, email hay vị trí của người xem.
     Chỉ có một mã ngẫu nhiên trong trình duyệt để biết là cùng một
     khách quay lại hay là khách mới.                                   */
  THONGKE_BAT: true,

  /* --- 4. Bộ nhớ đệm nội dung (phút) -------------------------------
     Sửa nội dung trên Sheet xong, chờ hết số phút này là web tự cập
     nhật (hoặc bấm Ctrl+F5 để thấy ngay).                              */
  CACHE_PHUT: 10,

  /* --- 5. Chờ tối đa bao nhiêu giây rồi mới chịu thua và dùng dự phòng */
  TIMEOUT_GIAY: 8,

  /* --- 6. Bật dòng chữ gỡ lỗi trong Console khi chạy thử ------------ */
  DEBUG: false
};

/* Link thực tế dùng cho form — không sửa dòng này */
CONFIG.URL_FORM = CONFIG.FORM_API_URL || CONFIG.API_URL;
