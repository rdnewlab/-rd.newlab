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
  // Đúng thứ tự các mục đang có trên trang (v3 đã bỏ Định hướng và Chuyên môn)
  const muc = ['gioi-thieu', 'ung-dung', 'thu-vien', 'video', 'cong-dong', 'nguoi-dung-sau', 'lien-he'];
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
  // Đổi từ khoá hay đổi danh mục thì đếm lại từ đầu, không giữ số cũ
  const chay  = () => { datLaiSoTaiLieu(); veTaiLieu(DU_LIEU.taiLieu, oTim.value, oNhom.value); };

  // Nút "Xem thêm" / "Thu gọn" được vẽ lại mỗi lần nên bắt sự kiện ở tầng ngoài
  const oThem = document.getElementById('tl-them');
  if (oThem) oThem.addEventListener('click', (e) => {
    if (e.target.closest('#nut-tl-them')) themSoTaiLieu();
    else if (e.target.closest('#nut-tl-thu')) {
      datLaiSoTaiLieu();
      document.getElementById('thu-vien').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else return;
    veTaiLieu(DU_LIEU.taiLieu, oTim.value, oNhom.value);
    ganHieuUngHien();
  });

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
    // (kiểm tra .closest tồn tại: sự kiện có thể phát sinh từ đối tượng không phải phần tử)
    const the = (e.target && e.target.closest)
      ? e.target.closest('.the, .the-ud, .the-tl, .the-video__khung, .the-lien-he, .mau-gui, .the-ho-so')
      : null;
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

  /* 4. Thẻ ứng dụng nghiêng theo chuột (V4)
     Gắn một lần ở tầng document nên các thẻ vẽ lại vẫn chạy, không phải gắn lại. */
  document.addEventListener('mousemove', (e) => {
    const the = (e.target && e.target.closest) ? e.target.closest('[data-nghieng]') : null;
    if (!the) return;
    const b = the.getBoundingClientRect();
    const rx = ((e.clientY - b.top) / b.height - .5) * -5;    // tối đa ±2,5°
    const ry = ((e.clientX - b.left) / b.width - .5) * 6;     // tối đa ±3°
    the.style.transform =
      'perspective(1000px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-4px)';
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const the = (e.target && e.target.closest) ? e.target.closest('[data-nghieng]') : null;
    if (the && !the.contains(e.relatedTarget)) the.style.transform = '';
  }, { passive: true });
}

/* ═══════════ KHỐI: SỐ LIỆU ĐẾM LÊN ═══════════
   Chỉ đếm phần SỐ, giữ nguyên phần chữ đi kèm (ví dụ "7+" đếm tới 7 rồi thêm dấu +).
   Ô nào không có số thì để yên. Máy đặt "giảm chuyển động" thì bỏ qua hẳn. */
