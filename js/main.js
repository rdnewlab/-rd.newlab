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
  const muc = ['gioi-thieu', 'dinh-huong', 'chuyen-mon', 'ung-dung', 'thu-vien', 'lien-he'];
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

/* ═══════════ KHỐI: KHỞI ĐỘNG ═══════════ */
async function khoiDong() {
  khoiDongChuDe();

  DU_LIEU = await layNoiDung();

  // Vẽ toàn bộ trang
  veCaiDat(DU_LIEU.caiDat);
  veTheHoSo(DU_LIEU);
  veDinhHuong(DU_LIEU.dinhHuong);
  veLinhVuc(DU_LIEU.linhVuc);
  veNangLuc(DU_LIEU.nangLuc);
  veBoLoc(DU_LIEU.nhomUngDung);
  veUngDung(DU_LIEU.ungDung, 'all');
  veChonNhomTaiLieu(DU_LIEU.nhomTaiLieu);
  veTaiLieu(DU_LIEU.taiLieu, '', 'all');
  veLienHe(DU_LIEU.caiDat);

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

  // Thống kê: ghi nhận lượt vào web và bắt các nút tải
  ThongKe.batCacNut();
  ThongKe.xemTrang();

  window.addEventListener('hashchange', dinhTuyen);
  dinhTuyen();

  document.body.classList.add('da-san-sang');

  if (CONFIG.DEBUG) console.log('[web] Nguồn nội dung:', DU_LIEU._nguon);
}

document.addEventListener('DOMContentLoaded', khoiDong);
