/* =====================================================================
   RENDER — ĐỔ NỘI DUNG TỪ DỮ LIỆU RA GIAO DIỆN
   ---------------------------------------------------------------------
   Mọi giá trị lấy từ Google Sheet đều đi qua locHtml() / locLink()
   trước khi ghi vào trang, để nội dung trên Sheet không thể chèn mã.
   ===================================================================== */

let DU_LIEU = null;   // giữ bản dữ liệu đang dùng cho cả trang

/* ---------- Định dạng chữ do người dùng gõ trên Sheet ----------
   Cho phép nhấn nhá NGAY TRONG Ô SHEET mà không đụng gì tới bố cục:

     **chữ**   → in đậm
     *chữ*     → in nghiêng
     ==chữ==   → nổi bật (nền màu nhấn nhạt)

   An toàn: chữ được khoá HTML (locHtml) TRƯỚC rồi mới đổi ký hiệu,
   nên nội dung trên Sheet không bao giờ chèn được mã vào trang.     */
function dinhDang(chuoi) {
  let s = locHtml(chuoi);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // In nghiêng: dấu * phải đứng sát mép chữ và không dính vào chữ/số bên ngoài
  // — để "5*6" hay "3*4" (phép nhân, kích thước) không bị nhầm thành nghiêng.
  s = s.replace(/(^|[^*\w])\*([^\s*][^*\n]*?)\*(?=[^*\w]|$)/g, '$1<em>$2</em>');
  s = s.replace(/==([^=]+)==/g, '<mark class="noi-bat">$1</mark>');
  return s;
}

/* ---------- Tiện ích DOM ---------- */
const $  = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

function datChu(id, giaTri) {
  const el = document.getElementById(id);
  if (el && giaTri) el.textContent = giaTri;
}

/* ═══════════ 1. CÀI ĐẶT CHUNG ═══════════ */
function veCaiDat(cd) {
  document.title = cd.tieuDeTrang || document.title;
  const meta = $('#meta-mota');
  if (meta && cd.moTaSEO) meta.setAttribute('content', cd.moTaSEO);

  datChu('hieu-chu',        cd.tenThuongHieu);
  datChu('chan-hieu',       cd.tenThuongHieu);
  datChu('hero-chuc-danh',  cd.chucDanh);
  datChu('hero-dong-1',     cd.heroDong1);
  datChu('hero-dong-2',     cd.heroDong2);

  // Hai đoạn chữ dài — cho phép **đậm** / *nghiêng* / ==nổi bật== từ Sheet
  const heroTT = document.getElementById('hero-tom-tat');
  if (heroTT && cd.heroTomTat) heroTT.innerHTML = dinhDang(cd.heroTomTat);
  const chanChu = document.getElementById('chan-chu');
  if (chanChu && cd.chanTrang) chanChu.innerHTML = dinhDang(cd.chanTrang);
  datChu('hero-cta-1',      cd.ctaChinh);
  datChu('hero-cta-2',      cd.ctaPhu);
  datChu('the-ten',         cd.tenThuongHieu);
  datChu('the-viec',        cd.tenHienThi);
  datChu('chan-nam',        '© ' + new Date().getFullYear());

  // Ba con số nổi bật
  const soLieu = [
    { so: cd.soLieu1So, nhan: cd.soLieu1Nhan },
    { so: cd.soLieu2So, nhan: cd.soLieu2Nhan },
    { so: cd.soLieu3So, nhan: cd.soLieu3Nhan }
  ].filter(x => x.so);
  $('#so-lieu').innerHTML = soLieu.map(x => `
    <div class="so-lieu__o">
      <dt class="so-lieu__so">${locHtml(x.so)}</dt>
      <dd class="so-lieu__nhan">${locHtml(x.nhan)}</dd>
    </div>`).join('');

  // Nút mở thư mục Drive — ẩn nếu Sheet để trống
  const nutDrive = $('#nut-drive');
  const linkDrive = locLink(cd.driveThuVien);
  if (linkDrive) {
    nutDrive.href = linkDrive;
    nutDrive.classList.remove('an');
    nutDrive.setAttribute('data-tk-loai', 'mo_drive');
    nutDrive.setAttribute('data-tk-muc', 'thu-muc-goc');
  } else {
    nutDrive.classList.add('an');
  }
}

