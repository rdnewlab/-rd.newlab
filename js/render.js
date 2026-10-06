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

  // Danh ngôn: dải trên cùng và câu chân trang — ô trống thì tự ẩn
  const daiTren = document.getElementById('dai-danh-ngon');
  if (daiTren) {
    if (chuoiCo(cd.danhNgonTren)) {
      $('#danh-ngon-tren').textContent = cd.danhNgonTren;
      daiTren.classList.remove('an');
    } else {
      daiTren.classList.add('an');
    }
  }
  const dnDuoi = document.getElementById('danh-ngon-duoi');
  if (dnDuoi) dnDuoi.textContent = chuoiCo(cd.danhNgonDuoi) ? cd.danhNgonDuoi : '';
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
  // V5.1: ngày nội dung web được sửa lần cuối (máy tự ghi khi anh sửa Sheet)
  const chanCN = document.getElementById('chan-cap-nhat');
  if (chanCN) {
    const n = ngayVN(cd.ngayCapNhatWeb);
    chanCN.textContent = n ? 'Cập nhật nội dung: ' + n : '';
    chanCN.classList.toggle('an', !n);
  }

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
  /* Thẻ hồ sơ đã thay bằng chùm biểu tượng ở bản V4 — không có khung thì thôi. */
  const khung = $('#the-danh-sach');
  if (!khung) return;
  // Ưu tiên tên rút gọn (cột TenNgan) để thẻ không bị vỡ dòng
  const dong = dl.linhVuc.map(lv =>
    `<li><span aria-hidden="true">${locHtml(lv.icon)}</span>${locHtml(lv.tenNgan || lv.tieuDe)}</li>`).join('');
  khung.innerHTML = dong;
}

/* ═══════════ CHÙM BIỂU TƯỢNG BẢY ỨNG DỤNG (V4) ═══════════
   Một biểu tượng đứng giữa, sáu cái còn lại xếp thành vòng quanh nó.
   Vị trí tính bằng lượng giác chứ không gõ tay: thêm hay bớt app thì
   vòng tự chia lại đều, không phải sửa CSS.                              */
/* V5.1: app nào ở GIỮA, app nào trên VÒNG, app nào chạy ở DẢI dưới — đều do Sheet quyết:
     • giữa  = CaiDat › appTrungTam (trống thì lấy app đầu tiên)
     • vòng  = mọi app KHÔNG thuộc nhóm mở rộng, theo cột ThuTu
     • dải   = app thuộc nhóm CaiDat › nhomMoRong — thêm app mới vào nhóm này là tự lên dải */
function chiaAppChum(ds, cd) {
  cd = cd || {};
  const coIcon = (ds || []).filter(u => locLink(u.iconAnh));   // app nào chưa có icon thì bỏ qua
  const maMR = String(cd.nhomMoRong || '').trim();
  const moRong = maMR ? coIcon.filter(u => u.nhom === maMR) : [];
  let chinh = coIcon.filter(u => !moRong.includes(u));
  if (!chinh.length) chinh = coIcon.slice();
  const maGiua = String(cd.appTrungTam || '').trim();
  const giua = chinh.find(u => u.id === maGiua) || chinh[0];
  return { giua, vong: chinh.filter(u => u !== giua), moRong };
}

function veChumIcon(ds, cd) {
  const khung = $('#chum-vong');
  if (!khung) return;

  const chia = chiaAppChum(ds, cd);
  if (!chia.giua) { khung.innerHTML = ''; veDaiMoRong([]); return; }
  const dsc = [chia.giua].concat(chia.vong);

  // Chú thích dưới cụm tự đếm số app — thêm app trên Sheet là tự đổi, khỏi sửa code
  const ghi = document.querySelector('.chum__ghi');
  if (ghi) ghi.textContent = dsc.length + ' ứng dụng chính' +
    (chia.moRong.length ? ' · ' + chia.moRong.length + ' công cụ mở rộng' : '') + ' · bấm để đọc';
  const chum = document.getElementById('chum');
  if (chum) chum.setAttribute('aria-label', (dsc.length + chia.moRong.length) + ' ứng dụng');
  const nMR = ((DU_LIEU && DU_LIEU.nhomUngDung) || []).find(n => n && n.ma === String((cd || {}).nhomMoRong || '').trim());
  veDaiMoRong(chia.moRong, nMR);

  const quanh = Math.max(1, dsc.length - 1);                // số cái nằm trên vòng
  const BAN_KINH = 37;                                      // % so với cạnh khung

  khung.innerHTML = dsc.map((u, i) => {
    let x = 50, y = 50, co = 'giua';
    if (i > 0) {
      const goc = (-90 + (i - 1) * (360 / quanh)) * Math.PI / 180;
      x = 50 + BAN_KINH * Math.cos(goc);
      y = 50 + BAN_KINH * Math.sin(goc);
      co = 'vong';
    }
    // Mỗi cái một nhịp trôi và một độ sâu riêng — nhìn mới ra chiều sâu,
    // cùng nhịp thì thành một mảng phẳng dập dềnh, rất giả.
    const nhip = (6.5 + (i % 4) * 1.7).toFixed(1);
    const tre  = (-i * 1.3).toFixed(1);
    const sau  = (i === 0 ? 26 : 10 + (i % 3) * 7);

    return `
      <a class="chum__o chum__o--${co}" href="#/ung-dung/${locHtml(u.id)}"
         style="--x:${x.toFixed(2)}%;--y:${y.toFixed(2)}%;--nhip:${nhip}s;--tre:${tre}s;--sau:${sau}"
         aria-label="${locHtml(u.ten)} ${locHtml(u.phienBan)}">
        <span class="chum__hop">
          <img src="${locLink(u.iconAnh)}" alt="" decoding="async" width="72" height="72"
               onerror="this.closest('.chum__o').remove()">
        </span>
        <span class="chum__ten">${locHtml(u.ten)}</span>
      </a>`;
  }).join('');
}

