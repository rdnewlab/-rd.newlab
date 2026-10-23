/* =====================================================================
   LINK WEB (V6 — 23/10/2026) — MÀN HÌNH 3: TRẠM TRA CỨU NHANH
   ---------------------------------------------------------------------
   • Chỉ chạy khi khách bấm thẻ "Link web" (#/link-web) — trang chủ không
     nạp gì thêm, không chậm đi.
   • Dữ liệu: Google Sheet tab LinkWeb + NhomLink → /exec?phan=linkweb
     (gói riêng). Thứ tự: bộ nhớ đệm còn hạn → bản Sheet lần trước / bản
     dự phòng js/linkweb-mau.js (vẽ ngay) → lấy bản mới ở nền rồi vẽ đè.
   • Gói gọn dạng mảng: links = [[Nhom, NhomCon, Ten, Link, MoTa, Nganh, Ghim]]
   • Mọi chữ từ Sheet đi qua locHtml / locLink (api.js) trước khi vào trang.
   ===================================================================== */

const LinkWeb = (function () {

  const KHOA = 'rdnewlab_linkweb_v6';
  const NGANH = [
    { ma: '',   ten: 'Tất cả',        icon: '✦' },
    { ma: 'MP', ten: 'Mỹ phẩm',       icon: '💄' },
    { ma: 'TP', ten: 'Thực phẩm',     icon: '🥗' },
    { ma: 'DP', ten: 'Dược phẩm',     icon: '💊' },
    { ma: 'CN', ten: 'Chăn nuôi',     icon: '🐄' },
    { ma: 'YT', ten: 'Thiết bị y tế', icon: '🩺' }
  ];
  const TEN_NGANH = { MP: 'Mỹ phẩm', TP: 'Thực phẩm', DP: 'Dược', CN: 'Chăn nuôi', YT: 'TBYT' };

  let duLieu = null;        // { nhom: [...], links: [...], _nguon }
  let daGan = false, dangLay = false;
  let tuKhoa = '', nganh = '';

  /* ---------- Tiện ích ---------- */
  function khongDau(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
  }
  /* Chữ tắt văn bản → chữ đầy đủ, để gõ "thông tư 06" hay "TT 06" đều ra (giữ cả chữ tắt) */
  const TAT = { tt: 'thong tu', nd: 'nghi dinh', qd: 'quyet dinh', cv: 'cong van', vbhn: 'van ban hop nhat',
                qcvn: 'quy chuan', tcvn: 'tieu chuan', tpbvsk: 'thuc pham bao ve suc khoe', tbyt: 'thiet bi y te' };
  const TAT_DAU = { tt: 'thông tư', nd: 'nghị định', qd: 'quyết định', cv: 'công văn', vbhn: 'văn bản hợp nhất',
                    qcvn: 'quy chuẩn', tcvn: 'tiêu chuẩn', tpbvsk: 'thực phẩm bảo vệ sức khoẻ sức khỏe', tbyt: 'thiết bị y tế' };
  function moRongTat(s) {
    s = s.replace(/[^a-z0-9.@]+/g, ' ');
    return ' ' + s + ' ' + s.split(' ').map(t => TAT[t] || '').filter(Boolean).join(' ') + ' ';
  }
  /* Từ ≤ 2 ký tự (GI, AI, TP…) phải khớp NGUYÊN chữ; từ 3 ký tự khớp đầu chữ; dài hơn khớp bất kỳ đâu */
  function khopTu(tim, t) {
    if (t.length <= 2) return tim.indexOf(' ' + t + ' ') >= 0;
    if (t.length === 3) return tim.indexOf(' ' + t) >= 0;
    return tim.indexOf(t) >= 0;
  }
  function tenMien(url) {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return ''; }
  }

  /* Gói thô (mảng) → đối tượng dễ dùng; bỏ dòng hỏng. */
  function chuanHoa(tho, nguon) {
    if (!tho || !Array.isArray(tho.nhom) || !Array.isArray(tho.links)) return null;
    const nhom = tho.nhom.filter(n => Array.isArray(n) && n[0])
      .map(n => ({ ma: String(n[0]), ten: String(n[1] || n[0]), icon: String(n[2] || '🔗'), moTa: String(n[3] || '') }));
    const coNhom = {}; nhom.forEach(n => { coNhom[n.ma] = true; });
    const links = tho.links.filter(r => Array.isArray(r) && coNhom[r[0]] && locLink(r[3]))
      .map(r => {
        const l = {
          nhom: String(r[0]), nhomCon: String(r[1] || ''), ten: String(r[2] || ''), link: String(r[3]),
          moTa: String(r[4] || ''), nganh: String(r[5] || '').split('|').filter(Boolean), ghim: !!Number(r[6]),
          mien: tenMien(r[3])
        };
        if (!l.ten) l.ten = l.mien;
        const n = nhom.find(x => x.ma === l.nhom);
        const goc = [l.ten, l.moTa, l.mien, l.nhomCon, n ? n.ten : '', l.nganh.map(m => TEN_NGANH[m]).join(' ')].join(' ');
        l.tim = moRongTat(khongDau(goc));
        const dau = goc.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}.@]+/gu, ' ');   // giữ dấu
        l.timDau = ' ' + dau + ' ' + dau.split(' ').map(t => TAT_DAU[khongDau(t)] || '').filter(Boolean).join(' ') + ' ';
        return l;
      });
    if (!links.length) return null;
    return { nhom, links, _nguon: nguon };
  }

  /* ---------- Bộ nhớ đệm trong trình duyệt ---------- */
  function docDem(choPhepCu) {
    try {
      const g = JSON.parse(localStorage.getItem(KHOA) || 'null');
      if (!g) return null;
      const phut = (Date.now() - g.luc) / 60000;
      if (phut > (choPhepCu ? 30 * 24 * 60 : CONFIG.CACHE_PHUT)) return null;
      return g.data;
    } catch (e) { return null; }
  }
  function ghiDem(data) {
    try { localStorage.setItem(KHOA, JSON.stringify({ luc: Date.now(), data: data })); } catch (e) {}
  }

  /* Bản dự phòng nằm ở tệp riêng — chỉ tải khi cần (trang chủ không phải gánh) */
  function napDuPhong() {
    if (window.LINK_WEB_DU_PHONG) return Promise.resolve(window.LINK_WEB_DU_PHONG);
    return new Promise((xong) => {
      const s = document.createElement('script');
      s.src = 'js/linkweb-mau.js?v=6.0';
      s.onload = () => xong(window.LINK_WEB_DU_PHONG || null);
      s.onerror = () => xong(null);
      document.head.appendChild(s);
    });
  }

  async function layMoi() {
    if (!CONFIG.API_URL) return null;
    const hen = new AbortController();
    const dongHo = setTimeout(() => hen.abort(), CONFIG.TIMEOUT_GIAY * 1000);
    try {
      const ph = await fetch(CONFIG.API_URL + (CONFIG.API_URL.indexOf('?') >= 0 ? '&' : '?') + 'phan=linkweb', { signal: hen.signal });
      if (!ph.ok) return null;
      const j = await ph.json();
      return (j && j.status === 'success' && j.data) ? j.data : null;   // trả nhầm gói khác / lỗi → coi như không có
    } catch (e) {
      if (CONFIG.DEBUG) console.warn('[link-web] Không lấy được từ Sheet:', e.message);
      return null;
    } finally { clearTimeout(dongHo); }
  }

  async function napDuLieu() {
    if (dangLay) return;
    dangLay = true;
    try {
      const moiDem = chuanHoa(docDem(false), 'cache');
      if (moiDem) { duLieu = moiDem; ve(); return; }

      // Vẽ ngay bằng bản Sheet lần trước, chưa có thì bản dự phòng
      duLieu = chuanHoa(docDem(true), 'cache-cu') || chuanHoa(await napDuPhong(), 'duphong');
      if (duLieu) ve(); else veDangTai();

      document.body.classList.add('dang-tai');
      const tho = await layMoi();
      document.body.classList.remove('dang-tai');
      const moi = chuanHoa(tho, 'sheet');
      if (moi) { duLieu = moi; ghiDem(tho); ve(); }
      else if (!duLieu) veLoi();
      if (CONFIG.DEBUG) console.log('[link-web] Nguồn:', duLieu && duLieu._nguon);
    } finally { dangLay = false; }
  }

  /* ---------- Vẽ ---------- */
  const $id = (id) => document.getElementById(id);

  function veDangTai() {
    $id('lw-nhom').innerHTML = '<div class="lw-cho">' + '<span></span>'.repeat(6) + '</div>';
  }
  function veLoi() {
    $id('lw-nhom').innerHTML = '<p class="trong-rong">Chưa tải được danh sách link. Kiểm tra mạng rồi bấm tải lại trang.</p>';
  }

  function hopLe(l) {
    if (nganh && l.nganh.indexOf(nganh) < 0) return false;
    // Từ gõ CÓ dấu (vd "nhãn") → khớp đúng dấu, không lẫn "nhân", "nhanh"; từ không dấu → khớp rộng
    if (tuKhoa) return tuKhoa.split(' ').every(t => khongDau(t) !== t ? khopTu(l.timDau, t) : khopTu(l.tim, t));
    return true;
  }

  function anhIcon(l) {
    const chu = locHtml((l.ten.match(/[A-Za-zÀ-ỹ0-9]/) || ['•'])[0].toUpperCase());
    if (!l.mien) return '<span class="lw-the__ico lw-the__ico--chu">' + chu + '</span>';
    return '<span class="lw-the__ico" data-chu="' + chu + '"><img src="https://www.google.com/s2/favicons?domain=' +
      encodeURIComponent(l.mien) + '&sz=64" alt="" loading="lazy" width="22" height="22"></span>';
  }

  function theLink(l) {
    const nhan = l.nganh.map(m => '<span class="lw-nhan lw-nhan--' + m.toLowerCase() + '">' + TEN_NGANH[m] + '</span>').join('');
    return '<a class="lw-the" href="' + locLink(l.link) + '" target="_blank" rel="noopener noreferrer"' +
      ' data-tk-loai="mo_link" data-tk-muc="' + locHtml(l.ten.slice(0, 100)) + '">' +
      anhIcon(l) +
      '<span class="lw-the__chu">' +
        '<span class="lw-the__ten">' + locHtml(l.ten) + '</span>' +
        '<span class="lw-the__mien">' + locHtml(l.mien) + ' <span aria-hidden="true">↗</span></span>' +
        (l.moTa ? '<span class="lw-the__mo-ta">' + locHtml(l.moTa) + '</span>' : '') +
        (nhan ? '<span class="lw-the__nhan">' + nhan + '</span>' : '') +
      '</span></a>';
  }

  function veNganh() {
    const dem = {};
    NGANH.forEach(n => { dem[n.ma] = duLieu.links.filter(l => !n.ma || l.nganh.indexOf(n.ma) >= 0).length; });
    $id('lw-nganh').innerHTML = NGANH.filter(n => !n.ma || dem[n.ma]).map(n =>
      '<button type="button" class="nut-loc lw-nganh-nut' + (n.ma === nganh ? ' dang-chon' : '') + '" data-nganh="' + n.ma + '"' +
      ' aria-pressed="' + (n.ma === nganh) + '">' +
      '<span aria-hidden="true">' + n.icon + '</span> ' + n.ten + ' <span class="lw-so">' + dem[n.ma] + '</span></button>').join('');
  }

  function ve() {
    if (!duLieu) return;
    veNganh();
    const loc = duLieu.links.filter(hopLe);
    const coLoc = !!(tuKhoa || nganh);

    // Dải "Hay dùng" — chỉ khi không gõ tìm
    const ghim = tuKhoa ? [] : loc.filter(l => l.ghim);
    $id('lw-ghim').classList.toggle('an', !ghim.length);
    $id('lw-ghim').innerHTML = ghim.length
      ? '<h2 class="lw-ghim__tieu-de"><span aria-hidden="true">⭐</span> Hay dùng</h2><div class="lw-ghim__ds">' +
        ghim.map(l => '<a class="lw-ghim__muc" href="' + locLink(l.link) + '" target="_blank" rel="noopener noreferrer"' +
          ' data-tk-loai="mo_link" data-tk-muc="' + locHtml(l.ten.slice(0, 100)) + '">' + anhIcon(l) +
          '<span>' + locHtml(l.ten) + '</span></a>').join('') + '</div>'
      : '';

    // Các nhóm
    const html = [], mucLuc = [];
    duLieu.nhom.forEach(n => {
      const ds = loc.filter(l => l.nhom === n.ma);
      if (!ds.length) return;
      mucLuc.push('<a href="#lw-' + locHtml(n.ma) + '" class="lw-ml" data-nhom="' + locHtml(n.ma) + '">' +
        '<span class="lw-ml__ico" aria-hidden="true">' + locHtml(n.icon) + '</span>' +
        '<span class="lw-ml__ten">' + locHtml(n.ten) + '</span><span class="lw-so">' + ds.length + '</span></a>');
      // gom theo nhóm con, giữ thứ tự xuất hiện; link không có nhóm con đứng đầu
      const con = [''];
      ds.forEach(l => { if (con.indexOf(l.nhomCon) < 0) con.push(l.nhomCon); });
      const than = con.map(c => {
        const dc = ds.filter(l => l.nhomCon === c);
        if (!dc.length) return '';
        return (c ? '<h3 class="lw-con">' + locHtml(c) + '<span class="lw-so">' + dc.length + '</span></h3>' : '') +
          '<div class="lw-luoi">' + dc.map(theLink).join('') + '</div>';
      }).join('');
      html.push('<section class="lw-nhom" id="lw-' + locHtml(n.ma) + '">' +
        '<header class="lw-nhom__dau"><span class="lw-nhom__ico" aria-hidden="true">' + locHtml(n.icon) + '</span>' +
        '<div><h2 class="lw-nhom__ten">' + locHtml(n.ten) + ' <span class="lw-so">' + ds.length + '</span></h2>' +
        (n.moTa ? '<p class="lw-nhom__mo-ta">' + locHtml(n.moTa) + '</p>' : '') + '</div></header>' + than + '</section>');
    });

    $id('lw-nhom').innerHTML = html.join('');
    $id('lw-muc-luc').innerHTML = mucLuc.length ? '<p class="lw-ml__nhan">Nhóm</p>' + mucLuc.join('') : '';
    $id('lw-trong').classList.toggle('an', loc.length > 0);
    $id('lw-dem').textContent = coLoc
      ? loc.length + ' / ' + duLieu.links.length + ' link'
      : duLieu.links.length + ' link · ' + mucLuc.length + ' nhóm';
    ganLoiAnh();
    theoDoiNhom();
  }

  /* Ảnh biểu tượng trang không tải được — hoặc Google trả ảnh mặc định 16px (trang không có biểu tượng) → chữ cái đầu */
  function ganLoiAnh() {
    const doiChu = (img) => {
      const o = img.parentNode; if (!o) return;
      o.classList.add('lw-the__ico--chu'); o.textContent = o.getAttribute('data-chu') || '•';
    };
    document.querySelectorAll('#man-link .lw-the__ico img').forEach(img => {
      const xet = () => { if (img.naturalWidth && img.naturalWidth < 32) doiChu(img); };
      if (img.complete) xet(); else img.addEventListener('load', xet, { once: true });
      img.addEventListener('error', () => doiChu(img), { once: true });
    });
  }

  /* Mục lục tô sáng nhóm đang xem */
  let quanSat = null;
  function theoDoiNhom() {
    if (quanSat) quanSat.disconnect();
    if (!('IntersectionObserver' in window)) return;
    quanSat = new IntersectionObserver((ds) => {
      ds.forEach(m => {
        if (!m.isIntersecting) return;
        const ma = m.target.id.slice(3);
        document.querySelectorAll('.lw-ml').forEach(a => a.classList.toggle('dang-xem', a.getAttribute('data-nhom') === ma));
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('.lw-nhom').forEach(s => quanSat.observe(s));
  }

  /* ---------- Sự kiện ---------- */
  function ganSuKien() {
    if (daGan) return;
    daGan = true;
    let hen;
    $id('lw-o-tim').addEventListener('input', (e) => {
      clearTimeout(hen);
      hen = setTimeout(() => {
        // giữ dấu; "tt", "nđ"… (chữ tắt) đổi về không dấu để khớp bảng chữ tắt
        tuKhoa = e.target.value.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}.@]+/gu, ' ').trim()
          .split(' ').map(t => TAT[khongDau(t)] !== undefined ? khongDau(t) : t).join(' ');
        ve();
      }, 160);
    });
    $id('lw-nganh').addEventListener('click', (e) => {
      const nut = e.target.closest('.lw-nganh-nut');
      if (!nut) return;
      nganh = nut.getAttribute('data-nganh') || '';
      ve();
    });
    // Mục lục: cuộn mượt tới nhóm, KHÔNG đổi địa chỉ (giữ #/link-web)
    $id('lw-muc-luc').addEventListener('click', (e) => {
      const a = e.target.closest('.lw-ml');
      if (!a) return;
      e.preventDefault();
      const dich = document.getElementById('lw-' + a.getAttribute('data-nhom'));
      if (dich) dich.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* Gọi từ main.js khi địa chỉ là #/link-web */
  function mo() {
    ganSuKien();
    if (!duLieu) veDangTai();
    napDuLieu();
  }

  return { mo, _chuanHoa: chuanHoa };
})();