function ganDemSo() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const quanSat = new IntersectionObserver((cac, ob) => {
    cac.forEach(m => {
      if (!m.isIntersecting) return;
      const o = m.target;
      ob.unobserve(o);

      demMotO(o);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.so-lieu__so').forEach(o => quanSat.observe(o));
}

/* Tách riêng để kiểm thử được bằng máy, và để chỗ khác gọi lại khi cần.
   Trả về true nếu có chạy đếm, false nếu ô đó không phải số. */
function demMotO(o, keoDai) {
  const goc = String(o.textContent || '').trim();
  const so  = parseInt(goc.replace(/\D/g, ''), 10);
  if (!so || so > 100000) return false;             // không phải số thì để yên
  const duoi = goc.replace(/^\D*\d+/, '');          // phần chữ phía sau, ví dụ dấu +
  const KEO_DAI = keoDai || 900;

  const batDau = (window.performance && performance.now) ? performance.now() : Date.now();
  function chay(luc) {
    const t = Math.min(1, (luc - batDau) / KEO_DAI);
    const muot = 1 - Math.pow(1 - t, 3);            // chậm dần về cuối
    o.textContent = Math.round(so * muot) + (t >= 1 ? duoi : '');
    if (t < 1) requestAnimationFrame(chay);
  }
  chay(batDau);
  return true;
}

/* ═══════════ KHỐI: ĐÈN XEM ẢNH PHÓNG TO ═══════════
   Bấm một tấm poster → mở toàn màn hình, chuyển tấm bằng nút hoặc phím ← →,
   đóng bằng nút ✕, phím Esc, hoặc bấm ra vùng nền tối. */
var denDs = [], denViTri = 0, denTenApp = '', denNutCu = null;

function denMo(ds, i, tenApp, nutGoc) {
  denDs = ds; denViTri = i; denTenApp = tenApp || ''; denNutCu = nutGoc || null;
  document.getElementById('den-anh').classList.remove('an');
  document.body.classList.add('khoa-cuon');
  denVe();
  document.getElementById('den-dong').focus();
}

function denDong() {
  document.getElementById('den-anh').classList.add('an');
  document.body.classList.remove('khoa-cuon');
  if (denNutCu) denNutCu.focus();                     // trả con trỏ về đúng chỗ vừa bấm
}

function denVe() {
  const hinh = document.getElementById('den-hinh');
  hinh.src = denDs[denViTri];
  hinh.alt = 'Ảnh giới thiệu ' + denTenApp + ' — tấm ' + (denViTri + 1);
  document.getElementById('den-chu').textContent =
    denTenApp + ' — ảnh ' + (denViTri + 1) + ' / ' + denDs.length;
  const mot = denDs.length < 2;
  document.getElementById('den-lui').hidden = mot;
  document.getElementById('den-toi').hidden = mot;
}

function denChuyen(buoc) {
  if (!denDs.length) return;
  denViTri = (denViTri + buoc + denDs.length) % denDs.length;   // hết thì quay vòng
  denVe();
}

function ganDenAnh() {
  const khung = document.getElementById('den-anh');
  if (!khung) return;

  // Gắn ở tầng document: dải poster được vẽ lại lúc nào cũng chạy
  document.addEventListener('click', (e) => {
    const nut = e.target.closest ? e.target.closest('.poster__o') : null;
    if (!nut) return;
    const khoi = nut.closest('.poster');
    if (!khoi) return;
    const ds = (khoi.dataset.dsPoster || '').split('|').filter(Boolean);
    if (!ds.length) return;
    denMo(ds, Number(nut.dataset.poster) || 0, khoi.dataset.tenApp, nut);
  });

  document.getElementById('den-dong').addEventListener('click', denDong);
  document.getElementById('den-lui').addEventListener('click', () => denChuyen(-1));
  document.getElementById('den-toi').addEventListener('click', () => denChuyen(1));
  khung.addEventListener('click', (e) => { if (e.target === khung) denDong(); });

  document.addEventListener('keydown', (e) => {
    if (khung.classList.contains('an')) return;
    if (e.key === 'Escape')     denDong();
    if (e.key === 'ArrowLeft')  denChuyen(-1);
    if (e.key === 'ArrowRight') denChuyen(1);
  });
}

/* ═══════════ KHỐI: DẢI POSTER TRƯỢT (V4.5) ═══════════
   Dải ảnh trong bài viết vốn chỉ cuộn được bằng cách kéo thanh cuộn — trên máy
   tính rất khó nhận ra là còn ảnh phía sau. Nay thêm:
     · hai nút ‹ › trượt từng tấm, cuộn mượt
     · hàng chấm chỉ đang ở tấm thứ mấy, bấm chấm là nhảy tới
     · nút tự mờ đi khi đã ở đầu hoặc cuối dải
     · hai mép dải mờ dần, cho mắt biết là còn ảnh bị che

   Gắn ở tầng document nên dải vẽ lại lúc nào cũng chạy. */
function ganDaiPoster() {

  function daiCua(nut) {
    const khoi = nut.closest('.poster');
    return khoi ? khoi.querySelector('.poster__dai') : null;
  }

  // Bề rộng một bước trượt = bề rộng một tấm + khoảng cách giữa hai tấm
  function buocTruot(dai) {
    const o = dai.querySelector('.poster__o');
    if (!o) return dai.clientWidth;
    const kc = parseFloat(getComputedStyle(dai).columnGap || getComputedStyle(dai).gap) || 14;
    return o.getBoundingClientRect().width + kc;
  }

  function capNhat(dai) {
    const khoi = dai.closest('.poster');
    if (!khoi) return;
    const conLai = dai.scrollWidth - dai.clientWidth;

    /* Số chấm = số TRANG cuộn được, không phải số ảnh.
       Bốn ảnh vừa khít một hàng thì không có trang nào để nhảy — lúc đó ẩn
       sạch hàng chấm, vẽ 4 chấm chỉ khiến người xem tưởng còn ảnh phía sau. */
    const hang = khoi.querySelector('.poster__cham-hang');
    if (hang) {
      const soTrang = conLai <= 4 ? 0 : Math.ceil(dai.scrollWidth / dai.clientWidth);
      if (hang.children.length !== soTrang) {
        hang.innerHTML = Array.from({ length: soTrang }, (_, i) =>
          `<button type="button" class="poster__cham" data-cham="${i}"
                   aria-label="Tới trang ảnh ${i + 1}"></button>`).join('');
      }
      /* Chấm đang sáng tính theo TỶ LỆ trên quãng cuộn được, không chia cho bề
         rộng khung. Lý do: dải 5 tấm trong khung 940px chỉ trượt được 168px —
         chia cho 940 thì không bao giờ ra chấm cuối, cuộn hết rồi vẫn sáng chấm
         đầu. Chia cho quãng cuộn thì 0 ra chấm đầu, hết dải ra chấm cuối. */
      const trang = soTrang < 2 ? 0
        : Math.round(dai.scrollLeft / Math.max(1, conLai) * (soTrang - 1));
      Array.from(hang.children).forEach((c, i) =>
        c.classList.toggle('dang-o', i === trang));
    }

    const lui = khoi.querySelector('[data-poster-lui]');
    const toi = khoi.querySelector('[data-poster-toi]');
    if (lui) lui.disabled = dai.scrollLeft <= 2;
    if (toi) toi.disabled = dai.scrollLeft >= conLai - 2;

    // Mép nào còn ảnh bị che thì bật lớp mờ dần ở mép đó
    khoi.querySelector('.poster__khung').classList.toggle('co-trai',  dai.scrollLeft > 2);
    khoi.querySelector('.poster__khung').classList.toggle('co-phai', dai.scrollLeft < conLai - 2);
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest) return;

    const nut = e.target.closest('[data-poster-lui],[data-poster-toi]');
    if (nut) {
      const dai = daiCua(nut);
      if (!dai) return;
      const huong = nut.hasAttribute('data-poster-lui') ? -1 : 1;
      dai.scrollBy({ left: huong * buocTruot(dai), behavior: 'smooth' });
      return;
    }

    const cham = e.target.closest('.poster__cham');
    if (cham) {
      const dai = daiCua(cham);
      if (!dai) return;
      // Chấm là TRANG, nên nhảy theo bề rộng khung, không theo bề rộng một tấm
      // Chấm là TRANG: nhảy theo tỷ lệ trên quãng cuộn được, khớp đúng cách
      // xác định chấm đang sáng ở hàm capNhat.
      const soCham = cham.parentElement.children.length;
      const conLai = dai.scrollWidth - dai.clientWidth;
      const dich = soCham < 2 ? 0 : (Number(cham.dataset.cham) / (soCham - 1)) * conLai;
      dai.scrollTo({ left: dich, behavior: 'smooth' });
    }
  });

  // Kéo thanh cuộn hay vuốt tay trên điện thoại cũng phải cập nhật chấm
  document.addEventListener('scroll', (e) => {
    const dai = e.target && e.target.classList && e.target.classList.contains('poster__dai')
      ? e.target : null;
    if (dai) capNhat(dai);
  }, true);

  // Vẽ lại bài viết thì chỉnh lại trạng thái ban đầu của nút và chấm
  document.addEventListener('daiPosterMoi', () => {
    document.querySelectorAll('.poster__dai').forEach(capNhat);
  });
}

/* ═══════════ KHỐI: "ĐỌC THÊM" CỦA NGƯỜI ĐỨNG SAU (V4.8) ═══════════
   Phần kỹ năng viết dài để trong khối ẩn; bấm nút mới mở ra. Gắn ở tầng
   document nên khối vẽ lại lúc nào cũng chạy. */
function ganDocThemNds() {
  document.addEventListener('click', (e) => {
    const nut = e.target.closest ? e.target.closest('#nds-nut-them') : null;
    if (!nut) return;
    const them = document.getElementById('nds-them');
    if (!them) return;
    const daMo = them.classList.toggle('an') === false;   // sau toggle: còn 'an' = đang đóng
    nut.setAttribute('aria-expanded', String(daMo));
    nut.innerHTML = daMo
      ? 'Thu gọn <span aria-hidden="true">↑</span>'
      : 'Đọc thêm về kỹ năng <span aria-hidden="true">↓</span>';
  });
}

/* ═══════════ KHỐI: CHÙM BIỂU TƯỢNG DẮT THEO CON TRỎ (V4) ═══════════
   Con trỏ đi tới đâu, cả chùm nghiêng nhẹ theo tới đó. Mỗi biểu tượng có
   một ĐỘ SÂU riêng (--sau) nên cái gần dịch nhiều, cái xa dịch ít — mắt
   đọc ra chiều sâu. Vẽ bằng transform và chỉ vẽ lại theo nhịp màn hình,
   nên không làm máy giật.

   Điện thoại và người chọn "giảm chuyển động": bỏ qua hoàn toàn, chùm
   vẫn hiện đủ và vẫn bấm được — chỉ là đứng yên. */
function ganChumIcon() {
  const vong = document.getElementById('chum-vong');
  if (!vong) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  vong.classList.add('chum__vong--song');   // bật phần trôi nhẹ trong CSS

  let dichX = 0, dichY = 0, hienX = 0, hienY = 0, dangChay = false;

  function veLai() {
    hienX += (dichX - hienX) * .09;         // đuổi theo có độ trễ nên mềm tay
    hienY += (dichY - hienY) * .09;
    vong.style.setProperty('--px', hienX.toFixed(3));
    vong.style.setProperty('--py', hienY.toFixed(3));
    if (Math.abs(dichX - hienX) > .002 || Math.abs(dichY - hienY) > .002) {
      requestAnimationFrame(veLai);
    } else { dangChay = false; }
  }

  // Nghe ở tầng phần mở đầu, không chỉ trong chùm — con trỏ rê ở vùng chữ
  // bên cạnh thì chùm cũng phản ứng, nhìn liền mạch hơn nhiều.
  const vung = document.querySelector('.mo-dau') || document.body;
  vung.addEventListener('mousemove', (e) => {
    const b = vong.getBoundingClientRect();
    if (!b.width) return;
    dichX = Math.max(-1, Math.min(1, (e.clientX - (b.left + b.width / 2)) / (b.width || 1)));
    dichY = Math.max(-1, Math.min(1, (e.clientY - (b.top + b.height / 2)) / (b.height || 1)));
    if (!dangChay) { dangChay = true; requestAnimationFrame(veLai); }
  }, { passive: true });

  vung.addEventListener('mouseleave', () => {
    dichX = 0; dichY = 0;                   // rời chuột thì chùm tự về giữa
    if (!dangChay) { dangChay = true; requestAnimationFrame(veLai); }
  }, { passive: true });
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
  veChumIcon(DU_LIEU.ungDung);        // chùm biểu tượng đầu trang (V4)
  veNguoiDungSau(DU_LIEU.caiDat);     // khối Người đứng sau (V4)
  veDinhHuong(DU_LIEU.dinhHuong);
  veLinhVuc(DU_LIEU.linhVuc);
  veNangLuc(DU_LIEU.nangLuc);
  veBoLoc(DU_LIEU.nhomUngDung);
  veUngDung(DU_LIEU.ungDung, 'all');
  veChonNhomTaiLieu(DU_LIEU.nhomTaiLieu);
  veTaiLieu(DU_LIEU.taiLieu, '', 'all');
  veVideo(DU_LIEU.videos);
  veCongDong(DU_LIEU.congDong);
  veLienHe(DU_LIEU.caiDat);
  veLienHeNhanh(DU_LIEU.caiDat);      // nút nổi Gọi ngay / Nhắn Zalo (V4.17)
  capNhatNutDocThem('luoi-dinh-huong');
  capNhatNutDocThem('luoi-linh-vuc');
  ganHieuUngHien();
  ganDemSo();           // số liệu đầu trang đếm lên (V4)
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
  ganDenAnh();          // đèn xem ảnh poster phóng to (V4)
  ganChumIcon();        // chùm biểu tượng dắt theo con trỏ (V4)
  ganDaiPoster();       // dải poster có nút trượt và chấm chỉ vị trí (V4.5)
  ganDocThemNds();      // nút "đọc thêm" của khối Người đứng sau (V4.8)

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
