/* =====================================================================
   MAIN — KHỞI ĐỘNG & TƯƠNG TÁC
   ---------------------------------------------------------------------
   Thứ tự: nạp dữ liệu → vẽ giao diện → gắn sự kiện → mở đúng màn hình.
   ===================================================================== */

/* ═══════════ KHỐI: CHỦ ĐỀ SÁNG / TỐI ═══════════ */
const KHOA_CHU_DE = 'rdnewlab_chu_de';

function datChuDe(ten) {
  document.documentElement.setAttribute('data-theme', ten);
  try { localStorage.setItem(KHOA_CHU_DE, ten); } catch (e) {}
}

function khoiDongChuDe() {
  // Mặc định NỀN TỐI cho mọi khách vào lần đầu, không phụ thuộc cài đặt máy họ.
  // Ai tự bấm đổi sang nền sáng thì trình duyệt nhớ lựa chọn đó cho lần sau.
  let luu = null;
  try { luu = localStorage.getItem(KHOA_CHU_DE); } catch (e) {}
  datChuDe(luu === 'light' ? 'light' : 'dark');
}

/* ═══════════ KHỐI: ĐIỀU HƯỚNG ═══════════ */
function gapMenu(mo) {
  const dh  = document.getElementById('dieu-huong');
  const nut = document.getElementById('nut-menu');
  dh.classList.toggle('dang-mo', mo);
  nut.classList.toggle('dang-mo', mo);
  nut.setAttribute('aria-expanded', String(mo));
}