/* Dải app mở rộng chạy vòng dưới chùm. Nội dung nhân đôi để trôi liền mạch
   (bản sao ẩn với trình đọc màn hình). Ít app quá thì nhân thêm cho kín dải. */
function veDaiMoRong(ds, nhom) {
  const dai = document.getElementById('chum-dai');
  if (!dai) return;
  if (!ds.length) { dai.innerHTML = ''; dai.classList.add('an'); return; }
  dai.classList.remove('an');
  const mot = (an) => ds.map(u => `
      <a class="chum-dai__o" href="#/ung-dung/${locHtml(u.id)}"${an ? ' tabindex="-1" aria-hidden="true"' : ''}>
        <img src="${locLink(u.iconAnh)}" alt="" width="34" height="34" decoding="async" loading="lazy"
             onerror="this.style.visibility='hidden'">
        <span class="chum-dai__chu"><b>${locHtml(u.ten)}</b><small>${locHtml(u.phuDe || u.phienBan || '')}</small></span>
      </a>`).join('');
  const lap = Math.max(1, Math.ceil(4 / ds.length));          // tối thiểu ~4 ô mỗi nửa vòng
  let nua = ''; for (let i = 0; i < lap; i++) nua += mot(i > 0);
  let nuaAn = ''; for (let i = 0; i < lap; i++) nuaAn += mot(true);
  dai.innerHTML = `<div class="chum-dai__nhan">${locHtml((nhom && nhom.icon) || '🧩')} ${locHtml((nhom && nhom.ten) || 'Hỗ trợ & mở rộng')}</div>
    <div class="chum-dai__khung"><div class="chum-dai__ray" style="--n:${ds.length * lap}">${nua}${nuaAn}</div></div>`;
}

/* ═══════════ KHỐI "NGƯỜI ĐỨNG SAU" (V4) ═══════════
   Chữ lấy từ 4 khoá trong tab CaiDat. Thiếu tiêu đề là ẩn cả mục —
   đúng luật "ô trống thì tự ẩn", không để lại khung rỗng.               */
function veNguoiDungSau(cd) {
  const muc = document.getElementById('nguoi-dung-sau');
  if (!muc) return;

  if (!chuoiCo(cd.nguoiSauTieuDe)) { muc.classList.add('an'); return; }
  muc.classList.remove('an');

  datChu('nds-nhan',    cd.nguoiSauNhan);
  datChu('nds-tieu-de', cd.nguoiSauTieuDe);

  const oChu = $('#nds-chu');
  if (oChu) {
    const doanChinh = String(cd.nguoiSauChu || '').split(/\n+/).filter(Boolean)
      .map(p => `<p>${dinhDang(p)}</p>`).join('');

    // Phần đọc thêm: ẩn cho tới khi bấm. Ô trống thì không hiện nút.
    const doanThem = String(cd.nguoiSauThem || '').split(/\n+/).filter(Boolean)
      .map(p => `<p>${dinhDang(p)}</p>`).join('');

    oChu.innerHTML = doanChinh + (doanThem
      ? `<div class="nds__them an" id="nds-them">${doanThem}</div>
         <button type="button" class="nds__nut-them" id="nds-nut-them" aria-expanded="false">
           Đọc thêm về kỹ năng <span aria-hidden="true">↓</span>
         </button>`
      : '');
  }

  const oY = $('#nds-y');
  if (oY) {
    oY.innerHTML = tachDanh(cd.nguoiSauY)
      .map(t => `<li>${dinhDang(t)}</li>`).join('');
  }
}

function chuoiCo(v) { return !!String(v == null ? '' : v).trim(); }