/* ═══════════ 2. THẺ HỒ SƠ (cột phải phần mở đầu) ═══════════ */
function veTheHoSo(dl) {
  // Ưu tiên tên rút gọn (cột TenNgan) để thẻ không bị vỡ dòng
  const dong = dl.linhVuc.map(lv =>
    `<li><span aria-hidden="true">${locHtml(lv.icon)}</span>${locHtml(lv.tenNgan || lv.tieuDe)}</li>`).join('');
  $('#the-danh-sach').innerHTML = dong;
}

/* ═══════════ 3. ĐỊNH HƯỚNG ═══════════ */
function veDinhHuong(ds) {
  $('#luoi-dinh-huong').innerHTML = ds.map(m => `
    <article class="the the--dinh-huong">
      <div class="the__dinh">
        <span class="the__ico" aria-hidden="true">${locHtml(m.icon)}</span>
        <h3 class="the__ten">${locHtml(m.tieuDe)}</h3>
      </div>
      <p class="the__mo-ta">${dinhDang(m.noiDung)}</p>
      <button type="button" class="nut-doc-them" aria-expanded="false">Đọc tiếp</button>
    </article>`).join('');
}

/* ═══════════ 4. LĨNH VỰC CHUYÊN MÔN ═══════════ */
function veLinhVuc(ds) {
  $('#luoi-linh-vuc').innerHTML = ds.map(lv => {
    const the = tachDanh(lv.the).map(t => `<span class="vien-the">${locHtml(t)}</span>`).join('');
    return `
    <article class="the the--linh-vuc">
      <div class="the__dinh">
        <span class="the__ico" aria-hidden="true">${locHtml(lv.icon)}</span>
        <h3 class="the__ten">${locHtml(lv.tieuDe)}</h3>
      </div>
      <p class="the__mo-ta">${dinhDang(lv.moTa)}</p>
      <button type="button" class="nut-doc-them" aria-expanded="false">Đọc tiếp</button>
      <div class="hang-the">${the}</div>
    </article>`;
  }).join('');
}

/* ---------- Ẩn nút "Đọc tiếp" ở thẻ mà nội dung vốn đã hiện đủ ---------- */
function capNhatNutDocThem(khungId) {
  const khung = document.getElementById(khungId);
  if (!khung) return;
  khung.querySelectorAll('.the').forEach(the => {
    const chu = the.querySelector('.the__mo-ta');
    const nut = the.querySelector('.nut-doc-them');
    if (!chu || !nut) return;
    if (the.classList.contains('mo-rong')) { nut.classList.remove('an'); return; }
    nut.classList.toggle('an', chu.scrollHeight <= chu.clientHeight + 4);
  });
}

/* ═══════════ 5. NĂNG LỰC ═══════════ */
function veNangLuc(ds) {
  $('#luoi-nang-luc').innerHTML = ds.map(nl => {
    const muc = Math.max(0, Math.min(100, Number(nl.muc) || 0));
    return `
    <div class="thanh-nang-luc">
      <div class="thanh-nang-luc__dau">
        <span class="thanh-nang-luc__ten">${locHtml(nl.ten)}</span>
        <span class="thanh-nang-luc__nhom">${locHtml(nl.nhom)}</span>
      </div>
      <div class="thanh-nang-luc__ray" role="img" aria-label="${muc} trên 100">
        <span class="thanh-nang-luc__day" style="--muc:${muc}%"></span>
      </div>
    </div>`;
  }).join('');
}

/* ═══════════ 6. KHO ỨNG DỤNG ═══════════ */
function veBoLoc(nhom) {
  $('#bo-loc-ung-dung').innerHTML = nhom.map((n, i) => `
    <button class="nut-loc${i === 0 ? ' dang-chon' : ''}" data-nhom="${locHtml(n.ma)}">${locHtml(n.ten)}</button>`
  ).join('');
}

