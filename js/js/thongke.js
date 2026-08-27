/* =====================================================================
   THỐNG KÊ TRUY CẬP — ẨN DANH, NHẸ, KHÔNG LÀM CHẬM TRANG
   ---------------------------------------------------------------------
   Nguyên tắc thiết kế:

   1. KHÔNG thu thập thông tin cá nhân. Không tên, không email, không vị
      trí. Chỉ có một mã ngẫu nhiên lưu trong trình duyệt để phân biệt
      "khách mới" với "khách quay lại".

   2. GỬI KIỂU BẮN-RỒI-QUÊN bằng navigator.sendBeacon. Trình duyệt tự lo
      gửi ở chế độ nền, trang không phải chờ, rời trang giữa chừng vẫn gửi.

   3. CHỐNG GỬI TRÙNG. Cùng một sự kiện trong 30 giây chỉ tính một lần —
      tránh trường hợp bấm nhiều lần làm số liệu sai và làm nặng máy chủ.

   4. TRẦN MỖI PHIÊN. Tối đa 30 sự kiện cho một lần vào web. Kể cả có
      người cố tình bấm phá thì cũng không đẩy được rác lên Sheet.

   5. HỎNG THÌ IM LẶNG. Mọi lỗi ở đây đều bị nuốt — thống kê không bao
      giờ được phép làm hỏng trải nghiệm người xem.
   ===================================================================== */

const ThongKe = (function () {

  const KHOA_KHACH  = 'rdnewlab_ma_khach';
  const TRAN_PHIEN  = 30;      // tối đa bao nhiêu sự kiện cho một phiên
  const CHONG_TRUNG_GIAY = 30; // cùng sự kiện trong bấy nhiêu giây thì bỏ

  let daGui = 0;
  const vuaGui = {};           // nhớ sự kiện vừa gửi để chống trùng

  /* ---------- Có được phép chạy không ---------- */
  function batKhong() {
    return CONFIG.THONGKE_BAT !== false && !!CONFIG.API_URL;
  }

  /* ---------- Mã khách ẩn danh (không phải thông tin cá nhân) ---------- */
  function maKhach() {
    try {
      let ma = localStorage.getItem(KHOA_KHACH);
      if (!ma) {
        ma = 'k' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        localStorage.setItem(KHOA_KHACH, ma);
      }
      return ma;
    } catch (e) {
      return 'k-tam';          // trình duyệt chặn localStorage thì vẫn chạy được
    }
  }

  function loaiThietBi() {
    return window.matchMedia('(max-width: 760px)').matches ? 'dien-thoai' : 'may-tinh';
  }

  /* ---------- Trang nào dẫn khách tới đây ---------- */
  function nguonVao() {
    try {
      const r = document.referrer;
      if (!r) return 'truc-tiep';
      const host = new URL(r).hostname.replace(/^www\./, '');
      if (host === location.hostname) return '';   // đi trong nội bộ web, không cần ghi
      return host.substring(0, 100);
    } catch (e) {
      return '';
    }
  }

  /* ---------- Gửi một sự kiện ---------- */
  function gui(loai, muc) {
    if (!batKhong()) return;
    if (daGui >= TRAN_PHIEN) return;

    const khoa = loai + '|' + (muc || '');
    const bay  = Date.now();
    if (vuaGui[khoa] && bay - vuaGui[khoa] < CHONG_TRUNG_GIAY * 1000) return;
    vuaGui[khoa] = bay;
    daGui++;

    try {
      const goi = new URLSearchParams({
        action:  'sukien',
        loai:    loai,
        muc:     String(muc || '').substring(0, 120),
        thietBi: loaiThietBi(),
        nguon:   nguonVao(),
        khach:   maKhach()
      });

      // sendBeacon: trình duyệt gửi ở nền, không giữ chân trang
      if (navigator.sendBeacon && navigator.sendBeacon(CONFIG.API_URL, goi)) {
        if (CONFIG.DEBUG) console.log('[thongke]', loai, muc);
        return;
      }

      // Trình duyệt cũ không có sendBeacon thì dùng cách dự phòng
      fetch(CONFIG.API_URL, { method: 'POST', body: goi, keepalive: true, mode: 'no-cors' });
      if (CONFIG.DEBUG) console.log('[thongke:duphong]', loai, muc);

    } catch (e) {
      // im lặng — xem mục 5 ở đầu file
    }
  }

  /* ---------- Ghi nhận một lượt vào web, mỗi phiên đúng một lần ---------- */
  function xemTrang() {
    try {
      if (sessionStorage.getItem('rdnewlab_da_dem')) return;
      sessionStorage.setItem('rdnewlab_da_dem', '1');
    } catch (e) { /* vẫn đếm bình thường nếu trình duyệt chặn */ }
    gui('xem_trang', location.pathname || '/');
  }

  /* ---------- Bắt các nút có gắn data-tk-loai ---------- */
  function batCacNutCoDanhDau() {
    if (!batKhong()) return;
    document.addEventListener('click', function (e) {
      const nut = e.target.closest('[data-tk-loai]');
      if (!nut) return;
      gui(nut.getAttribute('data-tk-loai'), nut.getAttribute('data-tk-muc') || '');
    }, true);   // dùng pha bắt để kịp gửi trước khi trình duyệt mở tab mới
  }

  return { gui: gui, xemTrang: xemTrang, batCacNut: batCacNutCoDanhDau, maKhach: maKhach };
})();