/* ═══════════ 3. ĐỊNH HƯỚNG ═══════════ */
function veDinhHuong(ds) {
  /* Mục này đã gỡ khỏi trang từ bản v3 — không có khung thì thôi, không báo lỗi.
     Giữ lại hàm để sau muốn bật lại chỉ cần chèn khung vào index.html. */
  const khung = $('#luoi-dinh-huong');
  if (!khung) return;
  khung.innerHTML = ds.map(m => `
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
  /* Mục Chuyên môn đã gỡ khỏi trang từ bản v3 — xem ghi chú ở veDinhHuong. */
  const khung = $('#luoi-linh-vuc');
  if (!khung) return;
  khung.innerHTML = ds.map(lv => {
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
  /* Thanh năng lực nằm trong mục Chuyên môn — đã gỡ ở bản v3. */
  const khung = $('#luoi-nang-luc');
  if (!khung) return;
  khung.innerHTML = ds.map(nl => {
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
  const ds = (typeof DU_LIEU !== 'undefined' && DU_LIEU.ungDung) || [];
  $('#bo-loc-ung-dung').innerHTML = nhom.map((n, i) => {
    const so = n.ma === 'all' ? ds.length : ds.filter(u => u.nhom === n.ma).length;
    if (n.ma !== 'all' && !so) return '';                  // nhóm chưa có app nào → không hiện nút
    return `
    <button class="nut-loc${i === 0 ? ' dang-chon' : ''}" data-nhom="${locHtml(n.ma)}">` +
      (n.icon ? `<span class="nut-loc__ico" aria-hidden="true">${locHtml(n.icon)}</span>` : '') +
      `${locHtml(n.ten)}<span class="nut-loc__so">${so}</span></button>`;
  }).join('');
}

/* V5: vẽ MỘT thẻ ứng dụng — tách riêng để dùng cho cả lưới phẳng lẫn lưới theo nhóm */
/* Nhãn nhóm nhỏ trên thẻ (🏭 Sản xuất…) — lấy từ tab NhomLoc */
function nhanNhomApp(ma) {
  const n = ((DU_LIEU && DU_LIEU.nhomUngDung) || []).find(x => x && x.ma === ma && ma !== 'all');
  return n ? `<span class="the-ud__nhom">${n.icon ? locHtml(n.icon) + ' ' : ''}${locHtml(n.ten)}</span>` : '';
}

/* V5.1: thẻ GỌN cho app hỗ trợ & mở rộng — nằm ngang, không ảnh bìa lớn, đỡ dài trang */
function theUngDungGon(u) {
  const ic = locLink(u.iconAnh);
  const khoiIcon = ic
    ? `<img class="the-ud__icon" src="${ic}" alt="" loading="lazy" decoding="async"
            width="52" height="52" onerror="thayIconHong(this, '${locHtml(u.icon)}')">`
    : `<span class="the-ud__icon the-ud__icon--chu" aria-hidden="true">${locHtml(u.icon)}</span>`;
  return `
    <article class="the-ud the-ud--gon" data-nhom="${locHtml(u.nhom)}">
      <div class="the-ud__than">
        <div class="the-ud__dinh">
          ${khoiIcon}
          <h3 class="the-ud__ten"><a href="#/ung-dung/${locHtml(u.id)}">${locHtml(u.ten)}</a></h3>
          <span class="the-ud__pb">${locHtml(u.phienBan)}</span>
        </div>
        <p class="the-ud__phu-de">${locHtml(u.phuDe)}</p>
        <p class="the-ud__tom-tat">${dinhDang(u.tomTat)}</p>
        <div class="the-ud__chan the-ud__chan--gon">
          <div class="the-ud__nut">${nutMoApp(u, 'gon')}${nutTaiApp(u, 'gon')}</div>
          <a class="lien-ket-doc" href="#/ung-dung/${locHtml(u.id)}">Đọc bài viết <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </article>`;
}

function theUngDung(u) {
    // Thẻ chỉ nhá 3 điểm — đủ mồi, bản đủ 4 điểm nằm trong bài viết
    const diem = tachDanh(u.diemChinh).slice(0, 3)
      .map(d => `<li>${dinhDang(d)}</li>`).join('');
    const anh = locLink(u.anh);
    /* Biểu tượng to LUÔN nằm sẵn phía sau ảnh bìa. Ảnh bìa tải được thì nó che đi;
       ảnh hỏng (đường dẫn cũ, file đã xoá) thì ảnh tự gỡ mình ra, để lộ biểu tượng.
       Nhờ vậy không bao giờ còn cảnh ô ảnh vỡ hiện chữ "Ảnh giới thiệu ...". */
    const khoiAnh =
      `<span class="the-ud__ico-lon" aria-hidden="true">${locHtml(u.icon)}</span>` +
      (anh ? `<img src="${anh}" alt="Ảnh giới thiệu ${locHtml(u.ten)}" loading="lazy"
                   decoding="async" onerror="this.remove()">` : '');

    // Icon thật của ứng dụng; app nào chưa có file icon thì rơi về hình vẽ chữ
    const ic = locLink(u.iconAnh);
    const khoiIcon = ic
      ? `<img class="the-ud__icon" src="${ic}" alt="" loading="lazy" decoding="async"
              width="52" height="52" onerror="thayIconHong(this, '${locHtml(u.icon)}')">`
      : `<span class="the-ud__icon the-ud__icon--chu" aria-hidden="true">${locHtml(u.icon)}</span>`;

    const soAnh = tachDanh(u.poster).length;

    return `
    <article class="the-ud" data-nhom="${locHtml(u.nhom)}" data-nghieng>
      <a class="the-ud__anh" href="#/ung-dung/${locHtml(u.id)}" aria-label="Đọc bài viết về ${locHtml(u.ten)}">
        ${khoiAnh}
        <span class="the-ud__phu" aria-hidden="true"></span>
        <span class="nhan-tt nhan-tt--${locHtml(u.mauNhan || 'xam')}">${locHtml(u.trangThai)}</span>
        ${soAnh > 1 ? `<span class="the-ud__so-anh" aria-hidden="true">${soAnh} ảnh</span>` : ''}
        ${nhanNhomApp(u.nhom)}
      </a>
      <div class="the-ud__than">
        <div class="the-ud__dinh">
          ${khoiIcon}
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
          ${nutMoApp(u, 'nho')}
          ${nutTaiApp(u, 'nho')}
        </div>
      </div>
    </article>`;
}

/* V5: khu ứng dụng CHIA NHÓM (Nghiên cứu · Sản xuất · Kinh doanh …).
   Tiêu đề + mô tả mỗi nhóm lấy từ tab NhomLoc. Bố cục tự chọn theo số app:
     1 app   → thẻ nằm ngang trải hết hàng (khỏi để trống 2/3 hàng)
     4, 7…   → 2 cột (4 app thành 2×2 cân đối)
     còn lại → 3 cột như cũ                                              */
function veUngDung(ds, nhomLoc) {
  const o = $('#luoi-ung-dung');
  const tatCa = !nhomLoc || nhomLoc === 'all';
  const dsNhom = (DU_LIEU.nhomUngDung || []).filter(n => n && n.ma && n.ma !== 'all');

  // Sheet chưa khai nhóm → vẽ lưới phẳng như V4, không vỡ gì
  if (!dsNhom.length) {
    o.classList.remove('luoi-ung-dung--nhom');
    o.innerHTML = ds.filter(u => tatCa || u.nhom === nhomLoc).map(theUngDung).join('') + veTheDichVu(DU_LIEU.caiDat);
    return;
  }

  const cd = DU_LIEU.caiDat || {};
  const maMR = String(cd.nhomMoRong || '').trim();
  const nhomMR = dsNhom.find(n => n.ma === maMR);
  const kieuLuoi = (n) => n === 1 ? ' luoi-ung-dung--mot' : (n % 3 === 1 ? ' luoi-ung-dung--hai' : '');

  /* V5.1 — xem "Tất cả": 2 khu rõ ràng thay vì 5–6 nhóm lắt nhắt.
       ① Ứng dụng chính (mỗi thẻ có nhãn nhóm nhỏ) — theo cột ThuTu
       ② Hỗ trợ & mở rộng — thẻ gọn nằm ngang, ở dưới cùng            */
  if (tatCa && nhomMR) {
    const chinh  = ds.filter(u => u.nhom !== maMR);
    const moRong = ds.filter(u => u.nhom === maMR);
    const dau = (ico, ten, so, moTa) => `
      <header class="nhom-ud__dau">
        ${ico ? `<span class="nhom-ud__ico" aria-hidden="true">${locHtml(ico)}</span>` : ''}
        <div class="nhom-ud__chu">
          <h3 class="nhom-ud__ten">${locHtml(ten)}<span class="nhom-ud__so">${so} ứng dụng</span></h3>
          ${moTa ? `<p class="nhom-ud__mo-ta">${dinhDang(moTa)}</p>` : ''}
        </div>
      </header>`;
    o.classList.add('luoi-ung-dung--nhom');
    o.innerHTML =
      (chinh.length ? `
      <section class="nhom-ud nhom-ud--chinh" data-nhom="chinh" style="--tt:0">
        ${dau('⭐', cd.udChinhTieuDe || 'Ứng dụng chính', chinh.length, cd.udChinhMoTa)}
        <div class="luoi-ung-dung luoi-ung-dung--con${kieuLuoi(chinh.length)}">${chinh.map(theUngDung).join('')}</div>
      </section>` : '') +
      (moRong.length ? `
      <section class="nhom-ud nhom-ud--mo-rong" data-nhom="${locHtml(maMR)}" style="--tt:1">
        ${dau(nhomMR.icon, nhomMR.ten, moRong.length, nhomMR.moTa)}
        <div class="luoi-ung-dung luoi-ung-dung--con luoi-ung-dung--gon" style="--so-cot:${Math.min(4, moRong.length)}">${moRong.map(theUngDungGon).join('')}</div>
      </section>` : '') +
      veTheDichVu(cd);
    return;
  }

  const daBiet = {};
  dsNhom.forEach(n => { daBiet[n.ma] = true; });
  const khoi = (tatCa ? dsNhom : dsNhom.filter(n => n.ma === nhomLoc))
    .map(n => ({ n, app: ds.filter(u => u.nhom === n.ma) }))
    .filter(k => k.app.length);
  // App gõ nhầm mã nhóm (chưa có ở NhomLoc) vẫn phải hiện — gom vào "Ứng dụng khác"
  const la = ds.filter(u => !daBiet[u.nhom]);
  if (tatCa && la.length) khoi.push({ n: { ma: 'khac', ten: 'Ứng dụng khác', icon: '📦', moTa: '' }, app: la });

  o.classList.add('luoi-ung-dung--nhom');
  o.innerHTML = khoi.map((k, i) => {
    const n = k.app.length;
    const laMR = k.n.ma === maMR;
    const kieu = laMR ? ' luoi-ung-dung--gon' : kieuLuoi(n);
    return `
    <section class="nhom-ud" data-nhom="${locHtml(k.n.ma)}" style="--tt:${i}">
      <header class="nhom-ud__dau">
        ${k.n.icon ? `<span class="nhom-ud__ico" aria-hidden="true">${locHtml(k.n.icon)}</span>` : ''}
        <div class="nhom-ud__chu">
          <h3 class="nhom-ud__ten">${locHtml(k.n.ten)}<span class="nhom-ud__so">${n} ứng dụng</span></h3>
          ${k.n.moTa ? `<p class="nhom-ud__mo-ta">${dinhDang(k.n.moTa)}</p>` : ''}
        </div>
      </header>
      <div class="luoi-ung-dung luoi-ung-dung--con${kieu}"${laMR ? ` style="--so-cot:${Math.min(4, n)}"` : ''}>${k.app.map(laMR ? theUngDungGon : theUngDung).join('')}</div>
    </section>`;
  }).join('') +
  veTheDichVu(DU_LIEU.caiDat);
}

/* ---------- Khu "Đặt làm riêng" ----------
   [SỬA 01/10/2026] Trước: một thẻ có ẢNH BÌA chữ in sẵn — ảnh rộng bị nhét vào cột hẹp nên cắt mất chữ
   ("…n may đo / …c của bạn"), ngành thì in cứng 4 cái trong ảnh, đoạn chữ bị cắt "…".
   Nay: một khu riêng vẽ HOÀN TOÀN bằng chữ từ Sheet — không bao giờ cắt chữ, thêm/bớt ngành chỉ cần sửa ô:
     cột trái  = nhãn · tiêu đề · đoạn giới thiệu · gạch đầu dòng · nút
     cột phải  = lưới NGÀNH (emoji đầu mỗi ngành thành ô icon) · hàng KHÂU · 4 BƯỚC làm việc
   Đứng cuối khu Ứng dụng, LUÔN hiện kể cả khi lọc nhóm. Thiếu tiêu đề → ẩn cả khu (ô trống tự ẩn). */
function veTheDichVu(cd) {
  cd = cd || {};
  if (!chuoiCo(cd.dichVuTieuDe)) return '';

  const y = tachDanh(cd.dichVuY).map(t => `<li>${dinhDang(t)}</li>`).join('');
  const nut = locHtml(cd.dichVuNut || 'Trao đổi yêu cầu');

  // Tách emoji đứng đầu ("🐾 Pet – thú cưng") ra làm icon; ngành không có emoji thì dùng chấm tròn
  const tachIcon = (t) => {
    const m = String(t).match(/^([^\p{L}\p{N}\s]+)\s*(.*)$/u);
    return m && m[2] ? { ico: m[1], chu: m[2] } : { ico: '', chu: String(t) };
  };
  const nganh = tachDanh(cd.dichVuNganh).map(tachIcon);
  const khoiNganh = nganh.length ? `
      <div class="dat-lam__khoi">
        <p class="dat-lam__nho">${locHtml(cd.dichVuNganhNhan || 'Ngành phục vụ')}</p>
        <ul class="dat-lam__nganh">${nganh.map(n => `
          <li><span class="dat-lam__ico" aria-hidden="true">${locHtml(n.ico || '•')}</span><span>${locHtml(n.chu)}</span></li>`).join('')}
        </ul>
      </div>` : '';

  const khau = tachDanh(cd.dichVuVung);
  const khoiKhau = khau.length ? `
      <div class="dat-lam__khoi">
        <p class="dat-lam__nho">${locHtml(cd.dichVuVungNhan || 'Khâu số hoá được')}</p>
        <div class="dat-lam__khau">${khau.map(k => `<span>${locHtml(k)}</span>`).join('')}</div>
      </div>` : '';

  const buoc = tachDanh(cd.dichVuBuoc);
  const khoiBuoc = buoc.length ? `
      <ol class="dat-lam__buoc">${buoc.map(b => `<li><span>${locHtml(b)}</span></li>`).join('')}</ol>` : '';

  // Nút phụ "Hỏi AI" chỉ hiện khi trợ lý đang bật (CaiDat › botBat)
  const nutAI = chuoiCo(cd.botBat)
    ? `<button type="button" class="nut nut--vien mo-chat">${ICON_AI} Hỏi AI về dự án</button>` : '';

  return `
    <section class="dat-lam" data-nhom="all" aria-label="${locHtml(cd.dichVuNhan || 'Đặt làm riêng')}">
      <div class="dat-lam__trai">
        <p class="dat-lam__nhan">${locHtml(cd.dichVuNhan || 'Đặt làm riêng')}</p>
        <h3 class="dat-lam__ten">${locHtml(cd.dichVuTieuDe)}</h3>
        ${chuoiCo(cd.dichVuChu) ? `<p class="dat-lam__chu">${dinhDang(cd.dichVuChu)}</p>` : ''}
        ${y ? `<ul class="dat-lam__y">${y}</ul>` : ''}
        <div class="dat-lam__nut">
          <a class="nut nut--chinh" href="#lien-he"
             data-tk-loai="bam_dat_lam_rieng" data-tk-muc="Đặt làm riêng">${nut} <span aria-hidden="true">→</span></a>
          ${nutAI}
        </div>
      </div>
      <div class="dat-lam__phai">${khoiNganh}${khoiKhau}</div>
      ${khoiBuoc}
    </section>`;
}

/* Icon thật hỏng đường dẫn thì thay bằng hình vẽ chữ, không để ô trống */
function thayIconHong(img, chu) {
  const the = document.createElement('span');
  the.className = 'the-ud__icon the-ud__icon--chu';
  the.setAttribute('aria-hidden', 'true');
  the.textContent = chu || '';
  img.replaceWith(the);
}

/* ---------- Nút tải bản dùng thử của một ứng dụng ----------
   App nào chưa có bản dùng thử thì hiện chữ mờ, không hiện nút chết. */
function nutTaiApp(u, co) {
  const link = locLink(u.linkTai);
  const ghi  = locHtml(u.chuThichTai);

  if (!link) {
    if (co === 'gon') return '';             // [SỬA 06/10/2026] thẻ gọn: chỉ nút — ghi chú dài làm lệch hàng, đã có trong bài viết
    return ghi ? `<span class="chua-co-ban-tai">${ghi}</span>` : '';
  }

  const lop = co === 'lon' ? 'nut nut--chinh' : 'nut nut--tai nut--nho';
  return `<a class="${lop}" href="${link}" target="_blank" rel="noopener"
             data-tk-loai="bam_tai_app" data-tk-muc="${locHtml(u.ten)} ${locHtml(u.phienBan)}"
             title="${ghi}">
            <span class="ico-tai" aria-hidden="true">⤓</span> ${co === 'gon' ? 'Tải bản cài' : 'Tải dùng thử'}
          </a>`;
}

/* ---------- Nút MỞ ứng dụng (app chạy web như Auto HCNS) ----------
   App nào có link mở (cột LinkMo trên Sheet) thì hiện nút; trống thì tự ẩn. */
function nutMoApp(u, co) {
  const link = locLink(u.linkMo);
  if (!link) return '';
  const lop = co === 'lon' ? 'nut nut--chinh nut--thu' : 'nut nut--tai nut--nho nut--thu';
  return `<a class="${lop}" href="${link}" target="_blank" rel="noopener"
             data-tk-loai="bam_tai_app" data-tk-muc="Dùng thử ${locHtml(u.ten)}"
             title="Mở bản dùng thử ${locHtml(u.ten)} trên trình duyệt">
            <span aria-hidden="true">▶</span> ${co === 'gon' ? 'Dùng thử' : 'Dùng thử ngay'}
          </a>`;
}

/* ═══════════ 7. THƯ VIỆN TÀI LIỆU ═══════════ */
function veChonNhomTaiLieu(nhom) {
  $('#chon-nhom-tai-lieu').innerHTML = nhom
    .map(n => `<option value="${locHtml(n.ma)}">${locHtml(n.ten)}</option>`).join('');
}

/* Số tài liệu hiện mỗi lượt. Đổi tìm kiếm hay đổi danh mục thì đếm lại từ đầu. */
// Điện thoại hiện 4 tài liệu mỗi lượt (đỡ cuộn), máy tính 6
const TAI_LIEU_MOI_LAN = (window.matchMedia && matchMedia('(max-width: 640px)').matches) ? 4 : 6;
let taiLieuHien = TAI_LIEU_MOI_LAN;

function datLaiSoTaiLieu() { taiLieuHien = TAI_LIEU_MOI_LAN; }
function themSoTaiLieu()   { taiLieuHien += TAI_LIEU_MOI_LAN; }

function veTaiLieu(ds, tuKhoa, nhomLoc) {
  const tk = (tuKhoa || '').trim().toLowerCase();
  const loc = ds.filter(t => {
    const hopNhom = (!nhomLoc || nhomLoc === 'all') ? true : t.nhom === nhomLoc;
    const chuoi = `${t.tieuDe} ${t.moTa} ${t.dinhDang}`.toLowerCase();
    return hopNhom && (!tk || chuoi.includes(tk));
  });

  /* Thư viện có hơn 20 mục — đổ hết ra thì trang kéo dài lê thê, khách phải cuộn
     mãi mới tới phần Liên hệ. Nên chỉ hiện một nhúm, ai cần mới bấm "Xem thêm". */
  const tong = loc.length;
  const hien = loc.slice(0, taiLieuHien);

  $('#luoi-tai-lieu').innerHTML = hien.map(t => {
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
        ${soNgayQua(t.ngayCapNhat) <= 14 ? '<span class="nhan-moi nhan-moi--nho">Mới</span>' : ''}
      </div>
      <h3 class="the-tl__ten">${locHtml(t.tieuDe)}</h3>
      <p class="the-tl__mo-ta">${dinhDang(t.moTa)}</p>
      ${ngayVN(t.ngayCapNhat) ? `<p class="the-tl__ngay">Cập nhật ${ngayVN(t.ngayCapNhat)}</p>` : ''}
      ${nut}
    </article>`;
  }).join('');

  $('#tai-lieu-trong').classList.toggle('an', tong > 0);

  const oThem = $('#tl-them');
  if (oThem) {
    const conLai = tong - hien.length;
    oThem.innerHTML = conLai > 0
      ? `<button type="button" class="nut nut--vien" id="nut-tl-them">
           Xem thêm ${conLai} tài liệu
         </button>
         <span class="chu-nho-mo">đang hiện ${hien.length} / ${tong}</span>`
      : (tong > TAI_LIEU_MOI_LAN
          ? `<button type="button" class="nut nut--vien" id="nut-tl-thu">Thu gọn danh sách</button>
             <span class="chu-nho-mo">đang hiện đủ ${tong} tài liệu</span>`
          : '');
  }
}