function veUngDung(ds, nhomLoc) {
  const loc = (!nhomLoc || nhomLoc === 'all') ? ds : ds.filter(u => u.nhom === nhomLoc);

  $('#luoi-ung-dung').innerHTML = loc.map(u => {
    const diem = tachDanh(u.diemChinh).slice(0, 4)
      .map(d => `<li>${dinhDang(d)}</li>`).join('');
    const anh = locLink(u.anh);
    const khoiAnh = anh
      ? `<img src="${anh}" alt="Ảnh giới thiệu ${locHtml(u.ten)}" loading="lazy" decoding="async">`
      : `<span class="the-ud__ico-lon" aria-hidden="true">${locHtml(u.icon)}</span>`;

    return `
    <article class="the-ud" data-nhom="${locHtml(u.nhom)}">
      <a class="the-ud__anh" href="#/ung-dung/${locHtml(u.id)}" aria-label="Đọc bài viết về ${locHtml(u.ten)}">
        ${khoiAnh}
        <span class="nhan-tt nhan-tt--${locHtml(u.mauNhan || 'xam')}">${locHtml(u.trangThai)}</span>
      </a>
      <div class="the-ud__than">
        <div class="the-ud__dinh">
          <h3 class="the-ud__ten">
            <a href="#/ung-dung/${locHtml(u.id)}">${locHtml(u.ten)}</a>
          </h3>
          <span class="the-ud__pb">${locHtml(u.phienBan)}</span>
        </div>
        <p class="the-ud__phu-de">${locHtml(u.phuDe)}</p>
        <p class="the-ud__tom-tat">${dinhDang(u.tomTat)}</p>
        <ul class="the-ud__diem">${diem}</ul>

        <div class="the-ud__chan">
          <a class="lien-ket-doc" href="#/ung-dung/${locHtml(u.id)}">Đọc bài viết <span aria-hidden="true">→</span></a>
          ${nutTaiApp(u, 'nho')}
        </div>
      </div>
    </article>`;
  }).join('');
}

/* ---------- Nút tải bản dùng thử của một ứng dụng ----------
   App nào chưa có bản dùng thử thì hiện chữ mờ, không hiện nút chết. */
function nutTaiApp(u, co) {
  const link = locLink(u.linkTai);
  const ghi  = locHtml(u.chuThichTai);

  if (!link) {
    return ghi ? `<span class="chua-co-ban-tai">${ghi}</span>` : '';
  }

  const lop = co === 'lon' ? 'nut nut--chinh' : 'nut nut--tai nut--nho';
  return `<a class="${lop}" href="${link}" target="_blank" rel="noopener"
             data-tk-loai="bam_tai_app" data-tk-muc="${locHtml(u.ten)} ${locHtml(u.phienBan)}"
             title="${ghi}">
            <span class="ico-tai" aria-hidden="true">⤓</span> Tải dùng thử
          </a>`;
}

/* ═══════════ 7. THƯ VIỆN TÀI LIỆU ═══════════ */
function veChonNhomTaiLieu(nhom) {
  $('#chon-nhom-tai-lieu').innerHTML = nhom
    .map(n => `<option value="${locHtml(n.ma)}">${locHtml(n.ten)}</option>`).join('');
}

function veTaiLieu(ds, tuKhoa, nhomLoc) {
  const tk = (tuKhoa || '').trim().toLowerCase();
  const loc = ds.filter(t => {
    const hopNhom = (!nhomLoc || nhomLoc === 'all') ? true : t.nhom === nhomLoc;
    const chuoi = `${t.tieuDe} ${t.moTa} ${t.dinhDang}`.toLowerCase();
    return hopNhom && (!tk || chuoi.includes(tk));
  });

  $('#luoi-tai-lieu').innerHTML = loc.map(t => {
    const link = locLink(t.link) || locLink(DU_LIEU.caiDat.driveThuVien);
    // Gắn nhãn đếm: app dùng thử đếm riêng để biết app nào được quan tâm nhất
    const loaiDem = t.nhom === 'appdungthu' ? 'bam_tai_app' : 'bam_tai_lieu';
    const nut = link
      ? `<a class="nut nut--vien nut--nho" href="${link}" target="_blank" rel="noopener"
            data-tk-loai="${loaiDem}" data-tk-muc="${locHtml(t.tieuDe)}">Mở trên Drive</a>`
      : `<span class="nut nut--vien nut--nho nut--tat" aria-disabled="true">Chưa có link</span>`;
    return `
    <article class="the-tl">
      <div class="the-tl__dinh">
        <span class="dinh-dang dinh-dang--${locHtml(String(t.dinhDang || '').toLowerCase())}">${locHtml(t.dinhDang)}</span>
        <span class="the-tl__dung-luong">${locHtml(t.dungLuong)}</span>
      </div>
      <h3 class="the-tl__ten">${locHtml(t.tieuDe)}</h3>
      <p class="the-tl__mo-ta">${dinhDang(t.moTa)}</p>
      ${nut}
    </article>`;
  }).join('');

  $('#tai-lieu-trong').classList.toggle('an', loc.length > 0);
}