// Tô sáng mục đang xem khi cuộn trang
function theoDoiCuon() {
  const muc = ['gioi-thieu', 'dinh-huong', 'chuyen-mon', 'ung-dung', 'video', 'thu-vien', 'lien-he'];
  const quanSat = new IntersectionObserver((cacMuc) => {
    cacMuc.forEach(m => {
      if (!m.isIntersecting) return;
      $$('.dh-link').forEach(a => a.classList.toggle(
        'dang-xem', a.getAttribute('href') === '#' + m.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  muc.forEach(id => { const el = document.getElementById(id); if (el) quanSat.observe(el); });

  // Đầu trang co lại khi cuộn xuống
  window.addEventListener('scroll', () => {
    document.getElementById('dau-trang').classList.toggle('da-cuon', window.scrollY > 20);
  }, { passive: true });
}

/* ═══════════ KHỐI: ĐỊNH TUYẾN (chuyển màn hình) ═══════════ */
function dinhTuyen() {
  const hash    = window.location.hash || '#/';
  const manChu  = document.getElementById('man-chu');
  const manBai  = document.getElementById('man-bai-viet');

  // Màn bài viết chi tiết: #/ung-dung/<ma>
  const khop = hash.match(/^#\/ung-dung\/([\w-]+)$/);
  if (khop && veBaiViet(khop[1])) {
    manChu.classList.add('an');
    manBai.classList.remove('an');
    window.scrollTo(0, 0);
    ThongKe.gui('doc_bai', khop[1]);      // ghi nhận một lượt đọc bài viết
    return;
  }

  // Các trường hợp còn lại: về trang chủ
  manBai.classList.add('an');
  manChu.classList.remove('an');

  // #/#lien-he  →  cuộn tới mục lien-he
  let dich = '';
  if (hash.startsWith('#/#'))      dich = hash.slice(3);
  else if (!hash.startsWith('#/')) dich = hash.slice(1);

  if (dich) {
    const el = document.getElementById(dich);
    if (el) { requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' })); return; }
  }
  window.scrollTo(0, 0);
}

/* ═══════════ KHỐI: BỘ LỌC & TÌM KIẾM ═══════════ */
function ganBoLocUngDung() {
  document.getElementById('bo-loc-ung-dung').addEventListener('click', (e) => {
    const nut = e.target.closest('.nut-loc');
    if (!nut) return;
    $$('.nut-loc').forEach(b => b.classList.toggle('dang-chon', b === nut));
    veUngDung(DU_LIEU.ungDung, nut.dataset.nhom);
  });
}

function ganTimTaiLieu() {
  const oTim  = document.getElementById('o-tim-tai-lieu');
  const oNhom = document.getElementById('chon-nhom-tai-lieu');
  const chay  = () => veTaiLieu(DU_LIEU.taiLieu, oTim.value, oNhom.value);

  let hen;
  oTim.addEventListener('input', () => { clearTimeout(hen); hen = setTimeout(chay, 180); });
  oNhom.addEventListener('change', chay);
}

/* ═══════════ KHỐI: THẺ RÚT GỌN — "ĐỌC TIẾP" ═══════════ */
function ganDocThem() {
  const rasoat = () => {
    capNhatNutDocThem('luoi-dinh-huong');
    capNhatNutDocThem('luoi-linh-vuc');
  };

  // Bấm nút → mở rộng / thu gọn đúng thẻ đó
  document.addEventListener('click', (e) => {
    const nut = e.target.closest('.nut-doc-them');
    if (!nut) return;
    const the = nut.closest('.the');
    const daMo = the.classList.toggle('mo-rong');
    nut.setAttribute('aria-expanded', String(daMo));
    nut.textContent = daMo ? 'Thu gọn' : 'Đọc tiếp';
  });

  rasoat();
  // Chữ web tải xong mới đo được chính xác số dòng
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(rasoat);

  let hen;
  window.addEventListener('resize', () => { clearTimeout(hen); hen = setTimeout(rasoat, 200); });
}

/* ═══════════ KHỐI: FORM LIÊN HỆ ═══════════ */
function ganFormLienHe() {
  const form = document.getElementById('mau-gui');
  const bao  = document.getElementById('bao-mau');
  const nut  = document.getElementById('nut-gui');

  // Mốc thời gian mở trang — máy chủ dùng để nhận ra bot điền form quá nhanh
  const lucMoTrang = Date.now();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const duLieu = {
      name:    document.getElementById('ip-ten').value.trim(),
      email:   document.getElementById('ip-email').value.trim(),
      subject: document.getElementById('ip-chu-de').value.trim(),
      message: document.getElementById('ip-noi-dung').value.trim(),
      website: document.getElementById('ip-website').value,          // ô mồi
      giay:    Math.round((Date.now() - lucMoTrang) / 1000)          // bẫy thời gian
    };

    // Kiểm tra tại chỗ trước khi gửi đi
    if (!duLieu.name || !duLieu.email || !duLieu.message) {
      return hienBao('loi', 'Vui lòng điền đủ Họ tên, Email và Nội dung.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(duLieu.email)) {
      return hienBao('loi', 'Địa chỉ email chưa đúng định dạng.');
    }

    const chuCu = nut.textContent;
    nut.disabled = true;
    nut.textContent = 'Đang gửi…';
    bao.className = 'bao-mau';
    bao.textContent = '';

    try {
      const kq = await guiLienHe(duLieu);
      if (kq && kq.status === 'success') {
        hienBao('ok', 'Đã gửi thành công. Cảm ơn ' + duLieu.name + ', tôi sẽ phản hồi qua email sớm nhất.');
        form.reset();
      } else {
        hienBao('loi', (kq && kq.message) || 'Máy chủ chưa nhận được tin nhắn. Vui lòng thử lại.');
      }
    } catch (loi) {
      hienBao('loi', 'Không gửi được lúc này. Anh/chị có thể liên hệ trực tiếp qua email hoặc Zalo bên cạnh.');
    } finally {
      nut.disabled = false;
      nut.textContent = chuCu;
    }
  });

  function hienBao(loai, chu) {
    bao.className = 'bao-mau bao-mau--' + loai;
    bao.textContent = chu;
  }
}

/* ═══════════ KHỐI: HIỆU ỨNG HIỆN DẦN KHI CUỘN ═══════════
   Thẻ trượt nhẹ lên và hiện dần khi cuộn tới — trang có nhịp thở hơn.
   Trình duyệt cũ không hỗ trợ thì mọi thứ hiện bình thường, không mất gì. */
let quanSatHien = null;
function ganHieuUngHien() {
  if (!('IntersectionObserver' in window)) return;
  if (!quanSatHien) {
    quanSatHien = new IntersectionObserver((cacThe) => {
      cacThe.forEach(t => {
        if (!t.isIntersecting) return;
        t.target.classList.add('hien-ra');
        quanSatHien.unobserve(t.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
  }
  document.querySelectorAll('.the, .the-ud, .the-tl, .the-video, .thanh-nang-luc')
    .forEach(el => {
      if (el.classList.contains('cho-hien')) return;
      el.classList.add('cho-hien');
      quanSatHien.observe(el);
    });
}

/* ═══════════ KHỐI: HIỆU ỨNG THEO CHUỘT ═══════════
   Ba lớp tạo chiều sâu — CHỈ bật trên máy có chuột thật:
   1. Vầng sáng lớn trôi theo con trỏ (có độ trễ nên mềm như đèn rọi)
   2. Vệt sáng trên bề mặt thẻ, bám đúng vị trí con trỏ đang rê
   3. Thẻ hồ sơ đầu trang nghiêng nhẹ theo hướng chuột
   Điện thoại và người chọn "giảm chuyển động" hoàn toàn không bị ảnh hưởng. */
function ganHieuUngChuot() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // 1. Vầng sáng bám chuột — vẽ bằng transform nên không tốn sức máy
  const vang = document.createElement('div');
  vang.id = 'vang-sang';
  vang.setAttribute('aria-hidden', 'true');
  document.body.appendChild(vang);

  let mx = innerWidth / 2, my = innerHeight / 3;   // đích tới
  let vx = mx, vy = my;                            // vị trí hiện tại
  let dangChay = false;
  function troi() {
    vx += (mx - vx) * .08;
    vy += (my - vy) * .08;
    vang.style.transform = 'translate(' + (vx - 350) + 'px,' + (vy - 350) + 'px)';
    if (Math.abs(mx - vx) > .5 || Math.abs(my - vy) > .5) requestAnimationFrame(troi);
    else dangChay = false;
  }

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (!dangChay) { dangChay = true; requestAnimationFrame(troi); }

    // 2. Vệt sáng trên thẻ đang rê — ghi toạ độ chuột vào biến CSS của thẻ
    const the = e.target.closest('.the, .the-ud, .the-tl, .the-video__khung, .the-lien-he, .mau-gui, .the-ho-so');
    if (the) {
      const b = the.getBoundingClientRect();
      the.style.setProperty('--mx', (e.clientX - b.left) + 'px');
      the.style.setProperty('--my', (e.clientY - b.top) + 'px');
    }
  }, { passive: true });

  // 3. Thẻ hồ sơ nghiêng nhẹ theo chuột
  const hs = document.querySelector('.the-ho-so');
  if (hs) {
    hs.addEventListener('mousemove', (e) => {
      const b = hs.getBoundingClientRect();
      const rx = ((e.clientY - b.top) / b.height - .5) * -6;   // tối đa ±3°
      const ry = ((e.clientX - b.left) / b.width - .5) * 8;    // tối đa ±4°
      hs.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
    });
    hs.addEventListener('mouseleave', () => { hs.style.transform = ''; });
  }
}

/* ═══════════ KHỐI: THANH BÁO ĐANG TẢI ═══════════
   Vệt sáng mảnh chạy trên đỉnh trang trong lúc chờ Google Sheet trả lời. */
function batThanhTai() {
  if (document.getElementById('thanh-tai')) return;
  const d = document.createElement('div');
  d.id = 'thanh-tai';
  d.className = 'thanh-tai';
  document.body.appendChild(d);
}
function tatThanhTai() {
  const d = document.getElementById('thanh-tai');
  if (d) d.remove();
}

/* ═══════════ KHỐI: VẼ TOÀN TRANG ═══════════ */
function veTatCa() {
  veCaiDat(DU_LIEU.caiDat);
  veTheHoSo(DU_LIEU);
  veDinhHuong(DU_LIEU.dinhHuong);
  veLinhVuc(DU_LIEU.linhVuc);
  veNangLuc(DU_LIEU.nangLuc);
  veBoLoc(DU_LIEU.nhomUngDung);
  veUngDung(DU_LIEU.ungDung, 'all');
  veChonNhomTaiLieu(DU_LIEU.nhomTaiLieu);
  veTaiLieu(DU_LIEU.taiLieu, '', 'all');
  veVideo(DU_LIEU.videos);
  veLienHe(DU_LIEU.caiDat);
  capNhatNutDocThem('luoi-dinh-huong');
  capNhatNutDocThem('luoi-linh-vuc');
  ganHieuUngHien();
}

/* ═══════════ KHỐI: KHỞI ĐỘNG ═══════════
   Chiến lược hai nhịp để web mở NHANH:
   Nhịp 1 — vẽ ngay bằng bộ nhớ đệm hoặc nội dung dự phòng (0 giây,
            khách thấy trang tức thì, bấm được luôn).
   Nhịp 2 — lấy bản mới nhất từ Google Sheet ở phía sau; về tới nơi
            thì vẽ đè lên. Khách hầu như không nhận ra khoảnh khắc đổi. */
async function khoiDong() {
  khoiDongChuDe();

  // Nhịp 1 — hiện trang ngay lập tức
  DU_LIEU = layNhanh();
  veTatCa();

  // Gắn sự kiện
  document.getElementById('nut-chu-de').addEventListener('click', () => {
    const dangToi = document.documentElement.getAttribute('data-theme') === 'dark';
    datChuDe(dangToi ? 'light' : 'dark');
  });
  document.getElementById('nut-menu').addEventListener('click', () => {
    gapMenu(!document.getElementById('dieu-huong').classList.contains('dang-mo'));
  });
  document.getElementById('dieu-huong').addEventListener('click', (e) => {
    if (e.target.closest('a')) gapMenu(false);
  });

  ganBoLocUngDung();
  ganTimTaiLieu();
  ganDocThem();
  ganFormLienHe();
  theoDoiCuon();
  ganHieuUngChuot();

  // Thống kê: ghi nhận lượt vào web và bắt các nút tải
  ThongKe.batCacNut();
  ThongKe.xemTrang();

  window.addEventListener('hashchange', dinhTuyen);
  dinhTuyen();

  document.body.classList.add('da-san-sang');
  if (CONFIG.DEBUG) console.log('[web] Nguồn nhịp 1:', DU_LIEU._nguon);

  // Nhịp 2 — lấy bản mới nhất từ Sheet ở phía sau, về tới nơi thì vẽ đè
  if (DU_LIEU._nguon !== 'cache' && CONFIG.API_URL) {
    batThanhTai();
    try {
      const moi = await layNoiDung();
      if (moi && moi._nguon === 'sheet') {
        DU_LIEU = moi;
        veTatCa();
        // Nếu khách đang đọc một bài viết thì vẽ lại đúng bài đó
        const khop = (window.location.hash || '').match(/^#\/ung-dung\/([\w-]+)$/);
        if (khop) veBaiViet(khop[1]);
        if (CONFIG.DEBUG) console.log('[web] Đã thay bằng nội dung từ Sheet');
      }
    } finally {
      tatThanhTai();
    }
  }
}

document.addEventListener('DOMContentLoaded', khoiDong);