/* ═══════════ 7b. VIDEO HƯỚNG DẪN ═══════════
   Danh sách do Apps Script tự đọc từ kênh YouTube — video mới tự hiện.
   Ảnh bìa lấy thẳng từ máy chủ ảnh của YouTube nên không tốn dung lượng. */
/* Ngày từ Sheet ("2026-09-21") → "21/09/2026". Đọc thẳng chữ số, không qua múi giờ
   (new Date("2026-09-21") là nửa đêm giờ quốc tế — máy ở múi khác có thể lùi 1 ngày). */
function ngayVN(v) {
  const m = String(v || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : '';
}
function soNgayQua(v) {
  const m = String(v || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return Infinity;
  return (Date.now() - new Date(+m[1], +m[2] - 1, +m[3]).getTime()) / 864e5;
}

function veVideo(vd) {
  vd = vd || {};
  const kenh = locLink(vd.kenh);

  const nutKenh = $('#nut-kenh');
  if (kenh) { nutKenh.href = kenh; nutKenh.classList.remove('an'); }
  else { nutKenh.classList.add('an'); }

  // V5.1: danh sách lấy từ tab Video trên Sheet (+ video mới của kênh), đã xếp mới nhất lên đầu
  const ds = Array.isArray(vd.ds) ? vd.ds.slice(0, 12) : [];
  $('#luoi-video').innerHTML = ds.map(v => {
    const id = String(v.id || '').replace(/[^\w-]/g, '');
    if (!id) return '';
    const chuNgay = ngayVN(v.ngay);
    const moi = soNgayQua(v.ngay) <= 21;
    return `
    <a class="the-video" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener"
       data-tk-loai="bam_tai_lieu" data-tk-muc="Video · ${locHtml(v.ten)}">
      <span class="the-video__khung">
        <img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy" decoding="async">
        <span class="the-video__nut" aria-hidden="true">▶</span>
        ${moi ? '<span class="nhan-moi">Mới</span>' : ''}
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

/* ═══════════ 7c. CỘNG ĐỒNG — nhóm Facebook / Zalo ═══════════ */
function huyHieuNen(nen) {
  if (nen === 'zalo') {
    return { lop: 'cd__nen--zalo', chu: 'Z', loai: 'Nhóm Zalo', hanhDong: 'Vào nhóm Zalo' };
  }
  return { lop: 'cd__nen--facebook', chu: 'f', loai: 'Nhóm Facebook', hanhDong: 'Tham gia nhóm' };
}

/* Màu huy hiệu riêng từng nhóm (cột Mau trên Sheet) — chỉ nhận mã hex hợp lệ */
function mauHuyHieu(mau) {
  const m = String(mau || '').trim();
  return /^#[0-9A-Fa-f]{3,8}$/.test(m) ? ` style="background:${m}"` : '';
}

function veCongDong(ds) {
  ds = Array.isArray(ds) ? ds : [];
  const muc = document.getElementById('cong-dong');
  const khoiChip = document.getElementById('khoi-nhom-lien-he');
  const heroCd = document.getElementById('hero-cd');
  if (!ds.length) {                       // Sheet ẩn hết nhóm → cả 3 chỗ tự biến mất
    if (muc) muc.classList.add('an');
    if (khoiChip) khoiChip.classList.add('an');
    if (heroCd) heroCd.classList.add('an');
    return;
  }
  if (muc) muc.classList.remove('an');

  /* Dải huy hiệu nhỏ ở đầu trang, cạnh khu con số — bấm là vào thẳng nhóm */
  if (heroCd) {
    heroCd.classList.remove('an');
    $('#hero-cd-ds').innerHTML = ds.map(n => {
      const link = locLink(n.link);
      if (!link) return '';
      const h = huyHieuNen(n.nen);
      return `<a class="hero-cd__nut ${h.lop}"${mauHuyHieu(n.mau)} href="${link}" target="_blank" rel="noopener"
                 title="${locHtml(n.ten)}" aria-label="${locHtml(n.ten)}"
                 data-tk-loai="bam_tai_lieu" data-tk-muc="Nhóm · ${locHtml(n.ten)}">${h.chu}</a>`;
    }).join('');
  }

  /* Thẻ nhóm ở khu Cộng đồng */
  $('#luoi-cong-dong').innerHTML = ds.map(n => {
    const link = locLink(n.link);
    if (!link) return '';
    const h = huyHieuNen(n.nen);
    return `
    <article class="the the--cd">
      <div class="cd__dau">
        <span class="cd__nen ${h.lop}"${mauHuyHieu(n.mau)} aria-hidden="true">${h.chu}</span>
        <span class="cd__loai">${h.loai}</span>
      </div>
      <h3 class="the__ten the__ten--cd">${locHtml(n.ten)}</h3>
      <p class="the__mo-ta the__mo-ta--tu-do">${dinhDang(n.moTa)}</p>
      <a class="lien-ket-doc" href="${link}" target="_blank" rel="noopener"
         data-tk-loai="bam_tai_lieu" data-tk-muc="Nhóm · ${locHtml(n.ten)}">${h.hanhDong} <span aria-hidden="true">→</span></a>
    </article>`;
  }).join('');

  /* Lối vào nhanh trong khung Liên hệ */
  if (khoiChip) {
    khoiChip.classList.remove('an');
    $('#nhom-lien-he').innerHTML = ds.map(n => {
      const link = locLink(n.link);
      if (!link) return '';
      const h = huyHieuNen(n.nen);
      return `<a class="chip-nhom" href="${link}" target="_blank" rel="noopener"
                 data-tk-loai="bam_tai_lieu" data-tk-muc="Nhóm · ${locHtml(n.ten)}">
                <span class="cd__nen cd__nen--nho ${h.lop}"${mauHuyHieu(n.mau)} aria-hidden="true">${h.chu}</span>
                <span class="chip-nhom__ten">${locHtml(n.ten)}</span>
              </a>`;
    }).join('');
  }
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

/* Nút liên hệ NỔI ở góc phải màn hình — "Gọi ngay" + "Nhắn Zalo".
   Số gọi lấy từ CaiDat.soGoi (trống thì dùng dienThoai); Zalo lấy từ CaiDat.zalo.
   Ô nào trống thì ẩn đúng nút đó; trống cả hai thì ẩn hẳn cụm (đúng luật ô trống = ẩn). */
/* Số điện thoại bị Google Sheet cắt mất số 0 đầu (0943156780 → 943156780)
   → tự thêm lại, để nút Gọi ngay không bao giờ quay số sai. */
function chuanSoDT(v) {
  const s = String(v == null ? '' : v).trim().replace(/\.0+$/, '');
  const so = s.replace(/[^\d]/g, '');
  if (/^[1-9]\d{8}$/.test(so) && s.replace(/[\s.\-]/g, '') === so) return '0' + s;
  return s;
}

/* Biểu tượng AI: một ngôi sao 4 cánh lớn + 2 sao nhỏ — kiểu "tia sáng" quen thuộc của trợ lý AI */
const ICON_AI = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">' +
  '<path d="M10 2.5c.4 3.9 2.6 6.1 6.5 6.5-3.9.4-6.1 2.6-6.5 6.5-.4-3.9-2.6-6.1-6.5-6.5 3.9-.4 6.1-2.6 6.5-6.5Z"/>' +
  '<path d="M18.5 13c.2 1.9 1.1 2.8 3 3-1.9.2-2.8 1.1-3 3-.2-1.9-1.1-2.8-3-3 1.9-.2 2.8-1.1 3-3Z" opacity=".85"/>' +
  '<path d="M17 2.5c.13 1.2.8 1.87 2 2-1.2.13-1.87.8-2 2-.13-1.2-.8-1.87-2-2 1.2-.13 1.87-.8 2-2Z" opacity=".7"/></svg>';

function veLienHeNhanh(cd) {
  const o = document.getElementById('gam-lien-he');
  if (!o) return;

  const so   = chuanSoDT(cd.soGoi || cd.dienThoai);
  const soLink = so.replace(/\s+/g, '');
  const zalo = locLink(cd.zalo);
  const nut  = [];

  if (soLink) nut.push(
    `<a class="gam-nut gam-nut--goi" href="tel:${locHtml(soLink)}"` +
    ` data-tk-loai="bam_lien_he" data-tk-muc="Gọi ${locHtml(so)}"` +
    ` aria-label="Gọi ${locHtml(so)}" title="Gọi ${locHtml(so)}">` +
    `<span class="gam-nut__ico" aria-hidden="true">📞</span>` +
    `<span class="gam-nut__chu">Gọi ngay</span></a>`);

  if (zalo) nut.push(
    `<a class="gam-nut gam-nut--zalo" href="${zalo}" target="_blank" rel="noopener"` +
    ` data-tk-loai="bam_lien_he" data-tk-muc="Nhắn Zalo"` +
    ` aria-label="Nhắn Zalo" title="Nhắn Zalo">` +
    `<span class="gam-nut__ico" aria-hidden="true">Z</span>` +
    `<span class="gam-nut__chu">Nhắn Zalo</span></a>`);

  // Nút mở CHAT — nằm dưới cùng (dưới Zalo). Chỉ hiện khi CaiDat.botBat có bật.
  // V5.1: nút "Hỏi AI" — biểu tượng tia sáng AI, viền chuyển màu, nhịp sáng nhẹ
  if (String(cd.botBat || '').trim()) nut.push(
    `<button type="button" class="gam-nut gam-nut--chat gam-nut--ai mo-chat"` +
    ` aria-label="Hỏi trợ lý AI" title="Hỏi trợ lý AI">` +
    `<span class="gam-nut__ico" aria-hidden="true">${ICON_AI}</span>` +
    `<span class="gam-nut__chu">Hỏi AI</span></button>`);

  o.innerHTML = nut.join('');
  o.classList.toggle('an', nut.length === 0);
}

/* ═══════════ 9. BÀI VIẾT CHI TIẾT ═══════════ */
/* ---------- Dải poster của một ứng dụng ----------
   Ô Poster trên Sheet là danh sách đường dẫn ảnh, ngăn nhau bằng dấu |
   Không có ảnh nào thì KHÔNG hiện khung rỗng — đúng luật "ô trống = tự ẩn". */
function veDaiPoster(ud, anhBia) {
  const ds = tachDanh(ud.poster).map(locLink).filter(Boolean);
  if (!ds.length) {
    return anhBia
      ? `<figure class="bai-viet__hinh"><img src="${anhBia}" alt="Ảnh giới thiệu ${locHtml(ud.ten)}" loading="lazy"></figure>`
      : '';
  }

  const o = ds.map((a, i) => `
    <button type="button" class="poster__o" data-poster="${i}"
            aria-label="Phóng to ảnh ${i + 1} trên ${ds.length} của ${locHtml(ud.ten)}">
      <img src="${a}" alt="Ảnh giới thiệu ${locHtml(ud.ten)} — tấm ${i + 1}" loading="lazy"
           decoding="async" onerror="this.closest('.poster__o').remove()">
      <span class="poster__phong" aria-hidden="true">⤢</span>
    </button>`).join('');

  /* Hàng chấm để RỖNG — main.js tự điền sau khi đo được dải rộng bao nhiêu.
     Lý do: số chấm phải bằng số TRANG cuộn được, không phải số ảnh. Bốn ảnh
     vừa khít một hàng thì chẳng có trang nào để nhảy, vẽ 4 chấm là nói dối. */
  const cham = ds.length > 1 ? ' ' : '';

  const dieuKhien = ds.length > 1 ? `
        <div class="poster__lai">
          <button type="button" class="poster__nut" data-poster-lui aria-label="Ảnh trước">‹</button>
          <button type="button" class="poster__nut" data-poster-toi aria-label="Ảnh sau">›</button>
        </div>` : '';

  return `
    <section class="poster" data-ds-poster="${locHtml(ds.join('|'))}" data-ten-app="${locHtml(ud.ten)}">
      <div class="poster__dau">
        <div>
          <h2 class="poster__tieu-de">Hình ảnh ứng dụng</h2>
          <p class="poster__ghi">${ds.length} ảnh · bấm để phóng to</p>
        </div>
        ${dieuKhien}
      </div>
      <div class="poster__khung">
        <div class="poster__dai">${o}</div>
      </div>
      ${cham ? `<div class="poster__cham-hang">${cham}</div>` : ''}
    </section>`;
}

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
        <h1>${locLink(ud.iconAnh)
          ? `<img class="bai-viet__icon" src="${locLink(ud.iconAnh)}" alt="" width="46" height="46" decoding="async">`
          : ''}${locHtml(ud.ten)}</h1>
        <p class="bai-viet__phu-de">${locHtml(ud.phuDe)}</p>
        <p class="bai-viet__dan">${dinhDang(ud.tomTat)}</p>

        <div class="bai-viet__hanh-dong">
          ${nutMoApp(ud, 'lon')}
          ${nutTaiApp(ud, 'lon')}
          ${nutVideoBai(ud)}
          ${locLink(ud.linkTai) && ud.chuThichTai
            ? `<span class="bai-viet__ghi-chu-tai">${locHtml(ud.chuThichTai)}</span>` : ''}
        </div>
      </header>

      ${veDaiPoster(ud, anh)}

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

  /* Báo cho main.js biết dải poster vừa được vẽ lại, để nó chỉnh nút ‹ › và
     hàng chấm về đúng trạng thái ban đầu. Dùng sự kiện thay vì gọi thẳng hàm
     để render.js không phải biết main.js có những gì. */
  document.dispatchEvent(new CustomEvent('daiPosterMoi'));

  return true;
}