/* ═══════════ 7b. VIDEO HƯỚNG DẪN ═══════════
   Danh sách do Apps Script tự đọc từ kênh YouTube — video mới tự hiện.
   Ảnh bìa lấy thẳng từ máy chủ ảnh của YouTube nên không tốn dung lượng. */
function veVideo(vd) {
  vd = vd || {};
  const kenh = locLink(vd.kenh);

  const nutKenh = $('#nut-kenh');
  if (kenh) { nutKenh.href = kenh; nutKenh.classList.remove('an'); }
  else { nutKenh.classList.add('an'); }

  const ds = Array.isArray(vd.ds) ? vd.ds.slice(0, 9) : [];
  $('#luoi-video').innerHTML = ds.map(v => {
    const id = String(v.id || '').replace(/[^\w-]/g, '');
    if (!id) return '';
    const ngay = v.ngay ? new Date(v.ngay) : null;
    const chuNgay = (ngay && !isNaN(ngay)) ? ngay.toLocaleDateString('vi-VN') : '';
    return `
    <a class="the-video" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener"
       data-tk-loai="bam_tai_lieu" data-tk-muc="Video · ${locHtml(v.ten)}">
      <span class="the-video__khung">
        <img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy" decoding="async">
        <span class="the-video__nut" aria-hidden="true">▶</span>
      </span>
      <span class="the-video__ten">${locHtml(v.ten)}</span>
      ${chuNgay ? `<span class="the-video__ngay">${chuNgay}</span>` : ''}
    </a>`;
  }).join('');

  $('#video-trong').classList.toggle('an', ds.length > 0);
}

/* Nút "Video hướng dẫn" trong bài viết ứng dụng.
   Ưu tiên link riêng của app (cột LinkVideo trên Sheet), chưa có thì mở kênh. */
function nutVideoBai(ud) {
  const link = locLink(ud.linkVideo) || locLink((DU_LIEU.videos || {}).kenh);
  if (!link) return '';
  return `<a class="nut nut--vien" href="${link}" target="_blank" rel="noopener"
             data-tk-loai="bam_tai_lieu" data-tk-muc="Video · ${locHtml(ud.ten)}">▶ Video hướng dẫn</a>`;
}

/* ═══════════ 8. LIÊN HỆ ═══════════ */
function veLienHe(cd) {
  const dong = [];

  const email = [cd.email, cd.emailPhu].filter(Boolean);
  if (email.length) dong.push(`
    <li class="muc-lien-he">
      <span class="muc-lien-he__ico" aria-hidden="true">✉</span>
      <div>
        <span class="muc-lien-he__nhan">Email</span>
        ${email.map(e => `<a class="muc-lien-he__gt" href="mailto:${locHtml(e)}">${locHtml(e)}</a>`).join('')}
      </div>
    </li>`);

  const dt = [cd.dienThoai, cd.dienThoaiPhu].filter(Boolean);
  if (dt.length) dong.push(`
    <li class="muc-lien-he">
      <span class="muc-lien-he__ico" aria-hidden="true">☎</span>
      <div>
        <span class="muc-lien-he__nhan">Điện thoại</span>
        ${dt.map(s => `<a class="muc-lien-he__gt" href="tel:${locHtml(String(s).replace(/\s/g, ''))}">${locHtml(s)}</a>`).join('')}
      </div>
    </li>`);

  if (cd.khuVuc) dong.push(`
    <li class="muc-lien-he">
      <span class="muc-lien-he__ico" aria-hidden="true">◎</span>
      <div>
        <span class="muc-lien-he__nhan">Địa điểm</span>
        <span class="muc-lien-he__gt">${locHtml(cd.khuVuc)}</span>
        ${cd.nhanViec ? `<span class="muc-lien-he__them">${locHtml(cd.nhanViec)}</span>` : ''}
      </div>
    </li>`);

  $('#ds-lien-he').innerHTML = dong.join('');

  // Nút mạng xã hội — chỉ hiện cái nào Sheet có điền
  const mang = [];
  if (locLink(cd.zalo))   mang.push(`<a class="nut-mang" href="${locLink(cd.zalo)}" target="_blank" rel="noopener">Zalo</a>`);
  if (locLink(cd.github)) mang.push(`<a class="nut-mang" href="${locLink(cd.github)}" target="_blank" rel="noopener">GitHub</a>`);
  const kenhYT = locLink((DU_LIEU.videos || {}).kenh);
  if (kenhYT) mang.push(`<a class="nut-mang" href="${kenhYT}" target="_blank" rel="noopener">YouTube</a>`);
  if (locLink(cd.congTaiBaoMat)) mang.push(`<a class="nut-mang" href="${locLink(cd.congTaiBaoMat)}" target="_blank" rel="noopener">Cổng tải tài liệu</a>`);
  $('#mang-xa-hoi').innerHTML = mang.join('');
}

/* ═══════════ 9. BÀI VIẾT CHI TIẾT ═══════════ */
function veBaiViet(maApp) {
  const ud = DU_LIEU.ungDung.find(u => u.id === maApp);
  if (!ud) return false;

  const doan = DU_LIEU.baiViet
    .filter(b => b.maApp === maApp)
    .sort((a, b) => (Number(a.thuTu) || 0) - (Number(b.thuTu) || 0));

  const mucLuc = doan.map((d, i) =>
    `<li><a href="#doan-${i + 1}">${locHtml(d.tieuDe)}</a></li>`).join('');

  // Trong ô Sheet, xuống dòng bằng Alt+Enter → trên web tách thành đoạn văn mới
  const than = doan.map((d, i) => `
    <section class="bai-viet__doan" id="doan-${i + 1}">
      <h2>${locHtml(d.tieuDe)}</h2>
      ${String(d.noiDung || '').split(/\n+/).filter(Boolean)
        .map(p => `<p>${dinhDang(p)}</p>`).join('')}
    </section>`).join('');

  const diem = tachDanh(ud.diemChinh).map(x => `<li>${locHtml(x)}</li>`).join('');
  const anh = locLink(ud.anh);

  $('#noi-dung-bai-viet').innerHTML = `
    <div class="khung khung--hep">
      <a class="quay-lai" href="#/"><span aria-hidden="true">←</span> Về trang chủ</a>

      <header class="bai-viet__dau">
        <div class="bai-viet__nhan">
          <span class="nhan-tt nhan-tt--${locHtml(ud.mauNhan || 'xam')}">${locHtml(ud.trangThai)}</span>
          <span class="bai-viet__pb">${locHtml(ud.phienBan)}</span>
        </div>
        <h1>${locHtml(ud.ten)}</h1>
        <p class="bai-viet__phu-de">${locHtml(ud.phuDe)}</p>
        <p class="bai-viet__dan">${dinhDang(ud.tomTat)}</p>

        <div class="bai-viet__hanh-dong">
          ${nutTaiApp(ud, 'lon')}
          ${nutVideoBai(ud)}
          ${locLink(ud.linkTai) && ud.chuThichTai
            ? `<span class="bai-viet__ghi-chu-tai">${locHtml(ud.chuThichTai)}</span>` : ''}
        </div>
      </header>

      ${anh ? `<figure class="bai-viet__hinh"><img src="${anh}" alt="Ảnh giới thiệu ${locHtml(ud.ten)}" loading="lazy"></figure>` : ''}

      <div class="bai-viet__than">
        <aside class="bai-viet__ben">
          <h2 class="bai-viet__ben-tieu-de">Điểm chính</h2>
          <ul class="bai-viet__diem">${diem}</ul>
          ${mucLuc ? `<h2 class="bai-viet__ben-tieu-de">Trong bài</h2><ol class="bai-viet__muc-luc">${mucLuc}</ol>` : ''}
        </aside>
        <div class="bai-viet__chinh">${than || '<p>Bài viết cho ứng dụng này chưa được cập nhật trên Google Sheet.</p>'}</div>
      </div>

      <footer class="bai-viet__chan">
        <p>Muốn dùng thử ${locHtml(ud.ten)} hoặc trao đổi cách triển khai?</p>
        <div class="bai-viet__hanh-dong bai-viet__hanh-dong--giua">
          ${nutTaiApp(ud, 'lon')}
          <a class="nut nut--vien" href="#/#lien-he">Liên hệ trao đổi</a>
        </div>
      </footer>
    </div>`;

  return true;
}
